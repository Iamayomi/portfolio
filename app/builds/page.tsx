import type { Metadata } from "next";

import { PageShell } from "@/components/common/page-shell";
import { SectionHeading } from "@/components/common/section-heading";
import { EmptyState } from "@/components/common/empty-state";
import { getBuildsContent } from "@/lib/api/pages";
import { pageIntros } from "@/lib/constants/content";
import { Boxes } from "lucide-react";
import type { BuildItem, BuildsPageContent } from "@/lib/types/experience";
import { normalizeExternalHref } from "@/lib/utils";
import { BuildList } from "./_components/build-list";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Backend systems and scalable applications built by Ayomide Amodu, including microservices, APIs, and cloud-native solutions.",

  alternates: {
    canonical: "/builds",
  },
};

export const revalidate = 900;

export default async function BuildsPage() {
  const response = await getBuildsContent();
  const content = response?.data;
  const intro = content?.hero
    ? {
        ...pageIntros.builds,
        eyebrow: content.hero.eyebrow,
        heading: content.hero.title,
        description: content.hero.description,
      }
    : pageIntros.builds;

  const items: BuildItem[] = content?.items?.length
    ? content.items.map((build: BuildsPageContent["items"][number], index) => ({
        index: String(index + 1).padStart(3, "0"),
        name: build.title,
        category: build.category,
        status: build.status || "active",
        description: build.summary || "",
        proof: build.proofNote || "",
        stack: build.stack || [],
        githubHref: normalizeExternalHref(build.githubUrl) || undefined,
        liveHref: normalizeExternalHref(build.liveUrl) || undefined,
      }))
    : [];

  return (
    <PageShell>
      <SectionHeading {...intro} tag="SHOWCASE" />
      {items.length > 0 ? (
        <BuildList items={items} />
      ) : (
        <EmptyState
          icon={Boxes}
          heading="No projects yet."
          description="Add builds through the CMS dashboard and they will appear here."
        />
      )}
    </PageShell>
  );
}
