# Fit Content Productions

Landing page for a fitness content creation agency.

## Tech Stack

- **Framework:** React 19 (SPA, no SSR)
- **Build:** Vite 6 with TypeScript 5.8
- **Styling:** Tailwind CSS 4 (via @tailwindcss/vite plugin)
- **Icons:** lucide-react
- **Animations:** motion library
- **Email:** Resend (via Vercel serverless function)
- **Hosting:** Vercel

**This is NOT a Next.js project.** It's a Vite SPA. Serverless functions live in the `api/` directory (Vercel convention).

## Project Structure

```
api/              # Vercel serverless functions (Node.js)
  contact.ts      # Form submission → Resend email
src/
  components/     # React components (one per section)
    Navbar.tsx
    Hero.tsx
    Stats.tsx
    About.tsx
    Services.tsx
    Portfolio.tsx
    Contact.tsx   # Booking form with Resend integration
    Footer.tsx
    Button.tsx    # Reusable button component
  App.tsx         # Root layout (assembles all sections)
  main.tsx        # Entry point
  index.css       # Tailwind imports + custom theme
```

## Design Conventions

- Dark theme: `neutral-950` background, `neutral-50` text
- Accent color: `#B91C1C` (red) — defined as `--color-accent` in index.css
- Secondary: `#4a148c` (plum) — defined as `--color-plum`
- Fonts: Inter (body), Outfit (headings) — loaded via Google Fonts in index.css
- Border radius: `rounded-2xl` for inputs, `rounded-3xl` for cards, `rounded-full` for buttons
- All sections follow: `<section id="name" className="py-24 px-6 max-w-7xl mx-auto">`

## Dev Commands

```bash
vercel dev          # Local dev (Vite + API routes) — use this, not vite dev
npm run build       # Production build
npm run lint        # TypeScript check (tsc --noEmit)
vercel --prod       # Deploy to production
```

## Environment Variables

- `RESEND_API_KEY` — Resend API key for sending emails
- `NOTIFICATION_EMAIL` — Email address to receive booking notifications
