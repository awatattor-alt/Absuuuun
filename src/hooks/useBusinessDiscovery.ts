import { useCallback, useState } from 'react';
import type { BusinessEvent } from '../types/models';
import { getBusinessEvents } from '../services/businessService';

export function useBusinessDiscovery() {
  const [events, setEvents] = useState<BusinessEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setEvents([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getBusinessEvents({ searchText: query });
      setEvents(data);
    } catch {
      setError('Unable to load discovery results right now.');
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    events,
    isLoading,
    error,
    search,
  };
}
