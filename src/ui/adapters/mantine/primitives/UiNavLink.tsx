"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/ui/adapters/mantine/utils/cn";

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
        "inline-block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground/30",
        className,
      )}
    >
      <motion.span
        whileHover={{ y: -1, scale: 1.02 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-all duration-200 active:scale-[0.99] [color:var(--link)] hover:[background:color-mix(in_srgb,var(--surface)_65%,transparent)]"
      >
        {children}
      </motion.span>
    </Link>
  );
}
