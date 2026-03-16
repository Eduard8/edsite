export type Video = {
  id: string;
  url: string;
  youtubeId: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  publishedAt?: string;
};

export class VideoValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VideoValidationError";
  }
}

function toSafeExternalUrl(raw: string): string {
  try {
    const parsed = new URL(raw);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    throw new VideoValidationError(`Invalid external URL: ${raw}`);
  }

  throw new VideoValidationError(`Invalid external URL: ${raw}`);
}

function normalizeOptionalText(raw?: string): string | undefined {
  const trimmed = raw?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizePublishedAt(raw?: string): string | undefined {
  if (!raw) {
    return undefined;
  }

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return parsed.toISOString();
}

type CreateVideoInput = {
  id: string;
  url: string;
  youtubeId: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  publishedAt?: string;
};

export function createVideo(input: CreateVideoInput): Video {
  const id = input.id.trim();
  if (!id) {
    throw new VideoValidationError("Video id is required.");
  }

  const youtubeId = input.youtubeId.trim();
  if (!youtubeId) {
    throw new VideoValidationError("YouTube video id is required.");
  }

  return {
    id,
    url: toSafeExternalUrl(input.url),
    youtubeId,
    title: normalizeOptionalText(input.title) ?? "Video",
    description: normalizeOptionalText(input.description),
    thumbnailUrl: input.thumbnailUrl ? toSafeExternalUrl(input.thumbnailUrl) : undefined,
    publishedAt: normalizePublishedAt(input.publishedAt),
  };
}