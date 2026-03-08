import { GoogleGenAI } from '@google/genai';
import { CompassQueryRequest, CompassResponse } from '../types/compass';
import { getGeminiApiKey } from '../utils/env';

const parseResponse = (text: string): CompassResponse => {
  const fallback: CompassResponse = {
    summary: text,
    steps: [
      {
        title: 'Step 1: Understand the Landscape',
        body: text
      }
    ],
    tip: 'Always verify local regulations and consult regional experts before execution.'
  };

  try {
    const parsed = JSON.parse(text) as Partial<CompassResponse>;
    if (!parsed.summary || !Array.isArray(parsed.steps) || !parsed.tip) {
      return fallback;
    }
    return {
      summary: parsed.summary,
      steps: parsed.steps.filter((step) => step?.title && step?.body) as CompassResponse['steps'],
      tip: parsed.tip
    };
  } catch {
    return fallback;
  }
};

const buildPrompt = (query: string) => `
You are an Iraq market and life strategy assistant.
Return valid JSON only with this exact schema:
{
  "summary": "short context",
  "steps": [{"title": "step title", "body": "detailed explanation"}],
  "tip": "one practical tip"
}

User query: ${query}
`;

export const requestCompassGuidance = async ({ query }: CompassQueryRequest): Promise<CompassResponse> => {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    return {
      summary: `Simulated guidance for: ${query}`,
      steps: [
        {
          title: 'Step 1: Validate demand',
          body: 'Interview your target audience and test assumptions with a small pilot.'
        },
        {
          title: 'Step 2: Build local operations',
          body: 'Map legal, vendor, and location requirements to execute reliably in Iraq.'
        }
      ],
      tip: 'Use local partnerships early to reduce execution risk and speed up launch.'
    };
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: buildPrompt(query)
  });

  return parseResponse(response.text || '');
};
