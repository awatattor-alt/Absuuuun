
import React, { useState } from 'react';
import type { Language, TranslationSet } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import { User, Search } from './IconComponents';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSet;
  onSearch?: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, t, onSearch = () => {} }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { key: 'home', label: t.header.home },
    { key: 'explore', label: t.header.explore },
    { key: 'businesses', label: t.header.businesses },
    { key: 'deals', label: t.header.deals },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wider">
            <a href="/" aria-label="Iraq Compass Home" className="hover:opacity-80 transition-opacity">
              <span className="bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF] text-transparent bg-clip-text">Iraq Compass</span>
            </a>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-gray-300" aria-label="Main Navigation">
            {navLinks.map(link => (
              <a 
                key={link.key} 
                href={`#${link.key}`} 
                className="hover:text-white transition-colors duration-300"
                aria-label={link.label}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              className="md:hidden w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label={t.hero.searchPlaceholder}
              onClick={() => setSearchOpen((prev) => !prev)}
            >
              <Search className="w-5 h-5 text-gray-300" />
            </button>
            <LanguageSwitcher selectedLanguage={language} onLanguageChange={setLanguage} />
            <button 
              className="hidden md:block bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF] text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity duration-300"
              aria-label={t.header.login}
            >
              {t.header.login}
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="User Profile"
            >
              <User className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      <div style={{
        overflow: 'hidden',
        maxHeight: searchOpen ? '64px' : '0',
        transition: 'max-height 0.2s ease',
        borderBottom: searchOpen ? '1px solid #1E2D52' : 'none',
        background: 'rgba(7,9,15,0.95)'
      }}>
        <input
          placeholder={t.hero.searchPlaceholder}
          style={{ width: '100%', padding: '12px 16px', background: 'transparent', color: '#F0EDE8', border: 'none', outline: 'none' }}
          onChange={e => onSearch(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;
