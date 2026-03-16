import type { ShowEvent } from "@/domain/event";
import {
  GoogleCalendarEventMapper,
} from "@/application/mapping/google/googleCalendarEventMapper";
import type { GoogleCalendarEvent } from "@/application/mapping/google/types";

const mapper = new GoogleCalendarEventMapper();

export function mapGoogleCalendarEvent(event: GoogleCalendarEvent): ShowEvent | null {
  return mapper.map(event);
}
