"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type PointerEvent } from "react";

/**
 * A painting lifted off the page.
 *
 * The frame tilts toward the pointer and the canvas sits on a plane in front
 * of it, so parallax opens between the two as you move — a shallow diorama,
 * not a card that spins. The tilt is deliberately small: past about 10° the
 * painting starts to key-stone and reads as a gimmick rather than a lift, and
 * the artwork is the thing that has to stay legible.
 *
 * The pointer position is written straight to the element's transform rather
 * than through React state. A re-render per mousemove would drop frames on the
 * three-up grid, and nothing else on the page needs to know the angle.
 */
export default function PopCard({
  slug,
  title,
  meta,
  alt,
  energy,
  tag,
  priority = false,
}: {
  slug: string;
  title: string;
  meta: string;
  alt: string;
  /** The word above the title: the energy this piece explores. */
  energy?: string;
  /** A small Lotus Pink flag — the red-dot equivalent. Use sparingly. */
  tag?: string;
  priority?: boolean;
}) {
  const inner = useRef<HTMLDivElement | null>(null);

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const el = inner.current;
    if (!el) return;
    // A coarse pointer means a finger: there is no hover to track, and running
    // the tilt on touch leaves the card stuck at whatever angle it was tapped.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-py * 11).toFixed(2)}deg) rotateY(${(px * 13).toFixed(2)}deg) translateZ(12px)`;
  };

  const reset = () => {
    const el = inner.current;
    if (el) el.style.transform = "";
  };

  return (
    <article className="popcard">
      <div
        ref={inner}
        className="popcard-inner"
        onPointerMove={tilt}
        onPointerLeave={reset}
      >
        <div className="popcard-plate">
          <div className="popcard-seat" aria-hidden />
          {tag ? <span className="tag-new">{tag}</span> : null}
        <div className="popcard-art">
            <Image
              src={`/art/${slug}.jpg`}
              alt={alt}
              fill
              sizes="(max-width:620px) 90vw, (max-width:1000px) 45vw, 30vw"
              priority={priority}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="popcard-sheen" aria-hidden />
        </div>
        <div className="popcard-label">
          {energy ? <div className="popcard-energy">{energy}</div> : null}
          <div className="wl-title">{title}</div>
          <div className="wl-meta">{meta}</div>
          <Link className="price" href="/contact" style={{ marginTop: ".6rem" }}>
            Inquire for price
          </Link>
        </div>
      </div>
    </article>
  );
}
