import React, { useState } from 'react';
import type { Language, TranslationSet } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import { User, Search } from './IconComponents';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSet;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, t, onSearch }) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const navLinks = [
    { key: 'home', label: t.header.home },
    { key: 'explore', label: t.header.explore },
    { key: 'businesses', label: t.header.businesses },
    { key: 'deals', label: t.header.deals },
  ];

  const submitSearch = () => onSearch(query.trim());

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="p-4">
        <div className="container mx-auto flex justify-between items-center gap-3">
          <div className="text-2xl font-bold tracking-wider">
            <a href="/" aria-label="Iraq Compass Home" className="hover:opacity-80 transition-opacity">
              <span className="bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF] text-transparent bg-clip-text">Iraq Compass</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-gray-300" aria-label="Main Navigation">
            {navLinks.map(link => (
              <a key={link.key} href={`#${link.key}`} className="hover:text-white transition-colors duration-300" aria-label={link.label}>{link.label}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 w-full max-w-sm">
            <Search className="w-4 h-4 text-gray-300" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
              className="bg-transparent outline-none text-sm w-full"
              placeholder={t.hero.searchPlaceholder}
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="md:hidden w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center" onClick={() => setMobileSearchOpen((v) => !v)} aria-label={t.hero.searchButton}>
              <Search className="w-5 h-5 text-gray-300" />
            </button>
            <LanguageSwitcher selectedLanguage={language} onLanguageChange={setLanguage} />
            <button className="hidden md:block bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF] text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity duration-300" aria-label={t.header.login}>{t.header.login}</button>
            <button className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="User Profile">
              <User className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${mobileSearchOpen ? 'max-h-24' : 'max-h-0'}`}>
        <div className="container mx-auto px-4 pb-3 flex gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitSearch()} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" placeholder={t.hero.searchPlaceholder} />
          <button onClick={submitSearch} className="px-4 rounded-lg bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF]">{t.hero.searchButton}</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
