import React, { useCallback } from 'react';
import { apiService } from '../services/apiService';
import { useAsyncData } from '../hooks/useAsyncData';
import styles from './Page.module.css';

const HomePage: React.FC = () => {
  const loadFeatures = useCallback(() => apiService.getHomeFeatures(), []);
  const { data, loading, error } = useAsyncData(loadFeatures);

  return (
    <section className={styles.page}>
      <h1>Home</h1>
      <p>Welcome to the completed frontend starter experience.</p>
      {loading && <p className={styles.loader}>Loading highlights…</p>}
      {error && <p className={styles.error}>Failed to load highlights: {error}</p>}
      <div className={styles.grid}>
        {data?.map((item) => (
          <article key={item.id} className={styles.card}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HomePage;
