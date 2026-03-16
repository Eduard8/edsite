import type { VideoProvider } from "@/application/ports/videoProvider";
import { getRemoteVideosJsonUrl } from "@/config/env";
import { RemoteJsonVideoProvider } from "@/infrastructure/video/remoteJsonVideoClient";

export function createVideoProvider(): VideoProvider | null {
  const remoteVideosJsonUrl = getRemoteVideosJsonUrl();
  if (!remoteVideosJsonUrl) {
    return null;
  }

  return new RemoteJsonVideoProvider({
    url: remoteVideosJsonUrl,
    revalidateSeconds: 300,
  });
}