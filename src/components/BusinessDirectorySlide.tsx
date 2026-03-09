import React, { useState, useMemo, forwardRef } from 'react';
import type { TranslationSet, Business } from '../types';
import { MOCK_BUSINESSES, CATEGORIES, GOVERNORATES } from '../constants';
import GlassCard from './GlassCard';
import { Search, MapPin, Grid, List, Star, DollarSign, ArrowUpDown } from './IconComponents';

type ActiveFilters = {
  searchTerm: string;
  governorate: string;
  category: string;
  price: string;
  rating: string;
  sortBy: string;
};

interface BusinessDirectorySlideProps {
  t: TranslationSet;
  activeFilters: ActiveFilters;
  setActiveFilters: React.Dispatch<React.SetStateAction<ActiveFilters>>;
}

const BusinessListItem: React.FC<{ business: Business }> = ({ business }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20 transform hover:-translate-y-1">
    <img src={business.imageUrl} alt={business.name} className="w-full sm:w-32 h-24 object-cover rounded-lg flex-shrink-0" />
    <div className="flex-grow text-center sm:text-left">
      <h3 className="font-bold text-lg text-white">{business.name}</h3>
      <p className="text-sm text-gray-400 flex items-center justify-center sm:justify-start gap-1">
        <MapPin className="w-3 h-3"/>
        {business.governorate}
      </p>
       <div className="flex items-center justify-center sm:justify-start gap-1 mt-1 text-yellow-400">
        <Star className="w-4 h-4" />
        <span className="font-bold">{business.rating.toFixed(1)}</span>
      </div>
    </div>
    <div className="flex flex-col items-center sm:items-end gap-2">
        <span className={`text-xs capitalize bg-[#00D9FF]/20 text-[#00D9FF] px-3 py-1 rounded-full flex-shrink-0`}>{business.priceRange}</span>
        <span className="text-xs capitalize bg-[#FF2E97]/20 text-[#FF2E97] px-3 py-1 rounded-full flex-shrink-0">{business.category}</span>
    </div>
  </div>
);

const BusinessDirectorySlide = forwardRef<HTMLElement, BusinessDirectorySlideProps>(({ t, activeFilters, setActiveFilters }, ref) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const handleFilterChange = (key: keyof ActiveFilters, value: string) => {
    setActiveFilters(prev => ({...prev, [key]: value}));
  };

  const handleReset = () => {
    setActiveFilters({
      searchTerm: '',
      governorate: 'all',
      category: 'all',
      price: 'all',
      rating: 'all',
      sortBy: 'default'
    });
  };

  const filteredAndSortedBusinesses = useMemo(() => {
    let businesses = MOCK_BUSINESSES.filter(business => {
      return (
        (activeFilters.searchTerm === '' || business.name.toLowerCase().includes(activeFilters.searchTerm.toLowerCase())) &&
        (activeFilters.governorate === 'all' || business.governorate === activeFilters.governorate) &&
        (activeFilters.category === 'all' || business.category === activeFilters.category) &&
        (activeFilters.price === 'all' || business.priceRange === activeFilters.price) &&
        (activeFilters.rating === 'all' || business.rating >= parseFloat(activeFilters.rating))
      );
    });

    switch (activeFilters.sortBy) {
        case 'name-asc':
            businesses.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating-desc':
            businesses.sort((a, b) => b.rating - a.rating);
            break;
        case 'reviews-desc':
            businesses.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
        default:
            break;
    }

    return businesses;
  }, [activeFilters]);
  
  const glassSelectStyle = "bg-white/5 border border-white/20 rounded-lg backdrop-blur-lg focus:ring-2 focus:ring-[#00D9FF] focus:outline-none py-2 px-3 w-full";

  return (
    <section ref={ref} className="scroll-mt-24">
      <h2 className="text-3xl font-bold mb-6 tracking-tight">{t.businessDirectory.title}</h2>
      
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 flex flex-col gap-6 shadow-2xl shadow-black/20">
        <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-grow">
              <label htmlFor="directory-search" className="sr-only">{t.businessDirectory.searchPlaceholder}</label>
              <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none rtl:inset-r-0 rtl:ps-0 rtl:pe-4">
                <Search className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="directory-search"
                type="search"
                value={activeFilters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="w-full p-3.5 ps-12 rtl:pe-12 text-white bg-white/5 border border-white/20 rounded-xl backdrop-blur-lg focus:ring-2 focus:ring-[#00D9FF] focus:outline-none placeholder:text-gray-400 transition-all duration-300 focus:bg-white/10"
                placeholder={t.businessDirectory.searchPlaceholder}
                aria-label={t.businessDirectory.searchPlaceholder}
              />
            </div>
             <div className="bg-white/10 rounded-xl p-1.5 flex gap-1.5 self-start md:self-center border border-white/10">
              <button onClick={() => setViewMode('grid')} aria-label="Grid View" className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF] text-white shadow-lg' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                <Grid className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')} aria-label="List View" className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF] text-white shadow-lg' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                <List className="w-5 h-5" />
              </button>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <select aria-label={t.businessDirectory.filterByGovernorate} value={activeFilters.governorate} onChange={(e) => handleFilterChange('governorate', e.target.value)} className={glassSelectStyle}>
                {GOVERNORATES.map(gov => (
                    <option key={gov.id} value={gov.id} className="bg-[#0A0E27]">{t.governorates[gov.labelKey as keyof typeof t.governorates]}</option>
                ))}
            </select>
            <select aria-label={t.businessDirectory.filterByCategory} value={activeFilters.category} onChange={(e) => handleFilterChange('category', e.target.value)} className={glassSelectStyle}>
                <option value="all" className="bg-[#0A0E27]">{t.businessDirectory.allCategories}</option>
                {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id} className="bg-[#0A0E27]">{t.categories[cat.labelKey]}</option>
                ))}
            </select>
             <select aria-label={t.businessDirectory.filterByPrice} value={activeFilters.price} onChange={(e) => handleFilterChange('price', e.target.value)} className={glassSelectStyle}>
                <option value="all" className="bg-[#0A0E27]">{t.businessDirectory.priceAll}</option>
                <option value="low" className="bg-[#0A0E27]">{t.businessDirectory.priceLow}</option>
                <option value="mid" className="bg-[#0A0E27]">{t.businessDirectory.priceMid}</option>
                <option value="high" className="bg-[#0A0E27]">{t.businessDirectory.priceHigh}</option>
            </select>
             <select aria-label={t.businessDirectory.filterByRating} value={activeFilters.rating} onChange={(e) => handleFilterChange('rating', e.target.value)} className={glassSelectStyle}>
                <option value="all" className="bg-[#0A0E27]">{t.businessDirectory.ratingAll}</option>
                <option value="4" className="bg-[#0A0E27]">4+ Stars</option>
                <option value="3" className="bg-[#0A0E27]">3+ Stars</option>
                <option value="2" className="bg-[#0A0E27]">2+ Stars</option>
            </select>
            <select aria-label={t.businessDirectory.sortBy} value={activeFilters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)} className={glassSelectStyle}>
                <option value="default" className="bg-[#0A0E27]">{t.businessDirectory.sortDefault}</option>
                <option value="name-asc" className="bg-[#0A0E27]">A-Z</option>
                <option value="rating-desc" className="bg-[#0A0E27]">{t.highestRated}</option>
                <option value="reviews-desc" className="bg-[#0A0E27]">{t.mostReviewed}</option>
            </select>
            <button onClick={handleReset} className="px-4 py-2 bg-white/10 border border-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 h-full col-span-1 sm:col-span-2 lg:col-span-3 font-semibold text-sm">{t.businessDirectory.resetFilters}</button>
        </div>
      </div>

      {filteredAndSortedBusinesses.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedBusinesses.map(business => (
              <GlassCard
                key={business.id}
                imageUrl={business.imageUrl}
                title={business.name}
                subtitle={business.governorate}
                category={t.categories[business.category as keyof typeof t.categories] || business.category}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredAndSortedBusinesses.map(business => (
              <BusinessListItem key={business.id} business={business} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-20 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 rounded-2xl">
            <p className="text-gray-400 font-medium">{t.businessDirectory.noResults}</p>
        </div>
      )}
    </section>
  );
});

export default BusinessDirectorySlide;