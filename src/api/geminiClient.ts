import Constants from 'expo-constants';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message, ChatStreamOptions } from '../types';

const API_KEY = Constants.expoConfig?.extra?.GEMINI_API_KEY || '';
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

function buildSystemPrompt(options: ChatStreamOptions): string {
  return `You are Madha AI Companion — a deeply compassionate, theologically grounded Catholic spiritual guide. You are knowledgeable in Catholic Catechism, Sacred Scripture, the writings of the Saints, Papal documents, and the daily liturgy.

PERSONALITY: Warm, pastoral, empathetic — like a trusted spiritual director. Never clinical. Always prayerful.

RESPONSE STRUCTURE for spiritual guidance:
1. Open with empathy acknowledging the person's spiritual state (1-2 sentences)
2. Offer 2-3 structured guidance points, each with:
   - A meaningful title (e.g., "Acknowledge the Presence", "Anchor in Scripture")
   - A relevant scripture reference (book chapter:verse)
   - 2-3 sentences of pastoral application
3. Close with a blessing or prayerful encouragement
4. End with one gentle follow-up question to deepen the conversation

FOR DAILY GOSPEL REFLECTION:
- Exegete the passage briefly (historical context)
- Draw 3 spiritual applications for modern life
- Suggest one practical devotional exercise

LANGUAGE: Respond in ${options.language}. If Tamil, use respectful formal தமிழ்.
ADDRESS USER AS: ${options.userName || 'Dear Friend in Christ'}

SACRED SOURCES CONTEXT: ${options.sacredSources.join(', ')}`;
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

    // Build conversation history
    const conversationHistory = messages.slice(-10).map(m =>
      `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
    ).join('\n\n');

    // Combine system prompt, history, and current question
    const fullPrompt = [
      systemPrompt,
      '',
      '## CONVERSATION HISTORY (Context for follow-ups):',
      conversationHistory || 'No previous history.',
      '',
      '## CURRENT QUESTION:',
      userMessage,
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
      onComplete(fullText);
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
