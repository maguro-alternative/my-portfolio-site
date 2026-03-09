import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/app/globals.css";
import "./kagura-reset.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://maguro-alternative.com'),
  title: "私を構成する9人のシノビ少女",
  description: "9人の閃乱カグラのキャラクターを選んで画像として保存。お気に入りのキャラクターで自分だけの画像を作成できます。",
  keywords: ["閃乱カグラ", "シノビ少女", "キャラクター", "私を構成する9人", "画像作成"],
  alternates: {
    canonical: '/nine/kagura',
  },
  icons: {
    icon: "/nine/kagura/kagurun.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://senrankagura.marv.jp" />
        <link
          rel="preload"
          href="https://senrankagura.marv.jp/img/bg_header_top.png"
          as="image"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="https://senrankagura.marv.jp/img/bg_top_flower02.png"
          as="image"
        />
        <link
          rel="preload"
          href="https://senrankagura.marv.jp/img/bg_main_flower03.png"
          as="image"
        />
      </head>
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
