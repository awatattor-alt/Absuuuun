import { Compass } from 'lucide-react';
import { QueryForm } from '../components/QueryForm';
import { EventList } from '../features/discovery/EventList';
import { useAuth } from '../hooks/useAuth';
import { useBusinessDiscovery } from '../hooks/useBusinessDiscovery';

export function HomePage() {
  const { events, isLoading, error, search } = useBusinessDiscovery();
  const { isAuthenticated, login, logout, session } = useAuth();

  return (
    <div className="app">
      <div className="shell">
        <header className="compass-header">
          <h1 className="compass-title">
            <Compass size={28} /> Iraq Compass
          </h1>
          <p className="compass-subtitle">
            Discover trusted business and growth opportunities while preserving your existing workflow.
          </p>
          <div className="auth-strip">
            {isAuthenticated ? (
              <>
                <span>Signed in as {session?.username}</span>
                <button onClick={logout}>Sign out</button>
              </>
            ) : (
              <button onClick={() => login('guest@iraq-compass.io')}>Quick sign in</button>
            )}
          </div>
        </header>

        <QueryForm onSubmit={search} isLoading={isLoading} />

        {isLoading && <div className="loading-state">Searching the network...</div>}
        {error && <div className="error-state">{error}</div>}

        <EventList events={events} />
      </div>
    </div>
  );
}
