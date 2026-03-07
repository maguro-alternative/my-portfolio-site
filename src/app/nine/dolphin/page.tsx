'use client';

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { dolphinCharacters } from '@/lib/nine/dolphinCharacters';
import { CharacterSearchCard } from './components/CharacterSearchCard';
import { ShareTextSection } from './components/ShareTextSection';
import { PreviewGrid } from './components/PreviewGrid';

interface SelectedItem {
  name: string;
  image?: string;
  slug?: string;
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

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      // キャプチャ用に一時的に幅・フォントサイズを拡大して高品質化
      const el = cardRef.current;
      const originalWidth = el.style.width;
      const originalPadding = el.style.padding;
      el.style.width = '900px';
      el.style.padding = '24px';

      // タイトルを拡大
      const titleEl = el.querySelector('h1');
      const originalTitleStyle = titleEl?.getAttribute('style') || '';
      titleEl?.setAttribute('style', 'font-size: 24px; margin-bottom: 16px;');

      // 名前ラベルを拡大
      const labels = el.querySelectorAll<HTMLElement>('[data-label]');
      const originalLabelStyles: string[] = [];
      labels.forEach((label) => {
        originalLabelStyles.push(label.getAttribute('style') || '');
        label.style.fontSize = '14px';
        label.style.padding = '4px 8px';
      });

      // CORS回避: プロキシ経由の画像をdata URLに事前変換
      const imgs = el.querySelectorAll('img');
      const originalSrcs: { img: HTMLImageElement; src: string }[] = [];
      await Promise.all(
        Array.from(imgs).map(async (img) => {
          try {
            const res = await fetch(img.src);
            const blob = await res.blob();
            const dataUrl = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
            originalSrcs.push({ img, src: img.src });
            img.src = dataUrl;
          } catch {
            // 変換できない場合はそのまま
          }
        })
      );

      const canvas = await html2canvas(el, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#ffffff',
      });

      // 元に戻す
      el.style.width = originalWidth;
      el.style.padding = originalPadding;
      titleEl?.setAttribute('style', originalTitleStyle);
      labels.forEach((label, i) => {
        label.setAttribute('style', originalLabelStyles[i]);
      });
      originalSrcs.forEach(({ img, src }) => {
        img.src = src;
      });

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
