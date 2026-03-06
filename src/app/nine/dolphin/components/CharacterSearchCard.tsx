import { DolphinCharacter, dolphinCharacters } from '@/lib/nine/dolphinCharacters';

interface CharacterSearchCardProps {
  index: number;
  selectedName: string;
  searchTerm: string;
  showSuggestions: boolean;
  onSearch: (value: string) => void;
  onSelect: (name: string, imageUrl: string) => void;
  onClear: () => void;
  onFocus: () => void;
}

export function CharacterSearchCard({
  index,
  selectedName,
  searchTerm,
  showSuggestions,
  onSearch,
  onSelect,
  onClear,
  onFocus,
}: CharacterSearchCardProps) {
  const getFilteredCharacters = (searchTerm: string): DolphinCharacter[] => {
    if (!searchTerm) return [];
    return dolphinCharacters.filter(char =>
      char.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 10);
  };

  return (
    <article className="rounded-lg border border-slate-300 bg-slate-50 p-3">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">#{index + 1}</h3>
        {selectedName && (
          <button
            onClick={onClear}
            className="text-xs text-red-600 hover:text-red-700"
          >
            クリア
          </button>
        )}
      </div>

      <div className="relative space-y-2">
        <input
          type="text"
          placeholder="キャラクター名で検索"
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={onFocus}
        />

        {showSuggestions && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-slate-300 bg-white shadow-lg">
            {getFilteredCharacters(searchTerm).map((char, i) => (
              <button
                key={i}
                onClick={() => onSelect(char.name, char.imageUrl)}
                className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-blue-50"
              >
                <div className="font-medium">{char.name}</div>
                <div className="text-xs text-slate-500">{char.team}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3">
        <p className="text-xs text-slate-600">
          選択中: {selectedName || 'なし'}
        </p>
      </div>
    </article>
  );
}
