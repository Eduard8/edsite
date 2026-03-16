"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  getColorSchemeCssVariables,
  isColorScheme,
  type ColorScheme,
  type ColorSchemeMode,
} from "@/theme/colorSchemes";
import { isChaosModeColorScheme, normalModeColorScheme } from "@/theme/chaosMode";

const storageKey = "color-scheme";
const chaosBurstDurationMs = 1000;
const chaosNavigationAnimationDurationMs = 1000;

type ColorSchemeContextValue = {
  colorScheme: ColorScheme;
  setColorScheme: (value: ColorScheme) => void;
};

const ColorSchemeContext = createContext<ColorSchemeContextValue | null>(null);

type ColorSchemeProviderProps = {
  children: ReactNode;
  defaultColorScheme: ColorScheme;
};

function resolveInitialColorScheme(defaultColorScheme: ColorScheme): ColorScheme {
  const safeDefaultColorScheme = isChaosModeColorScheme(defaultColorScheme)
    ? normalModeColorScheme
    : defaultColorScheme;

  if (typeof window === "undefined") {
    return safeDefaultColorScheme;
  }

  const stored = window.localStorage.getItem(storageKey);
  if (isColorScheme(stored) && !isChaosModeColorScheme(stored)) {
    return stored;
  }

  return safeDefaultColorScheme;
}

function toColorSchemeMode(resolvedTheme?: string): ColorSchemeMode {
  return resolvedTheme === "dark" ? "dark" : "light";
}

export function ColorSchemeProvider({
  children,
  defaultColorScheme,
}: ColorSchemeProviderProps) {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const wasChaosModeRef = useRef(false);
  const chaosBurstTimerRef = useRef<number | null>(null);
  const previousPathnameRef = useRef<string | null>(null);
  const chaosNavigationTimerRef = useRef<number | null>(null);

  const [colorScheme, setColorScheme] = useState<ColorScheme>(() =>
    resolveInitialColorScheme(defaultColorScheme),
  );

  useEffect(() => {
    const root = document.documentElement;
    const mode = toColorSchemeMode(resolvedTheme);
    const cssVariables = getColorSchemeCssVariables(colorScheme, mode);
    const isChaosMode = isChaosModeColorScheme(colorScheme);

    root.setAttribute("data-color-scheme", colorScheme);
    root.setAttribute("data-chaos-mode", isChaosMode ? "on" : "off");
    root.style.setProperty("color-scheme", mode);

    Object.entries(cssVariables).forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });

    window.localStorage.setItem(storageKey, colorScheme);
  }, [colorScheme, resolvedTheme]);

  useEffect(() => {
    const root = document.documentElement;
    const isChaosMode = isChaosModeColorScheme(colorScheme);

    if (isChaosMode && !wasChaosModeRef.current) {
      root.setAttribute("data-chaos-burst", "on");

      if (chaosBurstTimerRef.current !== null) {
        window.clearTimeout(chaosBurstTimerRef.current);
      }

      chaosBurstTimerRef.current = window.setTimeout(() => {
        root.setAttribute("data-chaos-burst", "off");
        chaosBurstTimerRef.current = null;
      }, chaosBurstDurationMs);
    }

    if (!isChaosMode) {
      root.setAttribute("data-chaos-burst", "off");

      if (chaosBurstTimerRef.current !== null) {
        window.clearTimeout(chaosBurstTimerRef.current);
        chaosBurstTimerRef.current = null;
      }
    }

    wasChaosModeRef.current = isChaosMode;
  }, [colorScheme]);

  useEffect(() => {
    const root = document.documentElement;
    const isChaosMode = isChaosModeColorScheme(colorScheme);
    const previousPathname = previousPathnameRef.current;

    if (!isChaosMode) {
      root.setAttribute("data-chaos-nav-anim", "off");

      if (chaosNavigationTimerRef.current !== null) {
        window.clearTimeout(chaosNavigationTimerRef.current);
        chaosNavigationTimerRef.current = null;
      }

      previousPathnameRef.current = pathname;
      return;
    }

    if (previousPathname !== null && previousPathname !== pathname) {
      root.setAttribute("data-chaos-nav-anim", "on");

      if (chaosNavigationTimerRef.current !== null) {
        window.clearTimeout(chaosNavigationTimerRef.current);
      }

      chaosNavigationTimerRef.current = window.setTimeout(() => {
        root.setAttribute("data-chaos-nav-anim", "off");
        chaosNavigationTimerRef.current = null;
      }, chaosNavigationAnimationDurationMs);
    }

    previousPathnameRef.current = pathname;
  }, [colorScheme, pathname]);

  useEffect(() => {
    return () => {
      if (chaosBurstTimerRef.current !== null) {
        window.clearTimeout(chaosBurstTimerRef.current);
      }

      if (chaosNavigationTimerRef.current !== null) {
        window.clearTimeout(chaosNavigationTimerRef.current);
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      colorScheme,
      setColorScheme,
    }),
    [colorScheme],
  );

  return <ColorSchemeContext.Provider value={value}>{children}</ColorSchemeContext.Provider>;
}

export function useColorScheme() {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error("useColorScheme must be used within ColorSchemeProvider");
  }

  return context;
}
