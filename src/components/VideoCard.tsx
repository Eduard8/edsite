import Image from "next/image";
import { presentVideoCard } from "@/application/presenters/presentVideoCard";
import type { Video } from "@/domain/video";
import {
  UiAnimatedContainer,
  UiCard,
  UiCardDescription,
  UiCardTitle,
} from "@/ui/facade";

type VideoCardProps = {
  video: Video;
};

export function VideoCard({ video }: VideoCardProps) {
  const viewModel = presentVideoCard(video);

  return (
    <UiAnimatedContainer>
      <UiCard className="video-card">
        <a
          href={viewModel.videoUrl}
          target="_blank"
          rel="noreferrer"
          className={`video-card-media video-card-media-link${viewModel.imageUrl ? "" : " video-card-media-link--fallback"}`}
        >
          {viewModel.imageUrl ? (
            <Image
              src={viewModel.imageUrl}
              alt={viewModel.imageAlt}
              width={640}
              height={360}
              unoptimized
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              className="video-card-image"
            />
          ) : (
            <span className="video-card-image-fallback">Open on YouTube</span>
          )}
        </a>

        <div className="video-card-content">
          <a
            href={viewModel.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="video-card-title-link"
          >
            <UiCardTitle className="video-card-title">{viewModel.title}</UiCardTitle>
          </a>
          {viewModel.description ? (
            <UiCardDescription className="video-card-description">{viewModel.description}</UiCardDescription>
          ) : null}
        </div>
      </UiCard>
    </UiAnimatedContainer>
  );
}