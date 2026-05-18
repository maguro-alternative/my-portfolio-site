import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Article } from "./articles";

const SLIDES_DIR = path.join(process.cwd(), "src/content/slides");

export type SlideFrontmatter = {
  title: string;
  date: string;
  description?: string;
};

export type SlideDeck = {
  slug: string;
  frontmatter: SlideFrontmatter;
  slides: string[];
};

export function getSlideSlugs(): string[] {
  if (!fs.existsSync(SLIDES_DIR)) return [];
  return fs
    .readdirSync(SLIDES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getSlideDeck(slug: string): SlideDeck | null {
  const filePath = path.join(SLIDES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const slides = content
    .split(/^---$/m)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return {
    slug,
    frontmatter: data as SlideFrontmatter,
    slides,
  };
}

export function getAllSlideDecks(): SlideDeck[] {
  return getSlideSlugs()
    .map((slug) => getSlideDeck(slug)!)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function fetchSlideArticles(count = 3): Article[] {
  return getAllSlideDecks()
    .slice(0, count)
    .map((deck) => ({
      title: deck.frontmatter.title,
      url: `/slides/${deck.slug}`,
      publishedAt: deck.frontmatter.date,
      platform: "slides" as const,
    }));
}
