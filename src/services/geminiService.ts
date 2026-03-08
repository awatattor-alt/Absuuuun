
import { GoogleGenAI, Type } from "@google/genai";
import { Event } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a mock implementation.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

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

const mockEvent: Event = {
    eventName: "Tigris River Night Market",
    description: "Experience a vibrant market along the Tigris with local crafts, food stalls, and live traditional music.",
    city: "Baghdad",
    suggestedDate: "Every Thursday Evening"
};

export const generateCuratedEvents = async (): Promise<Event[]> => {
  if (!process.env.API_KEY) {
    // Return mock data if API key is not available
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Array(6).fill(mockEvent).map((e, i) => ({...e, eventName: `${e.eventName} #${i+1}`})));
        }, 1500);
    });
  }

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
    throw new Error("Failed to generate events from AI.");
  }
};
