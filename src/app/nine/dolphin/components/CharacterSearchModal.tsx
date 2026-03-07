'use client';

import { useState, useRef, useEffect } from 'react';
import { DolphinCharacter, dolphinCharacters } from '@/lib/nine/dolphinCharacters';

interface CharacterSearchModalProps {
  isOpen: boolean;
  panelIndex: number;
  onSelect: (name: string, imageUrl: string, slug: string) => void;
  onClose: () => void;
}

export function CharacterSearchModal({
  isOpen,
  panelIndex,
  onSelect,
  onClose,
}: CharacterSearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getFilteredCharacters = (): DolphinCharacter[] => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return dolphinCharacters.filter(
      (char) =>
        char.name.toLowerCase().includes(term) ||
        char.reading.includes(term) ||
        char.team.toLowerCase().includes(term)
    );
  };

  const filtered = getFilteredCharacters();

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" onClick={onClose}>
      <div className="fixed inset-0 bg-black/40" />
      <div
        className="relative z-10 w-full max-w-lg rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl sm:m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">
            #{panelIndex + 1} キャラを検索
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="キャラ名・チーム名で検索"
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="flex items-center justify-center rounded-lg bg-indigo-600 px-4 text-white hover:bg-indigo-700">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto">
          {searchTerm === '' ? (
            <p className="py-8 text-center text-sm text-slate-400">
              キャラ名・チーム名などで検索してください
            </p>
          ) : filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">
              該当するキャラクターが見つかりません
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map((char, i) => (
                <button
                  key={i}
                  onClick={() => {
                    onSelect(char.name, char.imageUrl, char.slug);
                    onClose();
                  }}
                  className="flex w-full items-center gap-3 px-2 py-3 text-left hover:bg-slate-50"
                >
                  <img
                    src={`/api/image-proxy?url=${encodeURIComponent(char.imageUrl)}`}
                    alt={char.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-slate-800">{char.name}</div>
                    <div className="text-xs text-slate-500">{char.team}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
