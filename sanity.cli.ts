import { defineCliConfig } from "sanity/cli";
import { getSanityConfig } from "@/sanity/env";

const sanityConfig = getSanityConfig();

export default defineCliConfig({
  api: {
    projectId: sanityConfig?.projectId ?? "unconfigured",
    dataset: sanityConfig?.dataset ?? "production",
  },
});
