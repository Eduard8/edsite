import {
  getFallbackColorScheme,
  isColorScheme,
  type ColorScheme,
} from "@/theme/colorSchemes";
import { isChaosModeColorScheme, normalModeColorScheme } from "@/theme/chaosMode";

type CalendarConfig = {
  googleCalendarApiKey: string;
  googleCalendarId: string;
};

export function getCalendarConfig(): CalendarConfig | null {
  const googleCalendarApiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const googleCalendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!googleCalendarApiKey || !googleCalendarId) {
    return null;
  }

  return {
    googleCalendarApiKey,
    googleCalendarId,
  };
}

export function getContactFormAction(): string | null {
  return process.env.NEXT_PUBLIC_CONTACT_FORM_ACTION ?? null;
}

export function getRemoteVideosJsonUrl(): string | null {
  return process.env.REMOTE_VIDEOS_JSON_URL ?? null;
}

export function getDefaultColorScheme(): ColorScheme {
  const configuredColorScheme = process.env.COLOR_SCHEME;

  if (isColorScheme(configuredColorScheme)) {
    return isChaosModeColorScheme(configuredColorScheme)
      ? normalModeColorScheme
      : configuredColorScheme;
  }

  return getFallbackColorScheme();
}
