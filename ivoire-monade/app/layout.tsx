import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingBubble from "@/components/FloatingBubble";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — 13 compétences pour réussir en ligne`,
    template: `%s — ${site.shortName}`
  },
  description:
    "Ivoire Monade : le Pack Business, 13 compétences pour lancer votre activité en ligne — e-commerce, produit digital, publicité, création de site, affiliation.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.shortName} — Pack Business`,
    description: "13 compétences pour réussir en ligne. Accès à vie, satisfait ou remboursé.",
    url: site.url,
    siteName: site.shortName,
    locale: "fr_FR",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Sans JavaScript, on force l'affichage des éléments animés (SEO / accessibilité) */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <FloatingBubble />
      </body>
    </html>
  );
}
