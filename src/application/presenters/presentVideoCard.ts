import type { Video } from "@/domain/video";

export type VideoCardViewModel = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  imageAlt: string;
  videoUrl: string;
};

export function presentVideoCard(video: Video): VideoCardViewModel {
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    imageUrl: video.thumbnailUrl,
    imageAlt: `Thumbnail for ${video.title}`,
    videoUrl: video.url,
  };
}