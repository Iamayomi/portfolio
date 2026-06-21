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

const fallbackBooks = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Systems",
    note: "The definitive guide to distributed systems. Changed how I think about data flow and storage trade-offs.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    category: "Craft",
    note: "Timeless advice on software craftsmanship. The DRY principle alone is worth the read.",
  },
  {
    title: "Clean Architecture",
    author: "Robert C. Martin",
    category: "Architecture",
    note: "Helped me understand boundaries, dependency rules, and how to structure code that lasts.",
  },
  {
    title: "Building Microservices",
    author: "Sam Newman",
    category: "Architecture",
    note: "Practical patterns for decomposing monoliths. Essential reading before I built real microservice systems.",
  },
  {
    title: "Database Internals",
    author: "Alex Petrov",
    category: "Databases",
    note: "Deep dive into how databases actually work under the hood — storage engines, replication, and consistency.",
  },
  {
    title: "System Design Interview",
    author: "Alex Xu",
    category: "Systems",
    note: "Clear framework for thinking about large-scale system design. Great for interview prep and real architecture.",
  },
  {
    title: "The Linux Command Line",
    author: "William Shotts",
    category: "DevOps",
    note: "Made me comfortable in the terminal. The foundation for everything I do with servers and automation.",
  },
  {
    title: "Kill It with Fire",
    author: "Mariana Benini",
    category: "Legacy",
    note: "How to manage legacy codebases without losing your mind. Practical strategies for real-world migration.",
  },
  {
    title: "Staff Engineer",
    author: "Will Larson",
    category: "Career",
    note: "Understanding the IC track beyond senior. How to have impact without managing people.",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Thinking",
    note: "Not a tech book, but it changed how I reason about decisions, trade-offs, and cognitive biases in design.",
  },
];

export default async function BookshelfPage() {
  const response = await getBookshelfContent();
  const books = response?.data?.length ? response.data : fallbackBooks;

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
