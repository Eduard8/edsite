import {
  Bangers,
  Bitcount_Prop_Double_Ink,
  Cherry_Cream_Soda,
  Chewy,
  Creepster,
  Fleur_De_Leah,
  Freckle_Face,
  Matemasie,
  Moirai_One,
  Rubik_Maps,
  Special_Elite,
} from "next/font/google";

const cherryCreamSoda = Cherry_Cream_Soda({
  weight: "400",
  variable: "--font-style-lab-cherry-cream-soda",
  preload: false,
});

const rubikMaps = Rubik_Maps({
  weight: "400",
  variable: "--font-style-lab-rubik-maps",
  preload: false,
});

const bitcountPropDoubleInk = Bitcount_Prop_Double_Ink({
  variable: "--font-style-lab-bitcount-prop-double-ink",
  preload: false,
});

const chewy = Chewy({
  weight: "400",
  variable: "--font-style-lab-chewy",
  preload: false,
});

const specialElite = Special_Elite({
  weight: "400",
  variable: "--font-style-lab-special-elite",
  preload: false,
});

const freckleFace = Freckle_Face({
  weight: "400",
  variable: "--font-style-lab-freckle-face",
  preload: false,
});

const bangers = Bangers({
  weight: "400",
  variable: "--font-style-lab-bangers",
  preload: false,
});

const creepster = Creepster({
  weight: "400",
  variable: "--font-style-lab-creepster",
  preload: false,
});

const moiraiOne = Moirai_One({
  weight: "400",
  variable: "--font-style-lab-moirai-one",
  preload: false,
});

const matemasie = Matemasie({
  weight: "400",
  variable: "--font-style-lab-matemasie",
  preload: false,
});

const fleurDeLeah = Fleur_De_Leah({
  weight: "400",
  variable: "--font-style-lab-fleur-de-leah",
  preload: false,
});

export const styleLabFontsVariableClassName = [
  cherryCreamSoda.variable,
  rubikMaps.variable,
  bitcountPropDoubleInk.variable,
  chewy.variable,
  specialElite.variable,
  freckleFace.variable,
  bangers.variable,
  creepster.variable,
  moiraiOne.variable,
  matemasie.variable,
  fleurDeLeah.variable,
].join(" ");
