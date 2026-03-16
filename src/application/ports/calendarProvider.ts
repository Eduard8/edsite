import type { ShowEvent } from "@/domain/event";

export interface CalendarProvider {
  getUpcomingEvents(maxResults?: number): Promise<ShowEvent[]>;
}
