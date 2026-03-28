---
paths:
  - "api/**"
---

# Vercel Serverless Function Rules

- This is a Vite SPA — API routes use Vercel serverless convention (`api/` directory), NOT Next.js
- Export default function with `(req: VercelRequest, res: VercelResponse)` signature
- Import types from `@vercel/node`
- Validate all request body fields before processing
- Return consistent JSON: `{ success: boolean, message?: string, error?: string }`
- Handle errors with try/catch — never expose internal errors to client
- Environment variables accessed via `process.env` (server-only, never exposed to browser)
- Test locally with `vercel dev` and `curl`
