'use client';

import { useSyncExternalStore } from "react";
import { WindowSize } from "@/types/animation";

function resizeSubscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

let cachedSnapshot: WindowSize = { width: 0, height: 0 };
const cachedServerSnapshot: WindowSize = { width: 0, height: 0 };

export function useWindowSize(): WindowSize {
  const getSnapshot = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // 値が変更された場合のみ新しいオブジェクトを作成
    if (cachedSnapshot.width !== width || cachedSnapshot.height !== height) {
      cachedSnapshot = { width, height };
    }

    return cachedSnapshot;
  };

  const getServerSnapshot = () => {
    return cachedServerSnapshot;
  };

  return useSyncExternalStore(resizeSubscribe, getSnapshot, getServerSnapshot);
}