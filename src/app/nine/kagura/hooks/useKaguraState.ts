'use client';

import { useState, useEffect, useMemo } from 'react';
import { kaguraCharacters } from '@/lib/nine/kaguraCharacters';

export interface SelectedItem {
  name: string;
  image?: string;
  originalImage?: string;
  slug?: string;
}

function createEmptyItems(): SelectedItem[] {
  return Array(9).fill(null).map(() => ({ name: '' }));
}

// slug → 配列インデックスのマップを構築
const slugToIndex = new Map(kaguraCharacters.map((c, i) => [c.slug, i]));

function buildShareParam(items: SelectedItem[]): string {
  const indices = items.map(item => {
    if (!item.slug) return '';
    const idx = slugToIndex.get(item.slug);
    return idx !== undefined ? String(idx) : '';
  });
  return indices.join('-');
}

function parseShareParam(param: string): SelectedItem[] {
  const items = createEmptyItems();
  const parts = param.split('-');
  for (let i = 0; i < Math.min(parts.length, 9); i++) {
    if (parts[i] === '') continue;
    const idx = parseInt(parts[i], 10);
    if (isNaN(idx) || idx < 0 || idx >= kaguraCharacters.length) continue;
    const char = kaguraCharacters[idx];
    items[i] = {
      name: char.name,
      image: proxyUrl(char.imageUrl),
      originalImage: char.imageUrl,
      slug: char.slug,
    };
  }
  return items;
}

function proxyUrl(imageUrl: string): string {
  return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
}

export function useKaguraState() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(createEmptyItems());
  const shareText = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const c = buildShareParam(selectedItems);
    const shareUrl = `${window.location.origin}/nine/kagura?c=${c}`;
    return `私を構成する9人のシノビ少女\n#My9Kagura #私を構成する9人のシノビ少女\n\n${shareUrl}`;
  }, [selectedItems]);

  const selectedCount = selectedItems.filter((item) => item.name).length;

  // URLパラメータから選択内容を復元（新形式 ?c= と旧形式 ?s1= の両方に対応）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const cParam = params.get('c');
    if (cParam) {
      const items = parseShareParam(cParam);
      if (items.some(item => item.name)) {
        setSelectedItems(items);
      }
      return;
    }

    // 旧形式の後方互換
    const items = createEmptyItems();
    for (let i = 1; i <= 9; i++) {
      const slug = params.get(`s${i}`);
      if (slug) {
        const char = kaguraCharacters.find(c => c.slug === slug);
        if (char) {
          items[i - 1] = {
            name: char.name,
            image: proxyUrl(char.imageUrl),
            originalImage: char.imageUrl,
            slug: char.slug,
          };
        }
      }
    }

    if (items.some(item => item.name)) {
      setSelectedItems(items);
    }
  }, []);

  // OGP画像URLを更新
  useEffect(() => {
    const c = buildShareParam(selectedItems);
    const ogUrl = `/api/og/kagura?c=${c}`;
    const fullUrl = `${window.location.origin}${ogUrl}`;

    const updateMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', value);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute(attr === 'property' ? 'property' : 'name', selector.includes('property') ? 'og:image' : 'twitter:image');
        meta.setAttribute('content', value);
        document.head.appendChild(meta);
      }
    };

    updateMeta('meta[property="og:image"]', 'property', fullUrl);
    updateMeta('meta[name="twitter:image"]', 'name', fullUrl);
  }, [selectedItems]);

  const handleSelect = (index: number, name: string, imageUrl: string, slug: string) => {
    const newItems = [...selectedItems];
    newItems[index] = { name, image: proxyUrl(imageUrl), originalImage: imageUrl, slug };
    setSelectedItems(newItems);
  };

  const handleReset = () => {
    setSelectedItems(createEmptyItems());
  };

  const handleClearPanel = (index: number) => {
    const newItems = [...selectedItems];
    newItems[index] = { name: '' };
    setSelectedItems(newItems);
  };

  const handleCopyShareText = () => {
    navigator.clipboard.writeText(shareText);
    alert('コピーしました！');
  };

  return {
    selectedItems,
    selectedCount,
    shareText,
    handleSelect,
    handleReset,
    handleClearPanel,
    handleCopyShareText,
  };
}
