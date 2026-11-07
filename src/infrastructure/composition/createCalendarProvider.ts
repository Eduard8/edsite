import type { CalendarProvider } from "@/application/ports/calendarProvider";
import { getSanityConfig } from "@/sanity/env";
import { SanityShowsProvider } from "@/infrastructure/shows/sanityShowsClient";

export function createCalendarProvider(): CalendarProvider | null {
  const sanityConfig = getSanityConfig();
  if (!sanityConfig) {
    return null;
  }

  return new SanityShowsProvider({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    revalidateSeconds: 300,
  });
}
