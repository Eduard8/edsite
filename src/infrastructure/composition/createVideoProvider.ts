import type { VideoProvider } from "@/application/ports/videoProvider";
import { getSanityConfig } from "@/sanity/env";
import { SanityVideoProvider } from "@/infrastructure/video/sanityVideoClient";

export function createVideoProvider(): VideoProvider | null {
  const sanityConfig = getSanityConfig();
  if (!sanityConfig) {
    return null;
  }

  return new SanityVideoProvider({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    revalidateSeconds: 300,
  });
}
