// FIX: Import ComponentType from React to be used in the Category interface.
import type { ComponentType } from 'react';

export type Language = 'en' | 'ar' | 'ku';

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
  // FIX: Use imported ComponentType to fix "Cannot find namespace 'React'" error.
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

export interface TranslationSet {
  header: {
    home: string;
    explore: string;
    businesses: string;
    deals: string;
    login: string;
  },
  hero: {
    mainTitle: string;
    searchPlaceholder: string;
    searchButton: string;
    voiceSearchTooltip: string;
    listening: string;
    filterByGovernorate: string;
  },
  governorates: {
    all: string;
    baghdad: string;
    erbil: string;
    basra: string;
    slemani: string;
    duhok: string;
  },
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
  },
  subcategories: {
    [key: string]: string;
  },
  categoryModal: {
    title: string;
    allCategory: string;
  },
  featuredBusinesses: {
    title: string;
  },
  curatedEvents: {
    title: string;
    description: string;
    generateButton: string;
    generating: string;
    error: string;
    aiCurated: string;
  },
  dealsMarketplace: {
    title: string;
    claimed: string;
    expiresIn: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  },
  businessDirectory: {
    title: string;
    searchPlaceholder: string;
    filterByGovernorate: string;
    filterByCategory: string;
    filterByPrice: string;
    filterByRating: string;
    sortBy: string;
    allGovernorates: string;
    allCategories: string;
    priceAll: string;
    priceLow: string;
    priceMid: string;
    priceHigh: string;
    ratingAll: string;
    sortDefault: string;
    sortNameAsc: string;
    sortRatingDesc: string;
    resetFilters: string;
    noResults: string;
  },
  storyViewer: {
    close: string;
    next: string;
    previous: string;
  },
  cityNavigator: {
    title: string;
    description: string;
    searchPlaceholder: string;
    planJourneyButton: string;
  },
  accessibilityHub: {
    title: string;
    description: string;
    settingsTitle: string;
    fontSize: string;
    fontSizeSmall: string;
    fontSizeDefault: string;
    fontSizeLarge: string;
    reduceMotion: string;
    motionEnabled: string;
    motionReduced: string;
    findInclusiveEventsTitle: string;
    accessibleVenue: string;
  }
}