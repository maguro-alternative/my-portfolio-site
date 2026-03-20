"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";

const SLIDE_BASE_WIDTH = 960;

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
  const [scale, setScale] = useState(1);
  const [slideHeight, setSlideHeight] = useState(540);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const s = rect.width / SLIDE_BASE_WIDTH;
      setScale(s);
      // Inverse-scale the container height to get virtual slide height
      setSlideHeight(rect.height / s);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-dvh bg-gray-950 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="shrink-0 flex items-center justify-between px-4 md:px-6 py-3 bg-gray-900 border-b border-gray-800 text-white">
        <Link
          href="/slides"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          ← 一覧
        </Link>
        <h1 className="text-sm font-medium truncate mx-4">{title}</h1>
        <button
          onClick={toggleFullscreen}
          className="text-sm text-gray-400 hover:text-white transition-colors bg-transparent border-gray-700 px-3 py-1"
        >
          {isFullscreen ? "解除" : "全画面"}
        </button>
      </header>

      {/* Slide area */}
      <div
        ref={containerRef}
        className="flex-1 min-h-0 bg-gray-900 overflow-hidden"
      >
        <div
          className="slide-content text-white"
          style={{
            width: SLIDE_BASE_WIDTH,
            height: slideHeight,
            transform: `scale(${scale})`,
            transformOrigin: "left top",
          }}
        >
          <div className="w-full h-full px-10 py-8 md:px-16 md:py-12 flex items-center">
            <div className="w-full">
              <SlideSelector current={current}>{children}</SlideSelector>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <footer className="shrink-0 flex items-center justify-center gap-4 px-6 py-3 bg-gray-900 border-t border-gray-800">
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
