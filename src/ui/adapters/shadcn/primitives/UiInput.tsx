import * as React from "react";
import { cn } from "@/ui/adapters/shadcn/utils/cn";

export function UiInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-black/20 bg-transparent px-3 py-2 text-sm outline-none ring-offset-background transition-all duration-200 placeholder:text-black/50 hover:border-black/35 focus-visible:border-[color:var(--link)] focus-visible:ring-2 focus-visible:ring-foreground/20 dark:border-white/20 dark:hover:border-white/35 dark:placeholder:text-white/50",
        className,
      )}
      {...props}
    />
  );
}
