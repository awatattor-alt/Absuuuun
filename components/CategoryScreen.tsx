import React from 'react';
import { ArrowLeft, Star, MapPin, Phone } from 'lucide-react';
import { Lang, City, CategoryId, Business } from '../types';
import { CATEGORIES } from '../mockData';
import { getBusinessesByCategory } from '../services/businessService';

interface CategoryScreenProps {
  categoryId: CategoryId;
  city: City;
  lang: Lang;
  onNavigate: (view: 'home' | 'business', id?: string) => void;
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({ categoryId, city, lang, onNavigate }) => {
  const [businesses, setBusinesses] = React.useState<Business[]>([]);
  const [loading, setLoading] = React.useState(true);
  const isAr = lang === 'ar';

  const category = CATEGORIES.find(c => c.id === categoryId);

  React.useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      const data = await getBusinessesByCategory(categoryId, city);
      setBusinesses(data);
      setLoading(false);
    };
    fetchBusinesses();
  }, [categoryId, city]);

  if (!category) return null;

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <div className={`${category.color} p-6 pt-12 rounded-b-3xl shadow-sm relative`}>
        <button 
          onClick={() => onNavigate('home')}
          className="absolute top-12 left-6 p-2 bg-white/50 rounded-full hover:bg-white/80 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
        <div className="text-center mt-2">
          <div className="text-4xl mb-2">{category.icon}</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {isAr ? category.name_ar : category.name}
          </h1>
          <p className="text-sm text-gray-600 font-medium">
            {city} · {businesses.length} {isAr ? "أماكن" : "places"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="text-4xl animate-spin">⏳</span>
          </div>
        ) : businesses.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm mt-8">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-gray-500">{isAr ? "لا توجد أماكن في هذه الفئة" : "No places found in this category"}</p>
          </div>
        ) : (
          businesses.map(b => (
            <button
              key={b.id}
              onClick={() => onNavigate('business', b.id)}
              className={`w-full text-start bg-white rounded-2xl shadow-sm p-4 active:scale-95 transition-transform relative overflow-hidden ${b.is_sponsored ? 'ring-2 ring-amber-400' : ''}`}
            >
              {b.is_sponsored && (
                <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                  ✨ {isAr ? "مميز" : "Sponsored"}
                </div>
              )}
              
              <div className="flex justify-between items-start mb-2 pr-16">
                <h3 className="font-bold text-lg text-gray-900">
                  {isAr ? b.name_ar : b.name}
                </h3>
              </div>
              
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <Star className="w-4 h-4 text-amber-500 mr-1 fill-amber-500" />
                  {b.rating} <span className="text-gray-400 ml-1">({b.review_count})</span>
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-md ${b.is_open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {b.is_open ? (isAr ? 'مفتوح' : 'Open') : (isAr ? 'مغلق' : 'Closed')}
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="truncate">{isAr ? b.address_ar : b.address}</span>
                </div>
                {b.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{b.phone}</span>
                  </div>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
