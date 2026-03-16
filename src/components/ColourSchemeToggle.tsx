"use client";

import { useColorScheme } from "@/components/providers/ColorSchemeProvider";
import { colorSchemeOptions, isColorScheme } from "@/theme/colorSchemes";
import { UiSelect } from "@/ui/facade";

export function ColourSchemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <label className="text-muted-sm flex items-center gap-2" htmlFor="colour-scheme-select">
      Colour
      <UiSelect
        id="colour-scheme-select"
        value={colorScheme}
        onChange={(event) => {
          if (isColorScheme(event.target.value)) {
            setColorScheme(event.target.value);
          }
        }}
        className="h-8 w-auto py-1"
        options={colorSchemeOptions.map((option) => ({
          value: option.value,
          label: option.label,
        }))}
      />
    </label>
  );
}