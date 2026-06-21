"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type NotePageWrapperProps = {
  children: ReactNode;
};

export function NotePageWrapper({ children }: NotePageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, rotateX: -1 }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{ perspective: "1200px", transformOrigin: "top center" }}
    >
      {children}
    </motion.div>
  );
}
