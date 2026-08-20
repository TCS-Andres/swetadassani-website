"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Work, ROMAN } from "@/content/works";

/**
 * The work detail dialog, shared by every place a painting can be opened:
 * the portfolio grid and the ring on the home page. It lives here rather than
 * inside one of them so a piece opens the same way wherever it is clicked, and
 * so the inquiry route stays identical.
 *
 * `index` is an index into `works`, not into whatever subset the caller is
 * showing, so the numeral and the neighbours always match the real collection.
 */
export default function Lightbox({
  works,
  index,
  onClose,
}: {
  works: Work[];
  index: number | null;
  onClose: () => void;
}) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Hold the page still behind the dialog.
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (index === null) return null;
  const cur = works[index];
  if (!cur) return null;

  return (
    <div
      className="lightbox open"
      role="dialog"
      aria-modal="true"
      aria-label={cur.title}
      onClick={onClose}
    >
      <button className="lb-close" aria-label="Close" onClick={onClose}>
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
          <div className="num">{ROMAN[index]}</div>
          <h3>{cur.title}</h3>
          <div className="meta">Acrylic on canvas · {cur.size} · {cur.year}</div>
          <p className="story">{cur.story}</p>
          <div className="lb-cta">
            <Link className="btn" href="/contact">Inquire for price</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
