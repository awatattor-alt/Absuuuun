import { FeedItem, User } from './types';

export const APP_CONTENT = {
  title: "Let's Do Tonight",
  subtitle: 'Your social pulse for tonight: posts, reels, events, and debates.',
  placeholder: 'Share a thought, event, or question...',
  buttonLabel: 'Post',
  loadingLabel: 'Loading your feed…',
};

export const EXAMPLE_QUERIES = [
  'What is happening near me tonight?',
  'Any community meetups this weekend?',
  'Show me trending debates.',
];

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Sara Ahmad',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    role: 'citizen',
  },
  {
    id: 'u2',
    name: 'Aso Karim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    role: 'organizer',
  },
];

export const MOCK_POSTS: FeedItem[] = [
  { id: 'p1', type: 'post', author: MOCK_USERS[0], content: 'Who is up for a coffee meetup near the old city tonight?', createdAt: '2h ago', likes: 14, comments: 5, shares: 2, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800' },
  { id: 'r1', type: 'reel', author: MOCK_USERS[1], content: "Quick reel from last night's music gathering 🎶", createdAt: '3h ago', likes: 21, comments: 3, shares: 7 },
  { id: 'e1', type: 'event', author: MOCK_USERS[1], content: 'Community clean-up event starts at 7PM, bring gloves!', createdAt: '5h ago', likes: 8, comments: 1, shares: 4 },
  { id: 'd1', type: 'debate', author: MOCK_USERS[0], content: 'Debate: Should public spaces stay open later on weekends?', createdAt: '7h ago', likes: 32, comments: 22, shares: 9 },
];

export const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200',
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
];

export const STORY_USERS = MOCK_USERS;

export const FEED_STORE = { posts: [...MOCK_POSTS] };
export const FEED_UPDATED_EVENT = 'feed-updated';

export const addMockPost = (post: FeedItem) => {
  FEED_STORE.posts = [post, ...FEED_STORE.posts];
  window.dispatchEvent(new Event(FEED_UPDATED_EVENT));
};
