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

  const submitQuery = async (nextQuery = query) => {
    const trimmedQuery = nextQuery.trim();
    if (!trimmedQuery) {
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const guidance = await getCompassGuidance(trimmedQuery);
      setResult(guidance);
      setQuery(trimmedQuery);
    } catch (submitError) {
      setResult(null);
      const message = submitError instanceof Error ? submitError.message : 'Unknown error.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
    void submitQuery(suggestion);
  };

  const resetState = () => {
    setResult(null);
    setError('');
  };

  return (
    <div className="app">
      <main className="app-container">
        <CompassHeader />
        <QueryForm query={query} onQueryChange={setQuery} onSubmit={() => void submitQuery()} isLoading={isLoading} />

        {isLoading && <LoadingState />}
        {!isLoading && error && <ErrorState message={error} />}
        {!isLoading && !error && !result && <EmptyState onSelect={handleSuggestionSelect} />}
        {!isLoading && !error && result && <CompassResults result={result} onReset={resetState} />}
      </main>
    </div>
  );
}
