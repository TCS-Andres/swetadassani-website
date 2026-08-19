"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── the carousel ────────────────────────────────────────────────
 * The collection laid out on a ring and turned by the scrollbar. The
 * section is deliberately taller than the screen; the ring sticks to the
 * middle of it, so scrolling that stretch turns the ring instead of moving
 * past it. Come out the bottom and the page carries on as normal.
 *
 * Three departures from the usual version of this, each for a reason:
 *
 * 1. Rotation is driven by THIS section's progress, not the document's.
 *    Mapping to `window.scrollY / documentHeight` means the ring's speed
 *    depends on how long the rest of the page happens to be, and it is
 *    already part-turned before the section is even on screen.
 * 2. The radius is derived from the container, not fixed. A 600px radius
 *    describes a ring 1200px across before card width, which hangs off both
 *    sides of a laptop and is unusable on a phone.
 * 3. Scroll rotation and idle drift are summed rather than fighting over one
 *    value. Setting rotation absolutely on scroll and incrementally on a
 *    timer makes the two stutter against each other every time scrolling
 *    stops.
 * ─────────────────────────────────────────────────────────────── */

export type GalleryItem = {
  /** Painting file stem, e.g. "nataraja" — resolved against /art/sm. */
  slug: string;
  title: string;
  /** The wall-label line: medium, size, year. */
  meta: string;
  /** Written for a reader who cannot see the painting. */
  alt: string;
};

export type CircularGalleryProps = React.HTMLAttributes<HTMLDivElement> & {
  items: GalleryItem[];
  /** Degrees the ring turns as the section crosses the screen. @default 150 */
  sweep?: number;
  /** Degrees per second the ring drifts while the page is still. @default 1.6 */
  drift?: number;
};

export const CircularGallery = React.forwardRef<
  HTMLDivElement,
  CircularGalleryProps
>(({ items, className, sweep = 150, drift = 1.6, children, ...props }, ref) => {
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const cardsRef = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let radius = 420;
    let raf = 0;
    let last = performance.now();
    let drifted = 0;
    let onScreen = true;

    // The ring has to fit the frame: half the container, less half a card, so
    // the nearest card's edge lands inside the viewport rather than past it.
    const measure = () => {
      const w = stage.clientWidth || window.innerWidth;
      radius = Math.max(220, Math.min(620, w * 0.46));
      // Neighbours sit one chord apart: 2R·sin(180/n). Keep the card inside
      // ~78% of that and the ring reads as separate paintings on a circle
      // rather than a solid wall of overlapping edges.
      const chord = 2 * radius * Math.sin(Math.PI / Math.max(items.length, 3));
      const card = Math.max(112, Math.min(230, chord * 0.78));
      stage.style.setProperty("--card-w", `${Math.round(card)}px`);
      stage.style.setProperty("--ring-r", `${Math.round(radius)}px`);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!onScreen) return;
      if (!still) drifted += drift * dt;

      // Progress as the section crosses the screen: 0 the moment its top
      // enters from below, 1 once its bottom has left the top. The section is
      // no longer pinned, so this is measured against the whole crossing
      // rather than against a stretch of held scroll.
      const r = track.getBoundingClientRect();
      const span = window.innerHeight + r.height;
      const p = span > 0 ? Math.max(0, Math.min(1, (window.innerHeight - r.top) / span)) : 0;
      const rot = p * sweep + drifted;

      const step = 360 / Math.max(items.length, 1);
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const angle = i * step;
        el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        // Fade the far side so the ring reads as depth, not as a flat wheel.
        const rel = (((angle + rot) % 360) + 360) % 360;
        const off = rel > 180 ? 360 - rel : rel;
        el.style.opacity = String(Math.max(0.18, 1 - off / 155));
      });
      stage.style.transform = `rotateY(${rot.toFixed(2)}deg)`;
    };

    const io = new IntersectionObserver(
      (e) => (onScreen = e[0]?.isIntersecting ?? true),
      { rootMargin: "150px 0px" },
    );
    io.observe(track);

    const ro = new ResizeObserver(measure);
    ro.observe(stage);

    measure();
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [items.length, sweep, drift]);

  return (
    <div
      ref={ref}
      className={cn("ring-track", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="The collection, on a turning ring"
      {...props}
    >
      <div ref={trackRef} className="ring-travel">
        <div className="ring-frame">
          <div ref={stageRef} className="ring-stage">
            {items.map((item, i) => (
              <div
                key={item.slug}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="ring-card"
                style={{
                  transform: `rotateY(${(i * 360) / Math.max(items.length, 1)}deg) translateZ(var(--ring-r, 420px))`,
                  opacity: (() => {
                    const a = (i * 360) / Math.max(items.length, 1);
                    const off = a > 180 ? 360 - a : a;
                    return Math.max(0.18, 1 - off / 155);
                  })(),
                }}
              >
                <figure>
                  <img
                    src={`/art/sm/${item.slug}.jpg`}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <figcaption>
                    <span className="t">{item.title}</span>
                    <span className="m">{item.meta}</span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
});

CircularGallery.displayName = "CircularGallery";

export default CircularGallery;
