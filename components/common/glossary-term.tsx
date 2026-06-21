"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type GlossaryTermProps = {
  term: string;
  definition: string;
  children?: React.ReactNode;
  className?: string;
};

export function GlossaryTerm({
  term,
  definition,
  children,
  className,
}: GlossaryTermProps) {
  const [show, setShow] = useState(false);

  return (
    <span
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span className="cursor-help border-b border-dashed border-primary/50 font-semibold text-foreground">
        {children || term}
      </span>
      <HelpCircle className="ml-0.5 inline h-3 w-3 text-primary/40" />
      {show ? (
        <span className="absolute bottom-full left-0 z-40 mb-2 w-64 rounded-lg border border-border/30 bg-background p-3 text-sm font-normal normal-case not-italic tracking-normal text-muted-foreground shadow-lg">
          <span className="block text-xs font-bold uppercase tracking-wider text-primary/60">
            {term}
          </span>
          {definition}
        </span>
      ) : null}
    </span>
  );
}
