import colorSchemesJson from "@/theme/colorSchemes.json";

export type ColorScheme = keyof typeof colorSchemesJson;
export type ColorSchemeMode = "light" | "dark";
type ColorScale = [string, string, string, string, string];

export type ColorSchemeTokens = {
  background: string;
  foreground: string;
  surface: string;
  border: string;
  muted: string;
  accent: string;
  accentForeground: string;
  link: string;
  fontFamily?: string;
};

type ColorSchemeDefinition = {
  label: string;
  colors: ColorScale;
  fontFamily?: string;
};

const DEFAULT_SCHEME_FONT_FAMILY = "var(--font-geist-sans), Arial, Helvetica, sans-serif";

type ColorSchemesMap = Record<string, ColorSchemeDefinition>;

export const colorSchemes = colorSchemesJson as Record<ColorScheme, ColorSchemeDefinition>;
const colorSchemeKeys = Object.keys(colorSchemes) as ColorScheme[];

export function getFallbackColorScheme(): ColorScheme {
  const firstColorScheme = colorSchemeKeys[0];

  if (!firstColorScheme) {
    throw new Error("At least one color scheme must be defined in colorSchemes.json");
  }

  return firstColorScheme;
}

export const colorSchemeOptions: ReadonlyArray<{ value: ColorScheme; label: string }> = (
  Object.entries(colorSchemes) as Array<[ColorScheme, ColorSchemeDefinition]>
).map(([value, definition]) => ({
  value,
  label: definition.label,
}));

export function isColorScheme(value: string | undefined | null): value is ColorScheme {
  return typeof value === "string" && value in (colorSchemes as ColorSchemesMap);
}

export function getColorSchemeTokens(
  colorScheme: ColorScheme,
  mode: ColorSchemeMode,
): ColorSchemeTokens {
  const resolvedScheme =
    (colorSchemes as ColorSchemesMap)[colorScheme] ?? colorSchemes[getFallbackColorScheme()];

  const scale = resolvedScheme.colors;
  const orderedScale = mode === "dark" ? scale : [...scale].reverse();

  return {
    background: orderedScale[0],
    surface: orderedScale[1],
    border: orderedScale[2],
    muted: orderedScale[2],
    accent: orderedScale[3],
    foreground: orderedScale[4],
    link: orderedScale[3],
    accentForeground: orderedScale[0],
    fontFamily: resolvedScheme.fontFamily,
  };
}

export function getColorSchemeCssVariables(
  colorScheme: ColorScheme,
  mode: ColorSchemeMode,
): Record<string, string> {
  const tokens = getColorSchemeTokens(colorScheme, mode);

  return {
    "--background": tokens.background,
    "--foreground": tokens.foreground,
    "--surface": tokens.surface,
    "--border": tokens.border,
    "--muted": tokens.muted,
    "--accent": tokens.accent,
    "--accent-foreground": tokens.accentForeground,
    "--link": tokens.link,
    "--scheme-font-family": tokens.fontFamily ?? DEFAULT_SCHEME_FONT_FAMILY,
  };
}
