import type { BusinessEvent } from './types/models';

export const APP_COPY = {
  promptSuggestions: [
    'Find startup networking events in Baghdad',
    'Discover programs for women-led businesses',
    'Find technology meetups in Erbil',
    'Locate business incubators with mentorship',
    'Search investor and pitch events this month',
  ],
};

export const FALLBACK_EVENTS: BusinessEvent[] = [
  {
    id: 'evt-1',
    title: 'Baghdad Startup Networking Night',
    city: 'Baghdad',
    category: 'Business',
    startsAt: '2026-04-10T18:00:00.000Z',
    summary: 'A monthly founder meetup with investors and local business mentors.',
  },
  {
    id: 'evt-2',
    title: 'Erbil Product Builders Circle',
    city: 'Erbil',
    category: 'Technology',
    startsAt: '2026-04-13T15:00:00.000Z',
    summary: 'Hands-on sessions for product strategy, UX, and launch planning.',
  },
  {
    id: 'evt-3',
    title: 'Basra SME Growth Workshop',
    city: 'Basra',
    category: 'Education',
    startsAt: '2026-04-16T10:30:00.000Z',
    summary: 'Practical guidance for operations, budgeting, and hiring in SMEs.',
  },
];
