import React, { useEffect, useState } from 'react';

export const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const onError = () => setHasError(true);
    window.addEventListener('error', onError);
    return () => window.removeEventListener('error', onError);
  }, []);

  if (hasError) {
    return (
      <main className="form-shell">
        <section className="card stack" style={{ textAlign: 'center', maxWidth: 520 }}>
          <h1 style={{ margin: 0 }}>Something went wrong</h1>
          <p className="muted">Please refresh the page and try again.</p>
        </section>
      </main>
    );
  }

  return <>{children}</>;
};
