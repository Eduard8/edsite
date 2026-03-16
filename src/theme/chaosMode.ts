import {
  getFallbackColorScheme,
  isColorScheme,
  type ColorScheme,
} from "@/theme/colorSchemes";

const PREFERRED_NORMAL_SCHEME = "Boring";
const PREFERRED_CHAOS_SCHEME = "Obnoxious";

function resolvePreferredColorScheme(preferred: string): ColorScheme {
  if (isColorScheme(preferred)) {
    return preferred;
  }

  return getFallbackColorScheme();
}

export const normalModeColorScheme = resolvePreferredColorScheme(PREFERRED_NORMAL_SCHEME);
export const chaosModeColorScheme = resolvePreferredColorScheme(PREFERRED_CHAOS_SCHEME);

export function isChaosModeColorScheme(colorScheme: ColorScheme): boolean {
  return colorScheme === chaosModeColorScheme;
}
