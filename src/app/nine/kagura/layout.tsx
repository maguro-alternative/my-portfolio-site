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

export const metadata: Metadata = {
  title: "私を構成する9人のカグラ",
  description: "9人のシノビマスター閃乱カグラのキャラクターを選んで画像として保存。お気に入りのキャラクターで自分だけの画像を作成できます。",
  icons: {
    icon: "/nine/kagura/icon.png",
  },
  openGraph: {
    title: "私を構成する9人のカグラ",
    description: "9人のシノビマスター閃乱カグラのキャラクターを選んで画像として保存",
    type: "website",
    locale: "ja_JP",
    siteName: "私を構成する9人のカグラ",
    images: [
      {
        url: '/api/og/kagura?title=私を構成する9人のカグラ',
        width: 1200,
        height: 630,
        alt: '私を構成する9人のカグラ',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "私を構成する9人のカグラ",
    description: "9人のシノビマスター閃乱カグラのキャラクターを選んで画像として保存",
    images: ['/api/og/kagura?title=私を構成する9人のカグラ'],
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
