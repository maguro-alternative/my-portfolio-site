import type { Metadata } from 'next';
import DolphinClient from './DolphinClient';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;

  const slugParams = new URLSearchParams();
  let hasCharacters = false;
  for (let i = 1; i <= 9; i++) {
    const slug = params[`s${i}`];
    if (typeof slug === 'string') {
      slugParams.set(`s${i}`, slug);
      hasCharacters = true;
    }
  }

  const ogImageUrl = hasCharacters
    ? `/api/og/dolphin?${slugParams.toString()}`
    : '/api/og/dolphin?title=私を構成する9人のドルフィン';

  return {
    openGraph: {
      title: '私を構成する9人のドルフィン',
      description: '9人のドルフィンウェーブのキャラクターを選んで画像として保存',
      type: 'website',
      locale: 'ja_JP',
      siteName: '私を構成する9人のドルフィン',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: '私を構成する9人のドルフィン',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: '私を構成する9人のドルフィン',
      description: '9人のドルフィンウェーブのキャラクターを選んで画像として保存',
      images: [ogImageUrl],
    },
  };
}

export default function NineDolphinPage() {
  return <DolphinClient />;
}
