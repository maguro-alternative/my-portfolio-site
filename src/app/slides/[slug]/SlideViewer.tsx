"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";

type SlideViewerProps = {
  title: string;
  totalSlides: number;
  children: ReactNode;
};

export default function SlideViewer({
  title,
  totalSlides,
  children,
}: SlideViewerProps) {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goNext = useCallback(() => {
    setCurrent((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "f") {
        toggleFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener("keydown", handleKey);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [goNext, goPrev, toggleFullscreen]);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-gray-900 border-b border-gray-800 text-white">
        <Link
          href="/slides"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          ← スライド一覧
        </Link>
        <h1 className="text-sm font-medium truncate mx-4">{title}</h1>
        <button
          onClick={toggleFullscreen}
          className="text-sm text-gray-400 hover:text-white transition-colors bg-transparent border-gray-700 px-3 py-1"
        >
          {isFullscreen ? "全画面解除" : "全画面"}
        </button>
      </header>

      {/* Slide area */}
      <div className="flex-1 flex items-center justify-center p-2 md:p-8 min-h-0">
        <div className="slide-content bg-gray-900 rounded-2xl shadow-2xl w-full max-w-5xl md:aspect-[16/9] p-5 md:p-16 flex items-center justify-center overflow-auto border border-gray-800">
          <div className="w-full max-h-full text-white">
            <SlideSelector current={current}>{children}</SlideSelector>
          </div>
        </div>
      </div>

      {/* Controls */}
      <footer className="flex items-center justify-center gap-4 px-6 py-4 bg-gray-900 border-t border-gray-800">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="text-white bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors border-gray-700"
        >
          ←
        </button>
        <span className="text-gray-400 text-sm tabular-nums min-w-[80px] text-center">
          {current + 1} / {totalSlides}
        </span>
        <button
          onClick={goNext}
          disabled={current === totalSlides - 1}
          className="text-white bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors border-gray-700"
        >
          →
        </button>
      </footer>
    </div>
  );
}

function SlideSelector({
  current,
  children,
}: {
  current: number;
  children: ReactNode;
}) {
  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      const items = node.querySelectorAll(".slide-item");
      items.forEach((item, i) => {
        item.classList.toggle("active", i === current);
      });
    },
    [current]
  );

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}
