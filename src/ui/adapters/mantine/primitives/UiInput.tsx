import * as React from "react";
import { cn } from "@/ui/adapters/mantine/utils/cn";

export function UiInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-xl border px-3 py-2 text-sm outline-none transition-all duration-200 [background:color-mix(in_srgb,var(--surface)_85%,transparent)] [border-color:var(--border)] [color:var(--foreground)] placeholder:[color:var(--muted)] hover:[border-color:color-mix(in_srgb,var(--border)_60%,var(--link)_40%)] focus-visible:[border-color:var(--link)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_30%,transparent)]",
        className,
      )}
      {...props}
    />
  );
}
