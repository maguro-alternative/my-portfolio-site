import type { Metadata } from "next";
import Header from "@/components/commonUI/Header";
import {
  fetchQiitaArticles,
  fetchZennArticles,
  fetchNoteArticles,
  type Article,
} from "@/lib/articles";
import { fetchBlogArticles } from "@/lib/blog";
import { fetchSlideArticles } from "@/lib/slides";
import ArticleList from "@/components/features/ArticleList";

export const metadata: Metadata = {
  title: "記事一覧 | マグロポートフォリオ",
  description: "ブログ・Qiita・Zenn・noteに投稿した記事の一覧です。",
};

const QIITA_ID = "maguro-alternative";
const ZENN_ID = "maguro_alterna";
const NOTE_ID = "maguro_alter";

export default async function ArticlesPage() {
  const results = await Promise.all([
    Promise.resolve(fetchBlogArticles(10)),
    Promise.resolve(fetchSlideArticles(10)),
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
      <Header />

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
