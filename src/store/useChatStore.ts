import { create } from 'zustand';
import { Message } from '../types';

interface ChatStore {
  messages: Message[];
  isStreaming: boolean;
  streamingText: string;
  addUserMessage: (text: string) => void;
  appendStreamChunk: (chunk: string) => void;
  finalizeStreamMessage: () => void;
  setStreaming: (streaming: boolean) => void;
}

export const useChatStore = create<ChatStore>()((set, get) => ({
  messages: [],
  isStreaming: false,
  streamingText: '',

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
    const { streamingText } = get();
    if (!streamingText) return;

    const message: Message = {
      id: `ai_${Date.now()}`,
      role: 'assistant',
      content: streamingText,
      timestamp: new Date(),
    };
    set((state) => ({
      messages: [...state.messages, message],
      streamingText: '',
      isStreaming: false,
    }));
  },

  setStreaming: (streaming: boolean) => {
    set({ isStreaming: streaming });
    if (!streaming) {
      set({ streamingText: '' });
    }
  },
}));
