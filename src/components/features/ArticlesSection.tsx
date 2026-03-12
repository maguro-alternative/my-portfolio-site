import Link from "next/link";
import {
  fetchQiitaArticles,
  fetchZennArticles,
  fetchNoteArticles,
  type Article,
} from "@/lib/articles";
import { fetchBlogArticles } from "@/lib/blog";
import ArticleCard from "@/components/features/ArticleCard";

type Props = {
  qiitaId?: string;
  zennId?: string;
  noteId?: string;
};

export default async function ArticlesSection({
  qiitaId,
  zennId,
  noteId,
}: Props) {
  const results = await Promise.all([
    Promise.resolve(fetchBlogArticles(3)),
    qiitaId ? fetchQiitaArticles(qiitaId) : Promise.resolve([]),
    zennId ? fetchZennArticles(zennId) : Promise.resolve([]),
    noteId ? fetchNoteArticles(noteId) : Promise.resolve([]),
  ]);

  const articles: Article[] = results
    .flat()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 9);

  if (articles.length === 0) return null;

  return (
    <section className="text-white max-w-4/5 mx-auto mb-8">
      <h2 className="text-2xl mb-4">最新の記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {articles.map((article) => (
          <ArticleCard key={article.url} article={article} />
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/articles"
          className="inline-block px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm text-white no-underline"
        >
          もっと見る →
        </Link>
      </div>
    </section>
  );
}
