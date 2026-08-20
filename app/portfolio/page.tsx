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
            Every painting here is an original, a conversation between sacred tradition and my own hand. I add new pieces every month. Open any work to see it larger, with its story, and tell me if one speaks to you.
          </p>
        </div>
      </header>

      <section className="works">
        <div className="container">
          <GalleryClient works={works} />
          <div className="works-foot" style={{ justifyContent: "center", border: 0, paddingTop: "clamp(2.5rem,6vh,4rem)" }}>
            <div className="head-acts">
              <Link className="btn" href="/contact">
                Inquire about a piece
              </Link>
              <Link className="textlink" href="/contact">
                Or commission your own <span className="arw">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
