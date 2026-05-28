import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message } from '../types';

interface ChatStore {
  messages: Message[];
  isStreaming: boolean;
  streamingText: string;
  activeSources: string[];
  addUserMessage: (text: string) => void;
  appendStreamChunk: (chunk: string) => void;
  finalizeStreamMessage: () => void;
  toggleSource: (source: string) => void;
  clearHistory: () => void;
  setStreaming: (streaming: boolean) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      isStreaming: false,
      streamingText: '',
      activeSources: [],

      addUserMessage: (text: string) => {
        const message: Message = {
          id: `user_${Date.now()}`,
          role: 'user',
          content: text,
          timestamp: new Date(),
        };
        set((state) => ({
          messages: [...state.messages, message],
        }));
      },

      appendStreamChunk: (chunk: string) => {
        set((state) => ({
          streamingText: state.streamingText + chunk,
          isStreaming: true,
        }));
      },

      finalizeStreamMessage: () => {
        const { streamingText, activeSources } = get();
        if (!streamingText) return;

        const message: Message = {
          id: `ai_${Date.now()}`,
          role: 'assistant',
          content: streamingText,
          timestamp: new Date(),
          sources: activeSources.length > 0 ? [...activeSources] : undefined,
        };
        set((state) => ({
          messages: [...state.messages, message],
          streamingText: '',
          isStreaming: false,
        }));
      },

      toggleSource: (source: string) => {
        set((state) => {
          const sources = state.activeSources.includes(source)
            ? state.activeSources.filter((s) => s !== source)
            : [...state.activeSources, source];
          return { activeSources: sources };
        });
      },

      clearHistory: () => {
        set({ messages: [], streamingText: '', isStreaming: false });
      },

      setStreaming: (streaming: boolean) => {
        set({ isStreaming: streaming });
        if (!streaming) {
          set({ streamingText: '' });
        }
      },
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        messages: state.messages.slice(-20),
        activeSources: state.activeSources,
      }),
    }
  )
);
