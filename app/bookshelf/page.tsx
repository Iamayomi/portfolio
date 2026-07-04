import type { Metadata } from "next";

import { PageShell } from "@/components/common/page-shell";
import { SectionHeading } from "@/components/common/section-heading";
import { getBookshelfContent } from "@/lib/api/pages";
import { BookList } from "./_components/book-list";

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
      <SectionHeading
        eyebrow="bookshelf"
        heading="Books that shaped how I think."
        description="A curated reading list of books on engineering, systems, architecture, and the craft of building things."
        tag="READS"
      />
      <BookList books={books} />
    </PageShell>
  );
}
