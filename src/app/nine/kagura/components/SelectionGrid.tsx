import { SelectedItem } from '../hooks/useKaguraState';

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
              aria-label={`${item.name} を変更`}
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
              <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onClearPanel(index);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    onClearPanel(index);
                  }
                }}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="クリア"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
          ) : (
            <button
              onClick={() => onPanelClick(index)}
              aria-label={`スロット ${index + 1} にキャラクターを追加`}
              className="relative aspect-square w-full overflow-hidden rounded-lg transition-opacity hover:opacity-80"
            >
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="480" height="480" rx="40" ry="40" fill="#999" stroke="#333" strokeWidth="8"/>
                <rect x="40" y="40" width="420" height="420" rx="5" ry="5" fill="none" stroke="#ccc" strokeWidth="4" opacity="0.5"/>
                <circle cx="250" cy="250" r="180" fill="none" stroke="#666" strokeWidth="2"/>
                <circle cx="250" cy="250" r="170" fill="none" stroke="#666" strokeWidth="5"/>
                <defs>
                  <path id={`textCircle-${index}`} d="M 250, 250 m -145, 0 a 145,145 0 1,1 290,0 a 145,145 0 1,1 -290,0" />
                </defs>
                <text fill="#444" fontFamily="Arial, sans-serif" fontSize="34" fontWeight="bold" letterSpacing="6">
                  <textPath href={`#textCircle-${index}`} startOffset="50%" textAnchor="middle">
                    SHINOVI MASTERS
                  </textPath>
                </text>
                <g fill="#777" stroke="#444" strokeWidth="2" strokeLinejoin="round">
                  <path d="M 250,90 L 275,225 L 410,250 L 275,275 L 250,410 L 225,275 L 90,250 L 225,225 Z" />
                  <path d="M 250,90 V 410 M 90,250 H 410" stroke="#ccc" strokeWidth="1" opacity="0.5"/>
                </g>
                <path d="M 250,380 C 230,380 215,410 215,430 C 215,445 235,450 250,440 C 265,450 285,445 285,430 C 285,410 270,380 250,380 Z" fill="#666" />
                <circle cx="250" cy="250" r="185" fill="none" stroke="#fff" strokeWidth="1" opacity="0.3"/>
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
