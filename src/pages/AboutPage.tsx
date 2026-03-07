import React, { useCallback } from 'react';
import { apiService } from '../services/apiService';
import { useAsyncData } from '../hooks/useAsyncData';
import styles from './Page.module.css';

const AboutPage: React.FC = () => {
  const loadFacts = useCallback(() => apiService.getAboutFacts(), []);
  const { data, loading, error } = useAsyncData(loadFacts);

  return (
    <section className={styles.page}>
      <h1>About</h1>
      <p>This page demonstrates route-level API integration and resilient fallback behavior.</p>
      {loading && <p className={styles.loader}>Loading about data…</p>}
      {error && <p className={styles.error}>Could not fetch about data: {error}</p>}
      <div className={styles.grid}>
        {data?.map((fact) => (
          <article key={fact.id} className={styles.card}>
            <h3>{fact.title}</h3>
            <p>{fact.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AboutPage;
