# Taleel Software — Landing Page

Marketing site for Taleel Software Ltd, the engineering division of Taleel Holdings (Nairobi, Kenya).

Built with [Next.js](https://nextjs.org) (App Router). No external assets — fonts are the system stack, all visuals are CSS.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

Push this repo to GitHub, then import it at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js; no configuration needed.

Or from the CLI:

```bash
npx vercel
```

## Structure

- `app/page.jsx` — the landing page (client component; scroll animations wired in a `useEffect`)
- `app/globals.css` — full design system: Apple-style type scale, product mockups, reveal/parallax primitives
- `app/layout.js` — metadata and root layout
- `rules/` — original static HTML reference versions (not part of the build)
