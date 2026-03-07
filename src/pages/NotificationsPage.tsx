import React, { useState } from 'react';
import { NOTIFICATIONS } from '../data/socialData';
import { usePageTitle } from './usePageTitle';

const NotificationsPage: React.FC = () => {
  usePageTitle('Notifications');
  const [items, setItems] = useState(NOTIFICATIONS);

  const markOne = (id: string) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <section className="p-4 md:p-8 pb-24 md:pb-8 space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
        <button onClick={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))} className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white focus:ring-2 focus:ring-sky-400">Mark all as read</button>
      </div>
      {items.map((n) => (
        <button key={n.id} onClick={() => markOne(n.id)} className={`w-full text-left rounded-xl border p-4 ${n.read ? 'border-slate-700 bg-slate-800' : 'border-sky-500 bg-slate-800 border-l-4'}`}>
          <div className="flex items-center justify-between"><p className="text-white font-medium">{n.title}</p>{!n.read && <span className="w-2 h-2 rounded-full bg-sky-400" />}</div>
          <p className="text-slate-300 text-sm">{n.body}</p>
          <p className="text-xs text-slate-400 mt-1">{n.time}</p>
        </button>
      ))}
    </section>
  );
};

export default NotificationsPage;
