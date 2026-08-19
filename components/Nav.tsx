"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/portfolio", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on navigation, so tapping a link does not leave the panel hanging
  // open over the new page.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const active = (href: string) => (pathname === href ? "active" : undefined);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}>
      <Link className="brandlock" href="/" aria-label="Sweta Dassani, home">
        {/* Every page now opens on limestone, so the mark is always the dark
            one. (The white mark is kept in /public/logo for dark surfaces.) */}
        <Image
          src="/logo/SwetaDassani_Mark_Ink.png"
          alt=""
          width={1005}
          height={744}
          priority
        />
        <span className="wordmark">
          Sweta Dassani<span className="dot">.</span>
        </span>
      </Link>

      <div className="nav-right">
        <div className="nav-links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={active(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link className="btn nav-inquire" href="/contact">
          Inquire
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden />
          <span aria-hidden />
        </button>
      </div>

      <div className="nav-panel" id="nav-panel" hidden={!open}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={active(l.href)}>
            {l.label}
          </Link>
        ))}
        <Link className="btn" href="/contact">
          Inquire
        </Link>
      </div>
    </nav>
  );
}
