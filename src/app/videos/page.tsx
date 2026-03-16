import { getVideosPageViewModel } from "@/app/videos/controller";
import { VideoCard } from "@/components/VideoCard";
import { UiAnimatedContainer } from "@/ui/facade";

export default async function VideosPage() {
  const viewModel = await getVideosPageViewModel();
  const hasVideos = viewModel.videos.length > 0;

  if (viewModel.setupMessage) {
    return (
      <main className="page page--compact">
        <UiAnimatedContainer delay={0.05}>
          <div className="state-panel state-panel--setup state-panel--videos">
            <p className="state-panel-title">Videos setup needed</p>
            <p className="text-muted">{viewModel.setupMessage}</p>
          </div>
        </UiAnimatedContainer>
      </main>
    );
  }

  return (
    <main className="page">

      {viewModel.errorMessage ? (
        <UiAnimatedContainer delay={0.05}>
          <div className="state-panel state-panel--error state-panel--videos">
            <p className="state-panel-title">Could not load videos</p>
            <p className="status-error">{viewModel.errorMessage}</p>
          </div>
        </UiAnimatedContainer>
      ) : null}

      {!viewModel.errorMessage && !hasVideos ? (
        <UiAnimatedContainer delay={0.05}>
          <div className="state-panel state-panel--empty state-panel--videos">
            <p className="state-panel-title">No videos posted yet</p>
            <p className="text-muted">Check back soon for new uploads.</p>
          </div>
        </UiAnimatedContainer>
      ) : null}

      {!viewModel.errorMessage && hasVideos ? (
        <ul className="video-grid">
          {viewModel.videos.map((video) => (
            <li key={video.id}>
              <VideoCard video={video} />
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}