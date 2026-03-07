export type City = 'Sulaymaniyah' | 'Erbil' | 'Baghdad' | 'Basra' | 'Mosul' | 'Kirkuk' | 'Duhok' | 'Najaf';
export type CategoryId = 'restaurants' | 'cafes' | 'museums' | 'hotels' | 'hospitals' | 'pharmacies' | 'banks' | 'parks' | 'shopping';

export interface Category {
  id: CategoryId;
  name: string;
  name_ar: string;
  icon: string;
  color: string;
  accent: string;
}

export interface Business {
  id: string;
  name: string;
  name_ar: string;
  category_id: CategoryId;
  city: City;
  address: string;
  address_ar: string;
  phone: string;
  rating: number;
  review_count: number;
  lat: number;
  lng: number;
  is_sponsored: boolean;
  is_open: boolean;
  description: string;
  description_ar: string;
  created_at: string;
}

export type Screen =
  | { view: 'home' }
  | { view: 'category'; categoryId: CategoryId }
  | { view: 'business'; businessId: string };

export type Lang = 'en' | 'ar';
