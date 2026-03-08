export interface DiscoveryItem {
  id: string;
  name: string;
  category: string;
  city: string;
  summary: string;
}

export interface CompassResponse {
  overview: string;
  nextSteps: string[];
  complianceTip: string;
}
