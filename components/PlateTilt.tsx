"use client";

import * as React from "react";

/**
 * Pointer-tracked tilt for the pair of canvases.
 *
 * The two plates share one perspective but sit at different depths, so they
 * are given different amounts of the same rotation: the near one swings more
 * than the far one. That difference is what reads as parallax — turn both by
 * the same angle and the pair looks like a flat picture of two paintings
 * rather than two paintings standing apart.
 *
 * Values go out as CSS custom properties so the rest of the composition —
 * the resting angles, the widths, the shadows — stays in the stylesheet.
 */
export default function PlateTilt({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // A finger has no hover position to track, and the tilt would only fire
    // on tap and then stick.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const shown = { x: 0, y: 0 };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      shown.x += (target.x - shown.x) * 0.12;
      shown.y += (target.y - shown.y) * 0.12;
      el.style.setProperty("--tx", shown.x.toFixed(3));
      el.style.setProperty("--ty", shown.y.toFixed(3));
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width - 0.5;
      target.y = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
