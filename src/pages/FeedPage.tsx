import React, { useEffect, useMemo, useState } from 'react';
import { FEED_POSTS } from '../data/socialData';
import { askGemini } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from './usePageTitle';

const FeedPage: React.FC = () => {
  usePageTitle('Feed');
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [posts, setPosts] = useState(() => FEED_POSTS.map((p) => ({ ...p, liked: false })));
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  const createPost = () => {
    if (!text.trim()) return;
    setPosts((prev) => [{ id: crypto.randomUUID(), author: user?.name || 'You', handle: `@${(user?.name || 'you').toLowerCase().replace(/\s+/g, '')}`, content: text, likes: 0, comments: 0, timestamp: 'now', liked: false }, ...prev]);
    setText('');
  };

  const skeletons = useMemo(() => Array.from({ length: 3 }, (_, i) => i), []);

  return (
    <main className="page-wrap stack">
      <h1 className="page-title">Community Feed</h1>
      <section className="card stack">
        <textarea className="textarea" placeholder="Share something from your city..." value={text} onChange={(e) => setText(e.target.value)} />
        <div className="row">
          <button onClick={createPost} className="btn btn-primary">Post</button>
          <button className="btn" onClick={async () => { setAiLoading(true); setText(await askGemini('Write a short positive post about Iraqi culture or travel.')); setAiLoading(false); }}>
            {aiLoading ? 'Generating…' : 'AI Suggestion'}
          </button>
        </div>
      </section>
      {loading ? skeletons.map((i) => <div key={i} className="card" style={{ height: 110 }} />) : posts.map((post) => (
        <article key={post.id} className="card stack">
          <div className="between"><strong>{post.author}</strong><small className="muted">{post.timestamp}</small></div>
          <small className="muted">{post.handle}</small>
          <p style={{ margin: 0 }}>{post.content}</p>
          <div className="row">
            <button className="btn btn-ghost" onClick={() => setPosts((prev) => prev.map((it) => it.id === post.id ? { ...it, liked: !it.liked, likes: it.likes + (it.liked ? -1 : 1) } : it))}>{post.liked ? '♥' : '♡'} {post.likes}</button>
            <small className="muted">💬 {post.comments}</small>
          </div>
        </article>
      ))}
    </main>
  );
};

export default FeedPage;
