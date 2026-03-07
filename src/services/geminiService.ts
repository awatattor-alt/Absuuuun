import { GoogleGenAI, Type } from '@google/genai';

const key = import.meta.env.VITE_GEMINI_API_KEY;

export type CompassPlanStep = {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
};

export type CompassPlan = {
  destination: string;
  summary: string;
  steps: CompassPlanStep[];
};

type RawCompassPlan = {
  destination?: string;
  summary?: string;
  steps?: Array<{
    title?: string;
    description?: string;
    estimatedTime?: string;
  }>;
};

const buildFallbackPlan = (goal: string): CompassPlan => ({
  destination: goal,
  summary: `A practical starter roadmap for reaching "${goal}".`,
  steps: [
    {
      id: 'fallback-1',
      title: 'Clarify the exact objective',
      description: 'Define what success looks like and write one measurable outcome to aim for.',
      estimatedTime: '15-30 min',
    },
    {
      id: 'fallback-2',
      title: 'Map required resources',
      description: 'List tools, people, budget, and skills you need before starting.',
      estimatedTime: '30-45 min',
    },
    {
      id: 'fallback-3',
      title: 'Break the journey into milestones',
      description: 'Create 3-5 milestones, each with one clear deliverable you can complete.',
      estimatedTime: '45-60 min',
    },
    {
      id: 'fallback-4',
      title: 'Start the first actionable task',
      description: 'Pick the easiest high-impact task and schedule it now to build momentum.',
      estimatedTime: '60+ min',
    },
  ],
});

const toCompassPlan = (raw: RawCompassPlan, goal: string): CompassPlan => {
  const steps = Array.isArray(raw.steps)
    ? raw.steps
      .filter((step) => step?.title && step?.description)
      .slice(0, 8)
      .map((step, index) => ({
        id: `step-${index + 1}`,
        title: step.title?.trim() || `Step ${index + 1}`,
        description: step.description?.trim() || 'No details provided.',
        estimatedTime: step.estimatedTime?.trim() || 'Flexible',
      }))
    : [];

  if (!steps.length) {
    return buildFallbackPlan(goal);
  }

  return {
    destination: raw.destination?.trim() || goal,
    summary: raw.summary?.trim() || `Roadmap to achieve: ${goal}`,
    steps,
  };
};

export const askGemini = async (prompt: string): Promise<string> => {
  if (!key) {
    return 'AI key is not configured. Add VITE_GEMINI_API_KEY to use Gemini suggestions.';
  }

  const ai = new GoogleGenAI({ apiKey: key });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || 'No response generated.';
  } catch (error) {
    console.error('Gemini text generation failed:', error);
    return 'Unable to reach Gemini right now. Please try again in a moment.';
  }
};

export const generateCompassPlan = async (goal: string): Promise<CompassPlan> => {
  const normalizedGoal = goal.trim();
  if (!normalizedGoal) {
    throw new Error('Please enter a goal or destination first.');
  }

  if (!key) {
    return buildFallbackPlan(normalizedGoal);
  }

  const ai = new GoogleGenAI({ apiKey: key });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a practical step-by-step action plan for this user goal: "${normalizedGoal}". Keep it concise and execution-oriented.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            destination: { type: Type.STRING },
            summary: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  estimatedTime: { type: Type.STRING },
                },
                required: ['title', 'description', 'estimatedTime'],
              },
            },
          },
          required: ['destination', 'summary', 'steps'],
        },
      },
    });

    const raw = JSON.parse((response.text || '').trim()) as RawCompassPlan;
    return toCompassPlan(raw, normalizedGoal);
  } catch (error) {
    console.error('Gemini compass plan generation failed:', error);
    return buildFallbackPlan(normalizedGoal);
  }
};
