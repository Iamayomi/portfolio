"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type MarginNoteProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
};

export function MarginNote({ id, children, className }: MarginNoteProps) {
  const [show, setShow] = useState(false);

  return (
    <span
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onTouchStart={() => setShow((s) => !s)}
    >
      <span className="cursor-help border-b border-dashed border-primary/40 bg-primary/5 px-0.5">
        {children}
      </span>
      <sup className="ml-0.5 text-[0.6em] font-bold text-primary/60">†</sup>
      {show ? (
        <span className="absolute bottom-full left-1/2 z-40 mb-2 w-56 -translate-x-1/2 rounded-lg border border-border/30 bg-background p-3 text-xs font-normal normal-case not-italic tracking-normal text-muted-foreground shadow-lg before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:translate-y-full before:border-4 before:border-transparent before:border-t-background">
          {id ? (
            <span className="mb-1 block font-bold uppercase tracking-wider text-primary/60">
              {id}
            </span>
          ) : null}
          {children}
        </span>
      ) : null}
    </span>
  );
}
