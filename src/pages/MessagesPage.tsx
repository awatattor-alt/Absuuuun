import React from 'react';
import { NavLink } from 'react-router-dom';
import { MESSAGE_THREADS } from '../data/socialData';
import { usePageTitle } from './usePageTitle';

const MessagesPage: React.FC = () => {
  usePageTitle('Messages');
  return (
    <section className="p-4 md:p-8 pb-24 md:pb-8 space-y-3">
      <h1 className="text-2xl font-bold text-white">Messages</h1>
      {MESSAGE_THREADS.map((thread) => (
        <NavLink key={thread.id} to={`/messages/${thread.id}`} className="block bg-slate-800 border border-slate-700 rounded-xl p-4 hover:bg-slate-700 focus:ring-2 focus:ring-sky-400">
          <p className="text-white font-medium">{thread.name}</p>
          <p className="text-sm text-slate-300">{thread.preview}</p>
          <p className="text-xs text-slate-400 mt-1">{thread.updatedAt}</p>
        </NavLink>
      ))}
    </section>
  );
};

export default MessagesPage;
