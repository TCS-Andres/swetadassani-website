import localFont from "next/font/local";

// Self-hosted, converted to woff2 from the brand kit's own TrueType masters.
//
// The variables are named for the faces rather than --font-sans / --font-serif:
// Tailwind v4's default theme defines those two names on :root, and although
// next/font's unlayered rule currently wins, anything that moves this CSS into
// a layer would silently swap both families for the system stack.
export const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-500.woff2", weight: "500", style: "normal" },
    // Real italic. Without it the browser slants the roman, which shears the
    // high-contrast strokes this face is chosen for.
    { path: "./fonts/cormorant-500i.woff2", weight: "500", style: "italic" },
    { path: "./fonts/cormorant-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

export const jost = localFont({
  src: [
    { path: "./fonts/jost-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/jost-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jost-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-jost",
  display: "swap",
});
