import { create } from 'zustand';
import { JourneyEntry, UserStats, NewJournalEntry } from '../types';
import { getJournalEntries, addJournalEntry, getUserStats } from '../api/supabase';
import { useAuthStore } from './useAuthStore';

interface JourneyStore {
  entries: JourneyEntry[];
  stats: UserStats;
  bibleGoal: { current: number; target: number };
  isLoading: boolean;
  fetchEntries: () => Promise<void>;
  addEntry: (entry: NewJournalEntry) => Promise<void>;
  refreshStats: () => Promise<void>;
}

const defaultStats: UserStats = {
  dayStreak: 0,
  versesRead: 0,
  prayersSent: 0,
  insights: 0,
  bibleGoalCurrent: 0,
  bibleGoalTarget: 30,
};

export const useJourneyStore = create<JourneyStore>((set) => ({
  entries: [],
  stats: defaultStats,
  bibleGoal: { current: 0, target: 30 },
  isLoading: false,

  fetchEntries: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ isLoading: true });
    try {
      const entries = await getJournalEntries(user.id);
      set({ entries });
    } catch (error) {
      console.error('Failed to fetch entries:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  addEntry: async (entry: NewJournalEntry) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      await addJournalEntry(user.id, entry);
      const entries = await getJournalEntries(user.id);
      set({ entries });
    } catch (error) {
      console.error('Failed to add entry:', error);
      throw error;
    }
  },

  refreshStats: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      const stats = await getUserStats(user.id);
      set({
        stats,
        bibleGoal: { current: stats.bibleGoalCurrent, target: stats.bibleGoalTarget },
      });
    } catch (error) {
      console.error('Failed to refresh stats:', error);
    }
  },
}));
