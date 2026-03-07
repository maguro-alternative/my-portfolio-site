'use client';

import { useState, useRef, useEffect } from 'react';
import { dolphinCharacters } from '@/lib/nine/dolphinCharacters';
import { CharacterSearchCard } from './components/CharacterSearchCard';
import { ShareTextSection } from './components/ShareTextSection';
import { PreviewGrid } from './components/PreviewGrid';

interface SelectedItem {
  name: string;
  image?: string;
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
  const [searchTerms, setSearchTerms] = useState<string[]>(Array(9).fill(''));
  const [showSuggestions, setShowSuggestions] = useState<boolean[]>(Array(9).fill(false));
  const [shareText, setShareText] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

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
          items[i - 1] = { name: char.name, image: proxiedImageUrl, slug: char.slug };
        }
      }
    }

    // 少なくとも1つ選択されている場合のみ更新
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

  // shareTextを更新
  useEffect(() => {
    setShareText(generateShareText());
  }, [title, selectedItems]);

  const handleSearch = (index: number, value: string) => {
    const newSearchTerms = [...searchTerms];
    newSearchTerms[index] = value;
    setSearchTerms(newSearchTerms);

    const newShowSuggestions = [...showSuggestions];
    newShowSuggestions[index] = value.length > 0;
    setShowSuggestions(newShowSuggestions);
  };

  const handleSelect = (index: number, name: string, imageUrl: string, slug: string) => {
    const newSelectedItems = [...selectedItems];
    // 画像URLをプロキシ経由に変換
    const proxiedImageUrl = `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
    newSelectedItems[index] = { name, image: proxiedImageUrl, slug };
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

  const handleFocus = (index: number) => {
    if (searchTerms[index]) {
      const newShowSuggestions = [...showSuggestions];
      newShowSuggestions[index] = true;
      setShowSuggestions(newShowSuggestions);
    }
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
      // レイアウト定数（ピクセル）
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

      // 背景
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, W, H);

      // 外枠
      ctx.strokeStyle = '#cbd5e1'; // slate-300
      ctx.lineWidth = 1;
      roundRect(ctx, PAD - 1, PAD - 1, contentW + 2, titleAreaH + gridH + PAD + 2, BORDER_RADIUS);
      ctx.stroke();

      // タイトル
      ctx.fillStyle = '#1e293b'; // slate-800
      ctx.font = `bold ${TITLE_FONT_SIZE}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(title, W / 2, PAD + TITLE_FONT_SIZE);

      // 画像をプリロード
      const images = await Promise.all(
        selectedItems.map(async (item) => {
          if (!item.image) return null;
          try {
            // プロキシ経由の画像をfetchしてblob URLに変換（CORS対応）
            const res = await fetch(item.image);
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            const img = await loadImage(blobUrl);
            URL.revokeObjectURL(blobUrl);
            return img;
          } catch {
            return null;
          }
        })
      );

      // カード描画
      for (let i = 0; i < 9; i++) {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = PAD + col * (cardW + GAP);
        const y = PAD + titleAreaH + row * (cardH + GAP);

        // カード枠
        ctx.save();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = BORDER;
        roundRect(ctx, x, y, cardW, cardH, BORDER_RADIUS);
        ctx.stroke();

        // クリップ（角丸内に描画を収める）
        ctx.beginPath();
        roundRect(ctx, x, y, cardW, cardH, BORDER_RADIUS);
        ctx.clip();

        // 画像領域
        const img = images[i];
        if (img) {
          // object-cover: アスペクト比を維持しつつ領域を埋める
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
          // No Image placeholder
          ctx.fillStyle = '#e2e8f0'; // slate-200
          ctx.fillRect(x, y, cardW, imgH);
          ctx.fillStyle = '#94a3b8'; // slate-400
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('No Image', x + cardW / 2, y + imgH / 2 + 4);
        }

        // ラベル背景
        ctx.fillStyle = '#0f172a'; // slate-900
        ctx.fillRect(x, y + imgH, cardW, LABEL_HEIGHT);

        // ラベルテキスト
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${LABEL_FONT_SIZE}px sans-serif`;
        ctx.textAlign = 'center';
        const labelText = `${i + 1}. ${selectedItems[i].name || '未選択'}`;
        ctx.fillText(labelText, x + cardW / 2, y + imgH + LABEL_HEIGHT / 2 + LABEL_FONT_SIZE / 3);

        ctx.restore();
      }

      // ダウンロード
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
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6">
      <header className="mb-6 space-y-2">
        <p className="text-xs uppercase tracking-wider text-blue-600">9 Dolphin Wave Characters</p>
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">私を構成する9人のドルフィン</h1>
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
              <CharacterSearchCard
                key={index}
                index={index}
                selectedName={item.name}
                searchTerm={searchTerms[index]}
                showSuggestions={showSuggestions[index]}
                onSearch={(value) => handleSearch(index, value)}
                onSelect={(name, imageUrl, slug) => handleSelect(index, name, imageUrl, slug)}
                onClear={() => handleClear(index)}
                onFocus={() => handleFocus(index)}
              />
            ))}
          </div>

          <ShareTextSection
            shareText={shareText}
            onCopy={handleCopyShareText}
          />
        </section>

        {/* 右側: プレビューエリア */}
        <PreviewGrid
          title={title}
          selectedItems={selectedItems}
          cardRef={cardRef}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}
