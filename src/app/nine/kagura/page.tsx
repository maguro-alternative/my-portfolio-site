import type { Metadata } from 'next';
import KaguraClient from './KaguraClient';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;

  let ogImageUrl: string;

  // 新形式: ?c=0-1-2-3-4-5-6-7-8
  const cParam = params['c'];
  if (typeof cParam === 'string' && cParam !== '') {
    ogImageUrl = `/api/og/kagura?c=${cParam}`;
  } else {
    // 旧形式: ?s1=slug&s2=slug...
    const slugParams = new URLSearchParams();
    let hasCharacters = false;
    for (let i = 1; i <= 9; i++) {
      const slug = params[`s${i}`];
      if (typeof slug === 'string') {
        slugParams.set(`s${i}`, slug);
        hasCharacters = true;
      }
    }

    ogImageUrl = hasCharacters
      ? `/api/og/kagura?${slugParams.toString()}`
      : '/api/og/kagura?title=私を構成する9人のシノビ少女';
  }

  return {
    openGraph: {
      title: '私を構成する9人のシノビ少女',
      description: '9人の閃乱カグラのキャラクターを選んで画像として保存',
      type: 'website',
      locale: 'ja_JP',
      siteName: '私を構成する9人のシノビ少女',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: '私を構成する9人のシノビ少女',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: '私を構成する9人のシノビ少女',
      description: '9人の閃乱カグラのキャラクターを選んで画像として保存',
      images: [ogImageUrl],
    },
  };
}

export default function NineKaguraPage() {
  return <KaguraClient />;
}
