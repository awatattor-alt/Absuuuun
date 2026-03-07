import { GoogleGenAI } from '@google/genai';

const key = import.meta.env.VITE_GEMINI_API_KEY;

export const askGemini = async (prompt: string): Promise<string> => {
  if (!key) {
    return 'AI key is not configured. Add VITE_GEMINI_API_KEY to use Gemini suggestions.';
  }

  const ai = new GoogleGenAI({ apiKey: key });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text?.trim() || 'No response generated.';
};
