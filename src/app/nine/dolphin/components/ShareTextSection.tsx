interface ShareTextSectionProps {
  shareText: string;
  onCopy: () => void;
}

export function ShareTextSection({ shareText, onCopy }: ShareTextSectionProps) {
  return (
    <section className="space-y-3 rounded-lg border border-slate-300 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-700">シェアテキスト</p>
      <div className="rounded-md border border-slate-300 bg-white p-3">
        <p className="mb-2 text-xs text-slate-500">文字数: {shareText.length}</p>
        <p className="mb-3 whitespace-pre-wrap text-xs text-slate-800">{shareText}</p>
        <button
          onClick={onCopy}
          className="rounded border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
        >
          コピー
        </button>
      </div>
    </section>
  );
}
