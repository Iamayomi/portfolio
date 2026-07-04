import { PageShell } from "@/components/common/page-shell";
import { HeroSection } from "./_components/hero-section";
import { LandingAside } from "./_components/landing-aside";
import { RecentNotesSection } from "./_components/recent-notes-section";
import { SelectedWorksSection } from "./_components/selected-works-section";
import { EmptyState } from "@/components/common/empty-state";
import { getLandingContent } from "@/lib/api/pages";
import { resolveCloudinaryUrl } from "@/lib/utils";
import { Construction } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const response = await getLandingContent();
  const data = response?.data;

  if (!data) {
    return (
      <PageShell className="cursor-default py-10 sm:py-16">
        <EmptyState
          icon={Construction}
          heading="Nothing here yet."
          description="The CMS hasn't been set up. Add landing content through the dashboard to see it here."
        />
      </PageShell>
    );
  }

  const hero = {
    ...data.hero,
    portraitImageUrl: resolveCloudinaryUrl(data.hero.portraitImageUrl),
  };

  return (
    <PageShell className="cursor-default py-10 sm:py-16">
      <HeroSection content={hero} />

      <section className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-12">
          <SelectedWorksSection content={data.selectedWorks} />
          <RecentNotesSection content={data.selectedNotes} />
        </div>
        <LandingAside content={data.aside} />
      </section>
    </PageShell>
  );
}
