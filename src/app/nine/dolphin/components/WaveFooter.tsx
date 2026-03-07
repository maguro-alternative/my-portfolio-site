export function WaveFooter() {
  // WaveBackground と同じ周期720のパスを上下反転(rotate-180)して表示。
  // 白→青へ遷移するフッター波。
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
      {/* 波の境界 - 白から青へ（上下反転） */}
      <div className="relative h-24 overflow-hidden">
        {/* 波1 - 奥（ゆっくり・半透明の青） */}
        <svg
          className="absolute bottom-0 h-full w-[200%] rotate-180 animate-wave-slow"
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
          className="absolute bottom-0 h-full w-[200%] rotate-180 animate-wave-mid"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C90,60 270,60 360,30 C450,0 630,0 720,30 C810,60 990,60 1080,30 C1170,0 1350,0 1440,30 L1440,0 L0,0 Z"
            fill="rgba(96,165,250,0.3)"
          />
        </svg>

        {/* 波3 - 最前面（白い波） */}
        <svg
          className="absolute bottom-0 h-full w-[200%] rotate-180 animate-wave-fast"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C90,70 270,70 360,40 C450,10 630,10 720,40 C810,70 990,70 1080,40 C1170,10 1350,10 1440,40 L1440,0 L0,0 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* 青いフッターバンド */}
      <div className="h-20 bg-blue-500" />
    </div>
  );
}
