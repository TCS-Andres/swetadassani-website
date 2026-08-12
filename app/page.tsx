import Image from "next/image";
import Link from "next/link";
import { works, ROMAN } from "@/content/works";

export default function Home() {
  const selected = works.slice(0, 5);

  return (
    <>
      <header className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-eyebrow reveal">
              <span className="rule" />
              <span className="label">Contemporary Devotional Art</span>
            </div>
            <h1 className="display reveal d1">
              Sacred stories.<br />
              <em>Contemporary expression.</em>
            </h1>
            <p className="hero-sub reveal d2">
              Original paintings of Shiva, Krishna, Ganesha, and dance, where vibrant color meets a quiet, deeply personal devotion.
            </p>
            <div className="hero-actions reveal d3">
              <Link className="btn" href="/portfolio">View the Collection</Link>
              <Link className="textlink" href="/contact">
                Inquire about a piece <span className="arw">→</span>
              </Link>
            </div>
            <div className="hero-meta reveal d4">
              <span><b>25</b> original works</span>
              <span>New work <b>monthly</b></span>
              <span>Shipped <b>worldwide</b></span>
            </div>
          </div>
          <figure className="hero-figure reveal d2">
            <div className="artframe">
              <Image
                src="/art/ganesha.jpg"
                alt="Contemporary devotional acrylic painting of Ganesha in marigold, saffron, and teal with gold-leaf accents"
                fill
                priority
                sizes="(max-width:900px) 90vw, 45vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="plate">
              <div className="wl-title">Beginnings</div>
              <div className="wl-meta">Acrylic on canvas · 18 × 24 in · 2025</div>
            </figcaption>
          </figure>
        </div>
      </header>

      <section className="statement">
        <div className="container">
          <p>Painting is where I find stillness.</p>
          <p className="who">
            My work brings together devotion, vibrant color, and contemporary expression to create art that feels both sacred and deeply personal.
          </p>
        </div>
      </section>

      <section className="works">
        <div className="container">
          <div className="works-head">
            <div>
              <div className="label reveal">The Collection</div>
              <h2 className="section-title reveal d1">Selected Works</h2>
            </div>
            <div className="sub reveal d2">A living gallery, refreshed with new pieces each month.</div>
          </div>
          <div className="grid">
            {selected.map((w, i) => (
              <article className={`work reveal${i % 3 ? ` d${i % 3}` : ""}`} key={w.slug}>
                <div className="tile">
                  <Image
                    src={`/art/${w.slug}.jpg`}
                    alt={`${w.title}, contemporary devotional painting`}
                    fill
                    sizes="(max-width:620px) 100vw, (max-width:900px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="cap">
                  <div className="num">{ROMAN[i]}</div>
                  <div className="body">
                    <div className="wl-title">{w.title}</div>
                    <div className="wl-meta">Acrylic on canvas · {w.size} · {w.year}</div>
                    <div className="price">Inquire for price</div>
                  </div>
                </div>
              </article>
            ))}
            <article className="work reveal d2">
              <Link className="tile view-all-tile" href="/portfolio">
                <span>
                  View all<br />works<br />
                  <span className="arw">→</span>
                </span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="energy">
        <div className="container">
          <div className="energy-intro reveal">
            <h2 className="section-title">Not icons. Energies.</h2>
            <p>Each subject is a doorway. The form is sacred and timeless; the emotion inside it is deeply human.</p>
          </div>
          <div className="triad">
            <div className="deity reveal">
              <div className="name">Shiva</div>
              <div className="traits"><span>Strength</span><span>Silence</span><span>Transformation</span></div>
            </div>
            <div className="deity reveal d1">
              <div className="name">Krishna</div>
              <div className="traits"><span>Love</span><span>Tenderness</span><span>Joy</span></div>
            </div>
            <div className="deity reveal d2">
              <div className="name">Ganesha</div>
              <div className="traits"><span>Wisdom</span><span>Hope</span><span>New beginnings</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container about-grid">
          <div className="reveal">
            <div className="label">The Artist</div>
            <blockquote>Each painting becomes a conversation between tradition and my own inner world.</blockquote>
            <div className="sig">Sweta</div>
            <div className="more">
              <Link className="textlink" href="/about">Read her story <span className="arw">→</span></Link>
            </div>
          </div>
          <div className="portrait reveal d1">
            <span className="ph">Artist portrait · to be added</span>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container inner">
          <div className="label reveal" style={{ color: "var(--brass)" }}>Inquiries &amp; Commissions</div>
          <h2 className="reveal d1">Found the piece you have been looking for?</h2>
          <p className="reveal d2">
            Every work is an original. Reach out to inquire about a painting, or to commission something made for your space. Worldwide shipping, in USD or INR.
          </p>
          <Link className="btn reveal d3" href="/contact">Start an inquiry</Link>
        </div>
      </section>
    </>
  );
}
