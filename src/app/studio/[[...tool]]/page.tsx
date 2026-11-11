import type { Metadata, Viewport } from "next";
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";
import { EmbeddedStudio } from "@/app/studio/embedded-studio";
import { StudioSetup } from "@/app/studio/studio-setup";
import { getSanityConfig } from "@/sanity/env";

export const dynamic = "force-static";

export const viewport: Viewport = {
  ...studioViewport,
};

export function generateMetadata(): Metadata {
  if (!getSanityConfig()) {
    return {
      title: "Studio setup",
      robots: { index: false, follow: false },
    };
  }

  return {
    ...studioMetadata,
    title: "Shows studio",
  };
}

export default function StudioPage() {
  if (!getSanityConfig()) {
    return <StudioSetup />;
  }

  return <EmbeddedStudio />;
}
