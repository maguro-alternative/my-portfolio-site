export function WaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10">
      {/* 青いヘッダーバンド */}
      <div className="h-40 bg-blue-500" />

      {/* 波の境界 - 青から白へ */}
      <div className="relative -mt-1 h-24 overflow-hidden">
        {/* 波1 - 奥（ゆっくり） */}
        <svg
          className="absolute top-0 h-full w-[200%] animate-wave-slow"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C240,80 480,0 720,40 C960,80 1200,0 1440,0 L1440,0 L0,0 Z"
            fill="rgba(59,130,246,0.5)"
          />
        </svg>

        {/* 波2 - 手前（白、メインの境界線） */}
        <svg
          className="absolute top-0 h-full w-[200%] animate-wave-mid"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C160,60 320,10 480,40 C640,70 800,10 960,40 C1120,70 1280,10 1440,0 L1440,0 L0,0 Z"
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
            d="M0,0 L0,20 C200,70 400,0 600,30 C800,60 1000,0 1200,20 C1350,35 1440,10 1440,20 L1440,0 Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
