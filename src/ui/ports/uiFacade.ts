import type { UiAnimatedContainer } from "@/ui/adapters/shadcn/primitives/UiAnimatedContainer";
import type { UiButton } from "@/ui/adapters/shadcn/primitives/UiButton";
import type {
  UiCard,
  UiCardDescription,
  UiCardTitle,
} from "@/ui/adapters/shadcn/primitives/UiCard";
import type { UiInput } from "@/ui/adapters/shadcn/primitives/UiInput";
import type { UiNavLink } from "@/ui/adapters/shadcn/primitives/UiNavLink";
import type { UiSelect } from "@/ui/adapters/shadcn/primitives/UiSelect";
import type { UiTextarea } from "@/ui/adapters/shadcn/primitives/UiTextarea";

export type UiFacade = {
  UiAnimatedContainer: typeof UiAnimatedContainer;
  UiButton: typeof UiButton;
  UiCard: typeof UiCard;
  UiCardDescription: typeof UiCardDescription;
  UiCardTitle: typeof UiCardTitle;
  UiInput: typeof UiInput;
  UiNavLink: typeof UiNavLink;
  UiSelect: typeof UiSelect;
  UiTextarea: typeof UiTextarea;
};
