import React from 'react';
import { ArrowLeft, Star, MapPin, Phone, Globe, Clock, Share2 } from 'lucide-react';
import { Lang, Business } from '../types';
import { CATEGORIES } from '../mockData';
import { getBusinessById } from '../services/businessService';

interface BusinessDetailProps {
  businessId: string;
  lang: Lang;
  onNavigate: (view: 'category' | 'home', id?: string) => void;
}

export const BusinessDetail: React.FC<BusinessDetailProps> = ({ businessId, lang, onNavigate }) => {
  const [business, setBusiness] = React.useState<Business | null>(null);
  const [loading, setLoading] = React.useState(true);
  const isAr = lang === 'ar';

  React.useEffect(() => {
    const fetchBusiness = async () => {
      setLoading(true);
      const data = await getBusinessById(businessId);
      setBusiness(data);
      setLoading(false);
    };
    fetchBusiness();
  }, [businessId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex justify-center py-12">
        <span className="text-4xl animate-spin">⏳</span>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-stone-50 p-8 text-center pt-20">
        <div className="text-4xl mb-2">📭</div>
        <p className="text-gray-500">{isAr ? "لم يتم العثور على المكان" : "Place not found"}</p>
        <button 
          onClick={() => onNavigate('home')}
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-full font-bold active:scale-95 transition-transform"
        >
          {isAr ? "العودة للرئيسية" : "Go Home"}
        </button>
      </div>
    );
  }

  const category = CATEGORIES.find(c => c.id === business.category_id);

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Hero Header */}
      <div className={`${category?.color || 'bg-gray-200'} p-6 pt-12 rounded-b-3xl shadow-sm relative`}>
        <button 
          onClick={() => onNavigate('category', business.category_id)}
          className="absolute top-12 left-6 p-2 bg-white/50 rounded-full hover:bg-white/80 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button 
          className="absolute top-12 right-6 p-2 bg-white/50 rounded-full hover:bg-white/80 transition-colors"
        >
          <Share2 className="w-6 h-6 text-gray-800" />
        </button>
        
        <div className="text-center mt-8">
          <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center text-4xl mb-4">
            {category?.icon || '🏢'}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isAr ? business.name_ar : business.name}
          </h1>
          <p className="text-sm text-gray-600 font-medium mb-4">
            {business.city} · {isAr ? category?.name_ar : category?.name}
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="flex items-center text-sm font-bold text-gray-800 bg-white/50 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-amber-500 mr-1 fill-amber-500" />
              {business.rating} <span className="text-gray-500 ml-1 font-medium">({business.review_count})</span>
            </div>
            <div className={`text-xs font-bold px-3 py-1 rounded-full ${business.is_open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {business.is_open ? (isAr ? 'مفتوح الآن' : 'Open Now') : (isAr ? 'مغلق' : 'Closed')}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 -mt-4 relative z-10">
        {business.is_sponsored && (
          <div className="bg-amber-100 text-amber-800 text-sm font-bold px-4 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-sm border border-amber-200">
            ✨ {isAr ? "مكان مميز" : "Featured Business"}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <a 
            href={`tel:${business.phone}`}
            className="bg-orange-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
          >
            <Phone className="w-5 h-5" />
            {isAr ? "اتصل الآن" : "Call Now"}
          </a>
          <button 
            className="bg-white text-gray-800 font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm border border-gray-200 active:scale-95 transition-transform"
          >
            <MapPin className="w-5 h-5 text-orange-500" />
            {isAr ? "الاتجاهات" : "Directions"}
          </button>
        </div>

        {/* About Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            ℹ️ {isAr ? "عن المكان" : "About"}
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            {isAr ? business.description_ar : business.description}
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            📋 {isAr ? "التفاصيل" : "Details"}
          </h2>
          
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium text-gray-900 mb-0.5">{isAr ? "العنوان" : "Address"}</p>
              <p>{isAr ? business.address_ar : business.address}</p>
            </div>
          </div>

          {business.phone && (
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-medium text-gray-900 mb-0.5">{isAr ? "رقم الهاتف" : "Phone"}</p>
                <p dir="ltr" className="text-left">{business.phone}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium text-gray-900 mb-0.5">{isAr ? "ساعات العمل" : "Hours"}</p>
              <p>{business.is_open ? (isAr ? 'مفتوح الآن' : 'Open Now') : (isAr ? 'مغلق' : 'Closed')}</p>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border-2 border-dashed border-green-200">
          <div className="h-32 flex flex-col items-center justify-center text-center">
            <MapPin className="w-8 h-8 text-green-500 mb-2 opacity-50" />
            <p className="text-sm font-medium text-green-800">
              {isAr ? "الخريطة قريباً — سيتم ربط خرائط جوجل بعد Supabase" : "Map coming soon — connect Google Maps after Supabase"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
