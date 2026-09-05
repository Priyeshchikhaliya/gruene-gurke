import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Grüne Gurke – Gaststätte & Vereinsheim in Wernigerode",
    template: "%s · Grüne Gurke",
  },
  description:
    "Die „Grüne Gurke“ ist ein Vereinsheim und eine gutbürgerliche Gaststätte für jedermann. Täglich ab 11 Uhr geöffnet. Bestellungen und Reservierungen unter 03943 634256.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: siteConfig.name,
    title: "Grüne Gurke – Gaststätte & Vereinsheim in Wernigerode",
    description:
      "Gutbürgerliche Gaststätte in Wernigerode. Alle Gerichte auch zum Mitnehmen und Abholen. Partyservice und Räume für Familien- und Betriebsfeiern.",
  },
};

export const viewport: Viewport = {
  // Muss vollständig gesetzt werden: ein eigener viewport-Export ersetzt
  // die Standardangabe von Next.js komplett.
  width: "device-width",
  initialScale: 1,
  themeColor: "#174237",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}>
      <head>
        <noscript>
          {/* Ohne JavaScript gibt es kein Einblenden – Inhalt sofort zeigen. */}
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
