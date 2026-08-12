"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = (href: string) => (pathname === href ? "active" : undefined);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <Link className="wordmark" href="/">
        Sweta Dassani<span className="dot">.</span>
      </Link>
      <div className="nav-right">
        <div className="nav-links">
          <Link href="/portfolio" className={active("/portfolio")}>Work</Link>
          <Link href="/about" className={active("/about")}>About</Link>
          <Link href="/contact" className={active("/contact")}>Contact</Link>
        </div>
        <Link className="btn" href="/contact">Inquire</Link>
      </div>
    </nav>
  );
}
