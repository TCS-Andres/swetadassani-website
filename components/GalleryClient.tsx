"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Work, SUBJECT_FILTERS, ROMAN } from "@/content/works";

export default function GalleryClient({ works }: { works: Work[] }) {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);

  const shown = works
    .map((w, i) => ({ w, i }))
    .filter(({ w }) => filter === "All" || w.subject === filter);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const cur = active !== null ? works[active] : null;

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
                <div className="price">Inquire for price</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {cur && active !== null && (
        <div
          className="lightbox open"
          role="dialog"
          aria-modal="true"
          aria-label={cur.title}
          onClick={() => setActive(null)}
        >
          <button className="lb-close" aria-label="Close" onClick={() => setActive(null)}>
            ×
          </button>
          <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
            <div className="lb-imgwrap">
              <Image
                src={`/art/${cur.slug}.jpg`}
                alt={cur.alt}
                width={1200}
                height={1600}
                style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "90vh" }}
              />
            </div>
            <div className="lb-info">
              <div className="num">{ROMAN[active]}</div>
              <h3>{cur.title}</h3>
              <div className="meta">Acrylic on canvas · {cur.size} · {cur.year}</div>
              <p className="story">{cur.story}</p>
              <div className="lb-cta">
                <Link className="btn" href="/contact">Inquire for price</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
