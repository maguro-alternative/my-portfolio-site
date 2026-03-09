import {
  fetchQiitaArticles,
  fetchZennArticles,
  fetchNoteArticles,
  type Article,
} from "@/lib/articles";

const PLATFORM_STYLES: Record<
  Article["platform"],
  { label: string; bg: string; icon: string }
> = {
  qiita: { label: "Qiita", bg: "bg-[#55C500]/20", icon: "📝" },
  zenn: { label: "Zenn", bg: "bg-[#3EA8FF]/20", icon: "📘" },
  note: { label: "note", bg: "bg-[#41C9B4]/20", icon: "✏️" },
};

function ArticleCard({ article }: { article: Article }) {
  const style = PLATFORM_STYLES[article.platform];
  const date = new Date(article.publishedAt).toLocaleDateString("ja-JP");

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg p-4 bg-white/5 hover:bg-white/10 transition-colors"
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${style.bg} text-white`}
        >
          {style.icon} {style.label}
        </span>
        <span className="text-xs text-white/60">{date}</span>
      </div>
      <h3 className="text-sm leading-snug text-white line-clamp-2">
        {article.title}
      </h3>
    </a>
  );
}

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
    qiitaId ? fetchQiitaArticles(qiitaId) : Promise.resolve([]),
    zennId ? fetchZennArticles(zennId) : Promise.resolve([]),
    noteId ? fetchNoteArticles(noteId) : Promise.resolve([]),
  ]);

  const articles: Article[] = results
    .flat()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  if (articles.length === 0) return null;

  return (
    <section className="text-white max-w-4/5 mx-auto mb-8">
      <h2 className="text-2xl mb-4">最新の記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {articles.map((article) => (
          <ArticleCard key={article.url} article={article} />
        ))}
      </div>
    </section>
  );
}
