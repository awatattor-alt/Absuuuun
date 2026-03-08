export interface CompassQueryRequest {
  query: string;
}

export interface CompassStep {
  title: string;
  body: string;
}

export interface CompassResponse {
  summary: string;
  steps: CompassStep[];
  tip: string;
}
