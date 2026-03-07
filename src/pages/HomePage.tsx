import React, { useState } from 'react';
import { HOME_EVENTS } from '../data/socialData';
import { askGemini } from '../services/geminiService';
import { usePageTitle } from './usePageTitle';

const HomePage: React.FC = () => {
  usePageTitle('Home');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAsk = async (eventId: string, title: string) => {
    setLoadingId(eventId);
    const response = await askGemini(`Tell me something interesting about this event: ${title}`);
    setAnswers((prev) => ({ ...prev, [eventId]: response }));
    setLoadingId(null);
  };

  return (
    <section className="p-4 md:p-8 space-y-4 pb-24 md:pb-8">
      <h1 className="text-2xl font-bold text-white">Discover Iraq</h1>
      <p className="text-slate-300">Curated events from Iraqi cities.</p>
      <div className="grid md:grid-cols-3 gap-4">
        {HOME_EVENTS.map((event) => (
          <article key={event.id} className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3">
            <h2 className="font-semibold text-lg text-white">{event.title}</h2>
            <p className="text-sm text-slate-300">{event.city} • {event.date}</p>
            <p className="text-slate-200">{event.description}</p>
            <button onClick={() => handleAsk(event.id, event.title)} className="px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 focus:ring-2 focus:ring-sky-400">
              {loadingId === event.id ? 'Thinking…' : 'Ask AI about this event'}
            </button>
            {answers[event.id] && <p className="text-sm bg-slate-900 rounded-lg p-3 text-slate-200">{answers[event.id]}</p>}
          </article>
        ))}
      </div>
    </section>
  );
};

export default HomePage;
