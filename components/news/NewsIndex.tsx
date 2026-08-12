"use client";

import { useMemo, useState } from "react";

import { NewsCard, NewsFeatured, type NewsPostView } from "@/components/news/NewsCards";
import { NewsFilterIcon } from "@/components/news/NewsIcons";
import { cn } from "@/lib/cn";
import {
  CATEGORY_LABELS,
  NEWS_CATEGORIES,
  type NewsCategory,
} from "@/lib/news";

type Filter = "all" | NewsCategory;

const FILTERS: Filter[] = ["all", ...NEWS_CATEGORIES];
const LABELS: Record<Filter, string> = { all: "All", ...CATEGORY_LABELS };

type Props = {
  posts: NewsPostView[];
};

/**
 * News index — filters + featured + card grid.
 * Empty list shows a quiet message (no skeleton placeholders).
 */
export function NewsIndex({ posts: source }: Props) {
  const [active, setActive] = useState<Filter>("all");

  const posts = useMemo(() => {
    const sorted = [...source].sort((a, b) => b.date.localeCompare(a.date));
    return active === "all" ? sorted : sorted.filter((post) => post.category === active);
  }, [active, source]);

  const featured = posts[0] ?? null;
  const rest = featured ? posts.slice(1) : [];
  const empty = posts.length === 0;

  return (
    <div>
      {source.length > 0 ? (
        <div role="group" aria-label="Filter news by category" className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const selected = filter === active;

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(filter)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md border px-3.5 py-2 text-[0.8rem] font-medium transition-colors duration-[180ms] ease-ist sm:px-4",
                  selected
                    ? "border-ist-accent bg-ist-accent/10 text-ist-text"
                    : "border-transparent text-ist-muted hover:border-ist-line hover:text-ist-text",
                )}
              >
                <NewsFilterIcon
                  name={filter}
                  className={selected ? "text-ist-accent-bright" : "text-ist-dim"}
                />
                {LABELS[filter]}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className={cn(source.length > 0 ? "mt-8 sm:mt-10" : "", "space-y-5 sm:space-y-6")}>
        {empty ? (
          <p className="max-w-xl text-[0.95rem] leading-relaxed text-ist-muted">
            {source.length === 0
              ? "No news posts yet. Check back soon."
              : `No posts in ${LABELS[active].toLowerCase()} yet.`}
          </p>
        ) : (
          <>
            {featured ? <NewsFeatured post={featured} /> : null}
            {rest.length > 0 ? (
              <ul className="grid gap-4 sm:gap-5 lg:grid-cols-2">
                {rest.map((post) => (
                  <li key={post.slug}>
                    <NewsCard post={post} />
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
