import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from './usePageTitle';

const SettingsPage: React.FC = () => {
  usePageTitle('Settings');
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [lang, setLang] = useState(localStorage.getItem('absuuun_lang') || 'en');
  const [fontSize, setFontSize] = useState(localStorage.getItem('absuuun_fontsize') || 'base');
  const [dark, setDark] = useState((localStorage.getItem('absuuun_theme') || 'dark') === 'dark');

  useEffect(() => { localStorage.setItem('absuuun_lang', lang); }, [lang]);
  useEffect(() => {
    localStorage.setItem('absuuun_fontsize', fontSize);
    document.documentElement.style.fontSize = fontSize === 'small' ? '14px' : fontSize === 'large' ? '18px' : '16px';
  }, [fontSize]);
  useEffect(() => {
    localStorage.setItem('absuuun_theme', dark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <section className="p-4 md:p-8 pb-24 md:pb-8 space-y-4">
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3 text-white">
        <label className="block">Language
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-600">
            <option value="en">English</option><option value="ar">Arabic</option><option value="ku">Kurdish</option>
          </select>
        </label>
        <label className="block">Font size
          <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-600">
            <option value="small">small</option><option value="base">base</option><option value="large">large</option>
          </select>
        </label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} /> Dark mode</label>
        <button onClick={() => { logout(); navigate('/login'); }} className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500">Logout</button>
      </div>
    </section>
  );
};

export default SettingsPage;
