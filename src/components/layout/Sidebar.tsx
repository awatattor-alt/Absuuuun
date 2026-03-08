import { Compass, Goal, LayoutDashboard, Menu, NotebookPen, Settings } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/compass', label: 'AI Compass', icon: Compass },
  { to: '/goals', label: 'Goals', icon: Goal },
  { to: '/journal', label: 'Journal', icon: NotebookPen },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setIsOpen((state) => !state)}>
        <Menu size={18} />
        Menu
      </button>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <h1>Absoon Compass</h1>
          <p>Life navigation OS</p>
        </div>
        <nav>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
