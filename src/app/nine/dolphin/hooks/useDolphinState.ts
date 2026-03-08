'use client';

import { useState, useEffect, useMemo } from 'react';
import { dolphinCharacters } from '@/lib/nine/dolphinCharacters';

export interface SelectedItem {
  name: string;
  image?: string;
  originalImage?: string;
  slug?: string;
}

function createEmptyItems(): SelectedItem[] {
  return Array(9).fill(null).map(() => ({ name: '' }));
}

function buildShareParams(items: SelectedItem[]): URLSearchParams {
  const params = new URLSearchParams();
  items.forEach((item, index) => {
    if (item.slug) {
      params.set(`s${index + 1}`, item.slug);
    }
  });
  return params;
}

function proxyUrl(imageUrl: string): string {
  return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
}

export function useDolphinState() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(createEmptyItems());
  const shareText = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const params = buildShareParams(selectedItems);
    const shareUrl = `${window.location.origin}/nine/dolphin?${params.toString()}`;
    return `私を構成する9人のドルフィン\n#My9Dolphin #私を構成する9人のドルフィン\n\n${shareUrl}`;
  }, [selectedItems]);

  const selectedCount = selectedItems.filter((item) => item.name).length;

  // URLパラメータから選択内容を復元
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const items = createEmptyItems();
    for (let i = 1; i <= 9; i++) {
      const slug = params.get(`s${i}`);
      if (slug) {
        const char = dolphinCharacters.find(c => c.slug === slug);
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
    const params = buildShareParams(selectedItems);
    const ogUrl = `/api/og/dolphin?${params.toString()}`;
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
