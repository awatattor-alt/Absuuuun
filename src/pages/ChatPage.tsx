import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { MESSAGE_THREADS } from '../data/socialData';
import { usePageTitle } from './usePageTitle';

type Msg = { id: string; sender: 'me' | 'other'; text: string };
const seed: Msg[] = [
  { id: '1', sender: 'other', text: 'Hey! Are you coming tonight?' },
  { id: '2', sender: 'me', text: 'Yes, what time should I arrive?' },
  { id: '3', sender: 'other', text: 'Around 8 PM near the gate.' },
  { id: '4', sender: 'me', text: 'Perfect, see you there 👌' },
];

const ChatPage: React.FC = () => {
  usePageTitle('Chat');
  const { id } = useParams<{ id: string }>();
  const thread = MESSAGE_THREADS.find((t) => t.id === id);
  const [messages, setMessages] = useState(seed);
  const [text, setText] = useState('');

  if (!thread) return <div className="p-6 text-white">Thread not found.</div>;

  return (
    <section className="p-4 md:p-8 pb-24 md:pb-8 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex flex-col">
      <header className="flex items-center gap-3 border-b border-slate-700 pb-3">
        <NavLink to="/messages" className="text-sky-400 hover:underline">← Back</NavLink>
        <h1 className="text-xl text-white font-bold">{thread.name}</h1>
      </header>
      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[80%] p-3 rounded-xl ${m.sender === 'me' ? 'ml-auto bg-sky-600 text-white' : 'bg-slate-800 text-slate-100'}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 rounded-lg bg-slate-900 border border-slate-600 p-2 text-white focus:ring-2 focus:ring-sky-400" placeholder="Type a message" />
        <button onClick={() => { if (!text.trim()) return; setMessages((prev) => [...prev, { id: crypto.randomUUID(), sender: 'me', text }]); setText(''); }} className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500">Send</button>
      </div>
    </section>
  );
};

export default ChatPage;
