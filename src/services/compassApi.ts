import { GoogleGenAI } from '@google/genai';
import type { CompassResponse } from '../types/compass';
import { GEMINI_API_KEY } from '../utils/env';

const MODEL = 'gemini-2.5-flash';

const SYSTEM_PROMPT = `You are Iraq Compass, a practical advisor for business and life planning in Iraq.
Respond with concise, actionable advice in plain text under 200 words.
Use bullet points where useful and focus on realistic next steps.`;

export async function fetchCompassGuidance(query: string): Promise<CompassResponse> {
  if (!GEMINI_API_KEY) {
    return {
      summary: `Demo mode: Here is a starter plan for "${query}".\n• Clarify your goal and budget.\n• Validate local demand with 10 interviews.\n• Check permits, taxes, and legal requirements before launch.`,
    };
  }

  const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const response = await client.models.generateContent({
    model: MODEL,
    contents: `${SYSTEM_PROMPT}\n\nUser query: ${query}`,
  });

  return {
    summary: response.text || 'No response was generated. Please try again.',
  };
}
