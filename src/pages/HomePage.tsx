import { motion } from 'framer-motion';
import { QueryForm } from '../components/QueryForm';
import { ResultsPanel } from '../components/ResultsPanel';
import { APP_COPY } from '../constants';
import { useCompassQuery } from '../hooks/useCompassQuery';

export const HomePage = () => {
  const { isLoading, result, error, runQuery, reset } = useCompassQuery();

  return (
    <div className="app">
      <div className="shell">
        <header className="compass-header">
          <h1 className="compass-title">{APP_COPY.title}</h1>
          <p className="compass-subtitle">{APP_COPY.subtitle}</p>
        </header>

        <QueryForm onSubmit={runQuery} isLoading={isLoading} />

        {isLoading && (
          <motion.div className="loading-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p>Consulting the compass...</p>
          </motion.div>
        )}

        {error && (
          <div className="error-state surface">
            <p>{error}</p>
          </div>
        )}

        {result && <ResultsPanel result={result} onReset={reset} />}
      </div>
    </div>
  );
};
