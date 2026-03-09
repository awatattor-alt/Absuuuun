import React from 'react';
import type { TranslationSet, Business } from '../types';
import GlassCard from './GlassCard';
import { MOCK_BUSINESSES } from '../constants';

interface FeaturedBusinessesSlideProps {
  t: TranslationSet;
  selectedGovernorate: string;
  onBusinessSelect?: (business: Business) => void;
}

const FeaturedBusinessesSlide: React.FC<FeaturedBusinessesSlideProps> = ({ t, selectedGovernorate, onBusinessSelect }) => {
  const featured = MOCK_BUSINESSES
    .filter(business => selectedGovernorate === 'all' || business.governorate === selectedGovernorate)
    .slice(0, 8);

  return (
    <section>
      <div className="mb-6">
      <h2 className="text-3xl font-bold">{t.featuredInIraq}</h2>
      <p className="text-gray-400 mt-2">{t.highestRatedSub}</p>
      </div>
      {featured.length > 0 ? (
        <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 hide-scrollbar">
          {featured.map(business => (
            <div key={business.id} className="w-80 md:w-96 flex-shrink-0">
              <GlassCard
                onClick={() => onBusinessSelect?.(business)}
                imageUrl={business.imageUrl}
                title={business.name}
                subtitle={business.governorate}
                category={t.categories[business.category as keyof typeof t.categories] || business.category}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 rounded-2xl">
            <p className="text-gray-400 font-medium">{t.featuredBusinesses.noResults || "No featured businesses found for this governorate."}</p>
        </div>
      )}
    </section>
  );
};

export default FeaturedBusinessesSlide;