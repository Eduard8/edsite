"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import flashbangIcon from "@/components/icons/flashbang.png";
import { UiButton } from "@/ui/facade";

const EMPTY_SUBSCRIBE = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isMounted = useSyncExternalStore(EMPTY_SUBSCRIBE, getClientSnapshot, getServerSnapshot);
  const isDarkMode = isMounted && resolvedTheme === "dark";
  const [isSwitchingTheme, setIsSwitchingTheme] = useState(false);
  const switchTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (switchTimerRef.current !== null) {
        window.clearTimeout(switchTimerRef.current);
      }
    };
  }, []);

  const handleToggleTheme = () => {
    const root = document.documentElement;
    if (switchTimerRef.current !== null) {
      window.clearTimeout(switchTimerRef.current);
    }

    setIsSwitchingTheme(true);
    root.classList.add("theme-switching");
    switchTimerRef.current = window.setTimeout(() => {
      root.classList.remove("theme-switching");
      setIsSwitchingTheme(false);
      switchTimerRef.current = null;
    }, 1600);

    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <UiButton
      type="button"
      variant="secondary"
      size="icon"
      className={`h-8 w-8 ${isSwitchingTheme ? "theme-toggle-button--switching" : ""}`}
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={handleToggleTheme}
    >
      {isDarkMode ? (
        <Image
          src="/icons/owl.svg"
          alt=""
          aria-hidden="true"
          width={16}
          height={16}
          className="h-4 w-4 object-contain [filter:brightness(0)_invert(1)]"
          unoptimized
        />
      ) : (
        <Image
          src={flashbangIcon}
          alt=""
          aria-hidden="true"
          width={16}
          height={16}
          className="h-4 w-4 object-contain"
        />
      )}
    </UiButton>
  );
}