import React from 'react';
import type { TranslationSet } from '../types';
import { GOVERNORATES, MOCK_BUSINESSES } from '../constants';

interface CityNavigatorSlideProps {
  t: TranslationSet;
}

const governorateEmoji: Record<string, string> = {
  Baghdad: '🕌',
  Basra: '🛢',
  Erbil: '🏔',
  Slemani: '🌿',
  Duhok: '🏞',
  Nineveh: '🦁',
  Kirkuk: '⭐',
  Karbala: '🕍',
  Najaf: '🌙',
  Anbar: '🌅',
  Diyala: '🌊',
  Babil: '🏛',
  Wasit: '🌾',
  Maysan: '🐊',
  'Dhi Qar': '🏺',
  Muthanna: '🌵',
  Qadisiyyah: '🐎',
  Saladin: '🏰'
};

const CityNavigatorSlide: React.FC<CityNavigatorSlideProps> = ({ t }) => {
  const governorates = GOVERNORATES.filter((gov) => gov.id !== 'all');

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{t.exploreByGov}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{t.browseByCity}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {governorates.map((gov) => {
          const count = MOCK_BUSINESSES.filter((business) => business.governorate === gov.id).length;
          return (
            <div key={gov.id} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{governorateEmoji[gov.id] ?? '📍'}</div>
              <div className="font-semibold">{t.governorates[gov.labelKey as keyof typeof t.governorates]}</div>
              <div className="text-sm text-gray-400 mt-1">{count} businesses</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CityNavigatorSlide;
