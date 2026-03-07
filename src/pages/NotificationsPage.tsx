import React, { useState } from 'react';
import { NOTIFICATIONS } from '../data/socialData';
import { usePageTitle } from './usePageTitle';

const NotificationsPage: React.FC = () => {
  usePageTitle('Notifications');
  const [items, setItems] = useState(NOTIFICATIONS);

  return (
    <main className="page-wrap stack">
      <div className="between">
        <h1 className="page-title">Notifications</h1>
        <button className="btn btn-ghost" onClick={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}>Mark all read</button>
      </div>
      {items.map((n) => (
        <button key={n.id} onClick={() => setItems((prev) => prev.map((it) => it.id === n.id ? { ...it, read: true } : it))} className="card stack" style={{ textAlign: 'left', borderColor: n.read ? 'var(--border)' : 'var(--primary)' }}>
          <div className="between"><strong>{n.title}</strong><small className="muted">{n.time}</small></div>
          <span className="muted">{n.body}</span>
        </button>
      ))}
    </main>
  );
};

export default NotificationsPage;
