"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export function EmbeddedStudio() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <NextStudio config={config} />
    </div>
  );
}
