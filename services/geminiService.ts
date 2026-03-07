import { GoogleGenAI, Type } from '@google/genai';
import { GEMINI_CONFIG } from '../constants';
import type { CompassResponse, GeminiRawResponse } from '../types';

const apiKey = process.env.API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    heading: { type: Type.STRING },
    summary: { type: Type.STRING },
    steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          details: { type: Type.STRING },
        },
        required: ['title', 'details'],
      },
    },
    tips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    markdown: { type: Type.STRING },
  },
  required: ['heading', 'summary', 'steps', 'tips', 'markdown'],
};

const buildPrompt = (query: string) => `
You are Iraq Compass, a practical strategy assistant.
Create a concise guidance roadmap for this user goal:
"${query}"

Rules:
- 4 to 6 actionable steps.
- Keep language clear and supportive.
- Include tips relevant to Iraq context when possible.
- Output JSON that matches the schema.
- Also include markdown version under "markdown" using headings, bullets, and bold emphasis.
`;

const buildFallbackResponse = (query: string): CompassResponse => ({
  heading: 'Starter Roadmap',
  summary: 'Gemini is unavailable right now, so here is a practical starter plan you can use immediately.',
  steps: [
    { title: 'Clarify your target', details: `Define success for: ${query}. Keep it measurable and time-bound.` },
    { title: 'Gather essentials', details: 'List needed skills, budget, and local contacts. Separate must-have vs nice-to-have.' },
    { title: 'Run a small pilot', details: 'Test your idea with a tiny version in 7 days and collect feedback quickly.' },
    { title: 'Review and scale', details: 'Keep what works, remove friction, and set weekly checkpoints for progress.' },
  ],
  tips: ['Start with one clear weekly goal.', 'Track progress in a simple note or spreadsheet.'],
  markdown: `## Starter Roadmap\n\nBecause Gemini is currently unavailable, use this practical plan:\n\n1. **Clarify your target**: define measurable success.\n2. **Gather essentials**: collect skills, budget, and contacts.\n3. **Run a small pilot**: test with minimum effort and learn fast.\n4. **Review and scale**: improve the plan each week.`,
});

const normalizeResponse = (raw: GeminiRawResponse): CompassResponse => ({
  heading: raw.heading?.trim() || 'Compass Guidance',
  summary: raw.summary?.trim() || 'Here is a practical roadmap to move forward.',
  steps:
    raw.steps
      ?.filter((step) => step.title && step.details)
      .map((step) => ({ title: String(step.title).trim(), details: String(step.details).trim() })) || [],
  tips: raw.tips?.map((tip) => tip.trim()).filter(Boolean) || [],
  markdown: raw.markdown?.trim() || '',
});

export const getCompassGuidance = async (query: string): Promise<CompassResponse> => {
  if (!query.trim()) {
    throw new Error('Please enter a question or goal first.');
  }

  if (!ai) {
    return buildFallbackResponse(query);
  }

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_CONFIG.model,
      contents: buildPrompt(query),
      config: {
        temperature: GEMINI_CONFIG.temperature,
        responseMimeType: 'application/json',
        responseSchema,
      },
    });

    const raw = JSON.parse(response.text.trim()) as GeminiRawResponse;
    const parsed = normalizeResponse(raw);

    if (!parsed.steps.length) {
      throw new Error('Gemini returned an incomplete roadmap.');
    }

    return parsed;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Gemini error';
    throw new Error(`Unable to generate guidance right now. ${message}`);
  }
};
