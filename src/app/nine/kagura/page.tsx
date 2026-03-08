'use client';

import { useState } from 'react';
import { useKaguraState } from './hooks/useKaguraState';
import { generateCanvasImage } from './utils/canvasDownload';
import { CharacterSearchModal } from './components/CharacterSearchModal';
import { ShareTextSection } from './components/ShareTextSection';
import { SelectionGrid } from './components/SelectionGrid';
import { WaveBackground } from './components/WaveBackground';
import { WaveFooter } from './components/WaveFooter';

export default function NineKagura() {
  const {
    selectedItems,
    selectedCount,
    shareText,
    handleSelect,
    handleReset,
    handleClearPanel,
    handleCopyShareText,
  } = useKaguraState();

  const [modalOpen, setModalOpen] = useState(false);
  const [activePanelIndex, setActivePanelIndex] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handlePanelClick = (index: number) => {
    setActivePanelIndex(index);
    setModalOpen(true);
  };

  const handleGenerate = async () => {
    try {
      const dataUrl = await generateCanvasImage('私を構成する9人のカグラ', selectedItems);
      setGeneratedImage(dataUrl);
    } catch (err) {
      console.error('画像の生成に失敗しました', err);
      alert('画像の生成に失敗しました。');
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <WaveBackground />
      <header className="relative z-10 px-4 pb-16 pt-6">
        <div className="mx-auto max-w-lg">
          <p className="text-sm font-semibold tracking-widest text-white/80">
            9 KAGURA CHARACTERS
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">
            私を構成する9人のカグラ
          </h1>
          <p className="mt-1 text-sm text-white/70">
            9キャラクターを選んで一覧化し、画像として保存できます。
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 pb-6">
        {/* カウンター + リセット */}
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">
            {selectedCount} / 9 キャラ選択済み
          </p>
          <button
            onClick={handleReset}
            disabled={selectedCount === 0}
            className="text-sm text-slate-400 hover:text-slate-600 disabled:cursor-not-allowed disabled:text-slate-300"
          >
            リセット
          </button>
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
              alt="私を構成する9人のカグラ"
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
          isOpen={modalOpen}
          panelIndex={activePanelIndex}
          onSelect={(name, imageUrl, slug) => handleSelect(activePanelIndex, name, imageUrl, slug)}
          onClose={() => setModalOpen(false)}
        />
      </div>
      <WaveFooter />
    </div>
  );
}
