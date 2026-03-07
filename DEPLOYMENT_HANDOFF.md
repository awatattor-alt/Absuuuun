# Iraq Compass launch handoff (automated run)

This repository snapshot already includes commit `dcc0242`:

- `Merge pull request #8 from awatattor-alt/codex/sync-vercel-app-to-ai-studio-version`

## What was verified locally

1. The app is a single-page Iraq Compass UI (`App.tsx` renders one-page flow around `CompassHeader`, `QueryForm`, and result/error/loading states).
2. The Gemini key lookup priority in `services/geminiService.ts` is:
   - `import.meta.env.VITE_GEMINI_API_KEY`
   - `import.meta.env.GEMINI_API_KEY`
   - `process.env.GEMINI_API_KEY`
   - `process.env.API_KEY`
3. The project builds successfully with `npm run build`.

## Why launch automation could not be completed in this environment

- GitHub CLI is unavailable (`gh: command not found`), so PR merge operations cannot be executed from this container.
- Vercel CLI is unavailable (`vercel: command not found`), so project env vars and redeploy cannot be triggered from this container.
- `.env.local` is not present in this workspace snapshot, so no Gemini key value is available to apply.

## Exact remaining launch steps

1. Merge PR #8 in GitHub (merge commit strategy).
2. In Vercel project `absuuuun`, set all environments (Production/Preview/Development):
   - `VITE_GEMINI_API_KEY=<gemini-key>`
   - `GEMINI_API_KEY=<gemini-key>`
   - `API_KEY=<gemini-key>`
3. Trigger a fresh production redeploy from latest `main`.
4. Verify `absuuuun.vercel.app` returns live Gemini output (not fallback text).
