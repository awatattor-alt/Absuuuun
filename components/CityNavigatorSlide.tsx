import React from 'react';
import type { TranslationSet } from '../types';
import { Map, Search } from './IconComponents';

interface CityNavigatorSlideProps {
  t: TranslationSet;
}

const CityNavigatorSlide: React.FC<CityNavigatorSlideProps> = ({ t }) => {
  return (
    <section>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">{t.cityNavigator.title}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">{t.cityNavigator.description}</p>
      </div>
      
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 flex flex-col items-center gap-10 shadow-2xl shadow-black/20">
        <div className="w-28 h-28 bg-gradient-to-br from-[#6C2BD9]/30 to-[#00D9FF]/30 rounded-full flex items-center justify-center border border-white/20 shadow-xl shadow-[#6C2BD9]/20 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <Map className="w-14 h-14 text-[#00D9FF] relative z-10" />
        </div>

        <div className="w-full max-w-xl flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none rtl:inset-r-0 rtl:ps-0 rtl:pe-5">
                    <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="search"
                    className="w-full p-4.5 ps-14 text-lg text-white bg-white/5 border border-white/20 rounded-full backdrop-blur-lg focus:ring-2 focus:ring-[#00D9FF] focus:outline-none placeholder:text-gray-400 transition-all duration-300 focus:bg-white/10"
                    placeholder={t.cityNavigator.searchPlaceholder}
                />
            </div>
            <button className="bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF] text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-all duration-300 flex-shrink-0 shadow-lg shadow-[#6C2BD9]/30 transform hover:scale-105">
                {t.cityNavigator.planJourneyButton}
            </button>
        </div>
      </div>
    </section>
  );
};

export default CityNavigatorSlide;