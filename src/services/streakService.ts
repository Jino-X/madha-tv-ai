import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, differenceInDays } from 'date-fns';

const STREAK_KEY = 'user_streak';
const LAST_ACTIVE_KEY = 'last_active_date';

export async function getCurrentStreak(): Promise<number> {
  const streak = await AsyncStorage.getItem(STREAK_KEY);
  return parseInt(streak || '0', 10);
}

export async function updateStreak(): Promise<number> {
  const today = format(new Date(), 'yyyy-MM-dd');
  const lastActive = await AsyncStorage.getItem(LAST_ACTIVE_KEY);
  const currentStreak = await getCurrentStreak();

  if (lastActive === today) {
    return currentStreak;
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
  return newStreak;
}

export async function resetStreak(): Promise<void> {
  await AsyncStorage.setItem(STREAK_KEY, '0');
  await AsyncStorage.removeItem(LAST_ACTIVE_KEY);
}
