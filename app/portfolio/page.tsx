import type { Metadata } from "next";
import Link from "next/link";
import { works } from "@/content/works";
import GalleryClient from "@/components/GalleryClient";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The collection: original contemporary paintings of Shiva, Krishna, Ganesha, and dance by Sweta Dassani. Inquire for price. Worldwide shipping.",
};

export default function Portfolio() {
  return (
    <>
      <header className="page-head bordered">
        <div className="container">
          <span className="label reveal">The Collection</span>
          <h1 className="reveal d1">The Work</h1>
          <p className="lead reveal d2">
            Original paintings of Indian deities and dance, each one a conversation between sacred tradition and a contemporary hand. New pieces are added every month. Select any work to see it larger, with its story.
          </p>
        </div>
      </header>

      <section className="works">
        <div className="container">
          <GalleryClient works={works} />
          <div className="works-foot" style={{ justifyContent: "center", border: 0, paddingTop: "clamp(2.5rem,6vh,4rem)" }}>
            <Link className="textlink" href="/contact">
              Inquire about a piece, or commission your own <span className="arw">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
