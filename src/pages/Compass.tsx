import { QueryForm } from '../components/shared/QueryForm';
import { ResultPanel } from '../components/shared/ResultPanel';
import { useCompassQuery } from '../hooks/useCompassQuery';

export default function CompassPage() {
  const { isLoading, result, error, submitQuery, reset } = useCompassQuery();

  return (
    <section>
      <QueryForm onSubmit={submitQuery} isLoading={isLoading} />
      {isLoading && <p className="status-text">Consulting the compass...</p>}
      {error && <p className="status-text error">{error}</p>}
      {result && <ResultPanel result={result} onReset={reset} />}
    </section>
  );
}
