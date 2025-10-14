'use client';

import { useRef, useSyncExternalStore, type RefObject } from "react";
import { noise } from "@/lib/perlin";

function isClientSide() {
  try {
    return !!window;
  } catch {
    return false;
  }
}

function resizeSubscribe(callback: () => void) {
  if (!isClientSide()) {
    return () => {};
  }
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

let cachedSnapshot = { width: 0, height: 0 };
const cachedServerSnapshot = { width: 0, height: 0 };

function useResizeEffect() {
  const getSnapshot = () => {
    const width = isClientSide() ? window.innerWidth : 0;
    const height = isClientSide() ? window.innerHeight : 0;
    
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

function drawSpotLight(
  context: CanvasRenderingContext2D,
  w: number,
  h: number
): void {
  // 1個目の円
  const dx: number = w / 3 + (w / 10) * Math.sin(Date.now() / 4000);
  const dy1: number = h / 3;
  const size1: number = w / 2;
  drawCircle(context, dx, dy1, size1, "rgba(255, 255, 255, 0.3)");

  // 2個目の円
  const dx2: number = (w * 3) / 4 + (w / 15) * Math.cos(Date.now() / 10000);
  const dy2: number = (h * 2) / 3;
  const size2: number = w / 3;
  drawCircle(context, dx2, dy2, size2, "rgba(255, 255, 255, 0.1)");
}

function drawCircle(
  context: CanvasRenderingContext2D,
  dx: number,
  dy: number,
  size: number,
  color: string
): void {
  // グラデーションの指定
  const gradient: CanvasGradient = context.createRadialGradient(dx, dy, 0, dx, dy, size);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  // 円を描く
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(dx, dy, size, 0, Math.PI * 2);
  context.closePath();
  context.fill();
}

noise.seed(Math.random());

export function drawWave(
  context: CanvasRenderingContext2D,
  w: number,
  h: number,
  vertexNum: number = 10,
  // maxVertex: number = 5,
  debugMode: boolean = false
): void {
  // 曲線を描き直す
  for (let i = 0; i < vertexNum; i++) {
    // デバッグ機能が有効の場合は線を1pxで描く
    const strokeSize: number = debugMode ? 1.0 : 0.05 * i + 0.1; // ゼロ対策

    const timeOffset: number = i * 0.1;
    const time: number = Date.now() / 5000;

    // 線のスタイルを設定
    context.beginPath();
    context.strokeStyle = "white";
    context.lineWidth = strokeSize;

    const vertexArr: number[] = [];
    // 波の次の目標値を計算
    for (let j = 0; j <= vertexNum; j++) {
        const noiseNum: number = noise.perlin2(j * 0.2, time + timeOffset);
        // 目標座標を計算。画面の高さに比例
        vertexArr[j] = noiseNum * h * 0.5;
    }

    const BASE_Y: number = h / 2; // 画面中央のY座標
    const points: { x: number; y: number }[] = [];
    // 画面左端の座標
    points.push({ x: -200, y: BASE_Y });
    for (let j = 0; j <= vertexNum; j++) {
        points.push({
            x: (w * (j / vertexNum)) >> 0,
            y: vertexArr[j] + BASE_Y,
        });
    }
    // 画面右端の座標
    points.push({ x: w + 200, y: BASE_Y });

    // 直線情報を曲線にするテクニック
    for (let j = 0; j < points.length; j++) {
        if (j < 2) {
            continue;
        }
        const p0x: number = points[j].x;
        const p0y: number = points[j].y;
        const p1x: number = points[j - 1].x;
        const p1y: number = points[j - 1].y;
        const p2x: number = points[j - 2].x;
        const p2y: number = points[j - 2].y;

        const curveStartX: number = (p2x + p1x) / 2;
        const curveStartY: number = (p2y + p1y) / 2;
        const curveEndX: number = (p0x + p1x) / 2;
        const curveEndY: number = (p0y + p1y) / 2;

        // カーブは中間点を結び、p1を制御点として扱う
        context.moveTo(curveStartX, curveStartY);
        context.quadraticCurveTo(p1x, p1y, curveEndX, curveEndY);
    }
    context.stroke();

    // デバッグ機能：曲線の元になっている頂点を可視化
    if (debugMode) {
        drawDebugView(context, points);
    }
  }
}

function drawDebugView(
    context: CanvasRenderingContext2D,
    points: { x: number; y: number }[]
): void {
    for (let i = 0; i < points.length; i++) {
        const p0x: number = points[i].x;
        const p0y: number = points[i].y;
        if (i > 0) {
            const p1x: number = points[i - 1].x;
            const p1y: number = points[i - 1].y;
            context.beginPath();
            context.strokeStyle = "red";
            context.lineWidth = 0.5;
            context.moveTo(p1x, p1y);
            context.lineTo(p0x, p0y);
            context.stroke();
        }
        context.beginPath();
        context.fillStyle = "red";
        context.arc(p0x, p0y, 3, 0, 2 * Math.PI);
        context.fill();
    }
}

function canvasSpotligth(
  width: number,
  height: number,
  canvasWaveRef: RefObject<HTMLCanvasElement | null>,
  canvasOverlayRef: RefObject<HTMLCanvasElement | null>
) {
  const canvasWave = canvasWaveRef.current;
  const canvasOverlay = canvasOverlayRef.current;

  if (!canvasWave || !canvasOverlay) return;

  const contextWave = canvasWave.getContext("2d");
  const contextOverlay = canvasOverlay.getContext("2d");

  if (!contextWave || !contextOverlay) return;

  canvasWave.width = width;
  canvasWave.height = height;
  canvasOverlay.width = width;
  canvasOverlay.height = height;

  if (width === 0 || height === 0) {
    return;
  }

  let animationFrameId: number;
  const tick = () => {
    animationFrameId = requestAnimationFrame(tick);

    contextWave.fillStyle = "rgba(0, 0, 0, 0.2)";
    contextWave.fillRect(0, 0, canvasWave.width, canvasWave.height);

    drawWave(contextWave, canvasWave.width, canvasWave.height);

    contextOverlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
    drawSpotLight(contextOverlay, canvasOverlay.width, canvasOverlay.height);

    contextOverlay.globalCompositeOperation = "lighter";
    contextOverlay.drawImage(canvasWave, 0, 0);
  };

  tick();

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}

export default function SpotlightAndWave() {
  const canvasWaveRef = useRef<HTMLCanvasElement | null>(null);
  const canvasOverlayRef = useRef<HTMLCanvasElement | null>(null);
  const { width, height } = useResizeEffect();

  canvasSpotligth(width, height, canvasWaveRef, canvasOverlayRef)

  console.log(isClientSide(), width, height)

  const canvasStyle: React.CSSProperties = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%" };

  return (
    <div>
      <div id="bg" style={{ ...canvasStyle, zIndex: -2, background: "linear-gradient(to bottom, hsl(145, 33%, 48%),hsl(152, 21%, 54%),hsl(175, 20%, 53%))", animation: "AnimationName 10s ease infinite" } as React.CSSProperties}></div>
      <canvas
        id="canvasWave"
        ref={canvasWaveRef}
        style={{ ...canvasStyle, zIndex: -3 }}
      />
      <canvas
        id="canvasOverlay"
        ref={canvasOverlayRef}
        style={{ ...canvasStyle, zIndex: -1, mixBlendMode: "hard-light" }}
      />
    </div>
  );
};
