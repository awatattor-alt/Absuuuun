import { useState } from 'react';
import { requestCompassGuidance } from '../services/compassApi';
import { CompassResponse } from '../types/compass';

export const useCompassQuery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null as CompassResponse | null);
  const [error, setError] = useState(null as string | null);

  const runQuery = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await requestCompassGuidance({ query });
      setResult(data);
    } catch (queryError) {
      setError(queryError instanceof Error ? queryError.message : 'Unexpected request error.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { isLoading, result, error, runQuery, reset };
};
