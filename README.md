# Bhavesh Portfolio — Next.js Starter (Design‑First)

This repo matches the approved design system and screen blueprints. It ships **placeholder copy** with length caps so layout won’t shift later.

## Quick Start
1. Install deps: `pnpm i` (or `npm i` / `yarn`)
2. Dev: `pnpm dev`
3. Open: http://localhost:3000

## What’s Included
- Next.js App Router + Tailwind + CSS variables (light/dark tokens)
- Components: Button, Chip, Card, Header, Footer, SectionHeader, TOC, ContactForm
- Pages: Home, Projects, Case Study (dynamic), About, Contact
- Content: `content/projects/projects.ts` (2 case studies, placeholder data)
- API route: `/api/contact` (stub → add your email provider)
- A11y & Perf baked-in: focus rings, reserved image slots, minimal JS

## Content & Modularity
- Swap the accent or fonts via `app/globals.css` token variables.
- Add/remove sections via components — no redesign required.
- Case Study sections are independent; TOC auto-generates from visible sections.

## Next Steps
- Replace placeholder lengths with real content within caps.
- Wire `/api/contact` to your email/queue.
- (Optional) Swap `content` to a headless CMS via an adapter in `/content` later.

Generated: 2025-08-16
