import TweetEmbedClient from "./TweetEmbedClient";
import type { TweetData } from "./TweetEmbedClient";

const TWEET_URL_PATTERN =
  /(?:twitter\.com|x\.com|fxtwitter\.com|fixupx\.com|vxtwitter\.com)\/.+\/status\/(\d+)/;

function extractTweetId(idOrUrl: string): string {
  const match = idOrUrl.match(TWEET_URL_PATTERN);
  if (match) return match[1];
  // Assume it's already a raw ID
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

    return {
      authorName: tweet.author?.name ?? "",
      authorHandle: tweet.author?.screen_name ?? "",
      authorAvatar: tweet.author?.avatar_url ?? "",
      text: tweet.text ?? "",
      createdAt: tweet.created_at ?? "",
      mediaUrl: tweet.media?.photos?.[0]?.url ?? tweet.media?.videos?.[0]?.thumbnail_url,
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

  const fallbackData = await fetchTweetFromFxTwitter(tweetId);

  return <TweetEmbedClient tweetId={tweetId} fallbackData={fallbackData} />;
}
