import { CircleConfig } from "@/types/animation";

export function drawSpotLight(
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const circles: CircleConfig[] = [
    {
      dx: width / 3 + (width / 10) * Math.sin(Date.now() / 4000),
      dy: height / 3,
      size: width / 2,
      color: "rgba(255, 255, 255, 0.3)"
    },
    {
      dx: (width * 3) / 4 + (width / 15) * Math.cos(Date.now() / 10000),
      dy: (height * 2) / 3,
      size: width / 3,
      color: "rgba(255, 255, 255, 0.1)"
    }
  ];

  circles.forEach(circle => {
    drawCircle(context, circle.dx, circle.dy, circle.size, circle.color);
  });
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
