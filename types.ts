export interface CompassStep {
  title: string;
  explanation: string;
  action: string;
}

export interface CompassResponse {
  summary: string;
  steps: CompassStep[];
  safetyNote: string;
}
