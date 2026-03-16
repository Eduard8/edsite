"use client";

import { useColorScheme } from "@/components/providers/ColorSchemeProvider";
import { UiAnimatedContainer, UiButton, UiTextarea } from "@/ui/facade";
import { chaosModeColorScheme, isChaosModeColorScheme } from "@/theme/chaosMode";

export default function Home() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isChaosMode = isChaosModeColorScheme(colorScheme);

  return (
    <main className="page page--home-gate">
      {!isChaosMode && (
        <UiAnimatedContainer className="chaos-gate-shell chaos-gate-off" delay={0.08}>
          <UiButton
            type="button"
            size="lg"
            className="chaos-gate-button"
            aria-label="turn on obnoxious mode"
            onClick={() => setColorScheme(chaosModeColorScheme)}
          >
            Graphic Design is my Passion
          </UiButton>
          <p className="chaos-gate-note">
            Do you want to use the site as the artist intended? (warning: obnoxious and loud)
          </p>
        </UiAnimatedContainer>
      )}

      {isChaosMode && (
        <UiAnimatedContainer className="chaos-gate-shell chaos-gate-on" delay={0.08}>
<UiTextarea>As intended</UiTextarea>
        </UiAnimatedContainer>
      )}
    </main>
  );
}
