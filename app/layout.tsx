import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const title = "Cristhian Garzón · Salsita with Cris — Colombian Salsa in Budapest";
const description =
  "Cristhian Garzón is a Colombian salsa instructor based in Budapest. Salsa with sabor, technique, and a little bit of magic — from Cali-style footwork to partnerwork for the social dance floor.";

export const metadata: Metadata = {
  metadataBase: new URL("https://andresgarzong.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: "Salsita with Cris",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
