"use client";

import { useColorScheme } from "@/components/providers/ColorSchemeProvider";
import { UiAnimatedContainer, UiButton, UiTextarea } from "@/ui/facade";
import { chaosModeColorScheme, isChaosModeColorScheme } from "@/theme/chaosMode";

export default function Home() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isChaosMode = isChaosModeColorScheme(colorScheme);

  return (
    <main className="page page--home-gate">
      <div className="home-title-wrap">
        <UiAnimatedContainer>
          <section className="calendar-shell home-title-shell">
            <h1 className="page-title">EdSite</h1>
            <p className="text-muted-sm scrolling-subheader">A Website for Ed</p>
          </section>
        </UiAnimatedContainer>
      </div>

      {!isChaosMode && (
        <UiAnimatedContainer className="chaos-gate-shell chaos-gate-off" delay={0.08}>
          <UiButton
            type="button"
            size="lg"
            className="chaos-gate-button"
            aria-label="turn on obnoxious mode"
            onClick={() => setColorScheme(chaosModeColorScheme)}
          >
            View as the "artist" intend-ed
          </UiButton>
          <p className="chaos-gate-note">
            (warning: obnoxious and loud)
          </p>
        </UiAnimatedContainer>
      )}

      {isChaosMode && (
        <UiAnimatedContainer className="chaos-gate-shell chaos-gate-on" delay={0.08}>
          <UiButton
            type="button"
            size="lg"
            className="chaos-gate-button"
            aria-label="turn off obnoxious mode"
            onClick={() => setColorScheme("Boring")}
          >
            Make it stop
          </UiButton>
        </UiAnimatedContainer>
      )}
    </main>
  );
}
