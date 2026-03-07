import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HOME_EVENTS } from '../data/socialData';
import { askGemini } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from './usePageTitle';

const HomePage: React.FC = () => {
  usePageTitle('Home');
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAsk = async (eventId: string, title: string) => {
    setLoadingId(eventId);
    const response = await askGemini(`Write one travel tip and one cultural fact about ${title} in Iraq.`);
    setAnswers((prev) => ({ ...prev, [eventId]: response }));
    setLoadingId(null);
  };

  return (
    <main className="page-wrap stack">
      <section className="hero hero-grid">
        <div className="stack">
          <h1 className="page-title">Discover modern Iraq with local stories, events, and communities.</h1>
          <p className="muted">Absuuuun helps you explore cities, follow creators, and connect with people around events happening this week.</p>
          <div className="row">
            <NavLink to={user ? '/feed' : '/register'} className="btn btn-primary">{user ? 'Open your feed' : 'Create free account'}</NavLink>
            <NavLink to={user ? '/messages' : '/login'} className="btn btn-ghost">{user ? 'See messages' : 'Login'}</NavLink>
          </div>
        </div>
        <div className="card stack">
          <strong>What you can do</strong>
          <span className="muted">• Follow place-based updates from Baghdad, Basra, Erbil and more.</span>
          <span className="muted">• Chat with your groups and discover curated recommendations.</span>
          <span className="muted">• Use AI helpers to learn quick facts about events.</span>
        </div>
      </section>

      <section>
        <h2 className="page-title">Upcoming highlights</h2>
        <p className="page-subtitle">Hand-picked events from local communities.</p>
        <div className="grid-3">
          {HOME_EVENTS.map((event) => (
            <article key={event.id} className="card stack">
              <div className="between">
                <strong>{event.title}</strong>
                <small className="muted">{event.date}</small>
              </div>
              <small className="muted">{event.city}</small>
              <p style={{ margin: 0 }}>{event.description}</p>
              <button onClick={() => handleAsk(event.id, event.title)} className="btn btn-ghost">
                {loadingId === event.id ? 'Thinking…' : 'Ask AI for tips'}
              </button>
              {answers[event.id] && <p className="muted" style={{ margin: 0 }}>{answers[event.id]}</p>}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
