# Iraq Compass (Absuuuun base)

Unified React + TypeScript + Vite app that keeps the Absuuuun visual structure while consolidating feature logic into modular domains.

## Project structure

```txt
src/
  components/
  features/
  services/
  hooks/
  pages/
  styles/
  utils/
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`

## Notes

- Discovery/event logic uses `services/businessService.ts` with API-first + fallback data.
- Authentication flow uses local session utilities in `services/authService.ts`.
- UI uses a navy-themed design token palette defined in `src/styles/theme.css`.
