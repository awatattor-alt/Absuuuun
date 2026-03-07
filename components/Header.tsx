
import React from 'react';
import type { Language, TranslationSet } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import { User } from './IconComponents';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSet;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, t }) => {
  const navLinks = [
    { key: 'home', label: t.header.home },
    { key: 'explore', label: t.header.explore },
    { key: 'businesses', label: t.header.businesses },
    { key: 'deals', label: t.header.deals },
  ];

  return (
    <header className="sticky top-0 z-50 p-4 bg-black/30 backdrop-blur-xl border-b border-white/10">
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
    </header>
  );
};

export default Header;
