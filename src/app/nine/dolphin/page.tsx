'use client';

import { useState, useRef, useEffect } from 'react';
import { dolphinCharacters } from '@/lib/nine/dolphinCharacters';
import { CharacterSearchModal } from './components/CharacterSearchModal';
import { ShareTextSection } from './components/ShareTextSection';
import { WaveBackground } from './components/WaveBackground';
import { WaveFooter } from './components/WaveFooter';

interface SelectedItem {
  name: string;
  image?: string;
  originalImage?: string;
  slug?: string;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function NineDolphin() {
  const [title, setTitle] = useState('私を構成する9人のドルフィン');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(
    Array(9).fill(null).map(() => ({ name: '' }))
  );
  const [shareText, setShareText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [activePanelIndex, setActivePanelIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const selectedCount = selectedItems.filter((item) => item.name).length;

  // URLパラメータから選択内容を復元
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTitle = params.get('title');
    if (urlTitle) {
      setTitle(urlTitle);
    }

    const items: SelectedItem[] = Array(9).fill(null).map(() => ({ name: '' }));
    for (let i = 1; i <= 9; i++) {
      const slug = params.get(`s${i}`);
      if (slug) {
        const char = dolphinCharacters.find(c => c.slug === slug);
        if (char) {
          const proxiedImageUrl = `/api/image-proxy?url=${encodeURIComponent(char.imageUrl)}`;
          items[i - 1] = { name: char.name, image: proxiedImageUrl, originalImage: char.imageUrl, slug: char.slug };
        }
      }
    }

    if (items.some(item => item.name)) {
      setSelectedItems(items);
    }
  }, []);

  // OGP画像URLを更新
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('title', title);
    selectedItems.forEach((item, index) => {
      if (item.slug) {
        params.set(`s${index + 1}`, item.slug);
      }
    });

    const ogUrl = `/api/og/dolphin?${params.toString()}`;
    const ogMetaImage = document.querySelector('meta[property="og:image"]');
    const twitterMetaImage = document.querySelector('meta[name="twitter:image"]');

    if (ogMetaImage) {
      ogMetaImage.setAttribute('content', `${window.location.origin}${ogUrl}`);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:image');
      meta.setAttribute('content', `${window.location.origin}${ogUrl}`);
      document.head.appendChild(meta);
    }

    if (twitterMetaImage) {
      twitterMetaImage.setAttribute('content', `${window.location.origin}${ogUrl}`);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'twitter:image');
      meta.setAttribute('content', `${window.location.origin}${ogUrl}`);
      document.head.appendChild(meta);
    }
  }, [title, selectedItems]);

  useEffect(() => {
    setShareText(generateShareText());
  }, [title, selectedItems]);

  const handleSelect = (index: number, name: string, imageUrl: string, slug: string) => {
    const newSelectedItems = [...selectedItems];
    const proxiedImageUrl = `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
    newSelectedItems[index] = { name, image: proxiedImageUrl, originalImage: imageUrl, slug };
    setSelectedItems(newSelectedItems);
  };

  const handleReset = () => {
    setSelectedItems(Array(9).fill(null).map(() => ({ name: '' })));
  };

  const handlePanelClick = (index: number) => {
    setActivePanelIndex(index);
    setModalOpen(true);
  };

  const handleClearPanel = (index: number) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = { name: '' };
    setSelectedItems(newSelectedItems);
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const handleDownload = async () => {
    try {
      const SCALE = 2;
      const W = 900;
      const PAD = 24;
      const GAP = 12;
      const COLS = 3;
      const TITLE_FONT_SIZE = 24;
      const LABEL_FONT_SIZE = 14;
      const LABEL_HEIGHT = 32;
      const BORDER = 2;
      const BORDER_RADIUS = 8;

      const contentW = W - PAD * 2;
      const cardW = (contentW - GAP * (COLS - 1)) / COLS;
      const imgH = Math.round(cardW * 9 / 16);
      const cardH = imgH + LABEL_HEIGHT;
      const ROWS = 3;
      const titleAreaH = TITLE_FONT_SIZE + 20;
      const gridH = cardH * ROWS + GAP * (ROWS - 1);
      const H = PAD + titleAreaH + gridH + PAD;

      const canvas = document.createElement('canvas');
      canvas.width = W * SCALE;
      canvas.height = H * SCALE;
      const ctx = canvas.getContext('2d')!;
      ctx.scale(SCALE, SCALE);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      roundRect(ctx, PAD - 1, PAD - 1, contentW + 2, titleAreaH + gridH + PAD + 2, BORDER_RADIUS);
      ctx.stroke();

      ctx.fillStyle = '#1e293b';
      ctx.font = `bold ${TITLE_FONT_SIZE}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(title, W / 2, PAD + TITLE_FONT_SIZE);

      const images = await Promise.all(
        selectedItems.map(async (item) => {
          if (!item.image) return null;
          // プロキシ経由 → 失敗時は元URLで直接試行
          const urls = [item.image, item.originalImage].filter(Boolean) as string[];
          for (const url of urls) {
            try {
              const res = await fetch(url);
              if (!res.ok) continue;
              const blob = await res.blob();
              const blobUrl = URL.createObjectURL(blob);
              const img = await loadImage(blobUrl);
              URL.revokeObjectURL(blobUrl);
              return img;
            } catch {
              continue;
            }
          }
          return null;
        })
      );

      for (let i = 0; i < 9; i++) {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = PAD + col * (cardW + GAP);
        const y = PAD + titleAreaH + row * (cardH + GAP);

        ctx.save();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = BORDER;
        roundRect(ctx, x, y, cardW, cardH, BORDER_RADIUS);
        ctx.stroke();

        ctx.beginPath();
        roundRect(ctx, x, y, cardW, cardH, BORDER_RADIUS);
        ctx.clip();

        const img = images[i];
        if (img) {
          const imgAspect = img.naturalWidth / img.naturalHeight;
          const slotAspect = cardW / imgH;
          let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
          if (imgAspect > slotAspect) {
            sw = img.naturalHeight * slotAspect;
            sx = (img.naturalWidth - sw) / 2;
          } else {
            sh = img.naturalWidth / slotAspect;
            sy = (img.naturalHeight - sh) / 2;
          }
          ctx.drawImage(img, sx, sy, sw, sh, x, y, cardW, imgH);
        } else {
          ctx.fillStyle = '#e2e8f0';
          ctx.fillRect(x, y, cardW, imgH);
          ctx.fillStyle = '#94a3b8';
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('No Image', x + cardW / 2, y + imgH / 2 + 4);
        }

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(x, y + imgH, cardW, LABEL_HEIGHT);

        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${LABEL_FONT_SIZE}px sans-serif`;
        ctx.textAlign = 'center';
        const labelText = `${i + 1}. ${selectedItems[i].name || '未選択'}`;
        ctx.fillText(labelText, x + cardW / 2, y + imgH + LABEL_HEIGHT / 2 + LABEL_FONT_SIZE / 3);

        ctx.restore();
      }

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'my-9-dolphin-wave.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('画像の生成に失敗しました', err);
      alert('画像の生成に失敗しました。');
    }
  };

  const generateShareText = () => {
    const items = selectedItems
      .map((item, i) => `${i + 1}. ${item.name || '未選択'}`)
      .join('\n');

    if (typeof window === 'undefined') {
      return `#私を構成する9人のドルフィン\n\n${items}`;
    }

    const params = new URLSearchParams();
    params.set('title', title);
    selectedItems.forEach((item, index) => {
      if (item.slug) {
        params.set(`s${index + 1}`, item.slug);
      }
    });

    const shareUrl = `${window.location.origin}/nine/dolphin?${params.toString()}`;
    return `#私を構成する9人のドルフィン\n\n${items}\n\n${shareUrl}`;
  };

  const handleCopyShareText = () => {
    navigator.clipboard.writeText(shareText);
    alert('コピーしました！');
  };

  return (
    <div className="relative min-h-screen w-full pb-44">
      <WaveBackground />
      <WaveFooter />
      {/* ページヘッダー（青バンド内・全幅） */}
      <header className="relative z-10 px-4 pb-16 pt-6">
        <div className="mx-auto max-w-lg">
          <p className="text-sm font-semibold tracking-widest text-white/80">
            9 DOLPHIN WAVE CHARACTERS
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">
            私を構成する9人のドルフィン
          </h1>
          <p className="mt-1 text-sm text-white/70">
            9キャラクターを選んで一覧化し、画像として保存できます。
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 pb-6">

      {/* タイトル入力 */}
      <section className="mb-6">
        <label className="block space-y-1">
          <span className="text-sm font-semibold text-slate-700">
            タイトル（任意・最大30文字）
          </span>
          <input
            type="text"
            maxLength={30}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <p className="mt-1 text-xs text-slate-400">
          「{title}」として共有されます
        </p>
      </section>

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
      <div className="-mx-4 mb-6 grid grid-cols-3 gap-2 px-2 sm:mx-0 sm:px-0">
        {selectedItems.map((item, index) => (
          <div key={index} className="relative">
            {item.name ? (
              // 選択済みパネル
              <button
                onClick={() => handlePanelClick(index)}
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
                {/* 削除ボタン */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearPanel(index);
                  }}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </button>
            ) : (
              // 空パネル（ENTRYカード風）
              <button
                onClick={() => handlePanelClick(index)}
                className="group relative aspect-square w-full rounded-md border border-slate-300 bg-slate-100 shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-200/70"
              >
                {/* 内側の枠線 */}
                <div className="absolute inset-2 flex flex-col items-center justify-center gap-1 rounded border border-dashed border-slate-300 group-hover:border-slate-400">
                  {/* 赤い十字 */}
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

      {/* 完成ボタン */}
      <div className="mb-8 text-center">
        <button
          onClick={handleDownload}
          disabled={selectedCount === 0}
          className="rounded-lg bg-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
        >
          完成！
        </button>
      </div>

      {/* シェアセクション */}
      <ShareTextSection
        shareText={shareText}
        onCopy={handleCopyShareText}
      />

      {/* 検索モーダル */}
      <CharacterSearchModal
        isOpen={modalOpen}
        panelIndex={activePanelIndex}
        onSelect={(name, imageUrl, slug) => handleSelect(activePanelIndex, name, imageUrl, slug)}
        onClose={() => setModalOpen(false)}
      />
      </div>
    </div>
  );
}
