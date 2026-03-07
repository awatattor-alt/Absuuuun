import { GoogleGenAI, Type } from '@google/genai';
import type { CompassResponse } from '../types';

const apiKey = import.meta.env.VITE_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || process.env.API_KEY;

const aiClient = apiKey ? new GoogleGenAI({ apiKey }) : null;

const mockResponse = (query: string): CompassResponse => ({
  title: `Roadmap for: ${query}`,
  steps: [
    {
      title: 'Define the target clearly',
      body: 'Break your goal into one specific outcome, your timeline, and the city/context in Iraq where you will execute it.',
    },
    {
      title: 'Gather trusted local resources',
      body: 'List official institutions, documents, and support channels you need before taking action.',
    },
    {
      title: 'Start with one immediate action',
      body: 'Complete one concrete next step in the next 24 hours to create momentum and reduce uncertainty.',
    },
  ],
  tips: [
    'Validate legal or medical advice with official local experts.',
    'Track progress weekly and adjust based on what works.',
    'Ask for help early from community groups or professionals.',
  ],
});

export const getCompassGuidance = async (query: string): Promise<CompassResponse> => {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error('Please enter a goal or question.');
  }

  if (!aiClient) {
    return mockResponse(trimmed);
  }

  const prompt = `You are Iraq Compass. Create a practical roadmap for this request: "${trimmed}". Keep advice realistic and concise.`;

  const response = await aiClient.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                body: { type: Type.STRING },
              },
              required: ['title', 'body'],
            },
          },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ['title', 'steps', 'tips'],
      },
    },
  });

  const parsed = JSON.parse(response.text) as CompassResponse;
  return parsed;
};
