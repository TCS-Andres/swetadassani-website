# Sweta Dassani, Artist Website

Contemporary devotional art. Sacred stories, contemporary expression.

A Next.js site for Sweta Dassani (SwetaDassani.com). Four pages: Home, Work,
About, and Inquire, built on the Quiet Gallery design system in her own colours.

## Status

Design preview, running on the **real paintings and the real brand**. Sixteen
of her acrylics and two portrait photographs are in the repo and wired through
the site. Still to confirm with Sweta: the artwork **titles, years, and
dimensions** (currently placeholders in `content/works.ts`), her Instagram
handle, and the contact email.

Verified: `npm run build` compiles clean (7 static routes, no type or lint
errors) and every page has been checked in the browser at desktop and mobile
widths, with no console errors.

## Stack

- Next.js (App Router) with TypeScript
- React Server Components, with `'use client'` only where interactivity is
  needed (nav, gallery lightbox, contact form, the two animated sections)
- `next/font` for self-hosted Cormorant Garamond and Jost
- `next/image` for the artwork
- Plain CSS design system in `app/globals.css`
- Tailwind CSS v4, present because the two dropped-in `components/ui`
  components are written against it. The site's own layout is plain CSS.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000. Build for production with `npm run build`.

### If `npm: command not found`

Node was installed for this project into your home directory rather than
system-wide (no admin rights needed). It is not on the default `PATH`, so add
it for the session:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
```

To make that permanent, append the same line to `~/.zshrc`. To remove Node
again, delete `~/.local/node` and `~/.local/node-dl`. Alternatively install
Node 20+ system-wide from [nodejs.org](https://nodejs.org) and ignore the
above.

## Structure

- `app/` : routes (`page.tsx` home, `portfolio/`, `about/`, `contact/`),
  `layout.tsx`, `globals.css`, `fonts.ts`
- `components/` : `Nav`, `Footer`, `ScrollReveal`, `GalleryClient` (filter +
  lightbox), `ContactForm`, `PopCard`, `CorridorHero`, `CosmicBand`
- `components/ui/` : the shadcn-convention folder for dropped-in components.
  `image-stream-hero` (the corridor) and `blackhole-hero-section` (the ring of
  fire) live here, unmodified, so they can be updated from source
- `content/works.ts` : the collection data. **This is the file Sweta edits to
  manage the gallery**
- `lib/utils.ts` : the `cn` class-merging helper the ui components import
- `public/art/` : the paintings
- `public/portrait/` : photographs of Sweta
- `public/logo/`, `public/brand/` : brand kit assets
- `app/fonts/` : self-hosted font files

## The set pieces

1. **The corridor** (`CorridorHero`, home hero). Her paintings ride out of the
   dark toward the viewer on two mirrored rails. Pure CSS 3D and perspective;
   it pauses rather than stops under `prefers-reduced-motion`. Decorative and
   `aria-hidden`: every painting in it is also reachable as a real captioned
   work further down.
2. **The pop-up cards** (`PopCard`, "Step closer"). Three paintings lifted off
   the page: the frame tilts to the pointer and the canvas sits on a plane in
   front of it, so parallax opens between them. Disabled on touch and under
   reduced motion.
3. **The wide plate** (`.plate-wide` on the home page). One painting at full
   bleed with the title set over its darker edge. This replaced an earlier
   WebGL "accretion disc" section, which the client cut, since the drama should come
   from her own work, not from a simulated galaxy. `components/ui/
   blackhole-hero-section.tsx` and `components/CosmicBand.tsx` were removed
   with it.

## Adding a painting

1. Drop a photo in `public/art/` (name it, for example, `new-piece.jpg`)
2. Add a row to `content/works.ts` with the slug, title, subject, year, size,
   a short story, and `alt` text describing the image
3. Add `featured: true` to put it on the home page
4. Commit and push. Vercel redeploys automatically.

## Design system

> **Decision, and a live conflict.** The palette below is taken from the
> **logo itself**: antique gold `#C3A177` on limestone `#F5F3EE`, sampled from
> the delivered PNGs. It deliberately departs from
> `SwetaDassani_BrandGuide_v1.0`, which specifies a *cool* system (Iris
> `#8878C3`, Saffron `#FDC133`, Violet Ink `#262038`).
>
> The reason: the guide's own logo files (`SwetaDassani_Mark_Saffron.png`,
> `SwetaDassani_Logo_Primary_Iris.png`) were **never delivered**. The files we
> have belong to the earlier warm generation, and a cool page wrapped around a
> warm mark reads as two different brands. Approved by the client.
>
> **To resolve properly:** either commission the logo in the guide's palette
> and flip the tokens back, or update the guide to this warm system. Everything
> is driven by the custom properties in `app/globals.css`, so it is a
> one-file change either way.

| Token | Hex | Use |
| --- | --- | --- |
| Limestone | `#F5F3EE` | the everyday ground, the logo's own background |
| Sand | `#EDE7DB` | half-tone bands, for rhythm between sections |
| Paper | `#FFFFFF` | mats and cards, so art never sits on a tint |
| Ink | `#221C15` | warm near-black, all text |
| Gold | `#C3A177` | the logo gold. Decorative only: rules, ornaments |
| Gold Deep | `#8A6528` | gold darkened until it reads as type on limestone |
| Muted | `#6E6252` | captions and metadata |
| Line | `#E3DACB` | hairlines |
| Night | `#1C1710` | the single dark band, before the footer |

Three rules hold it together: **limestone everywhere**, so the paintings are the
only loud thing; **gold is a drawn line**, never a filled shape and never body
text (`#C3A177` fails contrast, so `--gold-deep` carries anything readable); and
**type is large, serif and generously spaced**.

The artist's own ornaments (the lotus divider, the brushstroke underline and
the petal tile) are recoloured to the gold and applied as CSS masks, so they
take their colour from the token and can never drift out of palette.

Display type: Cormorant Garamond (500, 500 italic, 600). Body and labels: Jost
(300, 400, 500). Both are self-hosted, converted to woff2 from the brand kit's
TrueType masters.

> The font files that shipped with the original skeleton were **duplicates**:
> one Cormorant face copied under two weight names, one Jost face under three,
> so every "weight" rendered identically. They have been replaced with the real
> faces from `Brand/Fonts/`.

Two rules worth keeping in mind when editing: **Saffron and Lotus Pink never
carry text on light grounds** (1.5:1 and 2.7:1, so they fail badly), so Iris Deep
carries every accent that has to be read. And **elevation is expressed with
space, not shadow**; the system is flat by design.

## Before launch

Per the Master Brain (Appendix A), these are outstanding on Sweta's side:

- **The remaining paintings.** She has 25 finished pieces at launch; 16 are
  photographed and in the repo. Nine more photos are needed.
- **The works list**: real titles, mediums, sizes, years, and availability.
  Everything in `content/works.ts` is a placeholder written from the images.
- **Her Instagram handle** and the contact email. Both are still placeholders
  (`hello@swetadassani.com`, and a bare instagram.com link).
- Confirm which pieces should be featured on the home page (`featured: true`)
- Wire the contact form to a real endpoint (currently opens the visitor's email
  app)
- **Replace the logo files.** The PNGs in `public/logo/` are the retired
  gold-on-limestone generation, not the Iris / Saffron / Violet Ink system the
  brand guide specifies. The guide's own file list names
  `SwetaDassani_Mark_Saffron.png` and `SwetaDassani_Logo_Primary_Iris.png`,
  neither of which was delivered. The gold reads muddy next to Saffron on the
  dark band. Get the corrected exports from the designer.
- Run `npm run build` and fix anything that surfaces
- Commission a vector redraw of the logo before any large-format print

---

The Creative Strategist. Built with Excellence.
