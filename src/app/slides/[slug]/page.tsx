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
  return {
    title: `${deck.frontmatter.title} | スライド`,
    description: deck.frontmatter.description,
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
