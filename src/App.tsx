import React, { useState, useEffect, useRef } from 'react';
import { Language } from './types';
import Header from './components/Header';
import HeroSlide from './components/HeroSlide';
import FeaturedBusinessesSlide from './components/FeaturedBusinessesSlide';
import CuratedEventsSlide from './components/CuratedEventsSlide';
import DealsMarketplaceSlide from './components/DealsMarketplaceSlide';
import BusinessDirectorySlide from './components/BusinessDirectorySlide';
import CityNavigatorSlide from './components/CityNavigatorSlide';
import AccessibilityHubSlide from './components/AccessibilityHubSlide';
import { TRANSLATIONS } from './constants';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [fontSize, setFontSize] = useState('base');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'home' | 'browse' | 'search'>('home');

  const [activeFilters, setActiveFilters] = useState({
    searchTerm: '',
    governorate: 'all',
    category: 'all',
    price: 'all',
    rating: 'all',
    sortBy: 'default'
  });
  const businessDirectoryRef = useRef<HTMLElement>(null);

  const handleCategorySelect = (categoryId: string) => {
    setActiveFilters(prev => ({ ...prev, category: categoryId, price: 'all', rating: 'all', searchTerm: '' }));
    businessDirectoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSearch = (query: string) => {
    setActiveFilters((prev) => ({ ...prev, searchTerm: query }));
    setActiveTab('search');
    businessDirectoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' || language === 'ku' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    const sizeMap = { sm: '14px', base: '16px', lg: '18px' };
    document.documentElement.style.fontSize = sizeMap[fontSize as keyof typeof sizeMap];
    document.documentElement.setAttribute('data-reduced-motion', String(reduceMotion));
  }, [fontSize, reduceMotion]);

  useEffect(() => {
    if (selectedGovernorate !== activeFilters.governorate) {
      setActiveFilters(prev => ({ ...prev, governorate: selectedGovernorate }));
    }
  }, [selectedGovernorate, activeFilters.governorate]);

  const t = TRANSLATIONS[language];

  return (
    <div className="bg-[#0A0E27] text-white min-h-screen overflow-x-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#6C2BD9]/30 to-transparent blur-3xl animate-glow-1"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#00D9FF]/20 to-transparent blur-3xl animate-glow-2"></div>
      </div>

      <div className="relative z-10">
        <Header language={language} setLanguage={setLanguage} t={t} onSearch={handleSearch} />

        <main className="container mx-auto px-4 pt-16 pb-[72px] md:pb-0 flex flex-col gap-16 md:gap-24">
          <HeroSlide t={t} language={language} onCategorySelect={handleCategorySelect} selectedGovernorate={selectedGovernorate} onGovernorateChange={setSelectedGovernorate} onSearch={handleSearch} />
          <FeaturedBusinessesSlide t={t} selectedGovernorate={selectedGovernorate} />
          <CuratedEventsSlide t={t} />
          <DealsMarketplaceSlide t={t} selectedGovernorate={selectedGovernorate} />
          <BusinessDirectorySlide ref={businessDirectoryRef} t={t} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
          <CityNavigatorSlide t={t} />
          <AccessibilityHubSlide t={t} fontSize={fontSize} setFontSize={setFontSize} reduceMotion={reduceMotion} setReduceMotion={setReduceMotion} />
        </main>

        <nav className="md:hidden fixed bottom-0 inset-x-0 h-[72px] bg-black/50 backdrop-blur-xl border-t border-white/10 flex items-center justify-around z-50">
          <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`${activeTab === 'home' ? 'text-[#D4AF37]' : 'text-gray-300'} font-semibold`}>Home</button>
          <button onClick={() => { setActiveTab('browse'); businessDirectoryRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className={`${activeTab === 'browse' ? 'text-[#D4AF37]' : 'text-gray-300'} font-semibold`}>Browse</button>
          <button onClick={() => { setActiveTab('search'); businessDirectoryRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className={`${activeTab === 'search' ? 'text-[#D4AF37]' : 'text-gray-300'} font-semibold`}>Search</button>
        </nav>

        <footer className="text-center p-8 mt-16 border-t border-white/10 text-gray-400">
          <p>&copy; 2024 Iraq Compass. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
