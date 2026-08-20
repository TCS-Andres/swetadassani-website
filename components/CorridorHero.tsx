"use client";

import Link from "next/link";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { works } from "@/content/works";

/**
 * The home page opens with her paintings coming at you out of the dark.
 *
 * The corridor is decorative: it is `aria-hidden` inside the component, and
 * every painting it streams is also reachable as a real, captioned work
 * further down the page and in the portfolio. So nothing here is load-bearing
 * for a screen reader, and the images carry no alt text by design.
 *
 * The order is shuffled by hand rather than at random: the two rails run the
 * same sequence, so neighbouring entries are what a viewer sees side by side.
 * Alternating warm and cool keeps that pairing from going flat.
 */
const SLUGS = [
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
];

const STREAM = SLUGS.map((slug) => ({ src: `/art/${slug}.jpg` }));

/**
 * The phone version of the corridor: the same paintings on one rail, running
 * beneath the type rather than behind it.
 *
 * The sequence is rendered twice so the track can travel exactly half its width
 * and land the second copy on the first, closing the loop with no seam. It
 * draws on `/art/xs`, sized for the ~9rem the strip actually paints at rather
 * than the gallery crops, because a phone waiting on a megabyte of decoration
 * is what makes frames arrive blank. The two copies share their sources, so
 * each painting is fetched once.
 *
 * Decorative, like the corridor: every painting here is a captioned work
 * further down the page and in the portfolio.
 */
function Strip() {
  return (
    <div className="mstream" aria-hidden>
      <div className="mstream-track">
        {[...SLUGS, ...SLUGS].map((slug, i) => (
          <img key={`${slug}-${i}`} src={`/art/xs/${slug}.jpg`} alt="" decoding="async" draggable={false} />
        ))}
      </div>
    </div>
  );
}

export default function CorridorHero() {
  const count = works.length;

  return (
    <ImageStreamHero
      images={STREAM}
      className="corridor"
      cards={9}
      speed={22}
      axis={52}
    >
      <div className="corridor-overlay">
        <div className="kicker reveal">Contemporary Devotional Art</div>
        <h1 className="reveal d1">
          Sacred stories.
          <br />
          <em>Contemporary expression.</em>
        </h1>
        <p className="sub reveal d2">
          I paint Shiva, Krishna and Ganesha, not as icons, but as energies.
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
      <Strip />
      <div className="corridor-scroll" aria-hidden>
        {count} originals
      </div>
    </ImageStreamHero>
  );
}
