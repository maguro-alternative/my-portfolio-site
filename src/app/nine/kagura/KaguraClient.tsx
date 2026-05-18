"use client";

import { useState, useRef } from 'react';
import { useKaguraState } from './hooks/useKaguraState';
import { generateCanvasImage } from './utils/canvasDownload';
import { CharacterSearchModal } from './components/CharacterSearchModal';
import type { CharacterSearchModalHandle } from './components/CharacterSearchModal';
import { ShareTextSection } from './components/ShareTextSection';
import { SelectionGrid } from './components/SelectionGrid';
import { SiteFooter } from './components/SiteFooter';
import { SakuraEffect } from './components/SakuraEffect';

export default function KaguraClient() {
  const {
    selectedItems,
    selectedCount,
    shareText,
    handleSelect,
    handleRandomSelect,
    handleReset,
    handleClearPanel,
    handleCopyShareText,
  } = useKaguraState();

  const [modalOpen, setModalOpen] = useState(false);
  const [activePanelIndex, setActivePanelIndex] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const modalRef = useRef<CharacterSearchModalHandle | null>(null);

  const handlePanelClick = (index: number) => {
    setActivePanelIndex(index);
    setModalOpen(true);
    setTimeout(() => modalRef.current?.focusInput?.(), 100);
  };

  const handleGenerate = async () => {
    try {
      const dataUrl = await generateCanvasImage('私を構成する9人のシノビ少女', selectedItems);
      setGeneratedImage(dataUrl);
    } catch (err) {
      console.error('画像の生成に失敗しました', err);
      alert('画像の生成に失敗しました。');
    }
  };

  return (
    <div className="kagura-portal-bg relative min-h-screen w-full overflow-hidden">
      {/* ヘッダー背景画像 + 下線（背景にヘッダーテキストを内包） */}
      <div className="kagura-header-bg border-b-2 border-slate-400">
        <header className="mx-auto max-w-[700px] px-4 pb-4 pt-6 text-center">
          <h1 className="text-2xl font-bold text-slate-800">私を構成する9人のシノビ少女</h1>
          <p className="mt-1 text-sm text-slate-600">
            9人のシノビ少女を選んで一覧化し、画像として保存できます。
          </p>
        </header>
      </div>

      {/* 白い囲みコンテンツ */}
      <main className="kagura-content-box">
        {/* カウンター + リセット */}
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">
            {selectedCount} / 9 キャラ選択済み
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleRandomSelect}
              className="rounded-md bg-indigo-500 px-3 py-1 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-600"
            >
              ランダム
            </button>
            <button
              onClick={handleReset}
              disabled={selectedCount === 0}
              className="rounded-md bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:bg-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300"
            >
              リセット
            </button>
          </div>
        </div>

        {/* 3x3 パネルグリッド */}
        <SelectionGrid
          selectedItems={selectedItems}
          onPanelClick={handlePanelClick}
          onClearPanel={handleClearPanel}
        />

        {/* 完成ボタン */}
        <div className="mb-8 text-center">
          <button
            onClick={handleGenerate}
            disabled={selectedCount < 9}
            className="rounded-lg bg-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            画像を作成
          </button>
        </div>

        {/* 生成画像 */}
        {generatedImage && (
          <div className="mb-8">
            <img
              src={generatedImage}
              alt="私を構成する9人のシノビ少女"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        )}

        {/* シェアセクション */}
        <ShareTextSection
          shareText={shareText}
          onCopy={handleCopyShareText}
          disabled={selectedCount < 9}
        />

        {/* 検索モーダル */}
        <CharacterSearchModal
          ref={modalRef}
          isOpen={modalOpen}
          panelIndex={activePanelIndex}
          onSelect={(name, imageUrl, slug) => handleSelect(activePanelIndex, name, imageUrl, slug)}
          onClose={() => setModalOpen(false)}
        />
      </main>
      <SakuraEffect />
      <SiteFooter />
    </div>
  );
}
