import type { ShowEvent } from "@/domain/event";

function formatShowDate(iso: string, isAllDay: boolean): string {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "Date TBD";
  }

  if (isAllDay) {
    return new Intl.DateTimeFormat("nl-NL", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export type EventCardViewModel = {
  id: string;
  title: string;
  imageUrl?: string;
  imageAlt: string;
  subtitle: string;
  description?: string;
  mapsUrl?: string;
  venue?: string;
  venueLabel: string;
  ticketUrl?: string;
};

export function presentEventCard(event: ShowEvent): EventCardViewModel {
  return {
    id: event.id,
    title: event.title,
    imageUrl: event.imageUrl,
    imageAlt: `Poster for ${event.title}`,
    subtitle: formatShowDate(event.start.iso, event.start.isAllDay),
    description: event.description,
    mapsUrl: event.mapsUrl,
    venue: event.venue,
    venueLabel: event.venue ?? "Map",
    ticketUrl: event.ticketUrl,
  };
}