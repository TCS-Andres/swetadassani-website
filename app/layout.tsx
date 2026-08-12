import type { Metadata } from "next";
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
  },
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='88'%3E%F0%9F%AA%B7%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
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
