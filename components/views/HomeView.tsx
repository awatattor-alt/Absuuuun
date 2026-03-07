import { useEffect, useMemo, useState } from 'react';
import HeroSection from '../HeroSection';
import Stories from '../Stories';
import TopNavBar from '../TopNavBar';
import PostCard from '../PostCard';
import { FEED_STORE, FEED_UPDATED_EVENT } from '../../constants';
import { Language, User } from '../../types';
import { t } from '../../translations';

interface HomeViewProps {
  currentUser: User | null;
  language: Language;
  onRequestLogin: () => void;
  onNavigate: (view: string) => void;
}

export default function HomeView({ currentUser, language, onRequestLogin }: HomeViewProps) {
  const labels = t(language);
  const tabs = [labels.posts, labels.reels, labels.events, labels.debates];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(FEED_STORE.posts);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    const handler = () => setItems([...FEED_STORE.posts]);
    window.addEventListener(FEED_UPDATED_EVENT, handler);
    return () => window.removeEventListener(FEED_UPDATED_EVENT, handler);
  }, []);

  const typeMap = {
    [labels.posts]: 'post',
    [labels.reels]: 'reel',
    [labels.events]: 'event',
    [labels.debates]: 'debate',
  } as const;

  const filtered = useMemo(() => items.filter((item) => item.type === typeMap[activeTab]), [activeTab, items]);

  return (
    <section dir={language === 'ar' || language === 'ku' ? 'rtl' : 'ltr'} className="space-y-4">
      <HeroSection />
      <Stories language={language} />
      <TopNavBar tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => <div key={n} className="h-44 bg-slate-200 animate-pulse rounded-xl" />)}
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item.id}><PostCard item={item} currentUser={currentUser} onRequestLogin={onRequestLogin} /></div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded-xl bg-slate-50">
          <svg className="mx-auto mb-3" width="120" height="80" viewBox="0 0 120 80" fill="none"><rect x="10" y="20" width="100" height="50" rx="8" fill="#E2E8F0"/><circle cx="35" cy="42" r="8" fill="#CBD5E1"/><path d="M55 55h35" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round"/></svg>
          <p className="font-medium text-slate-700">{labels.emptyFeed}</p>
          <p className="text-sm text-slate-500">{labels.emptyFeedHint}</p>
        </div>
      )}
    </section>
  );
}
