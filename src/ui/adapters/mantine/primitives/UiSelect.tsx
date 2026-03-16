import * as React from "react";
import { cn } from "@/ui/adapters/mantine/utils/cn";

type UiSelectOption = {
  value: string;
  label: string;
};

type UiSelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  options: UiSelectOption[];
};

export function UiSelect({ className, options, ...props }: UiSelectProps) {
  return (
    <select
      className={cn(
        "h-10 rounded-xl border px-3 py-2 text-sm outline-none transition-shadow [background:color-mix(in_srgb,var(--surface)_90%,transparent)] [border-color:var(--border)] [color:var(--foreground)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_25%,transparent)]",
        className,
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
