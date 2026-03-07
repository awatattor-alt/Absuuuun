export interface CompassStep {
  title: string;
  details: string;
}

export interface CompassResponse {
  heading: string;
  summary: string;
  steps: CompassStep[];
  tips: string[];
  markdown: string;
}

export interface GeminiRawResponse {
  heading?: string;
  summary?: string;
  steps?: Array<Partial<CompassStep>>;
  tips?: string[];
  markdown?: string;
}
