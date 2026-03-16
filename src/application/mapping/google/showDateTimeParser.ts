import { createShowDateTime, EventValidationError, type ShowDateTime } from "@/domain/event";
import type { GoogleCalendarDate } from "@/application/mapping/google/types";

export class ShowDateTimeParser {
  parse(value?: GoogleCalendarDate): ShowDateTime | undefined {
    if (!value?.date && !value?.dateTime) {
      return undefined;
    }

    try {
      if (value.dateTime) {
        return createShowDateTime(value.dateTime, false);
      }

      return createShowDateTime(`${value.date}T00:00:00.000Z`, true);
    } catch (error) {
      if (error instanceof EventValidationError) {
        return undefined;
      }

      throw error;
    }
  }
}