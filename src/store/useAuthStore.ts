import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from '../types';

interface AuthStore {
  profile: Profile | null;
}

const defaultProfile: Profile = {
  id: 'guest',
  displayName: 'Dear Friend',
  language: 'english',
  subscriptionTier: 'free',
  streak: 0,
  createdAt: new Date(),
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (): AuthStore => ({
      profile: defaultProfile,
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
