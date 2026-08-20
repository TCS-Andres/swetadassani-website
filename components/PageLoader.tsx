"use client";

import * as React from "react";

/**
 * The opening curtain: her mark, with a light running around it.
 *
 * Rendered by the server so it is painted on the very first frame — a loader
 * that only appears once React has hydrated has already missed the moment it
 * exists for.
 *
 * It is removed on `window.load`, and unconditionally after 2.5s. That second
 * rule matters more than the first: if one painting 404s or a slow connection
 * stalls, `load` may never fire, and a loader with no escape hatch leaves the
 * visitor staring at a logo instead of the work. Failing open is the only
 * acceptable behaviour here.
 *
 * A floor of 500ms stops it flashing on a warm cache, where the page is ready
 * in 40ms and the curtain would otherwise blink.
 */
export default function PageLoader() {
  React.useEffect(() => {
    const el = document.getElementById("loader");
    if (!el) return;

    const started = Number(el.dataset.t || Date.now());
    let done = false;

    const dismiss = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, 500 - (Date.now() - started));
      window.setTimeout(() => {
        el.classList.add("gone");
        // Taken out of the tree entirely once faded, so it can never trap a
        // click or a tab stop.
        window.setTimeout(() => el.remove(), 700);
      }, wait);
    };

    if (document.readyState === "complete") dismiss();
    else window.addEventListener("load", dismiss, { once: true });

    // The escape hatch.
    const bail = window.setTimeout(dismiss, 2500);

    return () => {
      window.removeEventListener("load", dismiss);
      window.clearTimeout(bail);
    };
  }, []);

  return null;
}

/** The markup, rendered on the server so it is there from the first paint. */
export function PageLoaderMarkup() {
  return (
    <div id="loader" className="loader" role="status" aria-label="Loading">
      <div className="loader-stack">
        <svg className="loader-ring" viewBox="0 0 120 120" aria-hidden="true">
          <circle className="loader-track" cx="60" cy="60" r="54" />
          {/* All four of her colours on the ring at once, spaced a quarter
              lap apart and chasing each other round. */}
          {["iris", "lotus", "saffron", "peri"].map((c) => (
            <circle
              key={c}
              className={`loader-spark ls-${c}`}
              cx="60"
              cy="60"
              r="54"
              pathLength={100}
            />
          ))}
        </svg>
        <img
          className="loader-mark"
          src="/logo/SwetaDassani_Mark_Ink.png"
          alt=""
          width={1005}
          height={744}
        />
      </div>
    </div>
  );
}
