import { Category, Business, City, CategoryId } from '../types';
import { CATEGORIES, MOCK_BUSINESSES } from '../mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCategories = async (): Promise<Category[]> => {
  await delay(400);
  return CATEGORIES;
};

export const getFeaturedBusinesses = async (city: City): Promise<Business[]> => {
  await delay(400);
  return MOCK_BUSINESSES
    .filter(b => b.city === city && b.is_sponsored)
    .slice(0, 4);
};

export const getBusinessesByCategory = async (categoryId: CategoryId, city: City): Promise<Business[]> => {
  await delay(400);
  const businesses = MOCK_BUSINESSES.filter(b => b.category_id === categoryId && b.city === city);
  
  // Sort sponsored first
  return businesses.sort((a, b) => {
    if (a.is_sponsored && !b.is_sponsored) return -1;
    if (!a.is_sponsored && b.is_sponsored) return 1;
    return 0;
  });
};

export const getBusinessById = async (id: string): Promise<Business | null> => {
  await delay(400);
  return MOCK_BUSINESSES.find(b => b.id === id) || null;
};
