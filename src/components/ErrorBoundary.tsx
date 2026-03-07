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
      <div className="min-h-screen grid place-items-center bg-slate-950 text-white p-6">
        <div className="max-w-md text-center space-y-3">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-slate-300">Please refresh the page and try again.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
