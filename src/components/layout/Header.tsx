import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/compass': 'AI Compass',
  '/goals': 'Goals',
  '/journal': 'Journal',
  '/settings': 'Settings',
};

export function Header() {
  const { pathname } = useLocation();

  return (
    <header className="page-header">
      <div>
        <h2>{pageTitles[pathname] ?? 'Dashboard'}</h2>
        <p>Organize goals, journal progress, and ask AI for your next best move.</p>
      </div>
    </header>
  );
}
