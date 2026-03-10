import type { Article } from "@/lib/articles";

const PLATFORM_STYLES: Record<
  Article["platform"],
  { label: string; bg: string; icon: string }
> = {
  qiita: { label: "Qiita", bg: "bg-[#55C500]/20", icon: "📝" },
  zenn: { label: "Zenn", bg: "bg-[#3EA8FF]/20", icon: "📘" },
  note: { label: "note", bg: "bg-[#41C9B4]/20", icon: "✏️" },
};

export default function ArticleCard({ article }: { article: Article }) {
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
