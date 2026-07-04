import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  heading: string;
  description: string;
};

export function EmptyState({ icon: Icon, heading, description }: EmptyStateProps) {
  return (
    <section className="mt-8 border border-border/25 bg-card/45 p-6 sm:p-8">
      <Icon className="h-6 w-6 text-primary" />
      <h2 className="mt-4 text-2xl font-black">{heading}</h2>
      <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </section>
  );
}
