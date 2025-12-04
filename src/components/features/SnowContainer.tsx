'use client'
import { Suspense } from "react";

const getIsClient = () => {
  try {
    return !!window;
  } catch {
    return false;
  }
};

export default function SnowContainer() {
  const initParticles = async () => {
    try {
      if (!getIsClient()) {
        return;
      }
      const { tsParticles } = await import("@tsparticles/engine");
      const { loadAll } = await import("@tsparticles/all");

      await loadAll(tsParticles);

      await tsParticles.load({
        id: "tsparticles",
        options: {
          particles: {
            number: {
              value: 150,
              density: {
                enable: true,
              }
            },
            color: {
              value: "#F4F4F4",
            },
            shape: {
                type: "circle",
            },
            opacity: {
              value: { min: 0.3, max: 0.8 },  // 透明度もランダムに
              animation: {
                enable: false,
                speed: 1,
                destroy: "min",
                sync: false
              }
            },
            size: {
              value: { min: 1, max: 6 },
              animation: {
                enable: false,
                speed: 20,
                sync: false
              }
            },
            line_linked: {
              enable: false
            },
            move: {
              enable: true,
              speed: 5,
              direction: "bottom",
              random: true,
              straight: false,
              outModes: "out",
              attract: {
                enable: false,
                rotate: {
                  x: 300,
                  y: 1200,
                },
              }
            },
            
            zIndex: {
                value: {
                  min: 0,
                  max: 1,
                },
                opacityRate: 10,
                sizeRate: 10,
                velocityRate: 10,
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onHover: {
                enable: false
              },
              onClick: {
                enable: false
              },
              resize: {
                enable: true
              }
            }
          },
          retina_detect: true
        },
      });
    } catch (error) {
      console.error("Failed to load particles:", error);
    }
  };

  initParticles();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex fixed w-full h-full">
        <div className="before:absolute after:absolute w-full h-full color-snow text-center before:content-['❄'] before:left-[-30%] before:animate-fall-small-9 after:content-['❄'] after:left-[30%] after:animate-fall-small-9">
          <span className="absolute animate-fall-small-13">❄</span>
        </div>
        <div className="before:absolute after:absolute before:content-['❄'] before:left-[-40%] before:animate-fall-medium-10 after:content-['❄'] after:left-[40%] after:animate-fall-medium-6">
          <span className="absolute animate-fall-medium-8 left-[10%]">❄</span>
        </div>
        <div className="before:absolute after:absolute before:content-['❄'] before:left-[-35%] before:animate-fall-large-6 after:content-['❄'] after:left-[35%] after:animate-fall-large-7">
          <span className="absolute animate-fall-large-5 left-[-10%]">❄</span>
        </div>
      </div>
      <div id="tsparticles" className="absolute top-0 left-0 w-full h-full"></div>
    </Suspense>
  );
}
