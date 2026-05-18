import { RefObject } from 'react';

interface SelectedItem {
  name: string;
  image?: string;
}

interface PreviewGridProps {
  title: string;
  selectedItems: SelectedItem[];
  cardRef: RefObject<HTMLDivElement | null>;
  onDownload: () => void;
}

export function PreviewGrid({ title, selectedItems, cardRef, onDownload }: PreviewGridProps) {
  return (
    <section className="self-start rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
      <div ref={cardRef} className="mx-auto max-w-[900px] rounded-xl border border-slate-300 bg-white p-2 sm:p-4 md:p-6">
        <h1 className="mb-2 text-center text-sm font-bold tracking-wide text-slate-800 sm:mb-4 sm:text-lg md:text-2xl">
          {title}
        </h1>
        <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-3">
          {selectedItems.map((item, index) => (
            <article key={index} className="overflow-hidden rounded border border-slate-300 sm:rounded-lg sm:border-2">
              <div className="aspect-video bg-slate-200">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-center text-[10px] text-slate-400 sm:text-xs">
                    No Image
                  </div>
                )}
              </div>
              <div className="bg-slate-900 px-1 py-0.5 sm:py-1">
                <p data-label className="whitespace-nowrap text-center text-xs font-bold leading-tight text-white">
                  {index + 1}. {item.name || '未選択'}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={onDownload}
          className="rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          画像としてダウンロード
        </button>
      </div>
    </section>
  );
}
