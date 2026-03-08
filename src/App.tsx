import { QueryForm } from './components/QueryForm';
import { ResultPanel } from './components/ResultPanel';
import { useCompassQuery } from './hooks/useCompassQuery';

function App() {
  const { isLoading, result, error, submitQuery, reset } = useCompassQuery();

  return (
    <div className="app">
      <div className="shell">
        <header className="compass-header">
          <h1 className="compass-title">Iraq Compass</h1>
          <p className="compass-subtitle">Your guide to navigating life and business in Iraq.</p>
        </header>

        <QueryForm onSubmit={submitQuery} isLoading={isLoading} />

        {isLoading && (
          <div className="loading-state">
            <p>Consulting the compass...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>{error}</p>
          </div>
        )}

        {result && <ResultPanel result={result} onReset={reset} />}
      </div>
    </div>
  );
}

export default App;
