export class VideoProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VideoProviderError";
  }
}

export class VideoRequestError extends VideoProviderError {
  readonly statusCode: number;

  constructor(statusCode: number) {
    super(`Videos request failed with status ${statusCode}`);
    this.name = "VideoRequestError";
    this.statusCode = statusCode;
  }
}

export class VideoParseError extends VideoProviderError {
  constructor(message = "Videos response could not be parsed.") {
    super(message);
    this.name = "VideoParseError";
  }
}