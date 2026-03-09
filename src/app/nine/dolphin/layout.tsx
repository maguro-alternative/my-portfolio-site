import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "私を構成する9人のドルフィン",
  description: "9人のドルフィンウェーブのキャラクターを選んで画像として保存。お気に入りのキャラクターで自分だけの画像を作成できます。",
  icons: {
    icon: "/nine/dolphin/fenio.png",
  },
  openGraph: {
    title: "私を構成する9人のドルフィン",
    description: "9人のドルフィンウェーブのキャラクターを選んで画像として保存",
    type: "website",
    locale: "ja_JP",
    siteName: "私を構成する9人のドルフィン",
    images: [
      {
        url: '/api/og/dolphin?title=私を構成する9人のドルフィン',
        width: 1200,
        height: 630,
        alt: '私を構成する9人のドルフィン',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "私を構成する9人のドルフィン",
    description: "9人のドルフィンウェーブのキャラクターを選んで画像として保存",
    images: ['/api/og/dolphin?title=私を構成する9人のドルフィン'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
