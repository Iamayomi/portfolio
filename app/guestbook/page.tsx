import type { Metadata } from "next";

import { PageShell } from "@/components/common/page-shell";
import { SectionHeading } from "@/components/common/section-heading";
import { EmojiCursorArea } from "@/components/common/emoji-cursor-area";
import { getGuestbookContent } from "@/lib/api/pages";
import { pageIntros } from "@/lib/constants/content";
import { GuestbookList } from "./_components/guestbook-list";
import { GuestbookForm } from "./_components/guestbook-form";

export const metadata: Metadata = {
  title: "Guestbook",
  description:
    "Sign the guestbook and leave a note for Ayomide Amodu.",

  alternates: {
    canonical: "/guestbook",
  },
};

export const revalidate = 900;

export default async function GuestbookPage() {
  const response = await getGuestbookContent();
  const entries = response?.data ?? [];

  const intro = pageIntros.guestbook;

  return (
    <PageShell>
      <EmojiCursorArea item="📖">
        <SectionHeading {...intro} tag="SIGN" />
        <section className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <GuestbookList entries={entries} />
          <GuestbookForm />
        </section>
      </EmojiCursorArea>
    </PageShell>
  );
}
