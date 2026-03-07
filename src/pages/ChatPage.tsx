import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { MESSAGE_THREADS } from '../data/socialData';
import { usePageTitle } from './usePageTitle';

type Msg = { id: string; sender: 'me' | 'other'; text: string };
const seed: Msg[] = [
  { id: '1', sender: 'other', text: 'Hey! Are you coming tonight?' },
  { id: '2', sender: 'me', text: 'Yes, what time should I arrive?' },
  { id: '3', sender: 'other', text: 'Around 8 PM near the gate.' },
];

const ChatPage: React.FC = () => {
  usePageTitle('Chat');
  const { id } = useParams<{ id: string }>();
  const thread = MESSAGE_THREADS.find((t) => t.id === id);
  const [messages, setMessages] = useState(seed);
  const [text, setText] = useState('');

  if (!thread) return <main className="page-wrap"><p>Thread not found.</p></main>;

  return (
    <main className="page-wrap">
      <section className="card chat-window">
        <div className="between">
          <NavLink to="/messages" className="btn btn-ghost">Back</NavLink>
          <strong>{thread.name}</strong>
        </div>
        <div className="chat-messages">
          {messages.map((m) => <div key={m.id} className={`bubble ${m.sender}`}><span>{m.text}</span></div>)}
        </div>
        <div className="row">
          <input className="input" placeholder="Type a message" value={text} onChange={(e) => setText(e.target.value)} />
          <button className="btn btn-primary" onClick={() => { if (!text.trim()) return; setMessages((prev) => [...prev, { id: crypto.randomUUID(), sender: 'me', text }]); setText(''); }}>Send</button>
        </div>
      </section>
    </main>
  );
};

export default ChatPage;
