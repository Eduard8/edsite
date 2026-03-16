import type { CalendarProvider } from "@/application/ports/calendarProvider";
import type { ShowEvent } from "@/domain/event";

export async function getUpcomingShows(
  calendarProvider: CalendarProvider,
  maxResults = 20,
): Promise<ShowEvent[]> {
  const events = await calendarProvider.getUpcomingEvents(maxResults);

  return events.sort(
    (left, right) => new Date(left.start.iso).getTime() - new Date(right.start.iso).getTime(),
  );
}
