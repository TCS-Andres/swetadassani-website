/** @type {import('next').NextConfig} */

// `npm run export` sets STATIC_EXPORT=1 and produces a plain HTML/CSS/JS copy
// of the site in ./out: an index.html you can open by double-clicking, or drop
// onto any static host. Normal `npm run dev` / `npm run build` are unaffected,
// so a Vercel deploy still gets optimised images and the full Next runtime.
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig = isExport
  ? {
      output: "export",
      // The image optimiser is a server feature; a static copy has no server,
      // so the originals are served as-is.
      images: { unoptimized: true },
      // Emit about/index.html rather than about.html, so the folder works when
      // opened from disk and on hosts that do not rewrite extensionless URLs.
      trailingSlash: true,
    }
  : {};

export default nextConfig;
