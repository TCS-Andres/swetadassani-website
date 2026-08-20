"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";
import { type Work, SUBJECT_FILTERS, ROMAN } from "@/content/works";

export default function GalleryClient({ works }: { works: Work[] }) {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);

  const shown = works
    .map((w, i) => ({ w, i }))
    .filter(({ w }) => filter === "All" || w.subject === filter);

  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <div className="filters">
        {SUBJECT_FILTERS.map((f) => (
          <button
            key={f}
            className={`filter${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {f}
          </button>
        ))}
        <span className="gallery-count">
          {shown.length} {shown.length === 1 ? "work" : "works"}
        </span>
      </div>

      <div className="grid">
        {shown.map(({ w, i }) => (
          <article className="work" key={w.slug}>
            <button className="tile" onClick={() => setActive(i)} aria-label={`View ${w.title} in detail`}>
              <Image
                src={`/art/${w.slug}.jpg`}
                alt={w.alt}
                fill
                sizes="(max-width:620px) 100vw, (max-width:900px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </button>
            <div className="cap">
              <div className="num">{ROMAN[i]}</div>
              <div className="body">
                <div className="wl-title">{w.title}</div>
                <div className="wl-meta">Acrylic on canvas · {w.size} · {w.year}</div>
                <Link className="price" href="/contact">Inquire for price</Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Lightbox works={works} index={active} onClose={close} />
    </>
  );
}
