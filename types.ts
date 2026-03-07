export interface CompassStep {
  title: string;
  body: string;
}

export interface CompassResponse {
  title: string;
  steps: CompassStep[];
  tips: string[];
}
