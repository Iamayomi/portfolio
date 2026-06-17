"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { MobileCoffeeLink } from "@/components/layout/buy-me-coffee-link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { navItems, profile } from "@/lib/fallbacks/portfolio-data";
import Image from "next/image";

const isActivePath = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
};

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const activeItem = navItems.find((item) => isActivePath(pathname, item.href));

  return (
    <header className="sticky top-0 z-40 border-b border-border/15 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link href="/" className="group inline-flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center border-2 border-border/30 bg-accent text-accent-foreground transition-transform group-hover:-rotate-6 overflow-hidden rounded-2xl">
            {/* <Cookie className="h-4 w-4" /> */}
            <Image
              alt="Logo avatar"
              src={"/avatar.png"}
              height={200}
              width={200}
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block  font-black capitalize text-2xl tracking-[0.16em] leading-none font-sketch relative">
              {/* <TiPin className="absolute -right-2 -top-1 h-5 w-5 rotate-12 fill-red-500 text-red-500" /> */}
              {profile.handle}
            </span>
            <span className="block truncate text-[0.5rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {activeItem?.code
                ? activeItem.code === "articles"
                  ? "My"
                  : activeItem.code
                : "home"}{" "}
              note
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-none border border-transparent px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-border/40 hover:bg-secondary/50",
                  isActive && "text-primary"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            type="button"
            size="icon-lg"
            variant="outline"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            className="rounded-none border border-border/30 bg-transparent lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-border/15 bg-background lg:hidden"
        >
          <div className="mx-auto grid max-w-6xl px-5 py-3 sm:px-8">
            {navItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between border-b border-border/20 px-1 py-4 text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground last:border-b-0",
                    isActive && "text-foreground"
                  )}
                >
                  {item.label}
                  <span>/{item.code}</span>
                </Link>
              );
            })}
            <MobileCoffeeLink onClick={() => setOpen(false)} />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
