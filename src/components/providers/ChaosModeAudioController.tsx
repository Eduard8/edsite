"use client";

import { useEffect, useRef } from "react";
import { useColorScheme } from "@/components/providers/ColorSchemeProvider";
import { isChaosModeColorScheme } from "@/theme/chaosMode";

const CHAOS_AUDIO_SOURCE = "/audio/chaos-mode.mp3";

export function ChaosModeAudioController() {
  const { colorScheme } = useColorScheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasUserInteractedRef = useRef(false);
  const hasWarnedRef = useRef(false);

  useEffect(() => {
    const markInteraction = () => {
      hasUserInteractedRef.current = true;
    };

    window.addEventListener("pointerdown", markInteraction, { passive: true });
    window.addEventListener("keydown", markInteraction);

    return () => {
      window.removeEventListener("pointerdown", markInteraction);
      window.removeEventListener("keydown", markInteraction);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(CHAOS_AUDIO_SOURCE);
      audio.preload = "auto";
      audio.loop = false;
      audio.volume = 0.7;
      audioRef.current = audio;
    }

    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isChaosModeColorScheme(colorScheme)) {
      if (!hasUserInteractedRef.current) {
        return;
      }

      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch(() => {
          if (!hasWarnedRef.current) {
            hasWarnedRef.current = true;
            console.warn(
              "Chaos mode audio could not start. Ensure public/audio/chaos-mode.mp3 exists and playback is allowed.",
            );
          }
        });
      }

      return;
    }

    audio.pause();
    audio.currentTime = 0;
  }, [colorScheme]);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return null;
}
