export class ShowsProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShowsProviderError";
  }
}

export class ShowsRequestError extends ShowsProviderError {
  readonly statusCode: number;

  constructor(statusCode: number) {
    super(`Shows request failed with status ${statusCode}`);
    this.name = "ShowsRequestError";
    this.statusCode = statusCode;
  }
}

export class ShowsAuthError extends ShowsProviderError {
  constructor(statusCode: number) {
    super(`Sanity rejected the shows request with status ${statusCode}`);
    this.name = "ShowsAuthError";
  }
}

export class ShowsParseError extends ShowsProviderError {
  constructor() {
    super("Sanity response could not be parsed.");
    this.name = "ShowsParseError";
  }
}
