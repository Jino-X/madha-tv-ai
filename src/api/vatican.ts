import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsItem } from '../types';

const RSS_URL = 'https://www.vaticannews.va/en.rss.xml';
const CACHE_KEY = 'vatican_news_cache';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

function parseRssXml(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const title = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
      itemXml.match(/<title>(.*?)<\/title>/)?.[1] || '';
    const link = itemXml.match(/<link>(.*?)<\/link>/)?.[1] || '';
    const description = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ||
      itemXml.match(/<description>(.*?)<\/description>/)?.[1] || '';
    const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';

    items.push({ title, link, description, pubDate });
  }

  return items;
}

export async function getVaticanNews(limit = 5): Promise<NewsItem[]> {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        return data.slice(0, limit);
      }
    }

    const response = await fetch(RSS_URL);
    if (!response.ok) throw new Error('Failed to fetch Vatican News');

    const xml = await response.text();
    const items = parseRssXml(xml);

    await AsyncStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: items, timestamp: Date.now() })
    );

    return items.slice(0, limit);
  } catch {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data } = JSON.parse(cached);
      return data.slice(0, limit);
    }
    return [];
  }
}
