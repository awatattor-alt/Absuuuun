# Iraq Compass (Absuuuun Base)

Unified React + TypeScript + Vite app that preserves the Absuuuun visual identity while organizing feature logic into modular folders.

## Project structure

```txt
src/
  components/
  features/
  hooks/
  pages/
  services/
  styles/
  types/
  utils/
```

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add environment variable in `.env.local` (optional, fallback simulation works without key):
   ```bash
   VITE_GEMINI_API_KEY=your_key_here
   ```
3. Start the app:
   ```bash
   npm run dev
   ```

## Checks

```bash
npm run lint
npm run build
```
