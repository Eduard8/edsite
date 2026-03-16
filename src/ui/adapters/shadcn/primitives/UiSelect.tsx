import * as React from "react";
import { cn } from "@/ui/adapters/shadcn/utils/cn";

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
        "h-10 rounded-md border border-black/20 bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 dark:border-white/20",
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
