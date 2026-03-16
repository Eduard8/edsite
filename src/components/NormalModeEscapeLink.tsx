"use client";

import { useColorScheme } from "@/components/providers/ColorSchemeProvider";
import { UiButton } from "@/ui/facade";
import {
  isChaosModeColorScheme,
  normalModeColorScheme,
} from "@/theme/chaosMode";

export function NormalModeEscapeLink() {
  const { colorScheme, setColorScheme } = useColorScheme();

  if (!isChaosModeColorScheme(colorScheme)) {
    return null;
  }

  return (
    <UiButton
      type="button"
      variant="ghost"
      size="sm"
      className="normal-mode-link"
      onClick={() => setColorScheme(normalModeColorScheme)}
    >
      Normal mode
    </UiButton>
  );
}
