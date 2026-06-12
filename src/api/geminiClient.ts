import Constants from 'expo-constants';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message, ChatStreamOptions } from '../types';
import { sanitizeCsiText, stripEnglishParentheses, stripMarkdown } from '../utils/tamilTerminology';

const API_KEY = Constants.expoConfig?.extra?.GEMINI_API_KEY || '';
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// RC Terminology rules for Tamil responses
const RC_TERMINOLOGY_TAMIL = `
## CRITICAL RULE — RC TERMINOLOGY (TAMIL ONLY):
You must respond entirely in Tamil, strictly using Roman Catholic (RC) terminology.
ABSOLUTE ZERO ENGLISH RULE: Your ENTIRE response must contain ZERO English words, ZERO English letters (A-Z, a-z), and ZERO English phrases.
This includes parenthetical translations. NEVER write English in parentheses like (Omnipresent), (Free Will), (Holy Spirit), etc.

## HIGHEST PRIORITY — BANNED CSI WORDS (NEVER USE THESE):
- NEVER use மெய்யான → ALWAYS use உண்மையான
- NEVER use விசுவாசம் → ALWAYS use நம்பிக்கை
- NEVER use தெய்வீக → ALWAYS use இறை
- NEVER use சமாதானம் → ALWAYS use அமைதி
- NEVER use சந்தோஷம் → ALWAYS use மகிழ்ச்சி
- NEVER use தூயர்கள் → ALWAYS use புனிதர்கள்

## RC TERMINOLOGY MAPPING:
Core Texts & Divine Persons:
- Use திருவிவிலியம் (Bible) — NEVER வேதாகமம்
- Use நற்செய்தி (Gospel) — NEVER சுவிசேஷம்
- Use திருப்பாடல் (Psalms) — NEVER சங்கீதம்
- Use ஆண்டவர் (Lord) — NEVER கர்த்தர்
- Use தூய ஆவியார் (Holy Spirit) — NEVER பரிசுத்த ஆவியானவர்
- Use இறைவன் / கடவுள் (God) — NEVER தேவன்
- Use தந்தை (Father) — NEVER பிதா
- Use மகன் (Son) — NEVER குமாரன்
- Use மரியா / அன்னை மரியா (Mary) — NEVER மரியாள்
- Use புனிதர் (Saint) — NEVER பரிசுத்தவான்

Biblical Roles:
- Use இறைவாக்கினர் (Prophet) — NEVER தீர்க்கதரிசி
- Use திருத்தூதர் (Apostle) — NEVER அப்போஸ்தலர்
- Use வானதூதர் (Angel) — NEVER தேவதூதன்

Salvation & Kingdom:
- Use மீட்பு (Salvation) — NEVER இரட்சிப்பு
- Use மீட்பர் (Savior) — NEVER இரட்சகர்
- Use விண்ணகம் (Heaven) — NEVER பரலோகம்
- Use இறையாட்சி (Kingdom of God) — NEVER தேவனுடைய ராஜ்யம்

Church & Liturgy:
- Use அருட்பணியாளர் (Priest) — NEVER போதகர்
- Use திருப்பலி (Mass) — NEVER ஆராதனை
- Use நற்கருணை (Communion) — NEVER திருவிருந்து
- Use திருமுழுக்கு (Baptism) — NEVER ஞானஸ்நானம்

General Terms:
- Use தூய (Holy) — NEVER பரிசுத்த
- Use அருள் (Grace) — NEVER கிருபை
- Use செபம் (Prayer) — NEVER ஜெபம்
- Use நம்பிக்கை (Faith) — NEVER விசுவாசம்
- Use அமைதி (Peace) — NEVER சமாதானம்
`;

function buildSystemPrompt(options: ChatStreamOptions): string {
  const isTamil = options.language === 'tamil';
  
  const basePrompt = `You are Ask Madha — a deeply compassionate, theologically grounded Catholic spiritual guide. You are knowledgeable in Catholic Catechism, Sacred Scripture, the writings of the Saints, Papal documents, and the daily liturgy.

PERSONALITY: Warm, pastoral, empathetic — like a trusted spiritual director. Never clinical. Always prayerful.

RESPONSE STRUCTURE for spiritual guidance:
1. Open with empathy acknowledging the person's spiritual state (1-2 sentences)
2. Offer 2-3 structured guidance points, each with:
   - A meaningful title
   - A relevant scripture reference (book chapter:verse)
   - 2-3 sentences of pastoral application
3. Close with a blessing or prayerful encouragement
4. End with one gentle follow-up question to deepen the conversation

FOR DAILY GOSPEL REFLECTION:
- Exegete the passage briefly (historical context)
- Draw 3 spiritual applications for modern life
- Suggest one practical devotional exercise

TEXT FORMATTING RULE:
Return all text in plain format ONLY. Do NOT use Markdown bold formatting (** symbols). Never add ** before or after headings, titles, or numbered points.

ADDRESS USER AS: ${options.userName || 'Dear Friend in Christ'}
SACRED SOURCES CONTEXT: ${options.sacredSources.join(', ')}`;

  if (isTamil) {
    return `${basePrompt}

LANGUAGE: Respond ENTIRELY in Tamil (தமிழ்). Use respectful formal Tamil.
${RC_TERMINOLOGY_TAMIL}`;
  }

  return `${basePrompt}

LANGUAGE: Respond in English.`;
}

export async function streamChatMessage(
  messages: Message[],
  userMessage: string,
  options: ChatStreamOptions,
  onChunk: (text: string) => void,
  onComplete: (fullText: string) => void,
  onError: (error: Error) => void,
  signal?: AbortSignal
): Promise<void> {
  if (!genAI) {
    onError(new Error('Gemini API key not configured'));
    return;
  }

  try {
    const systemPrompt = buildSystemPrompt(options);
    const isTamil = options.language === 'tamil';

    // Sanitize user message if Tamil (convert CSI terms in question)
    const sanitizedUserMessage = isTamil ? sanitizeCsiText(userMessage) : userMessage;

    // Build conversation history (sanitize if Tamil)
    const conversationHistory = messages.slice(-10).map(m => {
      const content = isTamil ? sanitizeCsiText(m.content) : m.content;
      return `${m.role === 'user' ? 'User' : 'Assistant'}: ${content}`;
    }).join('\n\n');

    // Combine system prompt, history, and current question
    const fullPrompt = [
      systemPrompt,
      '',
      '## CONVERSATION HISTORY (Context for follow-ups):',
      conversationHistory || 'No previous history.',
      '',
      '## CURRENT QUESTION:',
      sanitizedUserMessage,
    ].join('\n');

    // Use gemini-1.5-flash model (stable and widely available)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    // Check for abort before starting
    if (signal?.aborted) return;

    // Stream the response
    const result = await model.generateContentStream(fullPrompt);
    let fullText = '';

    for await (const chunk of result.stream) {
      // Check for abort during streaming
      if (signal?.aborted) {
        break;
      }

      const chunkText = chunk.text();
      if (chunkText) {
        fullText += chunkText;
        onChunk(chunkText);
      }
    }

    // Only complete if not aborted
    if (!signal?.aborted) {
      // Post-process Tamil responses to ensure RC terminology
      let finalText = fullText;
      if (isTamil) {
        finalText = sanitizeCsiText(finalText);
        finalText = stripEnglishParentheses(finalText);
      }
      finalText = stripMarkdown(finalText);
      console.log(finalText, 'finalText');
      
      onComplete(finalText);
    }
  } catch (error) {
    if (signal?.aborted) return;
    
    // Provide more helpful error messages
    let errorMessage = 'Unknown streaming error';
    if (error instanceof Error) {
      if (error.message.includes('network connection was lost')) {
        errorMessage = 'Network connection lost. Please check your internet and try again.';
      } else if (error.message.includes('404')) {
        errorMessage = 'Model not available. Please try again later.';
      } else if (error.message.includes('429')) {
        errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
      } else {
        errorMessage = error.message;
      }
    }
    
    onError(new Error(errorMessage));
  }
}
