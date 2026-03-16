export type StyleLabFontRole = "body" | "title";

export type StyleLabFontId =
  | "cherry-cream-soda"
  | "rubik-maps"
  | "bitcount-prop-double-ink"
  | "chewy"
  | "special-elite"
  | "freckle-face"
  | "bangers"
  | "creepster"
  | "moirai-one"
  | "matemasie"
  | "fleur-de-leah";

export type StyleLabFontOption = {
  id: StyleLabFontId;
  label: string;
  variableValue: string;
  roles: ReadonlyArray<StyleLabFontRole>;
};

export const styleLabFontOptions: ReadonlyArray<StyleLabFontOption> = [
  {
    id: "cherry-cream-soda",
    label: "Cherry Cream Soda",
    variableValue: 'var(--font-style-lab-cherry-cream-soda), "Trebuchet MS", cursive',
    roles: ["body", "title"],
  },
  {
    id: "rubik-maps",
    label: "Rubik Maps",
    variableValue: 'var(--font-style-lab-rubik-maps), "Impact", fantasy',
    roles: ["title"],
  },
  {
    id: "bitcount-prop-double-ink",
    label: "Bitcount Prop Double Ink",
    variableValue: 'var(--font-style-lab-bitcount-prop-double-ink), "Courier New", monospace',
    roles: ["body", "title"],
  },
  {
    id: "chewy",
    label: "Chewy",
    variableValue: 'var(--font-style-lab-chewy), "Trebuchet MS", cursive',
    roles: ["body", "title"],
  },
  {
    id: "special-elite",
    label: "Special Elite",
    variableValue: 'var(--font-style-lab-special-elite), "Courier New", monospace',
    roles: ["body", "title"],
  },
  {
    id: "freckle-face",
    label: "Freckle Face",
    variableValue: 'var(--font-style-lab-freckle-face), "Trebuchet MS", cursive',
    roles: ["body", "title"],
  },
  {
    id: "bangers",
    label: "Bangers",
    variableValue: 'var(--font-style-lab-bangers), "Arial Black", fantasy',
    roles: ["title"],
  },
  {
    id: "creepster",
    label: "Creepster",
    variableValue: 'var(--font-style-lab-creepster), "Brush Script MT", cursive',
    roles: ["title"],
  },
  {
    id: "moirai-one",
    label: "Moirai One",
    variableValue: 'var(--font-style-lab-moirai-one), "Times New Roman", serif',
    roles: ["title"],
  },
  {
    id: "matemasie",
    label: "Matemasie",
    variableValue: 'var(--font-style-lab-matemasie), "Trebuchet MS", cursive',
    roles: ["title"],
  },
  {
    id: "fleur-de-leah",
    label: "Fleur De Leah",
    variableValue: 'var(--font-style-lab-fleur-de-leah), "Brush Script MT", cursive',
    roles: ["title"],
  },
] as const;

export const defaultChaosBodyFontId: StyleLabFontId = "cherry-cream-soda";
export const defaultChaosTitleFontId: StyleLabFontId = "chewy";

export const styleLabBodyFontOptions = styleLabFontOptions.filter((font) =>
  font.roles.includes("body"),
);

export const styleLabTitleFontOptions = styleLabFontOptions.filter((font) =>
  font.roles.includes("title"),
);

export function getStyleLabFontById(id: string | null | undefined): StyleLabFontOption | null {
  return styleLabFontOptions.find((font) => font.id === id) ?? null;
}