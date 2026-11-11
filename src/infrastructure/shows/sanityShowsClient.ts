import imageUrlBuilder from "@sanity/image-url";
import { ClientError, ServerError } from "@sanity/client";
import { createClient } from "next-sanity";
import type { CalendarProvider } from "@/application/ports/calendarProvider";
import { createShowDateTime, createShowEvent, type ShowEvent } from "@/domain/event";
import { showHasNotFinished, showListQuerySince } from "@/domain/showSchedule";
import { ShowsAuthError, ShowsParseError, ShowsRequestError } from "@/infrastructure/shows/errors";

const upcomingShowsQuery = `*[
  _type == "show" &&
  defined(start) &&
  coalesce(end, start) >= $since
] | order(start asc) {
  _id,
  title,
  start,
  end,
  allDay,
  description,
  poster,
  venue,
  mapsUrl,
  ticketUrl
}`;

type SanityImage = {
  asset?: {
    _ref?: string;
  };
  crop?: {
    _type?: string;
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    _type?: string;
    height: number;
    width: number;
    x: number;
    y: number;
  };
};

type SanityShowDocument = {
  _id?: string;
  title?: string;
  start?: string;
  end?: string;
  allDay?: boolean;
  description?: string;
  poster?: SanityImage | null;
  venue?: string;
  mapsUrl?: string;
  ticketUrl?: string;
};

type SanityShowsProviderArgs = {
  projectId: string;
  dataset: string;
  revalidateSeconds?: number;
};

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function resolveMapsUrl(mapsUrl?: string, venue?: string): string | undefined {
  const explicit = mapsUrl?.trim();
  if (explicit && isHttpUrl(explicit)) {
    return explicit;
  }

  const place = venue?.trim();
  if (!place) {
    return undefined;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
}

function optionalText(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function statusCodeOf(error: unknown): number | null {
  if (error instanceof ClientError || error instanceof ServerError) {
    return typeof error.statusCode === "number" ? error.statusCode : null;
  }

  return null;
}

export class SanityShowsProvider implements CalendarProvider {
  private readonly revalidateSeconds: number;
  private readonly client: ReturnType<typeof createClient>;
  private readonly images: ReturnType<typeof imageUrlBuilder>;

  constructor({ projectId, dataset, revalidateSeconds = 300 }: SanityShowsProviderArgs) {
    this.revalidateSeconds = revalidateSeconds;
    this.client = createClient({
      projectId,
      dataset,
      apiVersion: "2026-11-07",
      useCdn: true,
      perspective: "published",
    });
    this.images = imageUrlBuilder({ projectId, dataset });
  }

  async getUpcomingEvents(maxResults = 20): Promise<ShowEvent[]> {
    const now = new Date();
    let documents: unknown;

    try {
      documents = await this.client.fetch(
        upcomingShowsQuery,
        { since: showListQuerySince(now) },
        {
          perspective: "published",
          next: { revalidate: this.revalidateSeconds },
        },
      );
    } catch (error) {
      const statusCode = statusCodeOf(error);
      if (statusCode === 401 || statusCode === 403) {
        throw new ShowsAuthError(statusCode);
      }

      if (statusCode !== null) {
        throw new ShowsRequestError(statusCode);
      }

      throw error;
    }

    if (!Array.isArray(documents)) {
      throw new ShowsParseError();
    }

    return documents
      .flatMap((document) => {
        const event = this.toShowEvent(document);
        return event ? [event] : [];
      })
      .filter((event) => showHasNotFinished(event, now))
      .slice(0, maxResults);
  }

  private toShowEvent(document: unknown): ShowEvent | null {
    if (!document || typeof document !== "object") {
      return null;
    }

    const show = document as SanityShowDocument;
    const id = show._id?.trim();
    if (!id || !show.start) {
      return null;
    }

    let start;
    try {
      start = createShowDateTime(show.start, Boolean(show.allDay));
    } catch {
      return null;
    }

    let end;
    if (show.end) {
      try {
        end = createShowDateTime(show.end, Boolean(show.allDay));
      } catch {
        end = undefined;
      }
    }

    const venue = optionalText(show.venue);

    try {
      return createShowEvent({
        id,
        title: optionalText(show.title),
        start,
        end,
        description: optionalText(show.description),
        imageUrl: this.posterUrl(show.poster),
        venue,
        mapsUrl: resolveMapsUrl(show.mapsUrl, venue),
        ticketUrl: optionalText(show.ticketUrl),
      });
    } catch {
      return null;
    }
  }

  private posterUrl(poster?: SanityImage | null): string | undefined {
    const ref = poster?.asset?._ref;
    if (!poster || !ref) {
      return undefined;
    }

    try {
      return this.images
        .image({
          asset: { _ref: ref },
          crop: poster.crop,
          hotspot: poster.hotspot,
        })
        .width(1200)
        .auto("format")
        .url();
    } catch {
      return undefined;
    }
  }
}
