import React, { useState } from 'react';
import { QueryForm } from './components/QueryForm';
import { APP_COPY } from './constants';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const handleQuery = async (query: string) => {
    setIsLoading(true);
    setResults(null);
    
    // Simulate API call
    setTimeout(() => {
      setResults("This is a simulated response for: " + query);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="app">
      <div className="shell">
        <header className="compass-header">
          <h1 className="compass-title">Iraq Compass</h1>
          <p className="compass-subtitle">Your guide to navigating life and business in Iraq.</p>
        </header>
        
        <QueryForm onSubmit={handleQuery} isLoading={isLoading} />
        
        {isLoading && (
          <div className="loading-state">
            <p>Consulting the compass...</p>
          </div>
        )}
        
        {results && (
          <div className="compass-results">
            <div className="surface">
              <h2 className="result-title">Your Path Forward</h2>
              <div className="step-card">
                <h3 className="step-title">Step 1: Understand the Landscape</h3>
                <p className="step-body">{results}</p>
              </div>
              <div className="tips-section">
                <p className="step-body"><strong>Tip:</strong> Always verify local regulations.</p>
              </div>
              <button className="reset-btn" onClick={() => setResults(null)}>
                Start New Query
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
