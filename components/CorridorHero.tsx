"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { works } from "@/content/works";

/**
 * The home page opens with her paintings coming at you out of the dark.
 *
 * The corridor is decorative — it is `aria-hidden` inside the component, and
 * every painting it streams is also reachable as a real, captioned work
 * further down the page and in the portfolio. So nothing here is load-bearing
 * for a screen reader, and the images carry no alt text by design.
 *
 * The order is shuffled by hand rather than at random: the two rails run the
 * same sequence, so neighbouring entries are what a viewer sees side by side.
 * Alternating warm and cool keeps that pairing from going flat.
 */
const STREAM = [
  "nataraja",
  "krishna-flute",
  "ganesha-beginnings",
  "durga",
  "radha-krishna",
  "ganesha-cubist",
  "ardhanarishvara",
  "krishna-face",
  "shiva-trident",
  "dancer",
  "ganesha-rainbow",
  "beloved-dance",
].map((slug) => ({ src: `/art/${slug}.jpg` }));

/**
 * The default rails are fitted to a wide viewport. On a portrait phone they
 * throw the near cards clear off both sides, so the corridor reads as empty.
 * A tighter spread and a smaller exit keep the whole stream inside the narrow
 * frame, so the paintings still rush the viewer, just at phone proportions.
 */
const MOBILE_PATH = { railBirth: -7, railExit: 26, exitHeight: 36, fan: 3 };

export default function CorridorHero() {
  const count = works.length;
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 620px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <ImageStreamHero
      images={STREAM}
      className="corridor"
      cards={9}
      speed={22}
      axis={52}
      path={mobile ? MOBILE_PATH : undefined}
    >
      <div className="corridor-overlay">
        <div className="kicker reveal">Contemporary Devotional Art</div>
        <h1 className="reveal d1">
          Sacred stories.
          <br />
          <em>Contemporary expression.</em>
        </h1>
        <p className="sub reveal d2">
          I paint Shiva, Krishna and Ganesha — not as icons, but as energies.
          Strength. Love. Wisdom.
        </p>
        <div className="acts reveal d3">
          <Link className="btn" href="/portfolio">
            View the collection
          </Link>
          <Link className="btn btn-ghost" href="/about">
            Meet the artist
          </Link>
        </div>
      </div>
      <div className="corridor-scroll" aria-hidden>
        {count} originals
      </div>
    </ImageStreamHero>
  );
}
