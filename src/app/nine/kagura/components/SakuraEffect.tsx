'use client';

import { Suspense } from 'react';

export function SakuraEffect() {
  const initParticles = async () => {
    try {
      const { tsParticles } = await import('@tsparticles/engine');
      const { loadAll } = await import('@tsparticles/all');

      await loadAll(tsParticles);

      await tsParticles.load({
        id: 'sakura-particles',
        options: {
          particles: {
            number: {
              value: 40,
              density: { enable: true },
            },
            color: {
              value: ['#FFB7C5', '#FF91A4', '#DDA0DD', '#F4C2C2'],
            },
            shape: {
              type: 'circle',
            },
            opacity: {
              value: { min: 0.3, max: 0.7 },
            },
            size: {
              value: { min: 2, max: 8 },
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'bottom',
              random: true,
              straight: false,
              outModes: 'out',
            },
            rotate: {
              value: { min: 0, max: 360 },
              animation: {
                enable: true,
                speed: 8,
                sync: false,
              },
            },
            wobble: {
              enable: true,
              distance: 15,
              speed: 3,
            },
          },
          interactivity: {
            events: {
              onHover: { enable: false },
              onClick: { enable: false },
            },
          },
          retina_detect: true,
        },
      });
    } catch (error) {
      console.error('Failed to load sakura particles:', error);
    }
  };

  initParticles();

  return (
    <Suspense fallback={null}>
      {/* CSS emoji petals */}
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        <div className="absolute left-[10%] animate-fall-small-9 text-lg opacity-60">
          🌸
        </div>
        <div className="absolute left-[30%] animate-fall-small-13 text-sm opacity-50">
          🌸
        </div>
        <div className="absolute left-[55%] animate-fall-medium-8 text-xl opacity-50">
          🌸
        </div>
        <div className="absolute left-[75%] animate-fall-medium-10 text-base opacity-60">
          🌸
        </div>
        <div className="absolute left-[20%] animate-fall-large-6 text-2xl opacity-40">
          🌸
        </div>
        <div className="absolute left-[65%] animate-fall-large-7 text-lg opacity-40">
          🌸
        </div>
        <div className="absolute left-[85%] animate-fall-small-7 text-sm opacity-50">
          🌸
        </div>
        <div className="absolute left-[45%] animate-fall-large-5 text-xl opacity-45">
          🌸
        </div>
      </div>
      {/* tsParticles container */}
      <div
        id="sakura-particles"
        className="pointer-events-none fixed inset-0 z-10"
      />
    </Suspense>
  );
}
