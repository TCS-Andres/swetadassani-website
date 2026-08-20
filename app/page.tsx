import Image from "next/image";
import Link from "next/link";
import CorridorHero from "@/components/CorridorHero";
import PopCard from "@/components/PopCard";
import PlateTilt from "@/components/PlateTilt";
import ColorRibbons from "@/components/ColorRibbons";
import { CircularGallery } from "@/components/ui/circular-gallery";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import { works, featured, ENERGIES } from "@/content/works";

export default function Home() {
  const lifted = featured.slice(0, 3);

  return (
    <>
      <CorridorHero />

      <section className="statement">
        <div className="container">
          <p className="reveal">Painting is where I find stillness.</p>
          <span className="lotus-rule reveal d1" aria-hidden />
          <p className="who reveal d2">
            My work brings together devotion, vibrant colour, and contemporary
            expression to create art that feels both sacred and deeply personal.
            Every piece is an original.
          </p>
        </div>
      </section>

      {/* The three that lift off the page. */}
      <section className="works">
        <div className="container">
          <div className="sec-head">
            <div className="left">
              <span className="folio reveal" aria-hidden>
                I
              </span>
              <div>
                <span className="label reveal">Selected Works</span>
                <h2 className="section-title reveal d1">Step closer</h2>
                <span className="brushwave reveal d2" aria-hidden />
              </div>
            </div>
            <p className="sub reveal d2">
              {/* "Hover" is a lie on a phone; the tilt is pointer-only. */}
              <span className="on-hover">
                Hover any piece: the canvas lifts out of its frame.
              </span>
              <span className="on-touch">
                Three from the collection, in my own words.
              </span>
            </p>
          </div>

          <div className="popgrid">
            {lifted.map((w, i) => (
              <div key={w.slug} className={`reveal${i ? ` d${i}` : ""}`}>
                <PopCard
                  slug={w.slug}
                  title={w.title}
                  meta={`Acrylic on canvas · ${w.size} · ${w.year}`}
                  alt={w.alt}
                  energy={w.subject}
                  tag={i === 0 ? "New work" : undefined}
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The gallery at night. Two paintings shown whole rather than one
          cropped, tilted so the pair has depth. */}
      <section className="plate-wide">
        <div className="container plate-grid">
          <div className="copy">
            <span className="label reveal">The Cosmic Dance</span>
            <h2 className="reveal d1">
              Not icons.
              <br />
              <em>Energies.</em>
            </h2>
            <span className="brushwave reveal d1" aria-hidden />
            <p className="reveal d2">
              Ardhanarishvara: the divine as both halves at once, dancing.
              Strength and grace in a single body. Each subject is a doorway:
              the form is sacred and timeless, the emotion inside it is deeply
              human.
            </p>
            <div className="plate-acts reveal d3">
              <Link className="btn" href="/contact">
                Inquire about this piece
              </Link>
              <Link className="textlink" href="/portfolio">
                See the collection <span className="arw">→</span>
              </Link>
            </div>
          </div>

          <PlateTilt className="plates reveal d1">
            <figure className="p back">
              <Image
                src="/art/sm/shiva-parvati.jpg"
                alt="Parvati resting against Shiva, in red and ochre"
                width={760}
                height={950}
                sizes="(max-width:900px) 40vw, 22vw"
              />
            </figure>
            <figure className="p front">
              <Image
                src="/art/ardhanarishvara.jpg"
                alt="Ardhanarishvara, the divine as both halves at once, dancing"
                width={1100}
                height={1375}
                sizes="(max-width:900px) 70vw, 32vw"
              />
              <figcaption>Two Halves, One Breath · Acrylic on canvas · 2025</figcaption>
            </figure>
          </PlateTilt>
        </div>
      </section>

      {/* Head and foot sit above and below the ring rather than floating on
          top of it. Overlaid, their clearance depended on how tall they
          happened to be, and the moment the link became a button it grew up
          into the paintings, leaving 3px. */}
      <section className="ring-section">
        <div className="ring-head">
          <span className="label">The Collection</span>
          <h2 className="section-title">More from the studio</h2>
        </div>

        <CircularGallery
          items={works.map((w) => ({
            slug: w.slug,
            title: w.title,
            meta: `${w.size} · ${w.year}`,
            alt: w.alt,
          }))}
        />

        <div className="ring-foot">
          <Link className="btn" href="/contact">
            Inquire about a piece
          </Link>
          <Link className="textlink" href="/portfolio">
            View all {works.length} works <span className="arw">→</span>
          </Link>
        </div>
      </section>

      <section className="energy petal-wash">
        <div className="container">
          <div className="energy-intro reveal">
            <span className="label">Three Energies</span>
            <h2 className="section-title" style={{ marginTop: "1rem" }}>
              I paint the feeling, not the figure
            </h2>
            <p style={{ marginTop: "1.2rem" }}>
              I rarely think of a painting as an image of the divine. Each
              subject is an energy I want to explore.
            </p>
          </div>
          <div className="reveal d1">
            <ProjectShowcase
              items={ENERGIES.map((e) => ({
                key: e.name,
                title: e.name,
                meta: e.traits.join(" · "),
                image: `/art/sm/${e.slug}.jpg`,
                alt: `${e.name}, painted by Sweta Dassani`,
                href: "/portfolio",
              }))}
            />
          </div>
        </div>
      </section>

      <section className="artist studio-wall">
        {/* Her own painting, enlarged and held right back, running off the
            left edge. She reads as standing inside the work rather than
            beside it. Decorative only. */}
        <div className="wall" aria-hidden>
          <Image
            src="/art/ganesha-rainbow.jpg"
            alt=""
            fill
            sizes="70vw"
            style={{ objectFit: "cover", objectPosition: "60% 45%" }}
          />
        </div>
        <div className="container artist-grid">
          <PlateTilt className="artist-figure reveal">
            <ColorRibbons />
            <div className="shot">
              <Image
                src="/portrait/sweta-2.jpg"
                alt="Sweta Dassani, photographed outdoors on a wooden walkway"
                width={1120}
                height={1400}
                sizes="(max-width:1000px) 80vw, 36vw"
              />
            </div>
            <span className="stamp" aria-hidden />
          </PlateTilt>

          <div className="artist-copy">
            <span className="label reveal">The Artist</span>
            <blockquote className="reveal d1">
              Each painting becomes a conversation between tradition and my own
              inner world.
            </blockquote>
            <p className="body reveal d2">
              I began painting at six. Formal training and years of
              self-directed exploration, in equal measure: a respect for
              tradition carried by my own hand. I work in layers, letting
              colour, texture and movement develop slowly, until the human
              emotion inside the sacred form comes through.
            </p>
            <div className="sig reveal d3">Sweta</div>
            <div className="more reveal d3">
              <Link className="textlink" href="/about">
                Read my story <span className="arw">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container inner">
          <Image
            className="mark"
            src="/logo/SwetaDassani_Mark_Gold.png"
            alt=""
            width={1005}
            height={744}
          />
          <span className="label reveal">Inquiries &amp; Commissions</span>
          <h2 className="reveal d1">
            Found the piece you have <em>been looking for?</em>
          </h2>
          <p className="reveal d2">
            Every work is an original. Tell me which piece you have your eye
            on, or commission something made for your space. I ship worldwide,
            in USD or INR.
          </p>
          <Link className="btn reveal d3" href="/contact">
            Start an inquiry
          </Link>
        </div>
      </section>
    </>
  );
}
