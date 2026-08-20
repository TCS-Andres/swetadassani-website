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
const STREAM_SM = SLUGS.map((slug) => ({ src: `/art/xs/${slug}.jpg` }));

/** Cards per rail. Also how many of the crops are worth preloading, since the
 *  component walks the list in order and never reaches the rest. */
const BAND_CARDS = 9;

/**
 * The same corridor, sized for a phone and moved out from behind the type.
 *
 * It is a second instance of the component rather than an imitation, so the
 * motion is identical: every length inside is `cqw`, a percentage of the
 * container's width, which means a band cut to the desktop hero's proportions
 * renders the desktop tunnel to scale. Nothing about the geometry is retuned.
 *
 * Two instances rather than one because the sources have to differ. A card at
 * its exit is about 420x590 on a desktop but 160x180 on a phone, and the
 * gallery files the desktop rail uses come to 7.5MB across nine cards. Each
 * instance is switched by CSS, and since the cards load lazily, whichever one
 * is not displayed never fetches a byte.
 *
 * Decorative, like the desktop rail: every painting here is a captioned work
 * further down the page and in the portfolio.
 */
function CorridorBand() {
  return (
    <ImageStreamHero
      images={STREAM_SM}
      className="corridor-band"
      cards={BAND_CARDS}
      speed={22}
      axis={52}
      aria-hidden
    />
  );
}

export default function CorridorHero() {
  const count = works.length;

  return (
    <>
      {/* The corridor's cards load lazily from inside a 3D transform, so on a
          phone they arrive one at a time and the ribbon has holes in it for
          the first few seconds. These preloads put the nine that are actually
          on the rail in the cache before the cards ask for them, so the tunnel
          is whole on the first frame. `media` keeps the cost off desktop and
          tablet, which show the other rail and never request these files. */}
      {SLUGS.slice(0, BAND_CARDS).map((slug) => (
        <link
          key={slug}
          rel="preload"
          as="image"
          href={`/art/xs/${slug}.jpg`}
          media="(max-width: 620px)"
        />
      ))}
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
      <CorridorBand />
      <div className="corridor-scroll" aria-hidden>
        {count} originals
      </div>
    </ImageStreamHero>
    </>
  );
}
