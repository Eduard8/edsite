import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { getSanityConfig } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

const sanityConfig = getSanityConfig();

export default defineConfig({
  name: "default",
  title: "EdSite shows",
  basePath: "/studio",
  projectId: sanityConfig?.projectId ?? "unconfigured",
  dataset: sanityConfig?.dataset ?? "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
