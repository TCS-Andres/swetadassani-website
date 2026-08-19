"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── hover-preview list ──────────────────────────────────────────
 * A list of names. Point at one and the painting it belongs to follows the
 * cursor. Adapted from the supplied ProjectShowcase, with four changes:
 *
 * 1. The preview is `fixed` and positioned straight from the pointer's
 *    viewport coordinates. The original read the container's rect during
 *    render to offset it, which is a ref read on a render pass — undefined
 *    on the server, and stale the moment the page scrolls.
 * 2. The easing runs on a ref and writes to the DOM. The original called
 *    setState inside requestAnimationFrame with `mousePosition` in the
 *    dependency list, so every pointer move tore down and rebuilt the loop
 *    while re-rendering the whole list sixty times a second.
 * 3. A pointer that cannot hover gets no floating preview. Each row carries
 *    its painting inline instead, so a phone sees the work rather than
 *    nothing.
 * 4. Colours come from the design tokens rather than shadcn's
 *    --muted-foreground / --border, which this project does not define.
 * ─────────────────────────────────────────────────────────────── */

export type ShowcaseItem = {
  key: string;
  title: string;
  /** The small line under the title. */
  meta: string;
  /** Painting to reveal on hover. */
  image: string;
  alt: string;
  href?: string;
};

export type ProjectShowcaseProps = React.HTMLAttributes<HTMLDivElement> & {
  items: ShowcaseItem[];
};

export function ProjectShowcase({
  items,
  className,
  ...props
}: ProjectShowcaseProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const previewRef = React.useRef<HTMLDivElement | null>(null);
  const target = React.useRef({ x: 0, y: 0 });
  const shown = React.useRef({ x: 0, y: 0 });
  const seeded = React.useRef(false);

  React.useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const k = still ? 1 : 0.16;
      shown.current.x += (target.current.x - shown.current.x) * k;
      shown.current.y += (target.current.y - shown.current.y) * k;
      el.style.transform = `translate3d(${shown.current.x.toFixed(1)}px, ${shown.current.y.toFixed(1)}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      // Viewport coordinates, straight into a fixed element: correct whether
      // or not the page has scrolled since the pointer last moved.
      target.current = { x: e.clientX + 26, y: e.clientY - 130 };
      if (!seeded.current) {
        shown.current = { ...target.current };
        seeded.current = true;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className={cn("showcase", className)} {...props}>
      {/* One frame, cross-fading between paintings, rather than one frame per
          row appearing and disappearing. */}
      <div
        ref={previewRef}
        className={cn("showcase-preview", active !== null && "on")}
        aria-hidden
      >
        <div className="mat">
          {items.map((it, i) => (
            <img
              key={it.key}
              src={it.image}
              alt=""
              loading="lazy"
              decoding="async"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "scale(1)" : "scale(1.06)",
                filter: active === i ? "none" : "blur(9px)",
              }}
            />
          ))}
        </div>
      </div>

      <ul className="showcase-list">
        {items.map((it, i) => {
          const Row = it.href ? "a" : "div";
          return (
            <li key={it.key}>
              <Row
                {...(it.href ? { href: it.href } : {})}
                className={cn("showcase-row", active === i && "on")}
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                {...(it.href ? {} : { tabIndex: 0 })}
              >
                <span className="who">
                  <span className="nm">{it.title}</span>
                  <span className="arw" aria-hidden>
                    →
                  </span>
                </span>
                <span className="meta">{it.meta}</span>
                {/* Shown only where hover does not exist. */}
                <img className="inline-shot" src={it.image} alt={it.alt} loading="lazy" />
              </Row>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProjectShowcase;
