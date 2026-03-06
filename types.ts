import type { ComponentType } from 'react';

export type Language = 'en' | 'ar' | 'ku';

export type ListingType = 'events' | 'restaurants' | 'cafes' | 'hotels' | 'experiences' | 'deals';
export type SortOption = 'default' | 'rating' | 'newest' | 'price_low' | 'price_high';

export interface Story {
  id: number;
  username: string;
  avatarUrl: string;
}

export interface Subcategory {
  id: string;
  labelKey: keyof TranslationSet['subcategories'];
}

export interface Category {
  id: string;
  labelKey: keyof TranslationSet['categories'];
  icon: ComponentType<{ className?: string }>;
  subcategories: Subcategory[];
}

export interface Business {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  governorate: string;
  isAccessible?: boolean;
  rating: number;
  priceRange: 'low' | 'mid' | 'high';
  amenities: string[];
}

export interface Event {
  eventName: string;
  description: string;
  city: string;
  suggestedDate: string;
}

export interface Deal {
  id: number;
  businessName: string;
  title: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  claimed: number;
  total: number;
  expiresAt: Date;
  governorate: string;
}

export interface City {
  id: string;
  name_en: string;
  name_ar: string;
  name_ku: string;
  image_url: string;
}

export interface Listing {
  id: string;
  type: ListingType;
  title: string;
  city: string;
  image_url: string;
  price?: string;
  price_range?: string;
  rating: number;
  description: string;
  tags: string[];
  featured: boolean;
  phone?: string;
  website?: string;
  opening_hours?: string;
  event_datetime?: string;
  created_at: string;
}

export interface TranslationSet {
  [key: string]: unknown;
  appName?: string;
  tagline?: string;
  nav?: {
    home?: string;
    cities: string;
    directory?: string;
    deals: string;
    about?: string;
  };
  common?: {
    search: string;
    searchPlaceholder: string;
    city: string;
    allCities: string;
    allTypes: string;
    type: string;
    rating: string;
    price: string;
    share: string;
    copied: string;
    featured: string;
    viewDetails: string;
    noResults: string;
    reset: string;
    newest: string;
    byRating: string;
    lowToHigh: string;
    highToLow: string;
    all: string;
  };
  home?: {
    heroTitle: string;
    heroSubtitle: string;
    browseCities: string;
    tonight: string;
    featuredVenues: string;
    deals: string;
    categoriesTitle: string;
    categoryTabs: Record<ListingType, string>;
  };
  cityPage?: {
    searchInCity: string;
    tabs: {
      all: string;
      events: string;
      restaurantsAndCafes: string;
      hotels: string;
      experiences: string;
    };
  };
  directory?: {
    title: string;
    searchPlaceholder: string;
    filterType: string;
    filterCity: string;
    filterPrice: string;
    filterRating: string;
    sortBy: string;
  };
  listing?: {
    related: string;
    openingHours: string;
    eventTime: string;
    phone: string;
    website: string;
  };
  searchPage?: {
    title: string;
    subtitle: string;
  };
  about?: {
    title: string;
    body: string;
  };
  footer?: {
    linksTitle: string;
    copyright: string;
  };
  governorates: {
    all: string;
    baghdad: string;
    erbil: string;
    basra: string;
    slemani: string;
    duhok: string;
  };
  categories: {
    food: string;
    events: string;
    hotels: string;
    shopping: string;
    tourism: string;
    business: string;
    health: string;
    transport: string;
    emergency: string;
  };
  subcategories: {
    [key: string]: string;
  };

  header?: { home: string; explore: string; businesses: string; deals: string; login: string; };
  hero?: { [key: string]: string; };
  featuredBusinesses?: { title: string; };
  curatedEvents?: { [key: string]: string; };
  dealsMarketplace?: { [key: string]: string; };
  businessDirectory?: { [key: string]: string; };
  storyViewer?: { close: string; next: string; previous: string; };
  cityNavigator?: { [key: string]: string; };
  accessibilityHub?: { [key: string]: string; };
}
