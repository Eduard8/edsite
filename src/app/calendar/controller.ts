import { getUpcomingShows } from "@/application/getUpcomingShows";
import type { ShowEvent } from "@/domain/event";
import {
  CalendarAuthError,
  CalendarParseError,
  CalendarRequestError,
} from "@/infrastructure/calendar/errors";
import { createCalendarProvider } from "@/infrastructure/composition/createCalendarProvider";

export type CalendarPageViewModel = {
  events: ShowEvent[];
  errorMessage: string | null;
  setupMessage: string | null;
};

function toCalendarErrorMessage(error: unknown): string {
  if (error instanceof CalendarAuthError) {
    return "Calendar credentials are invalid or missing access to this calendar.";
  }

  if (error instanceof CalendarRequestError) {
    return error.message;
  }

  if (error instanceof CalendarParseError) {
    return "Calendar response format changed. Please try again later.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Failed to load events.";
}

export async function getCalendarPageViewModel(): Promise<CalendarPageViewModel> {
  const provider = createCalendarProvider();

  if (!provider) {
    return {
      events: [],
      errorMessage: null,
      setupMessage: "Set GOOGLE_CALENDAR_API_KEY and GOOGLE_CALENDAR_ID to display events.",
    };
  }

  try {
    const events = await getUpcomingShows(provider, 20);
    return {
      events,
      errorMessage: null,
      setupMessage: null,
    };
  } catch (error) {
    return {
      events: [],
      errorMessage: toCalendarErrorMessage(error),
      setupMessage: null,
    };
  }
}