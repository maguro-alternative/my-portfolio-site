"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export default function TweetEmbed({ id }: { id: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTwitterWidget = () => {
      if (window.twttr) {
        window.twttr.widgets.load(containerRef.current ?? undefined);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.head.appendChild(script);
    };

    loadTwitterWidget();
  }, [id]);

  return (
    <div ref={containerRef} className="tweet-embed">
      <blockquote className="twitter-tweet" data-theme="dark">
        <a href={`https://twitter.com/i/status/${id}`}>Loading tweet...</a>
      </blockquote>
    </div>
  );
}
