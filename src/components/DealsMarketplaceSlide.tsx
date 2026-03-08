import React from 'react';
import type { TranslationSet } from '../types';
import { MOCK_DEALS } from '../constants';
import DealCard from './DealCard';

interface DealsMarketplaceSlideProps {
  t: TranslationSet;
  selectedGovernorate: string;
}

const DealsMarketplaceSlide: React.FC<DealsMarketplaceSlideProps> = ({ t, selectedGovernorate }) => {
  const filteredDeals = MOCK_DEALS.filter(deal => selectedGovernorate === 'all' || deal.governorate === selectedGovernorate);

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">{t.dealsMarketplace.title}</h2>
      {filteredDeals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map(deal => (
            <DealCard key={deal.id} deal={deal} t={t.dealsMarketplace} language={document.documentElement.lang as 'en' | 'ar' | 'ku'} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 rounded-2xl">
            <p className="text-gray-400 font-medium">{t.dealsMarketplace.noResults || "No deals found for this governorate."}</p>
        </div>
      )}
    </section>
  );
};

export default DealsMarketplaceSlide;