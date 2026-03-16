import * as React from "react";
import { cn } from "@/ui/adapters/mantine/utils/cn";

export function UiCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-lg shadow-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10 [background:color-mix(in_srgb,var(--surface)_88%,transparent)] [border-color:color-mix(in_srgb,var(--border)_75%,var(--accent)_25%)]",
        className,
      )}
      {...props}
    />
  );
}

export function UiCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-xl font-bold [color:var(--link)]", className)} {...props} />;
}

export function UiCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm [color:var(--foreground)]", className)} {...props} />;
}
