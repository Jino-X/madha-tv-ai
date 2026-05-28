import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, differenceInDays } from 'date-fns';

const STREAK_KEY = 'user_streak';
const LAST_ACTIVE_KEY = 'last_active_date';

export function useStreak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    updateStreak();
  }, []);

  async function updateStreak() {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const lastActive = await AsyncStorage.getItem(LAST_ACTIVE_KEY);
      const currentStreak = parseInt((await AsyncStorage.getItem(STREAK_KEY)) || '0', 10);

      if (lastActive === today) {
        setStreak(currentStreak);
        return;
      }

      let newStreak: number;
      if (!lastActive) {
        newStreak = 1;
      } else {
        const daysDiff = differenceInDays(new Date(today), new Date(lastActive));
        if (daysDiff === 1) {
          newStreak = currentStreak + 1;
        } else if (daysDiff === 0) {
          newStreak = currentStreak;
        } else {
          newStreak = 1;
        }
      }

      await AsyncStorage.setItem(STREAK_KEY, newStreak.toString());
      await AsyncStorage.setItem(LAST_ACTIVE_KEY, today);
      setStreak(newStreak);
    } catch (error) {
      console.error('Failed to update streak:', error);
    }
  }

  return { streak };
}
