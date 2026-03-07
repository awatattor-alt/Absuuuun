import React, { useCallback } from 'react';
import { apiService } from '../services/apiService';
import { useAsyncData } from '../hooks/useAsyncData';
import styles from './Page.module.css';

const DashboardPage: React.FC = () => {
  const loadDashboard = useCallback(() => apiService.getDashboard(), []);
  const { data, loading, error } = useAsyncData(loadDashboard);

  return (
    <section className={styles.page}>
      <h1>Dashboard</h1>
      {loading && <p className={styles.loader}>Loading dashboard…</p>}
      {error && <p className={styles.error}>Dashboard failed: {error}</p>}
      {data && (
        <>
          <article className={styles.card}><p>{data.greeting}</p></article>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h3>Tasks</h3>
              <ul>{data.tasks.map((task) => <li key={task}>{task}</li>)}</ul>
            </article>
            <article className={styles.card}>
              <h3>Alerts</h3>
              <ul>{data.alerts.map((alert) => <li key={alert}>{alert}</li>)}</ul>
            </article>
          </div>
        </>
      )}
    </section>
  );
};

export default DashboardPage;
