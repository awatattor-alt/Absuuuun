import React, { useState, useEffect, useRef } from 'react';
import type { TranslationSet, Language, Category } from '../types';
import StoryBubble from './StoryBubble';
import StoryViewer from './StoryViewer';
import CategoryModal from './CategoryModal';
import { MOCK_STORIES, CATEGORIES, GOVERNORATES } from '../constants';
import { Search, Microphone } from './IconComponents';

interface HeroSlideProps {
  t: TranslationSet;
  language: Language;
  onCategorySelect: (categoryId: string) => void;
  selectedGovernorate: string;
  onGovernorateChange: (govId: string) => void;
}

// FIX: Add type definitions for the Web Speech API to resolve "Cannot find name 'SpeechRecognition'" errors.
interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  start(): void;
  stop(): void;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

declare var webkitSpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};


// For TypeScript: Add SpeechRecognition types to the window object
interface CustomWindow extends Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof webkitSpeechRecognition;
}
declare const window: CustomWindow;

const HeroSlide: React.FC<HeroSlideProps> = ({ t, language, onCategorySelect, selectedGovernorate, onGovernorateChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleStoryClick = (index: number) => {
    setActiveStoryIndex(index);
    setIsStoryViewerOpen(true);
  };
  
  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      setSpeechRecognitionSupported(true);
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchValue(transcript);
        setIsListening(false);
      };
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognitionRef.current = recognition;
    }
  }, []);
  
  useEffect(() => {
    if (recognitionRef.current) {
        const langCode = {
            en: 'en-US',
            ar: 'ar-SA',
            ku: 'ckb-IQ' // Sorani Kurdish (Iraq)
        }[language];
        recognitionRef.current.lang = langCode;
    }
  }, [language]);


  const handleVoiceSearch = () => {
    if (isListening || !recognitionRef.current) {
      return;
    }
    try {
        setIsListening(true);
        recognitionRef.current.start();
    } catch (error) {
        console.error("Could not start speech recognition:", error);
        setIsListening(false);
    }
  };


  return (
    <>
      <section className="text-center pt-16 pb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
          {t.hero.mainTitle}
        </h1>
        
        <div className="max-w-3xl mx-auto my-12 relative group">
          <label htmlFor="hero-search" className="sr-only">{t.hero.searchPlaceholder}</label>
          <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none rtl:inset-r-0 rtl:ps-0 rtl:pe-5">
            <Search className="w-6 h-6 text-gray-400 group-focus-within:text-[#00D9FF] transition-colors duration-300" aria-hidden="true" />
          </div>
          <input
            id="hero-search"
            type="search"
            className="w-full p-5 ps-14 text-xl text-white bg-white/5 border border-white/20 rounded-full backdrop-blur-xl focus:ring-4 focus:ring-[#00D9FF]/20 focus:border-[#00D9FF] focus:outline-none placeholder:text-gray-500 disabled:opacity-70 pe-[12rem] rtl:pe-14 rtl:ps-[12rem] transition-all duration-500 shadow-2xl shadow-black/40 focus:bg-white/10"
            placeholder={isListening ? t.hero.listening : t.hero.searchPlaceholder}
            aria-label={t.hero.searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            disabled={isListening}
          />
          <div className="absolute end-3 bottom-3 flex items-center gap-3">
              {speechRecognitionSupported && (
                   <button
                      type="button"
                      onClick={handleVoiceSearch}
                      disabled={isListening}
                      className={`p-3 rounded-full transition-all duration-500 ${
                          isListening
                              ? 'bg-[#FF2E97] text-white animate-pulse ring-4 ring-[#FF2E97]/30 shadow-lg shadow-[#FF2E97]/40'
                              : 'text-gray-400 hover:bg-white/15 hover:text-white hover:scale-110'
                      }`}
                      title={t.hero.voiceSearchTooltip}
                      aria-label={t.hero.voiceSearchTooltip}
                  >
                      <Microphone className="w-5 h-5" />
                  </button>
              )}
              <button
                className="bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF] text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg shadow-[#6C2BD9]/30 transform hover:scale-105 active:scale-95"
              >
                {t.hero.searchButton}
              </button>
          </div>
        </div>

        <div className="flex overflow-x-auto space-x-4 py-6 px-2 -mx-2 hide-scrollbar">
            {MOCK_STORIES.map((story, index) => (
              <StoryBubble key={story.id} story={story} onClick={() => handleStoryClick(index)} />
            ))}
        </div>
        
        <div className="border-t border-b border-white/10 py-4 my-4">
           <div className="flex overflow-x-auto space-x-2 md:space-x-4 px-2 -mx-2 hide-scrollbar justify-center">
            {GOVERNORATES.map(gov => (
                <button
                    key={gov.id}
                    onClick={() => onGovernorateChange(gov.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex-shrink-0 border-2 ${
                        selectedGovernorate === gov.id
                            ? 'bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF] text-white border-transparent'
                            : 'bg-white/5 border-transparent text-gray-300 hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                    {t.governorates[gov.labelKey as keyof typeof t.governorates]}
                </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 mt-6">
          {CATEGORIES.map(category => (
            <button 
              key={category.id} 
              onClick={() => handleCategoryClick(category)}
              className="flex flex-col items-center justify-center gap-2 aspect-square bg-white/5 border border-transparent rounded-2xl hover:bg-white/10 hover:border-[#6C2BD9]/50 transition-all duration-300 text-gray-300 hover:text-white group transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6C2BD9]/20"
            >
              <category.icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-xs text-center">{t.categories[category.labelKey]}</span>
            </button>
          ))}
        </div>
      </section>

      {isStoryViewerOpen && (
        <StoryViewer
          stories={MOCK_STORIES}
          startIndex={activeStoryIndex}
          onClose={() => setIsStoryViewerOpen(false)}
          t={t.storyViewer}
        />
      )}

      {isCategoryModalOpen && selectedCategory && (
        <CategoryModal
          category={selectedCategory}
          onClose={() => setIsCategoryModalOpen(false)}
          onCategorySelect={onCategorySelect}
          t={t}
        />
      )}
    </>
  );
};

export default HeroSlide;