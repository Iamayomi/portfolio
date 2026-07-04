import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Eye, UserRound } from "lucide-react";
import { notFound } from "next/navigation";

import { MotionBlock } from "@/components/common/motion-primitives";
import { PageShell } from "@/components/common/page-shell";
import { RichTextContentRenderer } from "@/components/common/render-richtext";
import { BookmarkButton } from "@/components/common/bookmark-button";
import { PrintButton } from "@/components/common/print-button";
import { TableOfContents } from "@/components/common/table-of-contents";
import { EssaySeries } from "@/components/common/essay-series";
import { getNoteContent } from "@/lib/api/pages";
import { NoteComments } from "./_components/note-comments";
import { NoteReadTracker } from "./_components/note-read-tracker";
import { NoteShare } from "./_components/note-share";
import { NotePageWrapper } from "./_components/note-page-wrapper";
import { RelatedNotes } from "./_components/related-notes";
import { BASE_URL, VERSION } from "@/lib/constants";
import { NewsletterSignup } from "@/components/common/newsletter-signup";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;

  const note = (await getNoteContent(slug))?.data;

  if (!note) return { title: "Note not found" };

  const ogImageUrl = new URL(
    `/notes/${slug}/opengraph-image?v=${VERSION}`,
    BASE_URL
  ).toString();

  const noteUrl = new URL(`/notes/${slug}`, BASE_URL).toString();

  const description = note.excerpt || "Read the latest notes by Ayomide";

  return {
    alternates: {
      canonical: noteUrl,
    },

    title: note.title,
    description,
    keywords: note.tags,

    openGraph: {
      title: note.title,
      description,
      url: noteUrl,
      type: "article",
      publishedTime: note.publishedAt
        ? new Date(note.publishedAt).toISOString()
        : undefined,
      authors: note.author?.name ? [note.author.name] : ["Amodu Ayomide"],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: note.title,
      description,
      images: [ogImageUrl],
    },
  };
}

const formatDate = (value?: string | null) =>
  value
    ? new Intl.DateTimeFormat("en-NG", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(value))
    : "Unpublished";

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const response = await getNoteContent(slug);
  const note = response?.data;

  if (!note) notFound();

  const shareUrl = new URL(`/notes/${slug}`, BASE_URL).toString();

  return (
    <PageShell>
      <NotePageWrapper>
        <MotionBlock className="space-y-10">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to notes
          </Link>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article id="note-article" className="space-y-8 min-w-0">
            <header className="border-b border-border/20 pb-8">
              <h1 className="mt-5 max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl">
                {note.title}
              </h1>
              {note.excerpt ? (
                <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                  {note.excerpt}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-primary" />
                  {note.author?.name || "Ayomide"}
                </span>
                <span>{formatDate(note.publishedAt)}</span>

                <span className="inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 text-primary">
                  <Clock className="h-4 w-4" />
                  {note.readTime}
                </span>

                <BookmarkButton slug={note.slug} />
                <PrintButton />
              </div>
            </header>

            <NoteShare url={shareUrl} title={note.title} excerpt={note.excerpt} />

            {note.bannerImage ? (
              <figure className="space-y-3 mb-12">
                <div className="relative aspect-video overflow-hidden border border-border/25 bg-accent/35">
                  <Image
                    src={note.bannerImage}
                    alt={note.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1024px"
                    className="object-cover"
                    priority
                  />
                </div>
                {note.bannerCaption ? (
                  <figcaption className="text-sm text-muted-foreground text-center italic">
                    {note.bannerCaption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}

            <RichTextContentRenderer
              content={note.content}
              className="notes-prose max-w-none text-base leading-8 text-foreground/88"
            />
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents targetId="note-article" />
            </div>
          </aside>
        </div>

        {note.series && note.seriesEntries && note.seriesEntries.length > 1 ? (
          <EssaySeries
            seriesTitle={note.series}
            entries={note.seriesEntries.map((e) => ({
              slug: e.slug,
              title: e.title,
              isCurrent: e.slug === note.slug,
            }))}
          />
        ) : null}

        <NoteReadTracker slug={note.slug} targetId="note-article" />
        <NewsletterSignup
          mode="prompt"
          source={`note:${note.slug}`}
          triggerAtHalfway
          targetId="note-article"
        />

        {note.allowComments ? (
          <NoteComments
            slug={note.slug}
            initialComments={note.comments || []}
          />
        ) : null}

        <RelatedNotes notes={note.relatedPosts || []} />
      </MotionBlock>
      </NotePageWrapper>
    </PageShell>
  );
}
