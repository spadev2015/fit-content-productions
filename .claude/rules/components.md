---
paths:
  - "src/components/**"
  - "src/App.tsx"
---

# React Component Rules

- One component per file, named export matching filename
- Use functional components with TypeScript interfaces for props
- Keep components under 200 lines — extract sub-components if larger
- Use `motion` library for animations (not CSS transitions or framer-motion)
- Use `lucide-react` for icons — don't add other icon libraries
- Event handlers: `handleX` naming (e.g., `handleSubmit`, `handleClick`)
- State: use immutable updates only (`setState(prev => ({ ...prev, key: val }))`)
- Forms: controlled components with `useState`, validate before submit
- All sections use the standard wrapper: `<section id="name" className="py-24 px-6 max-w-7xl mx-auto">`
