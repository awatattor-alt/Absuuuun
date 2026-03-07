import React from 'react';
import { NavLink } from 'react-router-dom';
import { MESSAGE_THREADS } from '../data/socialData';
import { usePageTitle } from './usePageTitle';

const MessagesPage: React.FC = () => {
  usePageTitle('Messages');
  return (
    <main className="page-wrap stack">
      <h1 className="page-title">Messages</h1>
      {MESSAGE_THREADS.map((thread) => (
        <NavLink key={thread.id} to={`/messages/${thread.id}`} className="card stack">
          <strong>{thread.name}</strong>
          <span className="muted">{thread.preview}</span>
          <small className="muted">{thread.updatedAt}</small>
        </NavLink>
      ))}
    </main>
  );
};

export default MessagesPage;
