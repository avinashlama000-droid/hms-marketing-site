# HMS Marketing Website

Marketing website for the HMS project.

## Getting Started

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_APP_URL`: authenticated HMS SaaS application URL.
- `HMS_BILLING_API_URL`: Laravel API base URL, ending in `/api`.

The marketing site exposes a same-origin `/api/billing/*` proxy for the public plan, quote, signup, and verification endpoints. Payment proof remains in the authenticated SaaS app.

```bash
npm install
npm run dev
```

The development server runs on port `3003` by default.
