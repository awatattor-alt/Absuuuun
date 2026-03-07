import React from 'react';
import { NavLink } from 'react-router-dom';
import { usePageTitle } from './usePageTitle';

const NotFoundPage: React.FC = () => {
  usePageTitle('404');
  return (
    <main className="form-shell">
      <section className="card stack" style={{ textAlign: 'center', maxWidth: 500 }}>
        <h1 style={{ margin: 0 }}>404</h1>
        <p className="muted">This page does not exist.</p>
        <NavLink to="/" className="btn btn-primary">Back to home</NavLink>
      </section>
    </main>
  );
};

export default NotFoundPage;
