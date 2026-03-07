import React, { useCallback, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import { useAsyncData } from '../hooks/useAsyncData';
import styles from './Page.module.css';

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const loadProfile = useCallback(() => apiService.getProfile(), []);
  const { data, loading, error } = useAsyncData(loadProfile);

  return (
    <section className={styles.page}>
      <h1>Profile</h1>
      {loading && <p className={styles.loader}>Loading profile…</p>}
      {error && <p className={styles.error}>Profile request failed: {error}</p>}
      {data && (
        <article className={styles.card}>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Role:</strong> {data.role}</p>
          <p><strong>Location:</strong> {data.location}</p>
        </article>
      )}
      <article className={styles.card}>
        {/* Controlled input updates user context and keeps UI in sync for profile edits. */}
        <label>
          Display Name
          <input className={styles.input} value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <button className={styles.button} style={{ marginTop: '0.75rem' }} onClick={() => updateProfile(name.trim())}>Save</button>
      </article>
    </section>
  );
};

export default ProfilePage;
