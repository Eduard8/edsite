import type { IconProps } from "@/components/icons/types";

const MAP_PIN_OUTLINE_PATH = "M12 22s7-5.8 7-12a7 7 0 1 0-14 0c0 6.2 7 12 7 12Z";
const MAP_PIN_CENTER_DOT = {
  cx: 12,
  cy: 10,
  r: 2.5,
} as const;

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={MAP_PIN_OUTLINE_PATH} />
      <circle cx={MAP_PIN_CENTER_DOT.cx} cy={MAP_PIN_CENTER_DOT.cy} r={MAP_PIN_CENTER_DOT.r} />
    </svg>
  );
}