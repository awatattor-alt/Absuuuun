export type FeedPost = {
  id: string;
  author: string;
  handle: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
};

export type MessageThread = {
  id: string;
  name: string;
  preview: string;
  updatedAt: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  read: boolean;
  time: string;
};

export type HomeEvent = {
  id: string;
  title: string;
  city: string;
  date: string;
  description: string;
};

export const FEED_POSTS: FeedPost[] = [
  {
    id: '1',
    author: 'Zainab Kareem',
    handle: '@zainabk',
    content: 'Golden hour at Abu Nuwas street is unmatched 🌅',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&auto=format&fit=crop',
    likes: 32,
    comments: 4,
    timestamp: '2h ago',
  },
  {
    id: '2',
    author: 'Omar Ali',
    handle: '@omartravels',
    content: 'Basra date festival has the best street food this week!',
    likes: 21,
    comments: 6,
    timestamp: '5h ago',
  },
];

export const MESSAGE_THREADS: MessageThread[] = [
  { id: 't1', name: 'Baghdad Hikers', preview: 'Who is joining Friday trail?', updatedAt: '11:10 AM' },
  { id: 't2', name: 'Samar', preview: 'Check this cafe near Mutanabbi street ☕', updatedAt: 'Yesterday' },
  { id: 't3', name: 'Weekend Trip Group', preview: 'Bus leaves at 7:30 sharp.', updatedAt: 'Mon' },
];

export const NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', title: 'New follower', body: 'Aya started following you.', read: false, time: '3m ago' },
  { id: 'n2', title: 'Event reminder', body: 'Baghdad Book Fair starts tomorrow.', read: false, time: '1h ago' },
  { id: 'n3', title: 'Message received', body: 'Samar sent you a new message.', read: true, time: '5h ago' },
];

export const HOME_EVENTS: HomeEvent[] = [
  { id: 'e1', title: 'Baghdad Book Fair', city: 'Baghdad', date: 'Apr 21', description: 'Publishers, talks, and poetry nights.' },
  { id: 'e2', title: 'Erbil Music Evening', city: 'Erbil', date: 'May 04', description: 'Live Kurdish and Arabic performances.' },
  { id: 'e3', title: 'Basra River Market', city: 'Basra', date: 'May 10', description: 'Local crafts, food, and art by the river.' },
];
