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
        <p className="mb-3 whitespace-pre-wrap break-all text-xs text-slate-800">{shareText}</p>
        <div className="flex gap-2">
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
        </div>
      </div>
    </section>
  );
}
