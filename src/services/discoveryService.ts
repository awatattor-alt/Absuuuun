import type { DiscoveryItem } from '../types';
import { delay } from '../utils/delay';

const MOCK_BUSINESSES: DiscoveryItem[] = [
  {
    id: 'baghdad-tech-hub',
    name: 'Baghdad Tech Hub',
    category: 'Technology',
    city: 'Baghdad',
    summary: 'Coworking, startup mentorship, and ecosystem support for early-stage founders.'
  },
  {
    id: 'basra-trade-network',
    name: 'Basra Trade Network',
    category: 'Logistics',
    city: 'Basra',
    summary: 'Business network focused on supply-chain opportunities and trade operations.'
  },
  {
    id: 'erbil-growth-studio',
    name: 'Erbil Growth Studio',
    category: 'Marketing',
    city: 'Erbil',
    summary: 'Digital growth advisory for SMEs seeking customer acquisition and retention.'
  }
];

export async function discoverBusinesses(keyword: string): Promise<DiscoveryItem[]> {
  await delay(500);

  if (!keyword.trim()) {
    return MOCK_BUSINESSES;
  }

  const lowered = keyword.toLowerCase();
  return MOCK_BUSINESSES.filter((item) =>
    [item.name, item.category, item.city, item.summary].some((value) => value.toLowerCase().includes(lowered))
  );
}
