import { GoogleGenAI, Type } from '@google/genai';
import { CompassResponse } from '../types';

const apiKey =
  import.meta.env.VITE_GEMINI_API_KEY ||
  import.meta.env.GEMINI_API_KEY ||
  process.env.GEMINI_API_KEY ||
  process.env.API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const fallbackResponse = (query: string): CompassResponse => ({
  summary: `Here is a starter plan for: ${query}`,
  steps: [
    {
      title: 'Clarify your goal',
      explanation: 'Write down exactly what you need and your city so local rules are easier to match.',
      action: 'Create a short checklist with timeline, budget, and location.',
    },
    {
      title: 'Collect verified local sources',
      explanation: 'Use official ministry/government pages and known local providers before social media posts.',
      action: 'Cross-check at least 2 trusted sources and save phone numbers.',
    },
    {
      title: 'Take the first practical step',
      explanation: 'Start with the easiest high-impact action to build momentum.',
      action: 'Book one appointment or submit one required form today.',
    },
  ],
  safetyNote:
    'AI output may be incomplete or outdated. Confirm legal, medical, and safety details with official local authorities.',
});

export async function getCompassGuidance(query: string): Promise<CompassResponse> {
  if (!query.trim()) {
    throw new Error('Please enter a question.');
  }

  if (!ai) {
    return fallbackResponse(query);
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `You are Iraq Compass, a practical assistant for people in Iraq. Return concise, actionable local guidance for this user query: ${query}`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                explanation: { type: Type.STRING },
                action: { type: Type.STRING },
              },
              required: ['title', 'explanation', 'action'],
            },
          },
          safetyNote: { type: Type.STRING },
        },
        required: ['summary', 'steps', 'safetyNote'],
      },
    },
  });

  const parsed = JSON.parse(response.text) as CompassResponse;
  return parsed;
}
