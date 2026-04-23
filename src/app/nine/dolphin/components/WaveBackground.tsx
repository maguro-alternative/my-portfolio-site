export function WaveBackground() {
  // 全パスは周期720で設計。viewBox幅1440の前半(0-720)と後半(720-1440)が
  // 同一波形になるため、translateX(-50%)で完全にシームレスループする。
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
            d="M0,20 C90,50 270,50 360,20 C450,-10 630,-10 720,20 C810,50 990,50 1080,20 C1170,-10 1350,-10 1440,20 L1440,0 L0,0 Z"
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
            d="M0,30 C90,60 270,60 360,30 C450,0 630,0 720,30 C810,60 990,60 1080,30 C1170,0 1350,0 1440,30 L1440,0 L0,0 Z"
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
            d="M0,40 C90,70 270,70 360,40 C450,10 630,10 720,40 C810,70 990,70 1080,40 C1170,10 1350,10 1440,40 L1440,0 L0,0 Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
