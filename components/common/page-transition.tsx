"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30, rotateY: -2, filter: "blur(2px)" }}
      animate={{
        opacity: 1,
        x: 0,
        rotateY: 0,
        filter: "blur(0px)",
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      exit={{
        opacity: 0,
        x: -30,
        rotateY: 2,
        filter: "blur(2px)",
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{ perspective: "1200px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
