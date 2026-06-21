import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type PullQuoteProps = {
  children: React.ReactNode;
  attribution?: string;
  className?: string;
};

export function PullQuote({ children, attribution, className }: PullQuoteProps) {
  return (
    <figure
      className={cn(
        "relative my-8 border-l-4 border-primary py-4 pl-6 pr-4",
        "bg-accent/30",
        className
      )}
    >
      <Quote className="absolute -top-3 -left-1 h-8 w-8 text-primary/20" />
      <blockquote className="text-lg font-semibold leading-relaxed text-foreground italic">
        {children}
      </blockquote>
      {attribution ? (
        <figcaption className="mt-3 text-sm font-bold text-muted-foreground">
          — {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
