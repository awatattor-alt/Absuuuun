import { APP_COPY } from '../constants';
import type { CompassResponse } from '../types';
import { delay } from '../utils/delay';

export async function getCompassGuidance(query: string): Promise<CompassResponse> {
  await delay(800);

  return {
    overview: `Strategic guidance for: ${query}`,
    nextSteps: [
      'Map local regulations and business licensing requirements in your target governorate.',
      'Validate demand with a small pilot and define measurable success criteria.',
      'Build partner relationships with local suppliers, legal advisors, and community channels.'
    ],
    complianceTip:
      'Always verify tax, labor, and sector-specific compliance obligations with current Iraqi regulations.'
  };
}

export function getPromptSuggestions(): string[] {
  return APP_COPY.promptSuggestions;
}
