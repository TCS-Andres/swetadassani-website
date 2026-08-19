import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PlateTilt from "@/components/PlateTilt";
import ColorRibbons from "@/components/ColorRibbons";
import { works, ENERGIES } from "@/content/works";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sweta Dassani is a Mumbai-based painter of contemporary devotional art. Sacred stories, contemporary expression.",
};

/** Details cropped from the paintings, for the strip under the bio. */
const STUDIO = [
  { slug: "krishna-face", alt: "Detail from a painting of Krishna's face in blue and gold" },
  { slug: "ganesha-cubist", alt: "Detail of angular colour planes from a painting of Ganesha" },
  { slug: "durga", alt: "Detail of Durga's golden crown and jewellery" },
  { slug: "nataraja", alt: "Detail of the ring of fire from a painting of Nataraja" },
];

export default function About() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <span className="label reveal">The Artist</span>
          <h1 className="reveal d1">
            Sweta <em>Dassani</em>
          </h1>
          <p className="lead reveal d2">
            I'm a Mumbai-based painter giving contemporary form to sacred
            stories, where devotion, vibrant colour and a deeply personal hand
            meet on the canvas.
          </p>
        </div>
      </header>

      <section className="about studio-wall">
        {/* One of her paintings held far back behind the portrait. The blue
            wall in the photograph is the flattest thing on the page; this
            gives it something to sit in front of. */}
        <div className="wall" aria-hidden>
          <Image
            src="/art/shiva-nandi-dusk.jpg"
            alt=""
            fill
            sizes="70vw"
            style={{ objectFit: "cover", objectPosition: "45% 40%" }}
          />
        </div>
        <div className="container bio-grid">
          <PlateTilt className="artist-figure reveal">
            <ColorRibbons />
            <div className="shot">
              <Image
                src="/portrait/sweta-1.jpg"
                alt="Sweta Dassani, photographed against a blue wall"
                width={1120}
                height={1400}
                priority
                sizes="(max-width:900px) 90vw, 38vw"
              />
            </div>
            <span className="stamp" aria-hidden />
          </PlateTilt>
          <div className="bio-body reveal d1">
            <p>
              I began painting at the age of six. What I do has been shaped by
              formal training and by years of self-directed exploration, and
              that duality lives in the work: a respect for tradition paired
              with a personal, contemporary hand.
            </p>
            <p>
              I work mostly in acrylics, and I am known for my paintings of
              Shiva, Krishna and Ganesha, and for dance. Each piece brings
              vibrant colour, expressive detail and a contemporary point of
              view to sacred subjects that have inspired generations.
            </p>
            <div className="pullquote">Painting is where I find stillness.</div>
            <p>
              When I begin a new work, I am drawn not only to the form of the
              deity but to the energy and emotion it carries. I work in layers,
              letting colour, texture, expression and movement develop
              gradually, painting the human emotion inside the sacred form.
            </p>
            <p>
              The subjects are sacred and timeless; the emotions I explore
              through them are deeply human.
            </p>
          </div>
        </div>

        <div className="container">
          <span className="lotus-rule reveal" aria-hidden />
          <div className="studio-strip">
            {STUDIO.map((s, i) => (
              <div key={s.slug} className={`reveal${i ? ` d${i}` : ""}`}>
                <Image
                  src={`/art/${s.slug}.jpg`}
                  alt={s.alt}
                  width={800}
                  height={800}
                  sizes="(max-width:900px) 45vw, 22vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="energy petal-wash">
        <div className="container">
          <div className="energy-intro reveal">
            <h2 className="section-title">Not icons. Energies.</h2>
            <span className="brushwave" aria-hidden />
            <p style={{ marginTop: "1.4rem" }}>
              I rarely think of a painting as simply an image of the divine. It
              is an attempt to give form to something that cannot always be
              expressed in words.
            </p>
          </div>
          <div className="triad">
            {ENERGIES.map((e, i) => (
              <div className={`deity reveal${i ? ` d${i}` : ""}`} key={e.name}>
                <div className="name">{e.name}</div>
                <div className="traits">
                  {e.traits.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div style={{ maxWidth: "60ch" }}>
            <div className="label reveal" style={{ marginBottom: "1.2rem" }}>
              The Statement
            </div>
            <blockquote className="pullquote reveal d1" style={{ marginTop: 0 }}>
              Each painting becomes a conversation between tradition and my own
              inner world. I hope the work offers a pause amid the noise of
              everyday life, and a reminder of the strength, peace, beauty, and
              divinity that can also be found within.
            </blockquote>
            <div
              className="reveal d2"
              style={{
                marginTop: "1.6rem",
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "1.5rem",
                color: "var(--iris-deep)",
              }}
            >
              Sweta
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container inner">
          <div className="label reveal">See the Work</div>
          <h2 className="reveal d1">
            {works.length} originals, and new work every month.
          </h2>
          <p className="reveal d2">
            Explore the collection, or reach out to commission a piece of your
            own.
          </p>
          <Link className="btn reveal d3" href="/portfolio">
            View the collection
          </Link>
        </div>
      </section>
    </>
  );
}
