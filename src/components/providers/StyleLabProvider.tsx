"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultChaosBodyFontId,
  defaultChaosTitleFontId,
  getStyleLabFontById,
  styleLabBodyFontOptions,
  styleLabTitleFontOptions,
  type StyleLabFontId,
} from "@/theme/styleLabFonts";

const storageKey = "style-lab-settings";

type StyleLabSettings = {
  chaosBodyFontId: StyleLabFontId;
  chaosTitleFontId: StyleLabFontId;
};

type StyleLabContextValue = StyleLabSettings & {
  setChaosBodyFontId: (value: StyleLabFontId) => void;
  setChaosTitleFontId: (value: StyleLabFontId) => void;
  randomizeChaosFonts: () => void;
};

const StyleLabContext = createContext<StyleLabContextValue | null>(null);

type StyleLabProviderProps = {
  children: ReactNode;
};

function getRandomFontId<T extends { id: StyleLabFontId }>(options: ReadonlyArray<T>): StyleLabFontId {
  const selected = options[Math.floor(Math.random() * options.length)];
  return selected?.id ?? defaultChaosBodyFontId;
}

function resolveInitialSettings(): StyleLabSettings {
  if (typeof window === "undefined") {
    return {
      chaosBodyFontId: defaultChaosBodyFontId,
      chaosTitleFontId: defaultChaosTitleFontId,
    };
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);
    if (!rawValue) {
      return {
        chaosBodyFontId: defaultChaosBodyFontId,
        chaosTitleFontId: defaultChaosTitleFontId,
      };
    }

    const parsed = JSON.parse(rawValue) as Partial<StyleLabSettings>;
    const chaosBodyFontId = getStyleLabFontById(parsed.chaosBodyFontId)?.id ?? defaultChaosBodyFontId;
    const chaosTitleFontId = getStyleLabFontById(parsed.chaosTitleFontId)?.id ?? defaultChaosTitleFontId;

    return {
      chaosBodyFontId,
      chaosTitleFontId,
    };
  } catch {
    return {
      chaosBodyFontId: defaultChaosBodyFontId,
      chaosTitleFontId: defaultChaosTitleFontId,
    };
  }
}

export function StyleLabProvider({ children }: StyleLabProviderProps) {
  const [settings, setSettings] = useState<StyleLabSettings>(() => resolveInitialSettings());

  useEffect(() => {
    const root = document.documentElement;
    const bodyFont = getStyleLabFontById(settings.chaosBodyFontId) ?? getStyleLabFontById(defaultChaosBodyFontId);
    const titleFont = getStyleLabFontById(settings.chaosTitleFontId) ?? getStyleLabFontById(defaultChaosTitleFontId);

    if (bodyFont) {
      root.style.setProperty("--chaos-font-family", bodyFont.variableValue);
    }

    if (titleFont) {
      root.style.setProperty("--chaos-title-font-family", titleFont.variableValue);
    }

    window.localStorage.setItem(storageKey, JSON.stringify(settings));
  }, [settings]);

  const value = useMemo<StyleLabContextValue>(
    () => ({
      ...settings,
      setChaosBodyFontId: (chaosBodyFontId) => {
        setSettings((current) => ({
          ...current,
          chaosBodyFontId,
        }));
      },
      setChaosTitleFontId: (chaosTitleFontId) => {
        setSettings((current) => ({
          ...current,
          chaosTitleFontId,
        }));
      },
      randomizeChaosFonts: () => {
        const chaosBodyFontId = getRandomFontId(styleLabBodyFontOptions);
        let chaosTitleFontId = getRandomFontId(styleLabTitleFontOptions);

        if (chaosTitleFontId === chaosBodyFontId && styleLabTitleFontOptions.length > 1) {
          const fallback = styleLabTitleFontOptions.find((font) => font.id !== chaosBodyFontId);
          chaosTitleFontId = fallback?.id ?? chaosTitleFontId;
        }

        setSettings({
          chaosBodyFontId,
          chaosTitleFontId,
        });
      },
    }),
    [settings],
  );

  return <StyleLabContext.Provider value={value}>{children}</StyleLabContext.Provider>;
}

export function useStyleLab() {
  const context = useContext(StyleLabContext);

  if (!context) {
    throw new Error("useStyleLab must be used within StyleLabProvider");
  }

  return context;
}