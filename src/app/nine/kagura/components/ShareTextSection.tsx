interface ShareTextSectionProps {
  shareText: string;
  onCopy: () => void;
  disabled?: boolean;
}

export function ShareTextSection({ shareText, onCopy, disabled }: ShareTextSectionProps) {
  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleBlueskyShare = () => {
    const blueskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(shareText)}`;
    window.open(blueskyUrl, '_blank', 'width=550,height=420');
  };

  if (disabled) {
    return (
      <section className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4 opacity-50">
        <p className="text-sm font-semibold text-slate-400">シェアテキスト</p>
        <p className="text-xs text-slate-400">9キャラすべて選択するとシェアできます</p>
      </section>
    );
  }

  return (
    <section className="space-y-3 rounded-lg border border-slate-300 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-700">シェアテキスト</p>
      <div className="rounded-md border border-slate-300 bg-white p-3">
        <p className="mb-2 text-xs text-slate-500">文字数: {shareText.replace(/https?:\/\/\S+/g, '').length}</p>
        <p className="whitespace-pre-wrap break-all text-xs text-slate-800">{shareText}</p>
        <div className="mt-4 flex gap-2 border-t border-slate-200 pt-3">
          <button
            onClick={onCopy}
            className="rounded border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
          >
            コピー
          </button>
          <button
            onClick={handleTwitterShare}
            className="flex items-center gap-1 rounded border border-blue-400 bg-blue-400 px-3 py-1 text-xs text-white hover:bg-blue-500"
          >
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Xでシェア
          </button>
          <button
            onClick={handleBlueskyShare}
            className="flex items-center gap-1 rounded border border-sky-500 bg-sky-500 px-3 py-1 text-xs text-white hover:bg-sky-600"
          >
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 568 501">
              <path d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 503.222 453.32c-60.293 117.507-227.81 30.482-256.222-69.108-5.229-18.32-7.683-26.88-7.688-19.644-.005-7.236-2.46 1.325-7.688 19.644-28.413 99.59-195.93 186.615-256.222 69.108-33.222-64.76-4-129.52 110.875-149.07-65.72 11.185-139.6-7.295-159.875-79.748C20.945 203.66 11 75.293 11 57.947 11-28.906 86.134-1.611 123.121 33.664z" />
            </svg>
            Blueskyでシェア
          </button>
        </div>
      </div>
    </section>
  );
}
