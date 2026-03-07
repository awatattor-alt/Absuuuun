import { useEffect, useState } from 'react';

// Generic data loader hook to standardize loading + error UX across pages.
export const useAsyncData = <T,>(loader: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');

    loader()
      .then((response) => {
        if (mounted) setData(response);
      })
      .catch((requestError: Error) => {
        if (mounted) setError(requestError.message || 'Unexpected error');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [loader]);

  return { data, loading, error };
};
