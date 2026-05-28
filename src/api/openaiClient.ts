import Constants from 'expo-constants';
import { Message, ChatStreamOptions } from '../types';

const API_KEY = Constants.expoConfig?.extra?.OPENAI_API_KEY || '';
const API_URL = 'https://api.openai.com/v1/chat/completions';

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
  const formattedMessages = [
    { role: 'system', content: buildSystemPrompt(options) },
    ...messages.slice(-20).map((m) => ({
      role: m.role,
      content: m.content,
    })),
    { role: 'user', content: userMessage },
  ];

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: formattedMessages,
        max_tokens: 1024,
        temperature: 0.7,
        stream: true,
      }),
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter((line) => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              onChunk(content);
            }
          } catch {
            // Skip malformed JSON lines
          }
        }
      }
    }

    onComplete(fullText);
  } catch (error) {
    if (signal?.aborted) return;
    onError(error instanceof Error ? error : new Error('Unknown streaming error'));
  }
}
