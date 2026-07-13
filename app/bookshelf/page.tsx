import type { Metadata } from "next";

import { PageShell } from "@/components/common/page-shell";
import { SectionHeading } from "@/components/common/section-heading";
import { EmptyState } from "@/components/common/empty-state";
import { EmojiCursorArea } from "@/components/common/emoji-cursor-area";
import { getBookshelfContent } from "@/lib/api/pages";
import { BookList } from "./_components/book-list";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Reading List",
  description:
    "Books that shaped how I think about engineering, systems, and building things that matter.",

  alternates: {
    canonical: "/bookshelf",
  },
};

export const revalidate = 900;

export default async function BookshelfPage() {
  const response = await getBookshelfContent();
  const books = response?.data ?? [];

  return (
    <PageShell>
      <EmojiCursorArea item="📚">
        <SectionHeading
          eyebrow="bookshelf"
          heading="Books that shaped how I think."
          description="A curated reading list of books on engineering, systems, architecture, and the craft of building things."
          tag="READS"
        />
        {books.length > 0 ? (
          <BookList books={books} />
        ) : (
          <EmptyState
            icon={BookOpen}
            heading="No books yet."
            description="Add books through the CMS dashboard and they will appear here."
          />
        )}
      </EmojiCursorArea>
    </PageShell>
  );
}
