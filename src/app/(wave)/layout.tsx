import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import "./blog/blog-content.css";
import SpotlightAndWave from "@/components/features/SpotLightAndWave";

export const metadata: Metadata = {
  metadataBase: new URL("https://maguro-alternative.com"),
  title: "マグロポートフォリオ",
  description: "マグロのポートフォリオサイトです。",
  icons: {
    icon: "/uchuemon.png",
  },
  openGraph: {
    siteName: "マグロポートフォリオ",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="antialiased container mx-auto">
        <SpotlightAndWave />
        {children}
      </div>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
