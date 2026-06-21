"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type SeriesEntry = {
  slug: string;
  title: string;
  isCurrent?: boolean;
};

type EssaySeriesProps = {
  seriesTitle: string;
  entries: SeriesEntry[];
  className?: string;
};

export function EssaySeries({
  seriesTitle,
  entries,
  className,
}: EssaySeriesProps) {
  const currentIndex = entries.findIndex((e) => e.isCurrent);
  const prev = currentIndex > 0 ? entries[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < entries.length - 1
      ? entries[currentIndex + 1]
      : null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/25 bg-accent/30 p-6",
        className
      )}
    >
      <div className="flex items-center gap-2 text-sm font-bold text-primary">
        <BookOpen className="h-4 w-4" />
        {seriesTitle}
      </div>

      <div className="mt-4 grid gap-1.5">
        {entries.map((entry, i) => (
          <Link
            key={entry.slug}
            href={`/notes/${entry.slug}`}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              entry.isCurrent
                ? "font-bold text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            <span className="shrink-0 text-xs font-bold text-muted-foreground/60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="truncate">{entry.title}</span>
          </Link>
        ))}
      </div>

      {(prev || next) && (
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/20 pt-4">
          {prev ? (
            <Link
              href={`/notes/${prev.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="truncate max-w-[10rem]">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/notes/${next.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
            >
              <span className="truncate max-w-[10rem]">{next.title}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  );
}
