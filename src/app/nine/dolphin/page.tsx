'use client';

import { useState, useRef } from 'react';
import { dolphinCharacters } from '@/lib/nine/dolphinCharacters';
import { toPng } from 'html-to-image';

interface SelectedItem {
  name: string;
  image?: string;
}

export default function NineDolphin() {
  const [title, setTitle] = useState('私を構成する9つのドルフィンウェーブキャラクター');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(
    Array(9).fill(null).map(() => ({ name: '' }))
  );
  const [searchTerms, setSearchTerms] = useState<string[]>(Array(9).fill(''));
  const [showSuggestions, setShowSuggestions] = useState<boolean[]>(Array(9).fill(false));
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSearch = (index: number, value: string) => {
    const newSearchTerms = [...searchTerms];
    newSearchTerms[index] = value;
    setSearchTerms(newSearchTerms);

    const newShowSuggestions = [...showSuggestions];
    newShowSuggestions[index] = value.length > 0;
    setShowSuggestions(newShowSuggestions);
  };

  const handleSelect = (index: number, name: string, imageUrl: string) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = { name, image: imageUrl };
    setSelectedItems(newSelectedItems);

    const newSearchTerms = [...searchTerms];
    newSearchTerms[index] = '';
    setSearchTerms(newSearchTerms);

    const newShowSuggestions = [...showSuggestions];
    newShowSuggestions[index] = false;
    setShowSuggestions(newShowSuggestions);
  };

  const handleClear = (index: number) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = { name: '' };
    setSelectedItems(newSelectedItems);
  };

  const getFilteredCharacters = (searchTerm: string) => {
    if (!searchTerm) return [];
    return dolphinCharacters.filter(char =>
      char.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 10);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = 'my-9-dolphin-wave.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('画像の生成に失敗しました', err);
    }
  };

  const generateShareText = () => {
    const items = selectedItems
      .map((item, i) => `${i + 1}. ${item.name || '未選択'}`)
      .join('\n');
    return `#私を構成する9つのドルフィンウェーブキャラクター\n\n${items}`;
  };

  const handleCopyShareText = () => {
    navigator.clipboard.writeText(generateShareText());
    alert('コピーしました！');
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6">
      <header className="mb-6 space-y-2">
        <p className="text-xs uppercase tracking-wider text-blue-600">9 Dolphin Wave Characters</p>
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">私を構成する9つのドルフィンウェーブキャラクター</h1>
        <p className="text-sm text-slate-600">9キャラクターを選んで一覧化し、画像として保存できます。</p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 左側: 選択エリア */}
        <section className="space-y-4 rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">タイトル</span>
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {selectedItems.map((item, index) => (
              <article key={index} className="rounded-lg border border-slate-300 bg-slate-50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-700">#{index + 1}</h3>
                  {item.name && (
                    <button
                      onClick={() => handleClear(index)}
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
                    value={searchTerms[index]}
                    onChange={(e) => handleSearch(index, e.target.value)}
                    onFocus={() => {
                      if (searchTerms[index]) {
                        const newShowSuggestions = [...showSuggestions];
                        newShowSuggestions[index] = true;
                        setShowSuggestions(newShowSuggestions);
                      }
                    }}
                  />

                  {showSuggestions[index] && (
                    <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-slate-300 bg-white shadow-lg">
                      {getFilteredCharacters(searchTerms[index]).map((char, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelect(index, char.name, char.imageUrl)}
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
                    選択中: {item.name || 'なし'}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* シェアテキスト */}
          <section className="space-y-3 rounded-lg border border-slate-300 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">シェアテキスト</p>
            <div className="rounded-md border border-slate-300 bg-white p-3">
              <p className="mb-2 text-xs text-slate-500">文字数: {generateShareText().length}</p>
              <p className="mb-3 whitespace-pre-wrap text-xs text-slate-800">{generateShareText()}</p>
              <button
                onClick={handleCopyShareText}
                className="rounded border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
              >
                コピー
              </button>
            </div>
          </section>
        </section>

        {/* 右側: プレビューエリア */}
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
              onClick={handleDownload}
              className="rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              画像としてダウンロード
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
