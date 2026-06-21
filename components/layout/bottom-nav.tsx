"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  Boxes,
  NotebookText,
  FileText,
  BookMarked,
  PenLine,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Profile", icon: Home },
  { href: "/experience", label: "Work", icon: Briefcase },
  { href: "/builds", label: "Builds", icon: Boxes },
  { href: "/notes", label: "Notes", icon: NotebookText },
  { href: "/bookshelf", label: "Books", icon: BookMarked },
  { href: "/guestbook", label: "Guest", icon: PenLine },
  { href: "/contact", label: "Resume", icon: FileText },
];

const isActivePath = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
};

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed bottom-0 inset-x-0 z-50 border-t border-border/15 bg-background/95 backdrop-blur-sm lg:hidden"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-around overflow-x-auto px-1 py-1.5">
        {tabs.map((tab) => {
          const isActive = isActivePath(pathname, tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex min-w-0 flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[0.55rem] font-bold uppercase tracking-wider transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive && "fill-primary/15"
                )}
              />
              <span className="truncate">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
