import { useState } from 'react';
import { fetchCompassGuidance } from '../services/compassApi';

export function useCompassQuery() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitQuery = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetchCompassGuidance(query);
      setResult(response.summary);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error.';
      setError(`Could not fetch guidance. ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    result,
    error,
    submitQuery,
    reset: () => {
      setResult(null);
      setError(null);
    },
  };
}
