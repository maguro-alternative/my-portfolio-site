import { RefObject } from 'react';

interface SelectedItem {
  name: string;
  image?: string;
}

interface PreviewGridProps {
  title: string;
  selectedItems: SelectedItem[];
  cardRef: RefObject<HTMLDivElement>;
  onDownload: () => void;
}

export function PreviewGrid({ title, selectedItems, cardRef, onDownload }: PreviewGridProps) {
  return (
    <section className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
      <div ref={cardRef} className="mx-auto w-full max-w-[600px] rounded-xl border border-slate-300 bg-white p-6">
        <h1 className="mb-4 text-center text-xl font-bold tracking-wide text-slate-800 sm:text-2xl">
          {title}
        </h1>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {selectedItems.map((item, index) => (
            <article key={index} className="relative overflow-hidden rounded-lg border border-slate-300 bg-slate-100">
              <div className="aspect-square">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-200 text-center text-xs text-slate-500 sm:text-sm">
                    No Image
                  </div>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="line-clamp-2 text-xs font-semibold text-white sm:text-sm">
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
