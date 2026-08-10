/**
 * §9.7 News.
 *
 * Design and filter system only. `POSTS` ships empty by design — the spec
 * forbids placeholder headlines, so the page proves its empty state with blank
 * skeleton cards (overview layout) instead of inventing copy. Add real entries
 * here and the featured plate, filters, grid, and counts all work with no
 * further changes.
 */

export const NEWS_CATEGORIES = ["company", "partnerships", "product", "media"] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsPost = {
  slug: string;
  title: string;
  category: NewsCategory;
  /** ISO 8601 date, e.g. "2026-07-14". */
  date: string;
  excerpt: string;
  /** Key into the image manifest. Omit for a text-only post. */
  image?: string;
  /** MDX source. */
  body: string;
};

export const POSTS: NewsPost[] = [];

export const CATEGORY_LABELS: Record<NewsCategory, string> = {
  company: "Company",
  partnerships: "Partnerships",
  product: "Product",
  media: "Media",
};
