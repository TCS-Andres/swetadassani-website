import * as React from "react";

/**
 * Her four colours as ribbons, with a light running along each one.
 *
 * The ribbon itself holds still. What moves is a short bright segment that
 * travels the length of the curve and comes round again — light running down
 * a wire, not the wire being waved about.
 *
 * Two things make that possible without any JavaScript:
 *
 *   - `pathLength={100}` relabels every path as being 100 units long
 *     whatever its real length. A dash of `14 86` is then 14% of the curve on
 *     all four, and one animation from offset 100 to 0 walks it end to end.
 *     Without this each path would need its own hand-measured dash values,
 *     and they would break the moment a curve was edited.
 *   - Each ribbon is drawn twice: a dim base so the whole shape is always
 *     legible, and the travelling spark over the top carrying the glow.
 *
 * Decorative only: aria-hidden, and routed down the outer edges so nothing
 * crosses her face.
 */

const RIBBONS = [
  {
    key: "iris",
    // the long fall down the left
    d: "M52 486C4 402 74 356 96 286c22-70-34-118 12-176 26-33 66-44 104-40",
  },
  {
    key: "lotus",
    // the loop at the shoulder
    d: "M344 62c58 26 54 108-8 122-44 10-58-38-22-60 30-18 66 4 72 40 8 48-40 86-92 78",
  },
  {
    key: "saffron",
    // a short flourish at the hem
    d: "M300 452c36-26 78-2 70 44-6 34-56 40-72 10-12-22 4-46 30-44",
  },
  {
    key: "peri",
    // the wide arc behind everything
    d: "M18 168C74 66 214 22 330 54c46 13 76 38 88 74",
  },
] as const;

export default function ColorRibbons({ className }: { className?: string }) {
  return (
    <svg
      className={["ribbons", className].filter(Boolean).join(" ")}
      viewBox="0 0 420 540"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      {RIBBONS.map((r) => (
        <g key={r.key} className={`rb-${r.key}`}>
          <path className="rb rb-base" d={r.d} pathLength={100} />
          <path className="rb rb-spark" d={r.d} pathLength={100} />
        </g>
      ))}
    </svg>
  );
}
