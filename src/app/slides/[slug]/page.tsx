import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getSlideDeck, getSlideSlugs } from "@/lib/slides";
import SlideViewer from "./SlideViewer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getSlideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const deck = getSlideDeck(slug);
  if (!deck) return {};

  const title = `${deck.frontmatter.title} | スライド`;
  const description = deck.frontmatter.description || "";
  const ogImageUrl = `/api/og/slides?title=${encodeURIComponent(deck.frontmatter.title)}&date=${encodeURIComponent(deck.frontmatter.date)}`;

  return {
    title,
    description,
    openGraph: {
      title: deck.frontmatter.title,
      description,
      type: "article",
      publishedTime: deck.frontmatter.date,
      url: `/slides/${slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: deck.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: deck.frontmatter.title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function SlidePage({ params }: Props) {
  const { slug } = await params;
  const deck = getSlideDeck(slug);
  if (!deck) notFound();

  return (
    <SlideViewer
      title={deck.frontmatter.title}
      totalSlides={deck.slides.length}
    >
      {deck.slides.map((md, i) => (
        <div key={i} data-slide-index={i} className="slide-item">
          <MDXRemote source={md} />
        </div>
      ))}
    </SlideViewer>
  );
}
