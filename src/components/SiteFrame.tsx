"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { ChaosModeAudioController } from "@/components/providers/ChaosModeAudioController";
import { ColorSchemeProvider } from "@/components/providers/ColorSchemeProvider";
import { StyleLabProvider } from "@/components/providers/StyleLabProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import type { ColorScheme } from "@/theme/colorSchemes";

type SiteFrameProps = {
  children: ReactNode;
  defaultColorScheme: ColorScheme;
};

function isStudioPath(pathname: string): boolean {
  return pathname === "/studio" || pathname.startsWith("/studio/");
}

export function SiteFrame({ children, defaultColorScheme }: SiteFrameProps) {
  const pathname = usePathname();

  if (isStudioPath(pathname)) {
    return children;
  }

  return (
    <ThemeProvider>
      <ColorSchemeProvider defaultColorScheme={defaultColorScheme}>
        <StyleLabProvider>
          <ChaosModeAudioController />
          <div className="mx-auto min-h-screen w-full max-w-5xl px-6 py-8">
            <TopBar />
            {children}
          </div>
        </StyleLabProvider>
      </ColorSchemeProvider>
    </ThemeProvider>
  );
}
