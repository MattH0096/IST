/**
 * §9.7 News.
 *
 * Categories and labels stay here. Posts are managed in the CMS
 * (`content/overrides.json` → news.posts) via `/admin/news`.
 */

export const NEWS_CATEGORIES = ["company", "partnerships", "product", "media"] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsPost = {
  id?: string;
  slug: string;
  title: string;
  category: NewsCategory;
  /** ISO 8601 date, e.g. "2026-07-14". */
  date: string;
  excerpt: string;
  /** Image key (manifest or upload override). */
  image?: string;
  /** Plain text body; paragraphs separated by blank lines. */
  body: string;
};

/** @deprecated Posts live in CMS — kept empty for type imports only. */
export const POSTS: NewsPost[] = [];

export const CATEGORY_LABELS: Record<NewsCategory, string> = {
  company: "Company",
  partnerships: "Partnerships",
  product: "Product",
  media: "Media",
};
