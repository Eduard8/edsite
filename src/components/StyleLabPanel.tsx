"use client";

import { useState } from "react";
import { useColorScheme } from "@/components/providers/ColorSchemeProvider";
import { useStyleLab } from "@/components/providers/StyleLabProvider";
import { colorSchemeOptions } from "@/theme/colorSchemes";
import { chaosModeColorScheme, isChaosModeColorScheme } from "@/theme/chaosMode";
import {
  styleLabBodyFontOptions,
  styleLabTitleFontOptions,
  type StyleLabFontId,
} from "@/theme/styleLabFonts";
import { UiButton, UiSelect } from "@/ui/facade";

export function StyleLabPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { colorScheme, setColorScheme } = useColorScheme();
  const {
    chaosBodyFontId,
    chaosTitleFontId,
    setChaosBodyFontId,
    setChaosTitleFontId,
    randomizeChaosFonts,
  } = useStyleLab();
  const isChaosMode = isChaosModeColorScheme(colorScheme);

  return (
    <div className="style-lab">
      <UiButton
        type="button"
        size="sm"
        variant="secondary"
        className="style-lab-toggle"
        aria-expanded={isOpen}
        aria-controls="style-lab-panel"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? "Hide Style Lab" : "Style Lab"}
      </UiButton>

      {isOpen ? (
        <div id="style-lab-panel" className="style-lab-panel">
          <div className="style-lab-copy stack-sm">
            <p className="style-lab-title">Style Lab</p>
            <p className="text-muted-sm">
              Try colours plus chaos fonts from one shared catalog. Later cleanup only needs one file.
            </p>
          </div>

          <div className="style-lab-grid">
            <label className="style-lab-field" htmlFor="style-lab-colour-scheme">
              <span className="style-lab-label">Colour scheme</span>
              <UiSelect
                id="style-lab-colour-scheme"
                value={colorScheme}
                className="style-lab-select"
                onChange={(event) => setColorScheme(event.target.value as typeof colorScheme)}
                options={colorSchemeOptions.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
              />
            </label>

            <label className="style-lab-field" htmlFor="style-lab-chaos-body-font">
              <span className="style-lab-label">Chaos body font</span>
              <UiSelect
                id="style-lab-chaos-body-font"
                value={chaosBodyFontId}
                className="style-lab-select"
                onChange={(event) => setChaosBodyFontId(event.target.value as StyleLabFontId)}
                options={styleLabBodyFontOptions.map((font) => ({
                  value: font.id,
                  label: font.label,
                }))}
              />
            </label>

            <label className="style-lab-field" htmlFor="style-lab-chaos-title-font">
              <span className="style-lab-label">Chaos title font</span>
              <UiSelect
                id="style-lab-chaos-title-font"
                value={chaosTitleFontId}
                className="style-lab-select"
                onChange={(event) => setChaosTitleFontId(event.target.value as StyleLabFontId)}
                options={styleLabTitleFontOptions.map((font) => ({
                  value: font.id,
                  label: font.label,
                }))}
              />
            </label>
          </div>

          <div className="style-lab-actions">
            <UiButton
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => randomizeChaosFonts()}
            >
              Surprise me
            </UiButton>
            {!isChaosMode ? (
              <UiButton
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => setColorScheme(chaosModeColorScheme)}
              >
                Enter chaos mode
              </UiButton>
            ) : null}
          </div>

          <p className="style-lab-footnote">
            Fonts only affect the chaos experience. The catalog lives in one place so pruning later stays easy.
          </p>
        </div>
      ) : null}
    </div>
  );
}