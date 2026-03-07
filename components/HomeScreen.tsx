import React from 'react';
import { Search, MapPin, Home, Bookmark } from 'lucide-react';
import { Lang, City, CategoryId } from '../types';
import { CITIES, CATEGORIES } from '../mockData';
import { getFeaturedBusinesses } from '../services/businessService';
import type { Business } from '../types';

interface HomeScreenProps {
  lang: Lang;
  city: City;
  onCityChange: (city: City) => void;
  onNavigate: (view: 'category' | 'business', id: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ lang, city, onCityChange, onNavigate }) => {
  const [featured, setFeatured] = React.useState<Business[]>([]);
  const [loading, setLoading] = React.useState(true);
  const isAr = lang === 'ar';

  React.useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      const data = await getFeaturedBusinesses(city);
      setFeatured(data);
      setLoading(false);
    };
    fetchFeatured();
  }, [city]);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 pt-12 rounded-b-3xl shadow-md text-white">
        <h1 className="text-3xl font-bold mb-4">🧭 Iraq Compass</h1>
        
        <div className="mb-4">
          <select 
            value={city} 
            onChange={(e) => onCityChange(e.target.value as City)}
            className="w-full bg-white/20 border border-white/30 text-white rounded-xl p-3 outline-none focus:ring-2 focus:ring-white/50 appearance-none font-medium"
          >
            {CITIES.map(c => (
              <option key={c} value={c} className="text-gray-800">{c}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder={isAr ? "ابحث عن الأماكن..." : "Search places..."}
            className="w-full bg-white text-gray-800 rounded-full p-3 ps-12 outline-none shadow-sm focus:ring-2 focus:ring-amber-300"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="p-4 mt-2">
        <div className="bg-white rounded-2xl shadow-sm p-4 grid grid-cols-3 gap-4">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => onNavigate('category', cat.id)}
              className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-stone-50 active:scale-95 transition-transform"
            >
              <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center text-2xl mb-2 shadow-sm`}>
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">
                {isAr ? cat.name_ar : cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          ⭐ {isAr ? "أماكن مميزة" : "Featured"}
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <span className="text-4xl animate-spin">⏳</span>
          </div>
        ) : featured.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-gray-500">{isAr ? "لا توجد أماكن مميزة" : "No featured places"}</p>
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
            {featured.map(b => (
              <button 
                key={b.id}
                onClick={() => onNavigate('business', b.id)}
                className="min-w-[240px] bg-white rounded-2xl shadow-sm p-4 text-start snap-start active:scale-95 transition-transform border border-amber-100"
              >
                <div className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-md font-bold mb-2">
                  ✨ {isAr ? "مميز" : "Sponsored"}
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">
                  {isAr ? b.name_ar : b.name}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="text-amber-500 mr-1">★</span> {b.rating} ({b.review_count})
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {isAr ? b.address_ar : b.address}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[448px] mx-auto bg-white border-t border-gray-200 flex justify-around p-3 pb-safe">
        <button className="flex flex-col items-center text-orange-500">
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">{isAr ? "الرئيسية" : "Home"}</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-orange-500">
          <Search className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">{isAr ? "بحث" : "Search"}</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-orange-500">
          <MapPin className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">{isAr ? "قريب" : "Nearby"}</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-orange-500">
          <Bookmark className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">{isAr ? "محفوظات" : "Saved"}</span>
        </button>
      </div>
    </div>
  );
};
