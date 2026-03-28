# Fit Content Productions

Landing page for a fitness content creation agency.
React 19 SPA (Vite 6 + TypeScript 5.8) with Tailwind CSS 4. **Not Next.js.**

## Development Workflow

**Always use `vercel dev`, not `vite dev`** (API routes need Vercel runtime).

```bash
# 1. Make changes
# 2. Type check (fast)
npm run lint              # tsc --noEmit
# 3. Build
npm run build             # vite build → dist/
# 4. Run locally
vercel dev                # Vite + API routes on localhost:3000
# 5. Before committing
npm run lint && npm run build
# 6. Deploy
vercel --prod
```

## Verification

Always verify your work before marking it complete. Would a staff engineer approve this?

- `npm run lint` — zero type errors
- `npm run build` — clean build, no warnings
- `vercel dev` — page loads, no console errors
- For API changes, test with curl:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","service":"content","message":"test"}'
```

## Core Principles

- **Simplicity first**: Make every change as simple as possible
- **No laziness**: Find root causes, no temporary fixes
- **Minimal impact**: Only touch what's necessary

## Environment Variables

- `RESEND_API_KEY` — Resend API key (server-only, in api/contact.ts)
- `NOTIFICATION_EMAIL` — Booking notification recipient (server-only)

See `.env.example` for the template. Never put secrets in client code.

## Design System

- Dark theme: `neutral-950` bg, `neutral-50` text
- Accent: `#B91C1C` (red) via `var(--color-accent)` in index.css
- Secondary: `#4a148c` (plum) via `var(--color-plum)` in index.css
- Fonts: Inter (body), Outfit (headings) — Google Fonts in index.css
- Radii: `rounded-2xl` inputs, `rounded-3xl` cards, `rounded-full` buttons
- Sections: `<section id="name" className="py-24 px-6 max-w-7xl mx-auto">`

## Don't

- Don't use `vite dev` — use `vercel dev`
- Don't add Next.js patterns (no next/image, no app router, no server components)
- Don't change the section layout without updating all sections
- Don't add new fonts — Inter and Outfit only
- Don't use inline styles — Tailwind classes only
- Don't mutate state — immutable updates only (spread, new objects)
- Don't expose env vars to the client — all secrets stay in `api/`

## Self-Improvement

After ANY correction from the user, update this "Don't" section so the mistake doesn't happen again.
