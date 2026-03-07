import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Page.module.css';

const NotFoundPage: React.FC = () => (
  <section className={styles.page}>
    <h1>404</h1>
    <article className={styles.card}>
      <p>The page you requested does not exist.</p>
      <NavLink to="/">Return Home</NavLink>
    </article>
  </section>
);

export default NotFoundPage;
