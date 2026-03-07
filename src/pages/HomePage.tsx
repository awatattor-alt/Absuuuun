import React, { useEffect, useMemo, useState } from 'react';
import { CompassPlan, generateCompassPlan } from '../services/geminiService';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HOME_EVENTS } from '../data/socialData';
import { askGemini } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from './usePageTitle';

const STORAGE_KEY = 'absuuun_compass_plan';

type PersistedPlan = {
  goal: string;
  plan: CompassPlan;
  completedStepIds: string[];
};

const HomePage: React.FC = () => {
  usePageTitle('Compass');
  const [goalInput, setGoalInput] = useState('');
  const [goal, setGoal] = useState('');
  const [plan, setPlan] = useState<CompassPlan | null>(null);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as PersistedPlan;
      if (!parsed?.goal || !parsed?.plan?.steps?.length) return;
      setGoal(parsed.goal);
      setGoalInput(parsed.goal);
      setPlan(parsed.plan);
      setCompletedStepIds(parsed.completedStepIds || []);
    } catch (storageError) {
      console.error('Failed to parse saved compass state:', storageError);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!plan || !goal) return;
    const payload: PersistedPlan = { goal, plan, completedStepIds };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [goal, plan, completedStepIds]);

  const progress = useMemo(() => {
    if (!plan?.steps.length) return 0;
    return Math.round((completedStepIds.length / plan.steps.length) * 100);
  }, [plan, completedStepIds]);

  const toggleStep = (stepId: string) => {
    setCompletedStepIds((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]));
  };

  const clearCompass = () => {
    setGoal('');
    setGoalInput('');
    setPlan(null);
    setCompletedStepIds([]);
    setError('');
    localStorage.removeItem(STORAGE_KEY);
  };

  const submitGoal = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = goalInput.trim();

    if (!trimmed) {
      setError('Please enter a destination or goal to generate your compass plan.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const nextPlan = await generateCompassPlan(trimmed);
      setGoal(trimmed);
      setPlan(nextPlan);
      setCompletedStepIds([]);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Unable to build a plan right now.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-4 md:p-8 pb-24 md:pb-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Compass Roadmap</h1>
        <p className="text-slate-300">Describe your destination and let AI map a practical step-by-step route.</p>
      </header>

      <form onSubmit={submitGoal} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 md:p-5 space-y-3">
        <label htmlFor="goal" className="text-sm text-slate-200 block">Goal or destination</label>
        <textarea
          id="goal"
          rows={3}
          value={goalInput}
          onChange={(event) => setGoalInput(event.target.value)}
          placeholder="Examples: Launch my small coffee brand in Baghdad, learn conversational Kurdish in 3 months, plan a family weekend in Basra"
          className="w-full rounded-lg bg-slate-900 border border-slate-600 p-3 text-white focus:ring-2 focus:ring-sky-400"
        />
        <div className="flex flex-wrap gap-2">
          <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-70">
            {loading ? 'Generating roadmap…' : 'Generate compass plan'}
          </button>
          <button type="button" onClick={clearCompass} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100">
            Reset
          </button>
        </div>
        {error && <p className="text-red-300 text-sm">{error}</p>}
      </form>

      {plan && (
        <div className="space-y-4">
          <article className="bg-gradient-to-br from-sky-700/40 to-indigo-700/20 border border-sky-500/30 rounded-2xl p-4 md:p-5 space-y-2">
            <p className="text-xs uppercase tracking-widest text-sky-200">Destination</p>
            <h2 className="text-xl md:text-2xl font-semibold text-white">{plan.destination || goal}</h2>
            <p className="text-slate-200">{plan.summary}</p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-900/70 overflow-hidden">
                <div className="h-full bg-sky-400 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </article>

          <ol className="space-y-3">
            {plan.steps.map((step, index) => {
              const complete = completedStepIds.includes(step.id);
              return (
                <li key={step.id} className={`relative bg-slate-800 border rounded-xl p-4 ${complete ? 'border-emerald-500/60' : 'border-slate-700'}`}>
                  <div className="absolute -left-2 top-5 h-3 w-3 rounded-full bg-sky-400" />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">Step {index + 1} • {step.estimatedTime}</p>
                      <h3 className="text-white font-semibold">{step.title}</h3>
                      <p className="text-slate-300 text-sm mt-1">{step.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleStep(step.id)}
                      className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap ${complete ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-100'}`}
                    >
                      {complete ? 'Completed' : 'Mark done'}
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </section>
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
