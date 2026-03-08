export interface BusinessEvent {
  id: string;
  title: string;
  city: string;
  category: 'Business' | 'Technology' | 'Education' | 'Community';
  startsAt: string;
  summary: string;
}

export interface DiscoveryFilters {
  searchText: string;
  city?: string;
}

export interface UserSession {
  username: string;
  token: string;
}
