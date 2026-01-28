import { drawSpotLight } from "./spotlight";
import { drawWave } from "./wave";
import { WaveConfig } from "@/types/animation";

export function createCanvasAnimation(
  width: number,
  height: number,
  canvasWave: HTMLCanvasElement | null,
  canvasOverlay: HTMLCanvasElement | null,
  waveConfig: WaveConfig = {}
) {
  if (!canvasWave || !canvasOverlay) return;

  const contextWave = canvasWave.getContext("2d");
  const contextOverlay = canvasOverlay.getContext("2d");

  if (!contextWave || !contextOverlay) return;

  // Canvasサイズを設定
  setupCanvas(canvasWave, canvasOverlay, width, height);

  if (width === 0 || height === 0) {
    return;
  }

  let animationFrameId: number;
  
  const tick = () => {
    animationFrameId = requestAnimationFrame(tick);

    // 波形描画
    renderWaveLayer(contextWave, canvasWave, waveConfig);
    
    // スポットライト描画
    renderOverlayLayer(contextOverlay, canvasOverlay, canvasWave);
  };

  tick();

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}

function setupCanvas(
  canvasWave: HTMLCanvasElement,
  canvasOverlay: HTMLCanvasElement,
  width: number,
  height: number
): void {
  canvasWave.width = width;
  canvasWave.height = height;
  canvasOverlay.width = width;
  canvasOverlay.height = height;
}

function renderWaveLayer(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: WaveConfig
): void {
  context.fillStyle = "rgba(0, 0, 0, 0.2)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawWave(context, canvas.width, canvas.height, config);
}

function renderOverlayLayer(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  waveCanvas: HTMLCanvasElement
): void {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawSpotLight(context, canvas.width, canvas.height);
  context.globalCompositeOperation = "lighter";
  context.drawImage(waveCanvas, 0, 0);
}
