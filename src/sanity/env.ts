export type SanityConfig = {
  projectId: string;
  dataset: string;
};

const defaultDataset = "production";

export function getSanityConfig(): SanityConfig | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();

  if (!projectId) {
    return null;
  }

  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || defaultDataset;

  return {
    projectId,
    dataset,
  };
}
