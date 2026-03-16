import type { Video } from "@/domain/video";
import { createVideoProvider } from "@/infrastructure/composition/createVideoProvider";
import { VideoParseError, VideoRequestError } from "@/infrastructure/video/errors";

export type VideosPageViewModel = {
  videos: Video[];
  errorMessage: string | null;
  setupMessage: string | null;
};

function toVideosErrorMessage(error: unknown): string {
  if (error instanceof VideoRequestError) {
    return error.message;
  }

  if (error instanceof VideoParseError) {
    return "Videos response format changed. Please try again later.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Failed to load videos.";
}

export async function getVideosPageViewModel(): Promise<VideosPageViewModel> {
  const provider = createVideoProvider();

  if (!provider) {
    return {
      videos: [],
      errorMessage: null,
      setupMessage: "Set REMOTE_VIDEOS_JSON_URL to display videos.",
    };
  }

  try {
    const videos = await provider.getVideos();
    return {
      videos,
      errorMessage: null,
      setupMessage: null,
    };
  } catch (error) {
    return {
      videos: [],
      errorMessage: toVideosErrorMessage(error),
      setupMessage: null,
    };
  }
}