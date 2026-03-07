import { FormEvent, useMemo, useState } from 'react';
import { APP_COPY, APP_NAME, UI_TEXT } from './constants';
import type { CompassResponse } from './types';
import { getCompassGuidance } from './services/geminiService';
import { CompassHeader } from './components/CompassHeader';
import { QueryForm } from './components/QueryForm';
import { EmptyState } from './components/EmptyState';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { CompassResults } from './components/CompassResults';

const App = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<CompassResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSubmit = useMemo(() => query.trim().length > 0 && !isLoading, [query, isLoading]);

  const requestGuidance = async (nextQuery: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await getCompassGuidance(nextQuery);
      setResult(response);
    } catch (error) {
      const fallbackMessage = UI_TEXT.errorFallback;
      setErrorMessage(error instanceof Error ? error.message : fallbackMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery || isLoading) {
      return;
    }

    await requestGuidance(trimmedQuery);
  };

  return (
    <main className="app">
      <div className="shell">
        <CompassHeader title={APP_NAME} description={APP_COPY.subtitle} />

        <section className="surface">
          <QueryForm
            query={query}
            onQueryChange={setQuery}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            canSubmit={canSubmit}
          />

          {isLoading && <LoadingState />}

          {!isLoading && errorMessage && (
            <ErrorState message={errorMessage} onRetry={() => void requestGuidance(query.trim())} />
          )}

          {!isLoading && !errorMessage && !result && <EmptyState suggestions={APP_COPY.promptSuggestions} />}

          {!isLoading && !errorMessage && result && <CompassResults response={result} />}
        </section>
      </div>
    </main>
  );
};

export default App;
