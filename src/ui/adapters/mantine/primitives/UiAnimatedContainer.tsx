"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/ui/adapters/mantine/utils/cn";

type UiAnimatedContainerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function UiAnimatedContainer({ children, className, delay = 0 }: UiAnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 170, damping: 20, mass: 0.7, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
