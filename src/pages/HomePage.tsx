import { motion } from 'framer-motion';
import { QueryForm } from '../components/QueryForm';
import { BusinessDiscovery } from '../features/BusinessDiscovery';
import { useCompassQuery } from '../hooks/useCompassQuery';

export function HomePage() {
  const { isLoading, results, runQuery, reset } = useCompassQuery();

  return (
    <div className="app">
      <div className="shell">
        <header className="compass-header">
          <h1 className="compass-title">Iraq Compass</h1>
          <p className="compass-subtitle">Your guide to navigating life and business in Iraq.</p>
        </header>

        <QueryForm onSubmit={runQuery} isLoading={isLoading} />

        {isLoading && (
          <div className="loading-state">
            <p>Consulting the compass...</p>
          </div>
        )}

        {results && (
          <motion.div
            className="compass-results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="surface">
              <h2 className="result-title">Your Path Forward</h2>
              <div className="step-card">
                <h3 className="step-title">Step 1: Understand the Landscape</h3>
                <p className="step-body">{results.overview}</p>
              </div>
              {results.nextSteps.map((step, index) => (
                <div className="step-card" key={step}>
                  <h3 className="step-title">Step {index + 2}</h3>
                  <p className="step-body">{step}</p>
                </div>
              ))}
              <div className="tips-section">
                <p className="step-body">
                  <strong>Tip:</strong> {results.complianceTip}
                </p>
              </div>
              <button className="reset-btn" onClick={reset}>
                Start New Query
              </button>
            </div>
          </motion.div>
        )}

        <BusinessDiscovery />
      </div>
    </div>
  );
}
