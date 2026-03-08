import { FALLBACK_EVENTS } from '../constants';
import type { BusinessEvent, DiscoveryFilters } from '../types/models';
import { apiGet } from './apiClient';

interface ApiEventListResponse {
  events: BusinessEvent[];
}

const matchEvent = (event: BusinessEvent, filters: DiscoveryFilters) => {
  const normalized = filters.searchText.toLowerCase();
  const textMatch =
    event.title.toLowerCase().includes(normalized) ||
    event.summary.toLowerCase().includes(normalized) ||
    event.category.toLowerCase().includes(normalized);

  if (!filters.city) {
    return textMatch;
  }

  return textMatch && event.city.toLowerCase() === filters.city.toLowerCase();
};

export async function getBusinessEvents(filters: DiscoveryFilters): Promise<BusinessEvent[]> {
  try {
    const query = encodeURIComponent(filters.searchText);
    const cityQuery = filters.city ? `&city=${encodeURIComponent(filters.city)}` : '';
    const data = await apiGet<ApiEventListResponse>(`/events?search=${query}${cityQuery}`);

    return data.events;
  } catch {
    return FALLBACK_EVENTS.filter((event) => matchEvent(event, filters));
  }
}
