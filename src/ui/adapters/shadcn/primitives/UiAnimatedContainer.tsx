"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/ui/adapters/shadcn/utils/cn";

type UiAnimatedContainerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function UiAnimatedContainer({ children, className, delay = 0 }: UiAnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
