# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page for a fitness content creation agency.
React 19 SPA (Vite 6 + TypeScript 5.8) with Tailwind CSS 4. **Not Next.js.**

## Commands

```bash
npm run lint              # tsc --noEmit (type check only)
npm run build             # vite build → dist/
vercel dev                # local dev server with API routes (localhost:3000)
vercel --prod             # production deploy
```

**Always use `vercel dev`, not `vite dev`** — API routes require the Vercel runtime.

## Architecture

Single-page app with scroll-based navigation. No router.

```
src/main.tsx → src/App.tsx → sequential section components
api/contact.ts → Vercel serverless function (POST /api/contact → Resend email)
```

**App.tsx** renders sections in order: Navbar → Hero → Stats → About → Services → Portfolio → Contact → Footer. Each section uses anchor IDs for nav links (`#services`, `#work`, `#about`, `#contact`).

**api/contact.ts** accepts `{ firstName, lastName, email, service, message }`, validates required fields, sends notification via Resend to `NOTIFICATION_EMAIL`. Returns `{ success: boolean, error?: string }`.

## Environment Variables

- `RESEND_API_KEY` — Resend API key (server-only, in api/contact.ts)
- `NOTIFICATION_EMAIL` — Booking notification recipient (server-only)

See `.env.example` for the template. All secrets stay in `api/` — never expose to client.

## Design System

- Dark theme: `neutral-950` bg, `neutral-50` text
- Accent: `#B91C1C` (red) via `var(--color-accent)` in index.css
- Secondary: `#4a148c` (plum) via `var(--color-plum)` in index.css
- Fonts: Inter (body), Outfit (headings) — Google Fonts in index.css
- Radii: `rounded-2xl` inputs, `rounded-3xl` cards, `rounded-full` buttons
- Section wrapper: `<section id="name" className="py-24 px-6 max-w-7xl mx-auto">`

## Verification

Always verify before marking work complete:

- `npm run lint` — zero type errors
- `npm run build` — clean build, no warnings
- `vercel dev` — page loads, no console errors
- For API changes:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@test.com","service":"content","message":"test"}'
```

## Workflow Orchestration

1. **Plan Mode Default** — Enter plan mode for any non-trivial task (3+ steps or architectural decisions). If something goes sideways, STOP and re-plan immediately. Use plan mode for verification steps, not just building.

2. **Subagent Strategy** — Use subagents to keep main context clean. Offload research and parallel analysis. One task per subagent. For 3+ independent tasks, spin up parallel agents. For tightly coupled changes (shared interfaces, sequential deps), work sequentially and use subagents only for research.

3. **Self-Improvement Loop** — After ANY correction from the user, update the "Don't" section below and `tasks/lessons.md` with the pattern. Ruthlessly iterate until mistake rate drops.

4. **Verification Before Done** — Never mark a task complete without proving it works. Diff behavior between main and changes. Ask: "Would a staff engineer approve this?"

5. **Demand Elegance** — For non-trivial changes, pause and ask "is there a more elegant way?" Skip this for simple, obvious fixes.

6. **Autonomous Bug Fixing** — When given a bug report, just fix it. Point at logs, errors, failing tests — then resolve. Zero context switching from the user.

## Task Management

1. Write plan to `tasks/todo.md` with checkable items
2. Check in with user before starting implementation
3. Mark items complete as you go
4. High-level summary at each step
5. Add review section to `tasks/todo.md`
6. Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity first**: Make every change as simple as possible
- **No laziness**: Find root causes, no temporary fixes
- **Minimal impact**: Only touch what's necessary

## Don't

- Don't use `vite dev` — use `vercel dev`
- Don't add Next.js patterns (no next/image, no app router, no server components)
- Don't change the section layout without updating all sections
- Don't add new fonts — Inter and Outfit only
- Don't use inline styles — Tailwind classes only
- Don't mutate state — immutable updates only (spread, new objects)
- Don't expose env vars to the client — all secrets stay in `api/`
- Don't initialize SDK clients (Resend, etc.) at module level in `api/` functions — always inside the handler, with a missing-key guard
