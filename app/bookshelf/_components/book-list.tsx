"use client";

import { MotionItem, MotionList } from "@/components/common/motion-primitives";

type Book = {
  title: string;
  author: string;
  category: string;
  note: string;
};

type BookListProps = {
  books: Book[];
};

export function BookList({ books }: BookListProps) {
  return (
    <MotionList className="mt-10 divide-y divide-border/20">
      {books.map((book, i) => (
        <MotionItem
          key={book.title}
          className="group py-6 transition-colors hover:bg-accent/20"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-black tracking-[-0.02em]">
                {book.title}
              </h3>
              <span className="border border-border/25 bg-accent/65 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.1em]">
                {book.category}
              </span>
            </div>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">
              by {book.author}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
              {book.note}
            </p>
          </div>
        </MotionItem>
      ))}
    </MotionList>
  );
}
