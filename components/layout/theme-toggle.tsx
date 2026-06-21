"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, BookOpen } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const themes = ["light", "dark", "sepia"] as const;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentIndex = themes.indexOf(
    (resolvedTheme as (typeof themes)[number]) ?? "dark"
  );
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  const Icon = !mounted
    ? Sun
    : resolvedTheme === "dark"
    ? Moon
    : resolvedTheme === "sepia"
    ? BookOpen
    : Sun;

  return (
    <Button
      type="button"
      size="icon-lg"
      variant="outline"
      aria-label={`Switch to ${nextTheme} theme`}
      className="rounded-none border-border/35 bg-background/70"
      onClick={() => setTheme(nextTheme)}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
