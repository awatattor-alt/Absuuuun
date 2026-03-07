import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from './usePageTitle';

const ProfilePage: React.FC = () => {
  usePageTitle('Profile');
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');

  if (!user) return null;

  return (
    <main className="page-wrap stack">
      <h1 className="page-title">Profile</h1>
      <section className="card stack" style={{ maxWidth: 560 }}>
        <div className="row">
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#0ea5e9', display: 'grid', placeItems: 'center', fontWeight: 700 }}>{user.avatar}</div>
          <div>
            <strong>{user.name}</strong>
            <div className="muted">{user.email}</div>
          </div>
        </div>
        <label className="stack">Display name<input className="input" value={name} onChange={(e) => setName(e.target.value)} /></label>
        <button className="btn btn-primary" onClick={() => name.trim() && updateProfile(name.trim())}>Save profile</button>
      </section>
    </main>
  );
};

export default ProfilePage;
