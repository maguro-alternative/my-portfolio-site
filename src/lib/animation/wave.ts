import { noise } from "@/lib/perlin";
import { Point, WaveConfig } from "@/types/animation";

// ノイズシードを初期化
noise.seed(Math.random());

export function drawWave(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: WaveConfig = {}
): void {
  const { vertexNum = 10, debugMode = false } = config;

  // 曲線を描き直す
  for (let i = 0; i < vertexNum; i++) {
    drawWaveLayer(context, width, height, i, vertexNum, debugMode);
  }
}

function drawWaveLayer(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  layerIndex: number,
  vertexNum: number,
  debugMode: boolean
): void {
  // デバッグ機能が有効の場合は線を1pxで描く
  const strokeSize: number = debugMode ? 1.0 : 0.05 * layerIndex + 0.1; // ゼロ対策

  const timeOffset: number = layerIndex * 0.1;
  const time: number = Date.now() / 5000;

  // 線のスタイルを設定
  context.beginPath();
  context.strokeStyle = "white";
  context.lineWidth = strokeSize;

  const points = generateWavePoints(width, height, vertexNum, time, timeOffset);
  drawSmoothCurve(context, points);

  // デバッグ機能：曲線の元になっている頂点を可視化
  if (debugMode) {
    drawDebugView(context, points);
  }
}

function generateWavePoints(
  width: number,
  height: number,
  vertexNum: number,
  time: number,
  timeOffset: number
): Point[] {
  const vertexArr: number[] = [];
  
  // 波の次の目標値を計算
  for (let j = 0; j <= vertexNum; j++) {
    const noiseNum: number = noise.perlin2(j * 0.2, time + timeOffset);
    // 目標座標を計算。画面の高さに比例
    vertexArr[j] = noiseNum * height * 0.5;
  }

  const BASE_Y: number = height / 2; // 画面中央のY座標
  const points: Point[] = [];
  
  // 画面左端の座標
  points.push({ x: -200, y: BASE_Y });
  
  for (let j = 0; j <= vertexNum; j++) {
    points.push({
      x: (width * (j / vertexNum)) >> 0,
      y: vertexArr[j] + BASE_Y,
    });
  }
  
  // 画面右端の座標
  points.push({ x: width + 200, y: BASE_Y });

  return points;
}

function drawSmoothCurve(context: CanvasRenderingContext2D, points: Point[]): void {
  // 直線情報を曲線にするテクニック
  for (let j = 0; j < points.length; j++) {
    if (j < 2) {
      continue;
    }
    
    const p0 = points[j];
    const p1 = points[j - 1];
    const p2 = points[j - 2];

    const curveStartX: number = (p2.x + p1.x) / 2;
    const curveStartY: number = (p2.y + p1.y) / 2;
    const curveEndX: number = (p0.x + p1.x) / 2;
    const curveEndY: number = (p0.y + p1.y) / 2;

    // カーブは中間点を結び、p1を制御点として扱う
    context.moveTo(curveStartX, curveStartY);
    context.quadraticCurveTo(p1.x, p1.y, curveEndX, curveEndY);
  }
  context.stroke();
}

function drawDebugView(context: CanvasRenderingContext2D, points: Point[]): void {
  for (let i = 0; i < points.length; i++) {
    const p0 = points[i];
    
    if (i > 0) {
      const p1 = points[i - 1];
      context.beginPath();
      context.strokeStyle = "red";
      context.lineWidth = 0.5;
      context.moveTo(p1.x, p1.y);
      context.lineTo(p0.x, p0.y);
      context.stroke();
    }
    
    context.beginPath();
    context.fillStyle = "red";
    context.arc(p0.x, p0.y, 3, 0, 2 * Math.PI);
    context.fill();
  }
}
