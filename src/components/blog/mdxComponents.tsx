import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import LinkCard from "./LinkCard";
import TweetEmbed from "./TweetEmbed";

export const mdxComponents: MDXComponents = {
  img: (props) => {
    const { src, alt } = props as React.ImgHTMLAttributes<HTMLImageElement>;
    if (!src || typeof src !== "string") return null;
    return (
      <Image
        src={src}
        alt={alt || ""}
        width={800}
        height={450}
        className="rounded-lg my-4"
        style={{ width: "100%", height: "auto" }}
      />
    );
  },
  LinkCard,
  TweetEmbed,
};
