
import { GoogleGenAI, Type } from "@google/genai";
import { Event } from '../types';

const key = import.meta.env.VITE_GEMINI_API_KEY ?? null;
const ai = key ? new GoogleGenAI({ apiKey: key }) : null;

const eventSchema = {
  type: Type.OBJECT,
  properties: {
    eventName: {
      type: Type.STRING,
      description: "The creative and engaging name of the event.",
    },
    description: {
      type: Type.STRING,
      description: "A short, enticing description of the event (max 2 sentences).",
    },
    city: {
      type: Type.STRING,
      description: "The Iraqi or Kurdish city where the event takes place (e.g., Baghdad, Erbil, Basra).",
    },
    suggestedDate: {
      type: Type.STRING,
      description: "A suggested date for the event, like 'Late July' or 'Mid-August 2024'.",
    },
  },
  required: ["eventName", "description", "city", "suggestedDate"],
};

export const generateCuratedEvents = async (): Promise<Event[]> => {
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a list of 6 diverse and creative fictional event ideas that could take place in various cities across Iraq and the Kurdistan region. Include events related to art, music, food, and technology.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: eventSchema,
        },
      },
    });

    const jsonText = response.text.trim();
    const events: Event[] = JSON.parse(jsonText);
    return events;
  } catch (error) {
    console.error("Error generating curated events:", error);
    return [];
  }
};
