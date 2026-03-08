import { useState } from 'react';
import { getCompassGuidance } from '../services/compassService';
import type { CompassResponse } from '../types';

export function useCompassQuery() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CompassResponse | null>(null);

  const runQuery = async (query: string) => {
    setIsLoading(true);
    setResults(null);

    const response = await getCompassGuidance(query);
    setResults(response);
    setIsLoading(false);
  };

  const reset = () => setResults(null);

  return {
    isLoading,
    results,
    runQuery,
    reset
  };
}
