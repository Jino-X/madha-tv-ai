export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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
