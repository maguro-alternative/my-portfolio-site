export function WaveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-blue-50 to-cyan-100" />

      {/* 波1 - 一番奥（ゆっくり） */}
      <svg
        className="absolute bottom-0 h-[180px] w-[200%] animate-wave-slow"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C240,180 480,60 720,120 C960,180 1200,60 1440,120 L1440,200 L0,200 Z"
          fill="rgba(147,197,253,0.3)"
        />
      </svg>

      {/* 波2 - 中間 */}
      <svg
        className="absolute bottom-0 h-[140px] w-[200%] animate-wave-mid"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C200,160 400,40 600,100 C800,160 1000,40 1200,100 C1400,160 1440,80 1440,100 L1440,200 L0,200 Z"
          fill="rgba(96,165,250,0.2)"
        />
      </svg>

      {/* 波3 - 一番手前（速い） */}
      <svg
        className="absolute bottom-0 h-[100px] w-[200%] animate-wave-fast"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,140 C180,180 360,100 540,140 C720,180 900,100 1080,140 C1260,180 1440,120 1440,140 L1440,200 L0,200 Z"
          fill="rgba(59,130,246,0.15)"
        />
      </svg>
    </div>
  );
}
