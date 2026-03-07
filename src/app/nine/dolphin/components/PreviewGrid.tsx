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
      <div ref={cardRef} className="mx-auto max-w-[900px] rounded-xl border border-slate-300 bg-white p-8">
        <h1 className="mb-6 text-center text-xl font-bold tracking-wide text-slate-800 sm:text-2xl md:text-3xl">
          {title}
        </h1>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {selectedItems.map((item, index) => (
            <article key={index} className="relative overflow-hidden rounded-lg border-2 border-slate-300 bg-slate-100">
              <div className="aspect-[3/4]">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-200 text-center text-sm text-slate-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 px-2 py-1">
                <p className="text-center text-[10px] font-bold leading-tight text-white sm:text-xs">
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
