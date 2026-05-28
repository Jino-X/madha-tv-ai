import { create } from 'zustand';
import { PrayerRequest } from '../types';
import { getPrayerWall, joinPrayer, submitPrayerRequest } from '../api/supabase';
import { useAuthStore } from './useAuthStore';

interface CommunityStore {
  prayers: PrayerRequest[];
  isLoading: boolean;
  activePrayingCount: number;
  fetchPrayers: () => Promise<void>;
  pray: (prayerId: string) => Promise<void>;
  submitPrayer: (content: string, isPublic: boolean) => Promise<void>;
  setActivePrayingCount: (count: number) => void;
}

export const useCommunityStore = create<CommunityStore>((set, get) => ({
  prayers: [],
  isLoading: false,
  activePrayingCount: 0,

  fetchPrayers: async () => {
    set({ isLoading: true });
    try {
      const prayers = await getPrayerWall();
      set({ prayers });
    } catch (error) {
      console.error('Failed to fetch prayers:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  pray: async (prayerId: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      await joinPrayer(prayerId, user.id);
      set((state) => ({
        prayers: state.prayers.map((p) =>
          p.id === prayerId
            ? { ...p, prayCount: p.prayCount + 1, hasPrayed: true }
            : p
        ),
      }));
    } catch (error) {
      console.error('Failed to join prayer:', error);
    }
  },

  submitPrayer: async (content: string, isPublic: boolean) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      await submitPrayerRequest(user.id, content, isPublic);
      await get().fetchPrayers();
    } catch (error) {
      console.error('Failed to submit prayer:', error);
      throw error;
    }
  },

  setActivePrayingCount: (count: number) => {
    set({ activePrayingCount: count });
  },
}));
