import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Layout.module.css';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className={styles.shell}>
      <nav className={styles.nav}>
        <span className={styles.brand}>Absuuuun</span>
        <div className={styles.links}>
          {['/', '/about', '/dashboard', '/profile'].map((path) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              {path === '/' ? 'Home' : path.slice(1).replace(/^./, (c) => c.toUpperCase())}
            </NavLink>
          ))}
          {!user ? (
            <>
              <NavLink to="/login" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>Login</NavLink>
              <NavLink to="/signup" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>Signup</NavLink>
            </>
          ) : (
            <button className={styles.link} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={logout}>Logout</button>
          )}
        </div>
      </nav>
      <main className={styles.content}>{children}</main>
      <footer className={styles.footer}>© {new Date().getFullYear()} Absuuuun • Frontend starter dashboard</footer>
    </div>
  );
};

export default Layout;
