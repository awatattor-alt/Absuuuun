import React from 'react';
import type { TranslationSet } from '../types';
import GlassCard from './GlassCard';
import { MOCK_BUSINESSES } from '../constants';

interface FeaturedBusinessesSlideProps {
  t: TranslationSet;
  selectedGovernorate: string;
}

const FeaturedBusinessesSlide: React.FC<FeaturedBusinessesSlideProps> = ({ t, selectedGovernorate }) => {
  const featured = MOCK_BUSINESSES
    .filter(business => selectedGovernorate === 'all' || business.governorate === selectedGovernorate)
    .slice(0, 8);

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">{t.featuredBusinesses.title}</h2>
      {featured.length > 0 ? (
        <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 hide-scrollbar">
          {featured.map(business => (
            <div key={business.id} className="w-80 md:w-96 flex-shrink-0">
              <GlassCard
                imageUrl={business.imageUrl}
                title={business.name}
                subtitle={business.governorate}
                category={business.category}
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