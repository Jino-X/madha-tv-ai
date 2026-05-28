import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile, JourneyEntry, PrayerRequest, UserStats, NewJournalEntry } from '../types';

const SUPABASE_URL = Constants.expoConfig?.extra?.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = Constants.expoConfig?.extra?.SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export async function upsertProfile(profile: Partial<Profile> & { id: string }): Promise<void> {
  const { error } = await supabase.from('profiles').upsert({
    id: profile.id,
    display_name: profile.displayName,
    avatar_url: profile.avatarUrl,
    language: profile.language,
    subscription_tier: profile.subscriptionTier,
    streak: profile.streak,
    theme: profile.theme,
  });
  if (error) throw error;
}

export async function getJournalEntries(userId: string, limit = 20): Promise<JourneyEntry[]> {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data || []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    body: row.body,
    entryType: row.entry_type,
    tags: row.tags || [],
    bibleRef: row.bible_ref,
    completionPercent: row.completion_percent,
    createdAt: new Date(row.created_at),
  }));
}

export async function addJournalEntry(userId: string, entry: NewJournalEntry): Promise<void> {
  const { error } = await supabase.from('journal_entries').insert({
    user_id: userId,
    title: entry.title,
    body: entry.body,
    entry_type: entry.entryType,
    tags: entry.tags,
    bible_ref: entry.bibleRef,
    completion_percent: entry.completionPercent,
  });
  if (error) throw error;
}

export async function getPrayerWall(limit = 20): Promise<PrayerRequest[]> {
  const { data, error } = await supabase
    .from('prayer_requests')
    .select(`
      *,
      profiles:user_id (display_name, avatar_url)
    `)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data || []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    userName: (row.profiles as any)?.display_name || 'Anonymous',
    avatarUrl: (row.profiles as any)?.avatar_url,
    content: row.content,
    isPublic: row.is_public,
    prayCount: row.pray_count || 0,
    hasPrayed: false,
    createdAt: new Date(row.created_at),
  }));
}

export async function joinPrayer(prayerId: string, userId: string): Promise<void> {
  const { error: joinError } = await supabase.from('prayer_joins').insert({
    prayer_id: prayerId,
    user_id: userId,
  });
  if (joinError && !joinError.message.includes('duplicate')) throw joinError;

  await supabase.rpc('increment_pray_count', { prayer_id: prayerId });
}

export async function submitPrayerRequest(
  userId: string,
  content: string,
  isPublic: boolean
): Promise<void> {
  const { error } = await supabase.from('prayer_requests').insert({
    user_id: userId,
    content,
    is_public: isPublic,
  });
  if (error) throw error;
}

export async function getUserStats(userId: string): Promise<UserStats> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('streak')
    .eq('id', userId)
    .single();

  const { count: versesCount } = await supabase
    .from('journal_entries')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('entry_type', 'verse');

  const { count: prayersCount } = await supabase
    .from('prayer_requests')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  const { count: insightsCount } = await supabase
    .from('journal_entries')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('entry_type', 'insight');

  return {
    dayStreak: profile?.streak || 0,
    versesRead: versesCount || 0,
    prayersSent: prayersCount || 0,
    insights: insightsCount || 0,
    bibleGoalCurrent: 0,
    bibleGoalTarget: 30,
  };
}
