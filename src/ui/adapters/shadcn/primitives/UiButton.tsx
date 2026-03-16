"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/ui/adapters/shadcn/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground/30",
  {
    variants: {
      variant: {
        primary:
          "shadow-sm hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md [background:var(--accent)] [color:var(--accent-foreground)]",
        secondary:
          "bg-transparent text-foreground hover:-translate-y-0.5 hover:bg-black/5 dark:hover:bg-white/10 [border:1px_solid_var(--link)]",
        ghost: "hover:-translate-y-0.5 hover:bg-black/5 dark:hover:bg-white/10",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type UiButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function UiButton({ className, variant, size, asChild = false, ...props }: UiButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}
