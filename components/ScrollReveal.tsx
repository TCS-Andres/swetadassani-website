"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Progressive-enhancement scroll reveal. Re-runs on route change so client-side
// navigations get their new .reveal elements observed. Without JS (or with
// reduced motion) content stays fully visible.
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }

    // `data-reveal` is stamped on by a blocking script in the document head,
    // before first paint. Setting it here instead would let the server HTML
    // paint fully visible and then fade everything out on hydration.
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
