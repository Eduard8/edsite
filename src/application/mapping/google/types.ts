export type GoogleCalendarDate = {
  date?: string;
  dateTime?: string;
};

export type GoogleCalendarEvent = {
  id?: string;
  summary?: string;
  description?: string;
  location?: string;
  attachments?: Array<{
    fileUrl?: string;
    title?: string;
    mimeType?: string;
  }>;
  htmlLink?: string;
  source?: {
    title?: string;
    url?: string;
  };
  start?: GoogleCalendarDate;
  end?: GoogleCalendarDate;
};