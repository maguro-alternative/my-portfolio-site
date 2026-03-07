import { SelectedItem } from '../hooks/useDolphinState';

interface SelectionGridProps {
  selectedItems: SelectedItem[];
  onPanelClick: (index: number) => void;
  onClearPanel: (index: number) => void;
}

export function SelectionGrid({ selectedItems, onPanelClick, onClearPanel }: SelectionGridProps) {
  return (
    <div className="-mx-4 mb-6 grid grid-cols-3 gap-2 px-2 sm:mx-0 sm:px-0">
      {selectedItems.map((item, index) => (
        <div key={index} className="relative">
          {item.name ? (
            <button
              onClick={() => onPanelClick(index)}
              className="group relative aspect-square w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 p-0"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-1 pb-1.5 pt-5">
                <p className="truncate text-center text-xs font-bold text-white drop-shadow-sm">
                  {item.name}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClearPanel(index);
                }}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </button>
          ) : (
            <button
              onClick={() => onPanelClick(index)}
              className="group relative aspect-square w-full rounded-md border border-slate-300 bg-slate-100 shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-200/70"
            >
              <div className="absolute inset-2 flex flex-col items-center justify-center gap-1 rounded border border-dashed border-slate-300 group-hover:border-slate-400">
                <svg className="h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 2h2v9h9v2h-9v9h-2v-9H2v-2h9z" />
                </svg>
                <span className="text-xs font-bold tracking-widest text-slate-500">ENTRY</span>
              </div>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
