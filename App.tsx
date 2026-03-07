import { useState } from 'react';
import CompassHeader from './components/CompassHeader';
import QueryForm from './components/QueryForm';
import CompassResults from './components/CompassResults';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import { CompassResponse } from './types';
import { getCompassGuidance } from './services/geminiService';

export default function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<CompassResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const submitQuery = async () => {
    setIsLoading(true);
    setError('');

    try {
      const guidance = await getCompassGuidance(query);
      setResult(guidance);
    } catch (submitError) {
      setResult(null);
      const message = submitError instanceof Error ? submitError.message : 'Unknown error.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <main className="app-container">
        <CompassHeader />
        <QueryForm query={query} onQueryChange={setQuery} onSubmit={submitQuery} isLoading={isLoading} />

        {isLoading && <LoadingState />}
        {!isLoading && error && <ErrorState message={error} />}
        {!isLoading && !error && !result && <EmptyState />}
        {!isLoading && !error && result && <CompassResults result={result} />}
      </main>
    </div>
  );
}
