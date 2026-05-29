export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  sources?: string[];
  guidanceItems?: GuidanceItem[];
}

export interface GuidanceItem {
  id: string;
  icon: string;
  title: string;
  body: string;
  scriptureRef?: string;
}

export interface JourneyEntry {
  id: string;
  userId: string;
  title: string;
  body: string;
  entryType: 'devotion' | 'prayer' | 'insight' | 'verse' | 'petition';
  tags: string[];
  bibleRef?: string;
  completionPercent?: number;
  communityCount?: number;
  createdAt: Date;
}

export interface UserStats {
  dayStreak: number;
  versesRead: number;
  prayersSent: number;
  insights: number;
  bibleGoalCurrent: number;
  bibleGoalTarget: number;
}

export interface PrayerRequest {
  id: string;
  userId: string;
  userName: string;
  avatarUrl?: string;
  content: string;
  isPublic: boolean;
  prayCount: number;
  hasPrayed: boolean;
  createdAt: Date;
  replies?: PrayerReply[];
}

export interface PrayerReply {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
}

export interface NotificationSettings {
  morningGospel: boolean;
  morningGospelTime: string;
  eveningReflection: boolean;
  eveningReflectionTime: string;
  angelus: boolean;
  angelusTimes: string[];
  rosary: boolean;
  rosaryTime: string;
  communityIntercession: boolean;
  communityRequests: boolean;
  spiritualDiaryPrompt: boolean;
  spiritualDiaryTime: string;
}

export interface Profile {
  id: string;
  displayName: string;
  avatarUrl?: string;
  email?: string;
  phoneNumber?: string;
  bio?: string;
  language: 'english' | 'tamil';
  subscriptionTier: 'free' | 'premium';
  streak: number;
  theme?: string;
  createdAt: Date;
}

export interface BibleVerse {
  id: string;
  reference: string;
  text: string;
  bookId: string;
  chapter: number;
  verse: number;
}

export interface BiblePassage {
  reference: string;
  text: string;
  bookName: string;
  chapter: number;
}

export interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

export interface NewJournalEntry {
  title: string;
  body: string;
  entryType: 'devotion' | 'prayer' | 'insight' | 'verse' | 'petition';
  tags: string[];
  bibleRef?: string;
  completionPercent?: number;
}

export interface ChatStreamOptions {
  language: 'english' | 'tamil';
  userName: string;
  spiritualContext?: string;
  sacredSources: string[];
}
