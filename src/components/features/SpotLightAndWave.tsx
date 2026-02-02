'use client';

import { useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { createCanvasAnimation } from "@/lib/animation/canvas";

export default function SpotlightAndWave() {
  const [canvasWave, setCanvasWave] = useState<HTMLCanvasElement | null>(null);
  const [canvasOverlay, setCanvasOverlay] = useState<HTMLCanvasElement | null>(null);
  const { width, height } = useWindowSize();

  // アニメーション設定
  const waveConfig = {
    vertexNum: 10,
    debugMode: false
  };

  createCanvasAnimation(width, height, canvasWave, canvasOverlay, waveConfig);

  return (
    <div>
      <div 
        id="bg" 
        className="fixed top-0 left-0 w-full h-full z-[-2] bg-[linear-gradient(to_bottom,hsl(145_33%_48%),hsl(152_21%_54%),hsl(175_20%_53%))] animate-[AnimationName_10s_ease_infinite]"
      />
      <canvas
        id="canvasWave"
        ref={setCanvasWave}
        className="fixed top-0 left-0 w-full h-full z-[-3]"
      />
      <canvas
        id="canvasOverlay"
        ref={setCanvasOverlay}
        className="fixed top-0 left-0 w-full h-full z-[-1] mix-blend-hard-light"
      />
    </div>
  );
}
