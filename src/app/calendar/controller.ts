import { getUpcomingShows } from "@/application/getUpcomingShows";
import type { ShowEvent } from "@/domain/event";
import {
  ShowsAuthError,
  ShowsParseError,
  ShowsRequestError,
} from "@/infrastructure/shows/errors";
import { createCalendarProvider } from "@/infrastructure/composition/createCalendarProvider";

export type CalendarPageViewModel = {
  events: ShowEvent[];
  errorMessage: string | null;
  setupMessage: string | null;
};

function toCalendarErrorMessage(error: unknown): string {
  if (error instanceof ShowsAuthError) {
    return "Sanity credentials are invalid or this project is not publicly readable.";
  }

  if (error instanceof ShowsRequestError) {
    return error.message;
  }

  if (error instanceof ShowsParseError) {
    return "Sanity response format changed. Please try again later.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Failed to load events.";
}

export async function getCalendarPageViewModel(): Promise<CalendarPageViewModel> {
  try {
    const provider = createCalendarProvider();

    if (!provider) {
      return {
        events: [],
        errorMessage: null,
        setupMessage:
          "Set NEXT_PUBLIC_SANITY_PROJECT_ID to display shows. NEXT_PUBLIC_SANITY_DATASET defaults to production.",
      };
    }

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