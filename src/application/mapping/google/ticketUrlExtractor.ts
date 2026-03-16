export class TicketUrlExtractor {
  extract(description?: string, sourceUrl?: string): string | undefined {
    if (sourceUrl) {
      return sourceUrl;
    }

    if (!description) {
      return undefined;
    }

    const matches = description.match(/https?:\/\/[^\s)]+/gi) ?? [];
    const preferred = matches.find((link) =>
      /(ticket|tickets|eventbrite|luma|dice|showclix|seetickets)/i.test(link),
    );

    return preferred ?? matches[0];
  }
}