import imageUrlBuilder from "@sanity/image-url";
import { ClientError, ServerError } from "@sanity/client";
import { createClient } from "next-sanity";
import type { VideoProvider } from "@/application/ports/videoProvider";
import { createVideo, type Video, VideoValidationError } from "@/domain/video";
import { VideoParseError, VideoRequestError } from "@/infrastructure/video/errors";
import {
  deriveYouTubeThumbnailUrl,
  extractYouTubeVideoId,
  resolveYouTubeTitle,
  toCanonicalYouTubeWatchUrl,
} from "@/infrastructure/video/youtube";

const videosQuery = `*[
  _type == "video" &&
  defined(url)
] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  url,
  description,
  thumbnail,
  publishedAt
}`;

type SanityImage = {
  asset?: {
    _ref?: string;
  };
  crop?: {
    _type?: string;
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    _type?: string;
    height: number;
    width: number;
    x: number;
    y: number;
  };
};

type SanityVideoDocument = {
  _id?: string;
  title?: string;
  url?: string;
  description?: string;
  thumbnail?: SanityImage | null;
  publishedAt?: string;
};

type SanityVideoProviderArgs = {
  projectId: string;
  dataset: string;
  revalidateSeconds?: number;
};

function statusCodeOf(error: unknown): number | null {
  if (error instanceof ClientError || error instanceof ServerError) {
    return typeof error.statusCode === "number" ? error.statusCode : null;
  }

  return null;
}

export class SanityVideoProvider implements VideoProvider {
  private readonly revalidateSeconds: number;
  private readonly client: ReturnType<typeof createClient>;
  private readonly images: ReturnType<typeof imageUrlBuilder>;

  constructor({ projectId, dataset, revalidateSeconds = 300 }: SanityVideoProviderArgs) {
    this.revalidateSeconds = revalidateSeconds;
    this.client = createClient({
      projectId,
      dataset,
      apiVersion: "2026-11-07",
      useCdn: true,
      perspective: "published",
    });
    this.images = imageUrlBuilder({ projectId, dataset });
  }

  async getVideos(): Promise<Video[]> {
    let documents: unknown;

    try {
      documents = await this.client.fetch(videosQuery, {}, {
        perspective: "published",
        next: { revalidate: this.revalidateSeconds },
      });
    } catch (error) {
      const statusCode = statusCodeOf(error);
      if (statusCode !== null) {
        throw new VideoRequestError(statusCode);
      }

      throw error;
    }

    if (!Array.isArray(documents)) {
      throw new VideoParseError();
    }

    const videos = await Promise.all(
      documents.map((document) => this.toVideo(document)),
    );

    return videos.filter((video): video is Video => Boolean(video));
  }

  private async toVideo(document: unknown): Promise<Video | null> {
    if (!document || typeof document !== "object") {
      return null;
    }

    const video = document as SanityVideoDocument;
    const id = video._id?.trim();
    const rawUrl = video.url?.trim();
    if (!id || !rawUrl) {
      return null;
    }

    const youtubeId = extractYouTubeVideoId(rawUrl);
    if (!youtubeId) {
      return null;
    }

    const canonicalUrl = toCanonicalYouTubeWatchUrl(youtubeId);
    const title =
      video.title?.trim() ||
      (await resolveYouTubeTitle(canonicalUrl, this.revalidateSeconds)) ||
      "Video";

    try {
      return createVideo({
        id,
        url: canonicalUrl,
        youtubeId,
        title,
        description: video.description,
        thumbnailUrl: this.thumbnailUrl(video.thumbnail, youtubeId),
        publishedAt: video.publishedAt,
      });
    } catch (error) {
      if (error instanceof VideoValidationError) {
        return null;
      }

      throw error;
    }
  }

  private thumbnailUrl(thumbnail: SanityImage | null | undefined, youtubeId: string): string {
    const ref = thumbnail?.asset?._ref;
    if (!thumbnail || !ref) {
      return deriveYouTubeThumbnailUrl(youtubeId);
    }

    try {
      return this.images
        .image({
          asset: { _ref: ref },
          crop: thumbnail.crop,
          hotspot: thumbnail.hotspot,
        })
        .width(640)
        .height(360)
        .auto("format")
        .url();
    } catch {
      return deriveYouTubeThumbnailUrl(youtubeId);
    }
  }
}
