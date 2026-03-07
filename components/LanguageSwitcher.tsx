
import React, { useState, useRef, useEffect } from 'react';
import type { Language } from '../types';
import { LANGUAGES } from '../constants';
import { ChevronDown } from './IconComponents';

interface LanguageSwitcherProps {
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ selectedLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (lang: Language) => {
    onLanguageChange(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === selectedLanguage);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6C2BD9] rounded-sm px-1"
        aria-label="Select Language"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{currentLang?.code.toUpperCase()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full mt-2 right-0 bg-black/50 backdrop-blur-lg border border-white/10 rounded-md shadow-lg overflow-hidden w-32 z-50"
          role="menu"
        >
          <ul role="none">
            {LANGUAGES.map(lang => (
              <li key={lang.code} role="none">
                <button
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedLanguage === lang.code ? 'bg-[#6C2BD9]/50 text-white' : 'text-gray-300 hover:bg-white/10'}`}
                  role="menuitem"
                  aria-current={selectedLanguage === lang.code ? 'true' : undefined}
                >
                  {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
