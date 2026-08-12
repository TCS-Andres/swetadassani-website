import localFont from "next/font/local";

// Self-hosted, Latin subsets. next/font handles preloading and avoids layout shift.
export const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const jost = localFont({
  src: [
    { path: "./fonts/jost-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/jost-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jost-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});
