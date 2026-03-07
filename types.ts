export interface CompassStep {
  title: string;
  explanation: string;
  action: string;
}

export interface CompassResponse {
  summary: string;
  steps: CompassStep[];
  safetyNote: string;
}

export type Language = 'en' | 'ar' | 'ku';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'guest' | 'citizen' | 'organizer';
}

export type FeedType = 'post' | 'reel' | 'event' | 'debate';

export interface FeedItem {
  id: string;
  type: FeedType;
  author: User;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  image?: string;
}

export interface Reel {
  id: string;
  title: string;
  caption: string;
}

export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
}
