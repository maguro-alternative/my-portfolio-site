import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
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

  const serializedSlides = await Promise.all(
    deck.slides.map((md) => serialize(md))
  );

  return (
    <SlideViewer title={deck.frontmatter.title} slides={serializedSlides} />
  );
}
