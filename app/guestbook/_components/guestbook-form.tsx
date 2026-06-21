"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { sendGuestbookEntry } from "@/lib/api/pages";

type GuestbookFormState = {
  name: string;
  email: string;
  website: string;
  message: string;
};

const emptyForm: GuestbookFormState = {
  name: "",
  email: "",
  website: "",
  message: "",
};

export function GuestbookForm() {
  const [formData, setFormData] = useState<GuestbookFormState>(emptyForm);
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = () => {
    setError(null);
    startTransition(() => {
      sendGuestbookEntry({
        name: formData.name,
        email: formData.email || undefined,
        website: formData.website || undefined,
        message: formData.message,
      })
        .then((res) => {
          if (res && !res.success) {
            setError(res.message);
          } else {
            setFormData(emptyForm);
            setSubmitted(true);
          }
        })
        .catch(() => setError("Something went wrong, try again."));
    });
  };

  if (submitted) {
    return (
      <div className="space-y-4 rounded-2xl border border-border/25 bg-accent/30 p-6">
        <p className="font-sketch text-2xl font-bold text-primary">
          Thanks for signing!
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Your entry has been submitted for review. It will appear on the page
          once approved.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSubmitted(false)}
          className="rounded-none"
        >
          Sign again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5 rounded-2xl border border-border/25 bg-accent/30 p-6">
      <div>
        <p className="font-sketch text-2xl font-bold text-primary">
          Sign the book
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Leave a note. Name and message required.
        </p>
      </div>

      {error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">
          {error}
        </p>
      ) : null}

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="gb-name"
            className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground"
          >
            Name *
          </label>
          <input
            id="gb-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="h-11 w-full rounded-none border border-border/40 bg-transparent px-3 text-sm outline-none transition-colors focus:border-foreground"
            placeholder="Your name"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="gb-email"
            className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground"
          >
            Email (optional, not displayed)
          </label>
          <input
            id="gb-email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="h-11 w-full rounded-none border border-border/40 bg-transparent px-3 text-sm outline-none transition-colors focus:border-foreground"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="gb-website"
            className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground"
          >
            Website (optional)
          </label>
          <input
            id="gb-website"
            type="url"
            value={formData.website}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, website: e.target.value }))
            }
            className="h-11 w-full rounded-none border border-border/40 bg-transparent px-3 text-sm outline-none transition-colors focus:border-foreground"
            placeholder="https://yoursite.com"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="gb-message"
            className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground"
          >
            Message *
          </label>
          <textarea
            id="gb-message"
            required
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            className="min-h-24 w-full rounded-none border border-border/40 bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-foreground"
            placeholder="Say something nice..."
          />
        </div>
      </div>

      <Button
        onClick={onSubmit}
        disabled={isPending || !formData.name.trim() || !formData.message.trim()}
        size="lg"
        className="h-11 rounded-none bg-foreground px-5 text-background hover:bg-foreground/85"
      >
        {isPending ? "Signing..." : "Sign guestbook"}
      </Button>
    </div>
  );
}
