import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from './usePageTitle';

const SettingsPage: React.FC = () => {
  usePageTitle('Settings');
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [lang, setLang] = useState(localStorage.getItem('absuuun_lang') || 'en');

  useEffect(() => { localStorage.setItem('absuuun_lang', lang); }, [lang]);

  return (
    <main className="page-wrap stack">
      <h1 className="page-title">Settings</h1>
      <section className="card stack" style={{ maxWidth: 560 }}>
        <label className="stack">Language
          <select className="select" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            <option value="ku">Kurdish</option>
          </select>
        </label>
        <button className="btn btn-danger" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
      </section>
    </main>
  );
};

export default SettingsPage;
