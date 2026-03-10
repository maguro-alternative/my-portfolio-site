"use client";

import { useState } from "react";
import type { Article } from "@/lib/articles";
import ArticleCard from "@/components/features/ArticleCard";

const FILTERS: { label: string; value: Article["platform"] | "all" }[] = [
  { label: "すべて", value: "all" },
  { label: "📝 Qiita", value: "qiita" },
  { label: "📘 Zenn", value: "zenn" },
  { label: "✏️ note", value: "note" },
];

export default function ArticleList({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<Article["platform"] | "all">("all");

  const filtered =
    filter === "all"
      ? articles
      : articles.filter((a) => a.platform === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors border-none cursor-pointer ${
              filter === f.value
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-white/60 text-center py-8">記事が見つかりませんでした。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((article) => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </div>
      )}
    </>
  );
}
