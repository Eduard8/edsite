"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/ui/adapters/shadcn/utils/cn";

type UiNavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function UiNavLink({ href, children, className }: UiNavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground/30",
        className,
      )}
    >
      <motion.span
        whileHover={{ y: -1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="relative inline-block [color:var(--link)] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:after:scale-x-100"
      >
        {children}
      </motion.span>
    </Link>
  );
}
