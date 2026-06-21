"use client";

import Image from "next/image";
import { MotionItem, MotionList } from "@/components/common/motion-primitives";
import type { GuestbookEntry } from "@/lib/types/guestbook";

type GuestbookListProps = {
  entries: GuestbookEntry[];
};

export function GuestbookList({ entries }: GuestbookListProps) {
  if (!entries.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border/30 p-8 text-center">
        <p className="text-lg font-bold">No entries yet.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Be the first to sign the guestbook!
        </p>
      </div>
    );
  }

  return (
    <MotionList className="divide-y divide-border/20">
      {entries.map((entry) => (
        <MotionItem
          key={entry.id}
          className="group py-6 transition-colors hover:bg-accent/20"
        >
          <div className="flex gap-4">
            <div className="shrink-0">
              {entry.avatarUrl ? (
                <div className="relative size-10 overflow-hidden rounded-full">
                  <Image
                    src={entry.avatarUrl}
                    alt={entry.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="grid size-10 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                  {entry.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold">{entry.name}</p>
                {entry.website ? (
                  <a
                    href={entry.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    {entry.website}
                  </a>
                ) : null}
                <span className="text-xs text-muted-foreground">
                  {new Date(entry.createdAt).toLocaleDateString("en", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {entry.message}
              </p>
            </div>
          </div>
        </MotionItem>
      ))}
    </MotionList>
  );
}
