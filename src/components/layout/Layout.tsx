import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="layout-main">
        <Header />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
