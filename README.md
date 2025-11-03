## Triple C Emergency Charging Services

This repository contains the Triple C “Charge • Connect • Care” marketing site: a scroll-driven story that showcases on-demand EV charging across the DC, Maryland, and Virginia region. The experience features a sticky hero, animated story panels, feature highlights, transparent pricing, and clear calls to action.

### Tech Stack
- Next.js 15 App Router (TypeScript)
- Tailwind CSS for styling
- Framer Motion for scroll-linked animations
- Lucide Icons for outline iconography

### Getting Started
Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to preview the site. The primary implementation lives in `src/app/page.tsx` and is a client component to support Framer Motion hooks.

### Available Scripts
- `npm run dev` – start the local development server with hot reload
- `npm run lint` – run ESLint with the project configuration
- `npm run build` – generate a production build
- `npm run start` – serve the production build locally

### Project Notes
- UI primitives such as `Button` and `Card` are in `src/components/ui`.
- Global styles live in `src/app/globals.css`; metadata and layout wrapper are in `src/app/layout.tsx`.
- Remote imagery currently uses standard `<img>` tags. Swap to `next/image` if you need built-in optimization or custom loaders.
