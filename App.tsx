import React, { useState, useEffect } from 'react';
import { Screen, Lang, City, CategoryId } from './types';
import { HomeScreen } from './components/HomeScreen';
import { CategoryScreen } from './components/CategoryScreen';
import { BusinessDetail } from './components/BusinessDetail';

function App() {
  const [screen, setScreen] = useState<Screen>({ view: 'home' });
  const [lang, setLang] = useState<Lang>('en');
  const [city, setCity] = useState<City>('Sulaymaniyah');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleNavigate = (view: 'home' | 'category' | 'business', id?: string) => {
    if (view === 'home') {
      setScreen({ view: 'home' });
    } else if (view === 'category' && id) {
      setScreen({ view: 'category', categoryId: id as CategoryId });
    } else if (view === 'business' && id) {
      setScreen({ view: 'business', businessId: id });
    }
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-gray-900 mx-auto max-w-[448px] shadow-2xl relative overflow-hidden">
      {/* Language Toggle */}
      <button 
        onClick={toggleLang}
        className="absolute top-4 right-4 z-50 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-sm hover:bg-white/30 transition-colors"
      >
        {lang === 'en' ? '🇮🇶 عربي' : '🌐 English'}
      </button>

      {/* Screen Rendering */}
      {screen.view === 'home' && (
        <HomeScreen 
          lang={lang} 
          city={city} 
          onCityChange={setCity} 
          onNavigate={handleNavigate} 
        />
      )}
      
      {screen.view === 'category' && (
        <CategoryScreen 
          categoryId={screen.categoryId} 
          city={city} 
          lang={lang} 
          onNavigate={handleNavigate} 
        />
      )}
      
      {screen.view === 'business' && (
        <BusinessDetail 
          businessId={screen.businessId} 
          lang={lang} 
          onNavigate={handleNavigate} 
        />
      )}
    </div>
  );
}

export default App;
