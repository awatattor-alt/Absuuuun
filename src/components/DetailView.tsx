import React from 'react';
import type { Business, TranslationSet } from '../types';
import { MOCK_BUSINESSES } from '../constants';
import GlassCard from './GlassCard';

interface DetailViewProps {
  business: Business;
  t: TranslationSet;
  onBack: () => void;
  onSelectBusiness: (business: Business) => void;
}

const DetailView: React.FC<DetailViewProps> = ({ business, t, onBack, onSelectBusiness }) => {
  const relatedBusinesses = MOCK_BUSINESSES.filter((item) => item.category === business.category && item.id !== business.id).slice(0, 3);
  const categoryName = t.categories[business.category as keyof typeof t.categories] ?? business.category;

  return (
    <section className="space-y-6">
      <button onClick={onBack} className="px-4 py-2 bg-white/10 rounded-lg border border-white/10">← Back</button>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <img src={business.imageUrl} alt={business.name} className="w-full h-64 object-cover rounded-xl mb-4" />
        <h2 className="text-3xl font-bold">{business.name}</h2>
        <p className="text-gray-400 mt-2">{business.governorate} · {categoryName}</p>
      </div>

      {relatedBusinesses.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">More in {categoryName}</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {relatedBusinesses.map((item) => (
              <div key={item.id} className="w-64 flex-shrink-0">
                <GlassCard
                  compact
                  imageUrl={item.imageUrl}
                  title={item.name}
                  subtitle={item.governorate}
                  category={t.categories[item.category as keyof typeof t.categories] ?? item.category}
                  onClick={() => onSelectBusiness(item)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailView;
