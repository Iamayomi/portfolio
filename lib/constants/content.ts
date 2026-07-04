import {
  Boxes,
  BriefcaseBusiness,
  Gamepad2,
  Mail,
  NotebookText,
  PenLine,
} from "lucide-react";
import type { NavItem, ProfileInfo } from "../types/experience";

export const navItems: NavItem[] = [
  { href: "/", label: "Profile", code: "home" },
  { href: "/experience", label: "Experience", code: "xp" },
  { href: "/builds", label: "Builds", code: "builds" },
  { href: "/notes", label: "Notes", code: "articles" },
  { href: "/bookshelf", label: "Bookshelf", code: "bookshelf" },
  { href: "/guestbook", label: "Guestbook", code: "guestbook" },
  { href: "/contact", label: "Resume", code: "contact" },
];

export const profile: ProfileInfo = {
  name: "Ayomide",
  handle: "Ayomide",
  role: "Backend Engineer building scalable, secure, and high-performance backend systems",
  status: "available",
  location: "Nigeria / remote",
  availability:
    "Open to backend engineering, API architecture, distributed systems, and cloud-native application roles",
  intro:
    "I design and build scalable backend systems, microservices, and cloud-native applications. Specialized in API architecture, distributed systems, database optimization, and third-party integrations.",
  summary:
    "I have built systems for emergency healthcare, logistics, and non-profit organizations. This site showcases my work, skills, and the engineering principles I bring to every project.",
  stats: [
    { label: "since", value: "2021", note: "backend engineering" },
    { label: "focus", value: "API", note: "architecture & systems" },
    { label: "mode", value: "Production", note: "scalable solutions" },
  ],
};

export const pageIntros = {
  experience: {
    icon: BriefcaseBusiness,
    eyebrow: "professional timeline",
    heading: "Building scalable backend systems.",
    description:
      "From emergency healthcare microservices to logistics platforms, I design and implement backend architectures that handle real-world complexity and scale.",
  },
  builds: {
    icon: Boxes,
    eyebrow: "project notes",
    heading: "Systems I've built and shipped.",
    description:
      "A selection of backend projects showcasing microservices architecture, API design, database optimization, and cloud-native applications.",
  },
  notes: {
    icon: NotebookText,
    eyebrow: "technical writing",
    heading: "Backend engineering insights.",
    description:
      "Practical notes on API architecture, distributed systems, database optimization, and building scalable production environments.",
  },
  contact: {
    icon: Mail,
    eyebrow: "get in touch",
    heading: "Let's build something together.",
    description:
      "Whether you need backend architecture, API design, or scalable system development, I'm ready to discuss your project requirements.",
  },
  guestbook: {
    icon: PenLine,
    eyebrow: "sign the book",
    heading: "Leave a note.",
    description:
      "Sign the guestbook and let me know you stopped by. A name and message is all it takes.",
  },
  extra: {
    icon: Gamepad2,
    eyebrow: "after hours",
    heading: "The other stuff",
    description:
      "Beyond backend engineering: interests, hobbies, and the things that keep me balanced.",
  },
};
