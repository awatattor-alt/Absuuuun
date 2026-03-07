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
# Absuuuun Frontend

A React + TypeScript + Vite frontend with route-based pages, protected areas, API integration with mock fallback, and unit tests.

## Features implemented

- Main routes: Home, About, Dashboard, Profile, Login, Signup, and 404 fallback.
- Shared layout with responsive top navigation and footer.
- CSS Modules used consistently for responsive styling.
- API integration through `src/services/apiService.ts` with `fetch` and local mock fallback.
- Login/Signup validation with `react-hook-form`.
- Loading and error states on data-driven pages.
- Unit tests using Jest + React Testing Library.
- Deployment config for both Vercel and Netlify.

## Assumptions

- API base URL is optionally provided through `VITE_API_BASE_URL`.
- Expected API endpoints (if backend exists):
  - `GET /api/features`
  - `GET /api/about`
  - `GET /api/dashboard`
  - `GET /api/profile`
  - `POST /api/login`
  - `POST /api/signup`
- If endpoints are unavailable, the app falls back to mock data so it remains fully usable.
- Authentication is session-like and stored in localStorage for demo usage.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your Gemini key to `.env.local`:
   ```bash
   API_KEY=your_gemini_api_key
2. (Optional) configure API URL in `.env.local`:
   ```bash
   VITE_API_BASE_URL=http://localhost:4000
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Tests

```bash
npm run test
```

## Production build

```bash
npm run build
npm run preview
```

## Deployment

### Vercel
- `vercel.json` is included for SPA routing and static build output.

### Netlify
- `netlify.toml` is included with build command and SPA redirect.
