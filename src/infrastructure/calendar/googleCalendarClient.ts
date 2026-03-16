import { mapGoogleCalendarEvent } from "@/application/mapCalendarEvent";
import type { GoogleCalendarEvent } from "@/application/mapping/google/types";
import type { CalendarProvider } from "@/application/ports/calendarProvider";
import type { ShowEvent } from "@/domain/event";
import {
  CalendarAuthError,
  CalendarParseError,
  CalendarRequestError,
} from "@/infrastructure/calendar/errors";

type GoogleCalendarApiResponse = {
  items?: GoogleCalendarEvent[];
};

type GoogleCalendarProviderArgs = {
  apiKey: string;
  calendarId: string;
  revalidateSeconds?: number;
};

export class GoogleCalendarProvider implements CalendarProvider {
  private readonly apiKey: string;
  private readonly calendarId: string;
  private readonly revalidateSeconds: number;

  constructor({ apiKey, calendarId, revalidateSeconds = 300 }: GoogleCalendarProviderArgs) {
    this.apiKey = apiKey;
    this.calendarId = calendarId;
    this.revalidateSeconds = revalidateSeconds;
  }

  async getUpcomingEvents(maxResults = 20): Promise<ShowEvent[]> {
    const endpoint = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(this.calendarId)}/events`,
    );

    endpoint.searchParams.set("key", this.apiKey);
    endpoint.searchParams.set("singleEvents", "true");
    endpoint.searchParams.set("orderBy", "startTime");
    endpoint.searchParams.set("timeMin", new Date().toISOString());
    endpoint.searchParams.set("maxResults", String(maxResults));

    const response = await fetch(endpoint.toString(), {
      next: { revalidate: this.revalidateSeconds },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new CalendarAuthError(response.status);
      }

      throw new CalendarRequestError(response.status);
    }

    let data: GoogleCalendarApiResponse;

    try {
      data = (await response.json()) as GoogleCalendarApiResponse;
    } catch {
      throw new CalendarParseError();
    }

    const mapped = (data.items ?? [])
      .map((item) => mapGoogleCalendarEvent(item))
      .filter((event): event is ShowEvent => Boolean(event));

    return mapped;
  }
}
