export function toCanonicalYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
}

export function deriveYouTubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;
}

export function extractYouTubeVideoId(rawUrl: string): string | null {
  let parsed: URL;

  try {
    parsed = new URL(rawUrl);
  } catch {
    return null;
  }

  const hostname = parsed.hostname.toLowerCase();
  const pathname = parsed.pathname;

  if (hostname === "youtu.be") {
    const shortId = pathname.split("/").filter(Boolean)[0];
    return shortId ?? null;
  }

  const isYouTubeHost =
    hostname === "youtube.com" ||
    hostname === "www.youtube.com" ||
    hostname === "m.youtube.com" ||
    hostname === "music.youtube.com";

  if (!isYouTubeHost) {
    return null;
  }

  if (pathname === "/watch") {
    return parsed.searchParams.get("v");
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  if (pathSegments[0] === "shorts" || pathSegments[0] === "embed") {
    return pathSegments[1] ?? null;
  }

  return null;
}

export async function resolveYouTubeTitle(
  url: string,
  revalidateSeconds: number,
): Promise<string | undefined> {
  const endpoint = new URL("https://www.youtube.com/oembed");
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("format", "json");

  try {
    const response = await fetch(endpoint.toString(), {
      next: { revalidate: revalidateSeconds },
    });

    if (!response.ok) {
      return undefined;
    }

    const data = (await response.json()) as { title?: string };
    const title = data.title?.trim();
    return title ? title : undefined;
  } catch {
    return undefined;
  }
}
