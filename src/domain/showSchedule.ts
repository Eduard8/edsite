import type { ShowDateTime } from "@/domain/event";

export const showTimeZone = "Europe/Amsterdam";

const allDayQueryMarginMs = 36 * 60 * 60 * 1000;

const querySinceBucketMs = 5 * 60 * 1000;

// GROQ cannot subtract from a datetime here. Pass a rounded ISO cutoff so an
// all-day show that started yesterday in UTC is still fetched, without changing
// the cache key on every request.
export function showListQuerySince(now: Date): string {
  const sinceMs =
    Math.floor((now.getTime() - allDayQueryMarginMs) / querySinceBucketMs) * querySinceBucketMs;

  return new Date(sinceMs).toISOString();
}

type ScheduledShow = {
  start: ShowDateTime;
  end?: ShowDateTime;
};

export function showHasNotFinished(show: ScheduledShow, now: Date): boolean {
  const until = show.start.isAllDay
    ? endOfZonedDayExclusive(show.end?.iso ?? show.start.iso, showTimeZone)
    : new Date(show.end?.iso ?? show.start.iso);

  if (Number.isNaN(until.getTime()) || Number.isNaN(now.getTime())) {
    return false;
  }

  if (show.start.isAllDay) {
    return now.getTime() < until.getTime();
  }

  return until.getTime() >= now.getTime();
}

function endOfZonedDayExclusive(iso: string, timeZone: string): Date {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return new Date(Number.NaN);
  }

  const { year, month, day } = zonedCalendarDate(date, timeZone);
  const nextDay = new Date(Date.UTC(year, month - 1, day + 1));

  return zonedDateTimeToUtc(
    nextDay.getUTCFullYear(),
    nextDay.getUTCMonth() + 1,
    nextDay.getUTCDate(),
    timeZone,
  );
}

function zonedCalendarDate(date: Date, timeZone: string): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const value: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      value[part.type] = part.value;
    }
  }

  return {
    year: Number(value.year),
    month: Number(value.month),
    day: Number(value.day),
  };
}

function zonedDateTimeToUtc(year: number, month: number, day: number, timeZone: string): Date {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  const firstOffset = timeZoneOffsetMs(utcGuess, timeZone);
  const utc = new Date(utcGuess.getTime() - firstOffset);
  const secondOffset = timeZoneOffsetMs(utc, timeZone);

  if (firstOffset === secondOffset) {
    return utc;
  }

  return new Date(utcGuess.getTime() - secondOffset);
}

function timeZoneOffsetMs(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);

  const value: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      value[part.type] = part.value;
    }
  }

  const asUtc = Date.UTC(
    Number(value.year),
    Number(value.month) - 1,
    Number(value.day),
    Number(value.hour),
    Number(value.minute),
    Number(value.second),
  );

  return asUtc - date.getTime();
}
