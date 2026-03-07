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
    const timer = window.setTimeout(() => setLoading(false), 800);
    return () => window.clearTimeout(timer);
  }, []);

  const createPost = () => {
    if (!text.trim()) return;
    setPosts((prev) => [
      {
        id: crypto.randomUUID(),
        author: user?.name || 'You',
        handle: `@${(user?.name || 'you').toLowerCase().replace(/\s+/g, '')}`,
        content: text,
        likes: 0,
        comments: 0,
        timestamp: 'now',
        liked: false,
      },
      ...prev,
    ]);
    setText('');
  };

  const toggleLike = (id: string) => {
    setPosts((prev) => prev.map((post) => post.id === id ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) } : post));
  };

  const skeletons = useMemo(() => Array.from({ length: 3 }, (_, i) => i), []);

  return (
    <section className="p-4 md:p-8 pb-24 md:pb-8 space-y-4">
      <h1 className="text-2xl font-bold text-white">Community Feed</h1>
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3">
        <textarea className="w-full rounded-lg bg-slate-900 border border-slate-600 p-3 text-white focus:ring-2 focus:ring-sky-400" rows={3} placeholder="Share something about Iraq..." value={text} onChange={(e) => setText(e.target.value)} />
        <div className="flex gap-2 flex-wrap">
          <button onClick={createPost} className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500">Post</button>
          <button
            onClick={async () => {
              setAiLoading(true);
              setText(await askGemini('Suggest a short social media post about a place or event in Iraq, in English, max 2 sentences.'));
              setAiLoading(false);
            }}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500"
          >
            {aiLoading ? '✨ Thinking…' : '✨ AI Suggest Post'}
          </button>
        </div>
      </div>

      {loading ? skeletons.map((i) => <div key={i} className="h-32 rounded-xl bg-slate-800 animate-pulse border border-slate-700" />) : posts.map((post) => (
        <article key={post.id} className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3">
          <header>
            <p className="text-white font-semibold">{post.author} <span className="text-slate-400 font-normal">{post.handle}</span></p>
          </header>
          <p className="text-slate-100">{post.content}</p>
          {post.image && <img src={post.image} alt="Post" className="w-full h-48 object-cover rounded-lg" />}
          <footer className="flex items-center justify-between text-sm text-slate-300">
            <button onClick={() => toggleLike(post.id)} className="hover:text-white focus:ring-2 focus:ring-sky-400 rounded px-1">{post.liked ? '♥' : '♡'} {post.likes}</button>
            <span>💬 {post.comments}</span>
            <span>{post.timestamp}</span>
          </footer>
        </article>
      ))}
    </section>
  );
};

export default FeedPage;
