"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/ui/adapters/mantine/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground/30",
  {
    variants: {
      variant: {
        primary:
          "shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:brightness-105 [background:linear-gradient(135deg,var(--accent),var(--link))] [color:var(--accent-foreground)]",
        secondary:
          "[background:color-mix(in_srgb,var(--surface)_80%,transparent)] [border:1px_solid_var(--link)] [color:var(--link)] hover:-translate-y-0.5 hover:[background:color-mix(in_srgb,var(--surface)_60%,transparent)]",
        ghost: "[color:var(--link)] hover:-translate-y-0.5 hover:[background:color-mix(in_srgb,var(--surface)_70%,transparent)]",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3",
        lg: "h-11 px-7",
        icon: "h-10 w-10",
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
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
