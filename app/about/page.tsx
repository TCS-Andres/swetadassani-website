import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sweta Dassani is a Mumbai-based painter of contemporary devotional art. Sacred stories, contemporary expression.",
};

export default function About() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <span className="label reveal">The Artist</span>
          <h1 className="reveal d1">Sweta Dassani</h1>
          <p className="lead reveal d2">
            A Mumbai-based painter giving contemporary form to sacred stories, where devotion, vibrant color, and a deeply personal hand meet on the canvas.
          </p>
        </div>
      </header>

      <section className="about">
        <div className="container bio-grid">
          <div className="bio-portrait reveal">
            <span className="ph">Artist portrait · to be added</span>
          </div>
          <div className="bio-body reveal d1">
            <p>
              Sweta began painting at the age of six. Her development has been shaped by a combination of formal training and years of self-directed exploration, and that duality lives in the work: a respect for tradition paired with a personal, contemporary hand.
            </p>
            <p>
              Working primarily in acrylics, she is known for her paintings of Shiva, Krishna, and Ganesha, and for dance. Each piece brings vibrant color, expressive detail, and a contemporary point of view to sacred subjects that have inspired generations.
            </p>
            <div className="pullquote">Painting is where I find stillness.</div>
            <p>
              When she begins a new work, she is drawn not only to the form of the deity but to the energy and emotion it represents. The subjects are sacred and timeless; the emotions she explores through them are deeply human.
            </p>
          </div>
        </div>
      </section>

      <section className="energy">
        <div className="container">
          <div className="energy-intro reveal">
            <h2 className="section-title">Not icons. Energies.</h2>
            <p>She rarely thinks of a painting as simply an image of the divine. It is an attempt to give form to something that cannot always be expressed in words.</p>
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
        <div className="container">
          <div style={{ maxWidth: "60ch" }}>
            <div className="label reveal" style={{ marginBottom: "1.2rem" }}>The Statement</div>
            <blockquote
              className="reveal d1"
              style={{ margin: 0, fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(1.5rem,1.1rem + 1.8vw,2.3rem)", lineHeight: 1.34, color: "var(--ink)" }}
            >
              Each painting becomes a conversation between tradition and my own inner world. I hope the work offers a pause amid the noise of everyday life, and a reminder of the strength, peace, beauty, and divinity that can also be found within.
            </blockquote>
            <div className="reveal d2" style={{ marginTop: "1.6rem", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.5rem", color: "var(--brass-deep)" }}>
              Sweta
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container inner">
          <div className="label reveal" style={{ color: "var(--brass)" }}>See the Work</div>
          <h2 className="reveal d1">Twenty-five originals, and new work every month.</h2>
          <p className="reveal d2">Explore the collection, or reach out to commission a piece of your own.</p>
          <Link className="btn reveal d3" href="/portfolio">View the collection</Link>
        </div>
      </section>
    </>
  );
}
