import { createShowEvent, type ShowEvent } from "@/domain/event";
import { ImageUrlResolver } from "@/application/mapping/google/imageUrlResolver";
import { ShowDateTimeParser } from "@/application/mapping/google/showDateTimeParser";
import { TicketUrlExtractor } from "@/application/mapping/google/ticketUrlExtractor";
import type { GoogleCalendarEvent } from "@/application/mapping/google/types";

function getMapsUrl(location?: string): string | undefined {
  if (!location) {
    return undefined;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

export class GoogleCalendarEventMapper {
  private readonly dateTimeParser: ShowDateTimeParser;
  private readonly ticketUrlExtractor: TicketUrlExtractor;
  private readonly imageUrlResolver: ImageUrlResolver;

  constructor(
    dateTimeParser = new ShowDateTimeParser(),
    ticketUrlExtractor = new TicketUrlExtractor(),
    imageUrlResolver = new ImageUrlResolver(),
  ) {
    this.dateTimeParser = dateTimeParser;
    this.ticketUrlExtractor = ticketUrlExtractor;
    this.imageUrlResolver = imageUrlResolver;
  }

  map(event: GoogleCalendarEvent): ShowEvent | null {
    const start = this.dateTimeParser.parse(event.start);

    if (!event.id || !start) {
      return null;
    }

    return createShowEvent({
      id: event.id,
      title: event.summary,
      start,
      end: this.dateTimeParser.parse(event.end),
      description: event.description,
      imageUrl: this.imageUrlResolver.resolve(event.attachments, event.description),
      venue: event.location,
      mapsUrl: getMapsUrl(event.location),
      ticketUrl: this.ticketUrlExtractor.extract(event.description, event.source?.url),
      calendarUrl: event.htmlLink,
    });
  }
}