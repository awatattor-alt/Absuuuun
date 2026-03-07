import { useMemo, useState } from 'react';
import HomeView from './components/views/HomeView';
import ComposeView from './components/views/ComposeView';
import Sidebar from './components/Sidebar';
import BottomBar from './components/BottomBar';
import LoginModal from './components/LoginModal';
import { addMockPost } from './constants';
import { FeedItem, Language, User } from './types';
import { t } from './translations';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('home');
  const [language, setLanguage] = useState<Language>('en');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [toast, setToast] = useState('');

  const labels = useMemo(() => t(language), [language]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 3000);
  };

  const onRequestLogin = () => {
    if (currentUser) return;
    setIsLoginOpen(true);
  };

  const onPost = (content: string) => {
    if (!currentUser) return;
    const post: FeedItem = {
      id: `p-${Date.now()}`,
      type: 'post',
      author: currentUser,
      content,
      createdAt: 'now',
      likes: 0,
      comments: 0,
      shares: 0,
    };
    addMockPost(post);
    showToast(labels.successPost);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 md:pb-0">
      <div className="max-w-6xl mx-auto flex">
        <Sidebar currentView={currentView} onNavigate={setCurrentView} />
        <main className="flex-1 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-slate-900">Let's Do Tonight</h1>
            <div className="flex gap-2">
              <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="border rounded-lg px-2 py-1 text-sm">
                <option value="en">EN</option>
                <option value="ku">KU</option>
                <option value="ar">AR</option>
              </select>
              {currentUser ? (
                <button className="text-sm border rounded-lg px-3" onClick={() => { setCurrentUser(null); showToast(labels.logoutSuccess); }}>Logout</button>
              ) : null}
            </div>
          </div>

          {currentView === 'home' && (
            <HomeView currentUser={currentUser} language={language} onRequestLogin={onRequestLogin} onNavigate={setCurrentView} />
          )}
          {currentView === 'compose' && (
            <ComposeView
              currentUser={currentUser}
              language={language}
              onRequestLogin={() => {
                setCurrentView('home');
                onRequestLogin();
              }}
              onPost={onPost}
              onCreateEvent={() => {}}
              onCreateReel={() => {}}
            />
          )}
        </main>
      </div>

      <BottomBar currentView={currentView} onNavigate={setCurrentView} />

      <LoginModal
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={(user) => {
          setCurrentUser(user);
          showToast(labels.loginSuccess);
        }}
      />

      {toast && <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg">{toast}</div>}
    </div>
  );
}
