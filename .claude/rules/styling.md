---
paths:
  - "**/*.css"
  - "src/**/*.tsx"
---

# Styling Rules

- Tailwind CSS 4 only — no inline styles, no CSS modules, no styled-components
- Dark theme always: `neutral-950` backgrounds, `neutral-50` text
- Accent color: use `text-[var(--color-accent)]` or `bg-[var(--color-accent)]` for red (#B91C1C)
- Secondary: use `text-[var(--color-plum)]` or `bg-[var(--color-plum)]` for plum (#4a148c)
- Border radius convention: `rounded-2xl` (inputs), `rounded-3xl` (cards), `rounded-full` (buttons)
- Fonts: Inter for body text, Outfit for headings — defined in index.css via Google Fonts
- Responsive: mobile-first, test at 375px and 1280px breakpoints
- Spacing: use Tailwind scale (p-4, p-6, p-8) — no arbitrary pixel values unless matching design
- Hover states: use `transition-colors duration-200` for interactive elements
