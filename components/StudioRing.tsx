"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Lightbox from "@/components/Lightbox";
import { type Work } from "@/content/works";

/* ── the ring ────────────────────────────────────────────────────
 * The collection on a turning ring, driven by the reader rather than by the
 * scrollbar.
 *
 * It used to take its angle from the section's progress across the viewport,
 * which tied the paintings to the page: they only moved while the page did,
 * and reading down turned them whether or not that was wanted. Now scrolling
 * and turning are separate. The ring drifts on its own, slowly, and a drag
 * turns it. Everything else about the shape is unchanged.
 *
 * One value, three inputs. Drift, momentum and the arrow buttons all write to
 * the same angle, so nothing fights over it:
 *   - drift adds a constant rate every frame while the ring is idle
 *   - a drag writes the angle directly and records speed, which becomes
 *     momentum that decays on release
 *   - an arrow sets a target one card away and the angle eases to it
 *
 * A drag must not fire the card underneath it, so a pointer that travels more
 * than a few pixels cancels the click.
 * ─────────────────────────────────────────────────────────────── */

/** How far the ring turns per pixel dragged. */
const DEG_PER_PX = 0.28;
/** Momentum left after one second, so a flick coasts and then settles. */
const DECAY = 0.02;
/** Pointer travel, in px, past which a press is a drag and not a click. */
const DRAG_SLOP = 6;

export default function StudioRing({
  works,
  drift = 1.6,
}: {
  works: Work[];
  /** Degrees per second the ring turns while nobody is touching it. */
  drift?: number;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const movedRef = useRef(false);
  const stepRef = useRef(360 / Math.max(works.length, 1));
  const nudgeRef = useRef<(dir: 1 | -1) => void>(() => {});

  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!frame || !stage) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 620px)");

    let radius = 420;
    let rot = 0;
    let vel = 0;
    let target: number | null = null;
    let dragging = false;
    let lastX = 0;
    let lastMove = 0;
    let raf = 0;
    let last = performance.now();
    let onScreen = true;

    const step = 360 / Math.max(works.length, 1);
    stepRef.current = step;

    // The ring has to fit the frame. On a wide screen that means pulling it
    // inside the container. On a phone it means the opposite: pushing it wider
    // than the screen, so neighbours clear each other instead of stacking up,
    // and only the nearest few are on screen at once.
    const measure = () => {
      const w = stage.clientWidth || window.innerWidth;
      radius = narrow.matches
        ? Math.max(300, w * 1.15)
        : Math.max(220, Math.min(620, w * 0.46));
      // Neighbours sit one chord apart: 2R·sin(180/n). Keeping the card inside
      // ~78% of that is what stops the ring reading as a wall of overlapping
      // edges, which is exactly how it failed on a phone before.
      const chord = 2 * radius * Math.sin(Math.PI / Math.max(works.length, 3));
      const cap = narrow.matches ? 190 : 230;
      const floor = narrow.matches ? 120 : 112;
      const card = Math.max(floor, Math.min(cap, chord * 0.78));
      stage.style.setProperty("--card-w", `${Math.round(card)}px`);
      stage.style.setProperty("--ring-r", `${Math.round(radius)}px`);
    };

    const render = () => {
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const angle = i * step;
        el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        // Fade the far side so the ring reads as depth, not as a flat wheel.
        const rel = (((angle + rot) % 360) + 360) % 360;
        const off = rel > 180 ? 360 - rel : rel;
        el.style.opacity = String(Math.max(0.18, 1 - off / 155));
        // Only the front of the ring should take a click or a tab stop.
        el.style.pointerEvents = off < 60 ? "auto" : "none";
        el.tabIndex = off < 60 ? 0 : -1;
      });
      stage.style.transform = `rotateY(${rot.toFixed(2)}deg)`;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!onScreen) return;

      if (!dragging) {
        if (target !== null) {
          // Ease to the arrow's destination, then hand back to drift.
          rot += (target - rot) * (1 - Math.exp(-dt * 9));
          if (Math.abs(target - rot) < 0.05) {
            rot = target;
            target = null;
          }
        } else {
          if (!still) rot += drift * dt;
          if (Math.abs(vel) > 0.01) {
            rot += vel * dt;
            vel *= Math.pow(DECAY, dt);
          } else {
            vel = 0;
          }
        }
      }
      render();
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      movedRef.current = false;
      target = null;
      vel = 0;
      lastX = e.clientX;
      lastMove = e.timeStamp;
      // Capture keeps a drag alive if the pointer leaves the frame. It throws
      // for a pointer the browser no longer considers active, which must not
      // take the rest of the handler down with it.
      try { frame.setPointerCapture(e.pointerId); } catch {}
      frame.classList.add("dragging");
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      if (Math.abs(dx) > 0) {
        const dt = Math.max(1, e.timeStamp - lastMove) / 1000;
        rot += dx * DEG_PER_PX;
        vel = (dx * DEG_PER_PX) / dt;
        lastX = e.clientX;
        lastMove = e.timeStamp;
        if (Math.abs(vel) > 1) movedRef.current = true;
      }
      render();
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      frame.classList.remove("dragging");
      if (frame.hasPointerCapture(e.pointerId)) frame.releasePointerCapture(e.pointerId);
      // Cap the flick so a fast swipe cannot spin the ring into a blur.
      vel = Math.max(-320, Math.min(320, vel));
    };

    // Arrow buttons and keyboard both land here.
    nudgeRef.current = (dir: 1 | -1) => {
      vel = 0;
      target = (target ?? rot) + dir * step;
    };

    // A pointer that never really moved is a click on the card beneath it, so
    // the slop test lives on the frame and the card only reads the verdict.
    const onClickCapture = (e: MouseEvent) => {
      if (movedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        movedRef.current = false;
      }
    };

    frame.addEventListener("pointerdown", onDown);
    frame.addEventListener("pointermove", onMove);
    frame.addEventListener("pointerup", onUp);
    frame.addEventListener("pointercancel", onUp);
    frame.addEventListener("click", onClickCapture, true);

    // Warming the cards is the other half of the observer's job. They sit
    // inside a 3D transform, where lazy loading cannot be trusted: a card can
    // turn to the front without the browser ever having counted it as visible,
    // so it arrives blank and fills in late. Once the section is close, ask for
    // all of them at once. They are small, and the ones the hero rail already
    // pulled are shared, so most of this is a cache read.
    let warmed = false;
    const warm = () => {
      if (warmed) return;
      warmed = true;
      cardsRef.current.forEach((c) => {
        const img = c?.querySelector("img");
        if (img && !img.complete) img.loading = "eager";
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        if (onScreen) warm();
      },
      // Wide enough that the cards are asked for before the section arrives.
      { rootMargin: "400px 0px" },
    );
    io.observe(frame);

    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    narrow.addEventListener("change", measure);

    // Belt and braces on the warming. The observer covers the common case, but
    // it only fires once the section is genuinely near, and it does not fire at
    // all in a background tab. Idle time after first paint is the other chance:
    // by then the hero has what it needs, and asking for the rest costs little.
    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    }).requestIdleCallback;
    const warmTimer = ric
      ? ric(warm, { timeout: 2500 })
      : window.setTimeout(warm, 1500);

    measure();
    render();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      const cic = (window as unknown as {
        cancelIdleCallback?: (h: number) => void;
      }).cancelIdleCallback;
      if (ric && cic) cic(warmTimer as number);
      else clearTimeout(warmTimer as number);
      io.disconnect();
      ro.disconnect();
      narrow.removeEventListener("change", measure);
      frame.removeEventListener("pointerdown", onDown);
      frame.removeEventListener("pointermove", onMove);
      frame.removeEventListener("pointerup", onUp);
      frame.removeEventListener("pointercancel", onUp);
      frame.removeEventListener("click", onClickCapture, true);
    };
  }, [works.length, drift]);

  return (
    <>
      <div
        className="ring-track"
        role="region"
        aria-roledescription="carousel"
        aria-label="The collection, on a turning ring"
      >
        <div
          ref={frameRef}
          className="ring-frame"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") { e.preventDefault(); nudgeRef.current(1); }
            if (e.key === "ArrowRight") { e.preventDefault(); nudgeRef.current(-1); }
          }}
        >
          <div ref={stageRef} className="ring-stage">
            {works.map((w, i) => (
              <button
                key={w.slug}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="ring-card"
                aria-label={`View ${w.title} in detail`}
                onClick={() => {
                  if (movedRef.current) return;
                  setOpen(i);
                }}
                style={{
                  transform: `rotateY(${i * stepRef.current}deg) translateZ(var(--ring-r, 420px))`,
                  opacity: (() => {
                    const a = i * stepRef.current;
                    const off = a > 180 ? 360 - a : a;
                    return Math.max(0.18, 1 - off / 155);
                  })(),
                }}
              >
                <figure>
                  {/* The shared card crop, sized for what these paint rather
                      than for the gallery. It is the same file the hero rail
                      uses, so the ones it already pulled are free here. */}
                  <img
                    src={`/art/card/${w.slug}.webp`}
                    alt={w.alt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <figcaption>
                    <span className="t">{w.title}</span>
                    <span className="m">{`${w.size} · ${w.year}`}</span>
                  </figcaption>
                </figure>
              </button>
            ))}
          </div>
        </div>

        <div className="ring-controls">
          <button
            type="button"
            className="ring-nav"
            aria-label="Previous painting"
            onClick={() => nudgeRef.current(1)}
          >
            ←
          </button>
          <span className="ring-hint">Drag to turn</span>
          <button
            type="button"
            className="ring-nav"
            aria-label="Next painting"
            onClick={() => nudgeRef.current(-1)}
          >
            →
          </button>
        </div>
      </div>

      <Lightbox works={works} index={open} onClose={close} />
    </>
  );
}
