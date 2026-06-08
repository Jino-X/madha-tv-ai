import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from '../types';
import { supabase } from '../api/supabase';

interface User {
  id: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isGuest: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  setGuest: () => void;
  refreshProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isLoading: false,
      isGuest: false,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          if (data.user) {
            set({ user: { id: data.user.id, email: data.user.email! }, isGuest: false });
            await get().refreshProfile();
          }
        } finally {
          set({ isLoading: false });
        }
      },

      signUp: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signUp({ email, password });
          if (error) throw error;
          if (data.user) {
            set({ user: { id: data.user.id, email: data.user.email! }, isGuest: false });
            const newProfile: Profile = {
              id: data.user.id,
              displayName: name,
              language: 'english',
              subscriptionTier: 'free',
              streak: 0,
              createdAt: new Date(),
            };
            await supabase.from('profiles').upsert({
              id: data.user.id,
              display_name: name,
              language: 'english',
              subscription_tier: 'free',
              streak: 0,
            });
            set({ profile: newProfile });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, profile: null, isGuest: false });
      },

      setGuest: () => {
        set({
          isGuest: true,
          user: null,
          profile: {
            id: 'guest',
            displayName: 'Dear Friend',
            language: 'english',
            subscriptionTier: 'free',
            streak: 0,
            createdAt: new Date(),
          },
        });
      },

      refreshProfile: async () => {
        const { user } = get();
        if (!user) return;
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (data) {
          set({
            profile: {
              id: data.id,
              displayName: data.display_name,
              avatarUrl: data.avatar_url,
              language: data.language || 'english',
              subscriptionTier: data.subscription_tier || 'free',
              streak: data.streak || 0,
              theme: data.theme,
              createdAt: new Date(data.created_at),
            },
          });
        }
      },

    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        isGuest: state.isGuest,
      }),
    }
  )
);
