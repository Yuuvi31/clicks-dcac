import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLICKS — Photography Society of Delhi College of Arts & Commerce",
  description: "Independent Delhi street-photography journal and darkroom archive. Delhi College of Arts & Commerce, University of Delhi. Established 2011.",
  keywords: [
    "CLICKS DCAC",
    "Delhi College of Arts and Commerce",
    "Photography Society DU",
    "Delhi University Photography",
    "Street Photography Delhi",
    "Old Delhi Photowalk",
    "Indian Street Photography"
  ],
  authors: [{ name: "CLICKS DCAC Society" }],
  openGraph: {
    title: "CLICKS — Photography Society of DCAC",
    description: "We don't just take pictures. We notice. Independent Delhi street-photography magazine.",
    url: "https://www.instagram.com/clicks.dcac/",
    siteName: "CLICKS DCAC",
    images: [
      {
        url: "/clicks-logo.png",
        width: 600,
        height: 600,
        alt: "CLICKS Logo Lockup",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#080808] text-[#f4f1ea] antialiased">
        {children}
      </body>
    </html>
  );
}
