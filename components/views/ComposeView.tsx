import { useEffect, useState } from 'react';
import { Event, Language, Reel, User } from '../../types';
import ReelComposer from '../ReelComposer';
import EventComposer from '../EventComposer';
import { t } from '../../translations';

interface ComposeViewProps {
  currentUser: User | null;
  language: Language;
  onRequestLogin: () => void;
  onPost: (content: string) => void;
  onCreateEvent: (event: Partial<Event>) => void;
  onCreateReel: (reel: Partial<Reel>) => void;
}

export default function ComposeView({ currentUser, language, onRequestLogin, onPost, onCreateEvent, onCreateReel }: ComposeViewProps) {
  const labels = t(language);
  const [mode, setMode] = useState<'post' | 'reel' | 'event'>('post');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!currentUser) {
      onRequestLogin();
    }
  }, [currentUser, onRequestLogin]);

  if (!currentUser) return null;

  return (
    <section dir={language === 'ar' || language === 'ku' ? 'rtl' : 'ltr'} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-3">
        <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex gap-2">
          {(['post', 'reel', 'event'] as const).map((value) => (
            <button key={value} className={`px-3 py-1 rounded-full text-sm ${mode === value ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`} onClick={() => setMode(value)}>
              {value[0].toUpperCase() + value.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {mode === 'post' && (
        <>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder={labels.composePlaceholder} className="w-full min-h-32 rounded-xl border border-slate-300 p-3" />
          <button className="text-sm rounded-lg border px-3 py-1">📷 {labels.attachPhoto}</button>
        </>
      )}
      {mode === 'reel' && <ReelComposer onCreate={onCreateReel} />}
      {mode === 'event' && <EventComposer onCreate={onCreateEvent} />}

      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        onClick={() => {
          if (!content.trim() && mode === 'post') return;
          onPost(content);
          setContent('');
        }}
      >
        {labels.post}
      </button>
    </section>
  );
}
