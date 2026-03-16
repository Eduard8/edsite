import * as React from "react";
import { cn } from "@/ui/adapters/shadcn/utils/cn";

export function UiCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md [background:var(--surface)] [border-color:var(--border)]",
        className,
      )}
      {...props}
    />
  );
}

export function UiCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-xl font-semibold [color:var(--link)]", className)} {...props} />;
}

export function UiCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm [color:var(--foreground)]", className)} {...props} />;
}
