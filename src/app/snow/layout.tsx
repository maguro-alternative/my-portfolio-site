import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Uchu-emon",
  description: "Uchu-emon's portfolio site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
