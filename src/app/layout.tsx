import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getDefaultColorScheme } from "@/config/env";
import { ChaosModeAudioController } from "@/components/providers/ChaosModeAudioController";
import { ColorSchemeProvider } from "@/components/providers/ColorSchemeProvider";
import { StyleLabProvider } from "@/components/providers/StyleLabProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { TopBar } from "@/components/TopBar";
import { isChaosModeColorScheme } from "@/theme/chaosMode";
import { getColorSchemeCssVariables } from "@/theme/colorSchemes";
import { styleLabFontsVariableClassName } from "@/theme/styleLabFontVariables";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Comedy Shows",
  description: "Live comedy show dates and booking contact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultColorScheme = getDefaultColorScheme();
  const isInitialChaosMode = isChaosModeColorScheme(defaultColorScheme);
  const defaultColorSchemeStyle = {
    ...getColorSchemeCssVariables(defaultColorScheme, "light"),
  } as CSSProperties;

  return (
    <html
      lang="en"
      className={styleLabFontsVariableClassName}
      data-color-scheme={defaultColorScheme}
      data-chaos-mode={isInitialChaosMode ? "on" : "off"}
      data-chaos-nav-anim="off"
      style={defaultColorSchemeStyle}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
