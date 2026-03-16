export type ShowDateTime = {
  iso: string;
  isAllDay: boolean;
};

export type ShowEvent = {
  id: string;
  title: string;
  start: ShowDateTime;
  end?: ShowDateTime;
  description?: string;
  imageUrl?: string;
  venue?: string;
  mapsUrl?: string;
  ticketUrl?: string;
  calendarUrl?: string;
};

export class EventValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EventValidationError";
  }
}

function isValidDate(value: string): boolean {
  return !Number.isNaN(new Date(value).getTime());
}

function toSafeExternalUrl(raw?: string): string | undefined {
  if (!raw) {
    return undefined;
  }

  try {
    const parsed = new URL(raw);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export function createShowDateTime(iso: string, isAllDay: boolean): ShowDateTime {
  if (!isValidDate(iso)) {
    throw new EventValidationError(`Invalid ISO date value: ${iso}`);
  }

  return {
    iso,
    isAllDay,
  };
}

type CreateShowEventInput = {
  id: string;
  title?: string;
  start: ShowDateTime;
  end?: ShowDateTime;
  description?: string;
  imageUrl?: string;
  venue?: string;
  mapsUrl?: string;
  ticketUrl?: string;
  calendarUrl?: string;
};

export function createShowEvent(input: CreateShowEventInput): ShowEvent {
  const id = input.id.trim();
  if (!id) {
    throw new EventValidationError("Event id is required.");
  }

  const title = input.title?.trim() || "Show";

  return {
    id,
    title,
    start: input.start,
    end: input.end,
    description: input.description,
    imageUrl: toSafeExternalUrl(input.imageUrl),
    venue: input.venue,
    mapsUrl: toSafeExternalUrl(input.mapsUrl),
    ticketUrl: toSafeExternalUrl(input.ticketUrl),
    calendarUrl: toSafeExternalUrl(input.calendarUrl),
  };
}
