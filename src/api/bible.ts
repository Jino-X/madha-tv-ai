import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BibleVerse, BiblePassage } from '../types';
import { DEFAULT_VERSES } from '../constants/defaultVerses';

const API_KEY = Constants.expoConfig?.extra?.BIBLE_API_KEY || '';
const BASE_URL = 'https://api.scripture.api.bible/v1';
const BIBLE_ID = 'de4e12af7f28f599-01'; // KJV

const bibleApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'api-key': API_KEY },
});

export async function getDailyVerse(): Promise<{ text: string; reference: string }> {
  const today = new Date().toISOString().split('T')[0];
  const cacheKey = `daily_verse_${today}`;

  try {
    const cached = await AsyncStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);

    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    const verseIndex = dayOfYear % DEFAULT_VERSES.length;
    const verse = DEFAULT_VERSES[verseIndex];

    await AsyncStorage.setItem(cacheKey, JSON.stringify(verse));
    return verse;
  } catch {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    return DEFAULT_VERSES[dayOfYear % DEFAULT_VERSES.length];
  }
}

export async function getPassage(
  bookId: string,
  chapter: number,
  verses?: string
): Promise<BiblePassage> {
  try {
    const passageId = verses
      ? `${bookId}.${chapter}.${verses.split('-')[0]}-${bookId}.${chapter}.${verses.split('-')[1] || verses.split('-')[0]}`
      : `${bookId}.${chapter}`;

    const { data } = await bibleApi.get(
      `/bibles/${BIBLE_ID}/passages/${passageId}`,
      { params: { 'content-type': 'text', 'include-notes': false } }
    );

    return {
      reference: data.data.reference,
      text: data.data.content.replace(/<[^>]*>/g, '').trim(),
      bookName: data.data.reference.split(' ')[0],
      chapter,
    };
  } catch {
    return {
      reference: `${bookId} ${chapter}${verses ? ':' + verses : ''}`,
      text: 'Unable to load passage. Please check your connection.',
      bookName: bookId,
      chapter,
    };
  }
}

export async function searchVerses(query: string): Promise<BibleVerse[]> {
  try {
    const { data } = await bibleApi.get(`/bibles/${BIBLE_ID}/search`, {
      params: { query, limit: 10 },
    });

    return (data.data.verses || []).map((v: any) => ({
      id: v.id,
      reference: v.reference,
      text: v.text?.replace(/<[^>]*>/g, '').trim() || '',
      bookId: v.bookId,
      chapter: parseInt(v.chapterId?.split('.')[1] || '0'),
      verse: parseInt(v.id?.split('.')[2] || '0'),
    }));
  } catch {
    return [];
  }
}
