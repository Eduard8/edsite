import {
  getFallbackColorScheme,
  isColorScheme,
  type ColorScheme,
} from "@/theme/colorSchemes";
import { isChaosModeColorScheme, normalModeColorScheme } from "@/theme/chaosMode";

export function getContactFormAction(): string | null {
  return process.env.NEXT_PUBLIC_CONTACT_FORM_ACTION ?? null;
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
