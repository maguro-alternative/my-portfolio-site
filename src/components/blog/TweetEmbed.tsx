type TweetMedia = {
  type: "photo" | "video";
  url: string;
  thumbnailUrl?: string;
};

type TweetData = {
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  text: string;
  createdAt: string;
  media?: TweetMedia;
};

const TWEET_URL_PATTERN =
  /(?:twitter\.com|x\.com|fxtwitter\.com|fixupx\.com|vxtwitter\.com)\/.+\/status\/(\d+)/;

function extractTweetId(idOrUrl: string): string {
  const match = idOrUrl.match(TWEET_URL_PATTERN);
  if (match) return match[1];
  return idOrUrl.replace(/\D/g, "");
}

async function fetchTweetFromFxTwitter(
  tweetId: string
): Promise<TweetData | undefined> {
  try {
    const res = await fetch(
      `https://api.fxtwitter.com/i/status/${tweetId}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return undefined;

    const json = await res.json();
    const tweet = json.tweet;
    if (!tweet) return undefined;

    let media: TweetMedia | undefined;
    if (tweet.media?.videos?.[0]) {
      media = {
        type: "video",
        url: tweet.media.videos[0].url,
        thumbnailUrl: tweet.media.videos[0].thumbnail_url,
      };
    } else if (tweet.media?.photos?.[0]) {
      media = {
        type: "photo",
        url: tweet.media.photos[0].url,
      };
    }

    return {
      authorName: tweet.author?.name ?? "",
      authorHandle: tweet.author?.screen_name ?? "",
      authorAvatar: tweet.author?.avatar_url ?? "",
      text: tweet.text ?? "",
      createdAt: tweet.created_at ?? "",
      media,
    };
  } catch {
    return undefined;
  }
}

type Props = {
  id?: string;
  url?: string;
};

export default async function TweetEmbed({ id, url }: Props) {
  const raw = url ?? id ?? "";
  const tweetId = extractTweetId(raw);
  if (!tweetId) return null;

  const tweetData = await fetchTweetFromFxTwitter(tweetId);
  const tweetUrl = `https://x.com/i/status/${tweetId}`;

  if (!tweetData) {
    return (
      <div className="tweet-embed">
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tweet-fallback-card"
        >
          <div className="tweet-fallback-text">
            ツイートを読み込めませんでした
          </div>
          <div className="tweet-fallback-date">{tweetUrl}</div>
        </a>
      </div>
    );
  }

  return (
    <div className="tweet-embed">
      <div className="tweet-fallback-card">
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tweet-fallback-link"
        >
          <div className="tweet-fallback-header">
            <img
              src={tweetData.authorAvatar}
              alt=""
              className="tweet-fallback-avatar"
              width={40}
              height={40}
            />
            <div>
              <div className="tweet-fallback-name">
                {tweetData.authorName}
              </div>
              <div className="tweet-fallback-handle">
                @{tweetData.authorHandle}
              </div>
            </div>
          </div>
          <div className="tweet-fallback-text">{tweetData.text}</div>
        </a>
        {tweetData.media &&
          (tweetData.media.type === "video" ? (
            <video
              src={tweetData.media.url}
              poster={tweetData.media.thumbnailUrl}
              controls
              playsInline
              preload="metadata"
              className="tweet-fallback-media"
            />
          ) : (
            <a href={tweetUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={tweetData.media.url}
                alt=""
                className="tweet-fallback-media"
              />
            </a>
          ))}
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tweet-fallback-link"
        >
          <div className="tweet-fallback-date">{tweetData.createdAt}</div>
        </a>
      </div>
    </div>
  );
}
