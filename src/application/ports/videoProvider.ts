import type { Video } from "@/domain/video";

export interface VideoProvider {
  getVideos(): Promise<Video[]>;
}