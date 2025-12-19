export interface Point {
  x: number;
  y: number;
}

export interface CircleConfig {
  dx: number;
  dy: number;
  size: number;
  color: string;
}

export interface WaveConfig {
  vertexNum?: number;
  debugMode?: boolean;
}

export interface WindowSize {
  width: number;
  height: number;
}
