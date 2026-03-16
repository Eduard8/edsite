export class CalendarProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CalendarProviderError";
  }
}

export class CalendarRequestError extends CalendarProviderError {
  readonly statusCode: number;

  constructor(statusCode: number) {
    super(`Calendar request failed with status ${statusCode}`);
    this.name = "CalendarRequestError";
    this.statusCode = statusCode;
  }
}

export class CalendarAuthError extends CalendarProviderError {
  constructor(statusCode: number) {
    super(`Calendar authentication failed with status ${statusCode}`);
    this.name = "CalendarAuthError";
  }
}

export class CalendarParseError extends CalendarProviderError {
  constructor() {
    super("Calendar response could not be parsed.");
    this.name = "CalendarParseError";
  }
}