"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/lib/hooks/use-bookmarks";
import { cn } from "@/lib/utils";

type BookmarkButtonProps = {
  slug: string;
  className?: string;
};

export function BookmarkButton({ slug, className }: BookmarkButtonProps) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(slug);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn(
        "rounded-none border-border/35 bg-transparent gap-2",
        bookmarked && "border-primary/40 bg-primary/10 text-primary",
        className
      )}
      onClick={() => toggleBookmark(slug)}
    >
      {bookmarked ? (
        <BookmarkCheck className="h-4 w-4" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
      {bookmarked ? "Saved" : "Save"}
    </Button>
  );
}
