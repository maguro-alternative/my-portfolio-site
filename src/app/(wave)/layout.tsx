import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import SpotlightAndWave from "@/components/features/SpotLightAndWave";

export const metadata: Metadata = {
  title: "マグロポートフォリオ",
  description: "マグロのポートフォリオサイトです。",
  icons: {
    icon: "/uchuemon.png",
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
