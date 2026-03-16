import type { VideoProvider } from "@/application/ports/videoProvider";
import { createVideo, type Video, VideoValidationError } from "@/domain/video";
import { VideoParseError, VideoRequestError } from "@/infrastructure/video/errors";

type RemoteVideoItem = {
  id?: string;
  url?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  publishedAt?: string;
};

type RemoteVideosResponse =
  | {
      videos?: RemoteVideoItem[];
    }
  | RemoteVideoItem[];

type RemoteJsonVideoProviderArgs = {
  url: string;
  revalidateSeconds?: number;
};

function toCanonicalYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
}

function deriveYouTubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;
}

function extractYouTubeVideoId(rawUrl: string): string | null {
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

async function resolveYouTubeTitle(url: string, revalidateSeconds: number): Promise<string | undefined> {
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

function getRemoteVideoItems(data: RemoteVideosResponse): RemoteVideoItem[] {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.videos)) {
    return data.videos;
  }

  throw new VideoParseError("Remote videos JSON must be an array or an object with a videos array.");
}

export class RemoteJsonVideoProvider implements VideoProvider {
  private readonly url: string;
  private readonly revalidateSeconds: number;

  constructor({ url, revalidateSeconds = 300 }: RemoteJsonVideoProviderArgs) {
    this.url = url;
    this.revalidateSeconds = revalidateSeconds;
  }

  async getVideos(): Promise<Video[]> {
    const response = await fetch(this.url, {
      next: { revalidate: this.revalidateSeconds },
    });

    if (!response.ok) {
      throw new VideoRequestError(response.status);
    }

    let data: RemoteVideosResponse;

    try {
      data = (await response.json()) as RemoteVideosResponse;
    } catch {
      throw new VideoParseError();
    }

    const remoteItems = getRemoteVideoItems(data);
    const mapped = await Promise.all(
      remoteItems.map((item, index) => this.mapRemoteItemToVideo(item, index)),
    );

    return mapped.filter((video): video is Video => Boolean(video));
  }

  private async mapRemoteItemToVideo(item: RemoteVideoItem, index: number): Promise<Video | null> {
    const rawUrl = item.url?.trim();
    if (!rawUrl) {
      return null;
    }

    const youtubeId = extractYouTubeVideoId(rawUrl);
    if (!youtubeId) {
      return null;
    }

    const canonicalUrl = toCanonicalYouTubeWatchUrl(youtubeId);
    const resolvedTitle =
      item.title?.trim() || (await resolveYouTubeTitle(canonicalUrl, this.revalidateSeconds)) || "Video";

    try {
      return createVideo({
        id: item.id?.trim() || `video-${index + 1}`,
        url: canonicalUrl,
        youtubeId,
        title: resolvedTitle,
        description: item.description,
        thumbnailUrl: item.thumbnail?.trim() || deriveYouTubeThumbnailUrl(youtubeId),
        publishedAt: item.publishedAt,
      });
    } catch (error) {
      if (error instanceof VideoValidationError) {
        return null;
      }

      throw error;
    }
  }
}