import type { CalendarProvider } from "@/application/ports/calendarProvider";
import { getCalendarConfig } from "@/config/env";
import { GoogleCalendarProvider } from "@/infrastructure/calendar/googleCalendarClient";

export function createCalendarProvider(): CalendarProvider | null {
  const calendarConfig = getCalendarConfig();
  if (!calendarConfig) {
    return null;
  }

  return new GoogleCalendarProvider({
    apiKey: calendarConfig.googleCalendarApiKey,
    calendarId: calendarConfig.googleCalendarId,
    revalidateSeconds: 300,
  });
}