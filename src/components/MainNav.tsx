import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Home, MessageCircle, Rss, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const authedItems = [
  { to: '/feed', label: 'Feed', Icon: Rss },
  { to: '/messages', label: 'Messages', Icon: MessageCircle },
  { to: '/notifications', label: 'Alerts', Icon: Bell },
  { to: '/profile', label: 'Profile', Icon: User },
];

const MainNav: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <header className="main-nav">
        <div className="main-nav__inner">
          <NavLink to="/" className="brand">Absuuuun • Iraq Compass</NavLink>
          <nav className="nav-links">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
            {authedItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Settings</NavLink>
          </nav>

          <div className="nav-actions">
            {user ? (
              <NavLink to="/profile" className="btn btn-ghost">{user.avatar} {user.name}</NavLink>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-ghost">Login</NavLink>
                <NavLink to="/register" className="btn btn-primary">Get started</NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      <nav className="mobile-nav" aria-label="Primary">
        <div className="mobile-nav__grid">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}><Home width={19} height={19} style={{ margin: '0 auto 2px' }} />Home</NavLink>
          {authedItems.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>
              <Icon width={19} height={19} style={{ margin: '0 auto 2px' }} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default MainNav;
