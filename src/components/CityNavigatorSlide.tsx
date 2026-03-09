import React from 'react';
import type { TranslationSet } from '../types';
import { GOVERNORATES, MOCK_BUSINESSES } from '../constants';

interface CityNavigatorSlideProps {
  t: TranslationSet;
}

const CityNavigatorSlide: React.FC<CityNavigatorSlideProps> = ({ t }) => {
  const allGovernorates = GOVERNORATES.filter((gov) => gov.id !== 'all');

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{t.exploreByGov}</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {allGovernorates.map((gov) => {
          const count = MOCK_BUSINESSES.filter((business) => business.governorate === gov.id).length;
          return (
            <div key={gov.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-xl">
              <div className="text-2xl mb-1">{gov.emoji}</div>
              <div className="font-semibold">{t.governorates[gov.labelKey as keyof typeof t.governorates]}</div>
              <div className="text-xs text-gray-400 mt-1">{count} places</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CityNavigatorSlide;
