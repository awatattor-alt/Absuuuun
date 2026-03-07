# Iraq Compass

Iraq Compass is a Gemini-powered React + TypeScript app that helps users turn goals into practical, step-by-step roadmaps.

## Features

- Mobile-first landing screen with a clear prompt and CTA.
- Structured results view with roadmap steps, tips, and markdown output.
- Friendly empty, loading, and error states.
- Typed Gemini service layer with fallback guidance when API key is missing.

## Tech Stack

- Vite
- React 19 + TypeScript
- Gemini API via `@google/genai`

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your Gemini key to `.env.local`:
   ```bash
   API_KEY=your_gemini_api_key
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
