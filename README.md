# Sweta Dassani, Artist Website

Contemporary devotional art. Sacred stories, contemporary expression.

A Next.js site for Sweta Dassani (SwetaDassani.com), built by The Creative Strategist. Four pages: Home, Work, About, and Inquire, in the Quiet Gallery design system.

## Status

Design preview. The paintings, work titles, links, and artist portrait are placeholders while final assets are collected. The structure, voice, and design system are real.

## Stack

- Next.js (App Router) with TypeScript
- React Server Components, with `'use client'` only where interactivity is needed (nav, gallery lightbox, contact form)
- `next/font` for self-hosted Cormorant Garamond and Jost
- `next/image` for the artwork
- Plain CSS design system in `app/globals.css`, no CSS framework

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Build for production with `npm run build`.

## Structure

- `app/` : routes (`page.tsx` home, `portfolio/`, `about/`, `contact/`), `layout.tsx`, `globals.css`, `fonts.ts`
- `components/` : `Nav`, `Footer`, `ScrollReveal`, `GalleryClient` (filter + lightbox), `ContactForm`
- `content/works.ts` : the collection data. This is the file Sweta edits to manage the gallery
- `public/art/` : placeholder paintings
- `app/fonts/` : self-hosted font files

## Adding a painting

1. Drop a photo in `public/art/` (name it, for example, `new-piece.jpg`)
2. Add a row to `content/works.ts` with the slug, title, subject, year, size, and a short story
3. Commit and push. Vercel redeploys automatically.

## Design system

- Ground: limestone plaster white `#F5F3EE`
- Ink: warm near-black `#1A1613`
- Accent: gold-leaf brass `#A67C3D`, the reserved slot for Sweta's brand color
- Display type: Cormorant Garamond. Body and labels: Jost.

## Before launch

- Replace placeholder paintings with web-ready photos of the real works
- Add real titles, years, sizes, and a short story per piece
- Add a photo of Sweta, and the real Instagram and email links
- Wire the contact form to a real endpoint (currently opens the visitor's email app)
- Drop in Sweta's brand color

---

The Creative Strategist. Built with Excellence.
