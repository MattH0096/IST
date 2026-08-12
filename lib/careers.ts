/**
 * §9.9 Careers.
 *
 * Locked strings ship verbatim. Culture / “why build” / “how we work” bands
 * are presentation structure for the careers page — soft team language only,
 * no product claims beyond what the hero + hiring line already say.
 *
 * `ROLES` ships empty: the spec forbids invented roles. Three blank cards
 * render for layout review until real openings are added here.
 */

export const CAREERS = {
  title: "Build Something That Matters.",
  titleLines: ["Build Something", "That Matters."] as const,
  lead: "IST is building technology that does not exist yet — and we are looking for the engineers who want to build it with us. We are a small, focused team operating at the frontier of networked systems, and every person we hire has an outsized impact on what we build and how we build it.",
  /** [LOCKED] — verbatim. */
  hiringLine:
    "The technology of tomorrow needs the brightest minds of today. If you thrive on hard challenges, love the pace of real innovation, and want high autonomy with the responsibility to match — come help build something that matters. Get in on the ground floor.",
} as const;

/** Split of the locked hiring line for the featured band accent. */
export const HIRING_BAND = {
  before: "The technology of tomorrow needs",
  accent: "the brightest minds of today.",
  /** Rest of the locked line — kept available if a longer treatment is needed. */
  after:
    "If you thrive on hard challenges, love the pace of real innovation, and want high autonomy with the responsibility to match — come help build something that matters. Get in on the ground floor.",
  /** Traits drawn from the locked hiring line (autonomy / responsibility / impact). */
  traits: [
    {
      id: "autonomy",
      title: "High autonomy.",
      body: "Own problems end to end.",
      icon: "person" as const,
    },
    {
      id: "responsibility",
      title: "High responsibility.",
      body: "Trusted to deliver where it matters.",
      icon: "shield" as const,
    },
    {
      id: "impact",
      title: "High impact.",
      body: "Your work changes what's possible.",
      icon: "star" as const,
    },
  ],
} as const;

/**
 * Why-build pillars — themes already present in the approved hero lead
 * (hard challenges, outsized impact, small team, frontier networked systems).
 */
export const WHY_BUILD = {
  title: "Why Build at IST",
  items: [
    {
      id: "hardest",
      title: "Work on the Hardest Problems",
      body: "Tackle complex, unsolved challenges in networking, autonomy, and distributed systems.",
      icon: "atom" as const,
    },
    {
      id: "impact",
      title: "End-to-End Impact",
      body: "From research to real-world deployment—see your work in action.",
      icon: "nodes" as const,
    },
    {
      id: "team",
      title: "Small Team. Big Impact.",
      body: "Work directly with experts. Ship fast. Make decisions. See results.",
      icon: "people" as const,
    },
    {
      id: "frontier",
      title: "Frontier Technology",
      body: "Build the next generation of intelligent networking in environments that are unpredictable and dynamic.",
      icon: "compass" as const,
    },
    {
      id: "mission",
      title: "Real-World Mission",
      body: "Help build systems meant to keep people, infrastructure, and operations connected.",
      icon: "globe" as const,
    },
  ],
} as const;

export const OPEN_ROLES = {
  title: "Open Roles",
  emptyTitle: "No open roles right now.",
  emptyBody:
    "Check back soon, or reach out if you want to be considered as the team grows.",
  viewAll: "View All Open Roles",
  apply: "Apply",
  applyHeading: "Apply",
  applyLead: "Tell us about yourself. Attach a resume if you have one.",
  learnMore: "Apply",
} as const;

/** @deprecated Blank cards removed — public page shows empty state instead. */
export const OPEN_ROLE_PLACEHOLDERS = 0;

export const HOW_WE_WORK = {
  title: "How We Work",
  footer: "Flexible work that supports deep focus and real-life balance.",
  items: [
    {
      id: "mission",
      title: "Mission First",
      body: "We focus on impact. Everything else follows.",
      icon: "flag" as const,
    },
    {
      id: "ownership",
      title: "Radical Ownership",
      body: "We take ownership—no silos, no accountability gaps, follow through.",
      icon: "target" as const,
    },
    {
      id: "direct",
      title: "Open & Direct",
      body: "We communicate clearly, challenge ideas, and make better decisions.",
      icon: "chat" as const,
    },
    {
      id: "action",
      title: "Bias for Action",
      body: "We move fast, learn quickly, and iterate relentlessly.",
      icon: "bolt" as const,
    },
    {
      id: "improve",
      title: "Continuous Improvement",
      body: "We build, measure, and get better every day.",
      icon: "chart" as const,
    },
    {
      id: "people",
      title: "People First",
      body: "We support each other and invest in long-term relationships.",
      icon: "people" as const,
    },
  ],
} as const;

/** Closing careers CTA — left uses locked hiring line; sidebar is soft outreach. */
export const CAREERS_CTA = {
  viewRoles: "View Open Roles",
  asideTitle: "Not seeing the right role?",
  asideBody:
    "We're always looking for exceptional talent. Reach out and tell us how you'd like to contribute.",
  asideLink: "Get in touch",
} as const;

export type Role = {
  slug: string;
  title: string;
  team: string;
  /** e.g. "Denver, Colorado" or "Remote". */
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  summary: string;
  /** Where an application goes. Use the contact form unless a board is set up. */
  applyHref: string;
};

/** Empty by design — no invented listings (§9.9). */
export const ROLES: Role[] = [];
