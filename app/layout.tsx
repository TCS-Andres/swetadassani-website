import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cormorant, jost } from "./fonts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://swetadassani.com"),
  title: {
    default: "Sweta Dassani | Contemporary Devotional Art",
    template: "%s | Sweta Dassani",
  },
  description:
    "Original contemporary devotional paintings by Sweta Dassani. Sacred stories, contemporary expression. Mumbai, India. Commissions and worldwide shipping.",
  openGraph: {
    title: "Sweta Dassani | Contemporary Devotional Art",
    description: "Sacred stories. Contemporary expression.",
    type: "website",
    images: [
      {
        url: "/art/krishna-flute.jpg",
        width: 1200,
        height: 1600,
        alt: "Acrylic painting of Krishna playing the flute against a vivid multicoloured sky",
      },
    ],
  },
  // The lotus monogram from the brand kit.
  // NOTE: this file is the retired gold-on-limestone generation, not the
  // Saffron-on-Violet-Ink favicon the brand guide specifies. Swap it when the
  // corrected export arrives.
  icons: {
    icon: "/logo/SwetaDassani_Favicon_512.png",
    apple: "/logo/SwetaDassani_Favicon_512.png",
  },
};

// Violet Ink, so the mobile browser chrome matches the dark band.
export const viewport: Viewport = {
  themeColor: "#262038",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning covers the data-reveal attribute the script
    // below stamps on before React hydrates. It scopes to this element's own
    // attributes only, so real mismatches inside the tree still surface.
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Arm the reveal animation before first paint. If this waited for
            hydration, the server HTML would paint fully visible and then fade
            itself out. Readers who prefer reduced motion never get the
            attribute, so nothing is ever hidden from them. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.reveal='on'",
          }}
        />
      </head>
      <body>
        <div className="page">
          <Nav />
          <main>{children}</main>
          <Footer />
        </div>
        <ScrollReveal />
      </body>
    </html>
  );
}
