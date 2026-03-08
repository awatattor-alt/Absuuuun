# Iraq Compass (Absuuuun Base)

Unified React + TypeScript + Vite app using **Absuuuun as the design foundation** and a modular structure for integrating logic from additional repositories.

## Project structure

```txt
src/
  components/
  features/
  hooks/
  pages/
  services/
  styles/
  utils/
```

## Scripts

- `npm run dev`
- `npm run lint`
- `npm run build`

## Notes on merge direction

- UI remains based on the Absuuuun flow/layout and navy-first theme tokens.
- Functional logic is organized into reusable hooks/services so cross-repo integrations can be added without replacing UI structure.
- Discovery and guidance logic are currently mocked and ready to connect to real APIs.
