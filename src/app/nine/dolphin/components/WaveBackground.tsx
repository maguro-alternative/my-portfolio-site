export function WaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10">
      {/* 青いヘッダーバンド */}
      <div className="h-40 bg-blue-500" />

      {/* 波の境界 - 青から白へ */}
      <div className="relative -mt-1 h-24 overflow-hidden">
        {/* 波1 - 奥（ゆっくり・半透明の青） */}
        <svg
          className="absolute top-0 h-full w-[200%] animate-wave-slow"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,10 C120,60 240,0 360,10 C480,60 600,0 720,10 C840,60 960,0 1080,10 C1200,60 1320,0 1440,10 L1440,0 L0,0 Z"
            fill="rgba(59,130,246,0.5)"
          />
        </svg>

        {/* 波2 - 中間（薄い青） */}
        <svg
          className="absolute top-0 h-full w-[200%] animate-wave-mid"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 C180,70 360,0 540,20 C720,70 900,0 1080,20 C1260,70 1440,0 1440,20 L1440,0 L0,0 Z"
            fill="rgba(96,165,250,0.3)"
          />
        </svg>

        {/* 波3 - 最前面（白い波で青を切る） */}
        <svg
          className="absolute top-0 h-full w-[200%] animate-wave-fast"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C160,80 320,0 480,30 C640,80 800,0 960,30 C1120,80 1280,0 1440,30 L1440,0 L0,0 Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
