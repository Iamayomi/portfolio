"use client";

import { Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PrintButtonProps = {
  className?: string;
};

export function PrintButton({ className }: PrintButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn("rounded-none border-border/35 bg-transparent gap-2", className)}
      onClick={() => window.print()}
    >
      <Printer className="h-4 w-4" />
      Print
    </Button>
  );
}
