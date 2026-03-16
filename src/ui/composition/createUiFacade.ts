import * as shadcnAdapter from "@/ui/adapters/shadcn";
import * as mantineAdapter from "@/ui/adapters/mantine";
import type { UiFacade } from "@/ui/ports/uiFacade";

type SupportedUiKit = "shadcn" | "mantine";

function resolveUiKit(): SupportedUiKit {
  const configuredUiKit = process.env.NEXT_PUBLIC_UI_KIT;
  if (configuredUiKit === "mantine") {
    return "mantine";
  }

  return "shadcn";
}

export function createUiFacade(): UiFacade {
  const uiKit = resolveUiKit();

  switch (uiKit) {
    case "mantine":
      return mantineAdapter;
    case "shadcn":
    default:
      return shadcnAdapter;
  }
}
