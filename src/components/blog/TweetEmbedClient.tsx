"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export type TweetData = {
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  text: string;
  createdAt: string;
  mediaUrl?: string;
};

type Props = {
  tweetId: string;
  fallbackData?: TweetData;
};

export default function TweetEmbedClient({ tweetId, fallbackData }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    const TIMEOUT_MS = 5000;

    const timer = setTimeout(() => {
      setWidgetLoaded(false);
    }, TIMEOUT_MS);

    const checkRendered = () => {
      if (containerRef.current?.querySelector("iframe")) {
        setWidgetLoaded(true);
        clearTimeout(timer);
      }
    };

    const observer = new MutationObserver(checkRendered);
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    if (window.twttr) {
      window.twttr.widgets.load(containerRef.current ?? undefined);
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.head.appendChild(script);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [tweetId]);

  const tweetUrl = `https://twitter.com/i/status/${tweetId}`;

  return (
    <div ref={containerRef} className="tweet-embed">
      {/* Twitter native embed (hidden if widget doesn't load and fallback exists) */}
      <div style={!widgetLoaded && fallbackData ? { position: "absolute", opacity: 0, pointerEvents: "none" } : undefined}>
        <blockquote className="twitter-tweet" data-theme="dark">
          <a href={tweetUrl}>Loading tweet...</a>
        </blockquote>
      </div>

      {/* Fallback card using fxtwitter data */}
      {!widgetLoaded && fallbackData && (
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tweet-fallback-card"
        >
          <div className="tweet-fallback-header">
            <img
              src={fallbackData.authorAvatar}
              alt=""
              className="tweet-fallback-avatar"
              width={40}
              height={40}
            />
            <div>
              <div className="tweet-fallback-name">
                {fallbackData.authorName}
              </div>
              <div className="tweet-fallback-handle">
                @{fallbackData.authorHandle}
              </div>
            </div>
          </div>
          <div className="tweet-fallback-text">{fallbackData.text}</div>
          {fallbackData.mediaUrl && (
            <img
              src={fallbackData.mediaUrl}
              alt=""
              className="tweet-fallback-media"
            />
          )}
          <div className="tweet-fallback-date">{fallbackData.createdAt}</div>
        </a>
      )}
    </div>
  );
}
