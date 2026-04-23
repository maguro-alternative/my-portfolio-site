type OgpData = {
  title: string;
  description: string;
  image: string;
  favicon: string;
  url: string;
};

async function fetchOgpData(url: string): Promise<OgpData> {
  const fallback: OgpData = {
    title: url,
    description: "",
    image: "",
    favicon: "",
    url,
  };

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "bot" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return fallback;

    const html = await res.text();

    const getMetaContent = (property: string): string => {
      const regex = new RegExp(
        `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']*)["']|<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${property}["']`,
        "i"
      );
      const match = html.match(regex);
      return match?.[1] || match?.[2] || "";
    };

    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);

    const origin = new URL(url).origin;

    return {
      title: getMetaContent("og:title") || titleMatch?.[1] || url,
      description:
        getMetaContent("og:description") || getMetaContent("description"),
      image: getMetaContent("og:image"),
      favicon: `https://www.google.com/s2/favicons?domain=${origin}&sz=32`,
      url,
    };
  } catch {
    return fallback;
  }
}

export default async function LinkCard({ href }: { href: string }) {
  const ogp = await fetchOgpData(href);

  return (
    <a
      href={ogp.url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-card"
    >
      {ogp.image && (
        <img src={ogp.image} alt="" className="link-card-image" />
      )}
      <div className="link-card-content">
        <div className="link-card-title">{ogp.title}</div>
        {ogp.description && (
          <div className="link-card-description">{ogp.description}</div>
        )}
        <div className="link-card-url">
          {ogp.favicon && (
            <img src={ogp.favicon} alt="" width={16} height={16} />
          )}
          <span>{new URL(ogp.url).hostname}</span>
        </div>
      </div>
    </a>
  );
}
