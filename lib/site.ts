/**
 * Single source of truth for navigation, CTA vocabulary, and footer content.
 *
 * Contact routes exclusively through the form — there is deliberately no email
 * address in this file, in markup, or in schema.
 */

export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

/** CTA strings are fixed sitewide. Import from here rather than retyping. */
export const CTA = {
  howItWorks: "See How It Works",
  locus: "Explore Locus",
  crucible: "Explore Crucible",
  mission: "Discuss a Mission",
  contact: "Contact IST",
} as const;

export const NAV: NavLink[] = [
  { label: "Solutions", href: "/solutions" },
  {
    label: "Products",
    href: "/locus",
    children: [
      { label: "Locus", href: "/locus" },
      { label: "Crucible", href: "/crucible" },
    ],
  },
  { label: "Applications", href: "/applications" },
  {
    label: "Resources",
    href: "/insights",
    children: [
      { label: "Insights", href: "/insights" },
      { label: "News", href: "/news" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const FOOTER_COLUMNS: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Platform",
    links: [
      { label: "Solutions", href: "/solutions" },
      { label: "The Problem", href: "/#problem" },
      { label: "The Solution", href: "/#solution" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Platform Stack", href: "/#stack" },
      { label: "Applications", href: "/applications" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "Locus", href: "/locus" },
      { label: "Crucible", href: "/crucible" },
      { label: "Hardware", href: "/solutions" },
    ],
  },
  {
    heading: "Applications",
    links: [
      { label: "Space", href: "/applications#space" },
      { label: "Defense", href: "/applications#defense" },
      { label: "Drones & UAS", href: "/applications#drones-uas" },
      { label: "Maritime", href: "/applications#maritime" },
      { label: "Emergency Response", href: "/applications#emergency-response" },
      { label: "Industrial IoT", href: "/applications#industrial-iot" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Insights", href: "/insights" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/** Short brand line under the footer logo. */
export const FOOTER_BRAND = {
  tagline: "Resilient networking for environments where connectivity breaks.",
} as const;

/**
 * LinkedIn and X only — no other platforms.
 *
 * `href: null` means the URL is still {{TBD}}. The footer renders those as
 * inert, so an unconfirmed profile can never ship as a link to nowhere.
 */
export const SOCIALS: { label: string; href: string | null }[] = [
  { label: "LinkedIn", href: null },
  { label: "X", href: null },
];

export const OFFICE_LOCATION = "Denver, Colorado, USA";

export const COMPANY_NAME = "Integrated Switching Technologies";

/** Footer vision line + domain icons (inside the footer, above link columns). */
export const FOOTER_STRIP = {
  lead: "IST is building toward a world where every device, on any network, can communicate intelligently — regardless of",
  accent: "topology, protocol, or environment.",
} as const;
