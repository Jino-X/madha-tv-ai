import { useRef, useCallback } from 'react';
import { streamChatMessage } from '../api/geminiClient';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { ChatStreamOptions } from '../types';

export function useGeminiStream() {
  const abortControllerRef = useRef<AbortController | null>(null);
  const { messages, activeSources, selectedLanguage, appendStreamChunk, finalizeStreamMessage, setStreaming } =
    useChatStore();
  const { profile } = useAuthStore();

  const streamMessage = useCallback(
    async (userMessage: string) => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setStreaming(true);

      const options: ChatStreamOptions = {
        language: selectedLanguage,
        userName: profile?.displayName || 'Dear Friend',
        sacredSources: activeSources,
      };

      await streamChatMessage(
        messages,
        userMessage,
        options,
        (chunk) => appendStreamChunk(chunk),
        () => finalizeStreamMessage(),
        (error) => {
          console.error('Stream error:', error);
          setStreaming(false);
        },
        abortControllerRef.current.signal
      );
    },
    [messages, activeSources, selectedLanguage, profile, appendStreamChunk, finalizeStreamMessage, setStreaming]
  );

  const cancelStream = useCallback(() => {
    abortControllerRef.current?.abort();
    setStreaming(false);
  }, [setStreaming]);

  return {
    streamMessage,
    cancelStream,
    isStreaming: useChatStore.getState().isStreaming,
    streamedText: useChatStore.getState().streamingText,
  };
}
