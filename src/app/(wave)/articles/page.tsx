import Link from "next/link";
import type { Metadata } from "next";
import Twitter from "@/components/socials/twitter";
import Github from "@/components/socials/github";
import {
  fetchQiitaArticles,
  fetchZennArticles,
  fetchNoteArticles,
  type Article,
} from "@/lib/articles";
import ArticleList from "@/components/features/ArticleList";

export const metadata: Metadata = {
  title: "記事一覧 | マグロポートフォリオ",
  description: "Qiita・Zenn・noteに投稿した記事の一覧です。",
};

const QIITA_ID = "maguro-alternative";
const ZENN_ID = "maguro_alterna";
const NOTE_ID = "maguro_alter";

export default async function ArticlesPage() {
  const results = await Promise.all([
    fetchQiitaArticles(QIITA_ID, 10),
    fetchZennArticles(ZENN_ID, 10),
    fetchNoteArticles(NOTE_ID, 10),
  ]);

  const articles: Article[] = results
    .flat()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return (
    <>
      <div className="flex md:flex-row justify-between items-center p-2">
        <div className="flex gap-5 mb-2.5 md:mb-0 p-2 text-white">
          <Link href="/" className="no-underline">
            Home
          </Link>
          <Link href="/profile" className="no-underline">
            Profile
          </Link>
          <Link href="/articles" className="no-underline">
            Articles
          </Link>
        </div>
        <div className="flex items-center">
          <Twitter id="sigumataityouda" />
          <Github id="maguro-alternative" />
        </div>
      </div>

      <div className="text-white max-w-4/5 mx-auto mb-8">
        <h1 className="text-4xl mb-6">記事一覧</h1>
        <ArticleList articles={articles} />
      </div>

      <div className="text-center p-5 text-white">
        <p>&copy; 2025 Maguro Alternative. All rights reserved.</p>
      </div>
    </>
  );
}
