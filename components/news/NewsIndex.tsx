"use client";

import { useMemo, useState } from "react";

import {
  NewsCard,
  NewsCardSkeleton,
  NewsFeatured,
  NewsFeaturedSkeleton,
} from "@/components/news/NewsCards";
import {
  NewsChevronIcon,
  NewsFilterIcon,
  NewsRefreshIcon,
} from "@/components/news/NewsIcons";
import { cn } from "@/lib/cn";
import { CATEGORY_LABELS, NEWS_CATEGORIES, POSTS, type NewsCategory } from "@/lib/news";

type Filter = "all" | NewsCategory;

const FILTERS: Filter[] = ["all", ...NEWS_CATEGORIES];
const LABELS: Record<Filter, string> = { all: "All", ...CATEGORY_LABELS };

/** Blank overview grid size when POSTS is empty — layout proof only. */
const OVERVIEW_CARD_COUNT = 8;

/**
 * News index — filter chrome, featured plate, 2-col card grid.
 *
 * `POSTS` ships empty by design. Blank skeleton cards show the overview layout
 * without inventing headlines. Real posts replace skeletons as they are added.
 */
export function NewsIndex() {
  const [active, setActive] = useState<Filter>("all");

  const posts = useMemo(() => {
    const sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
    return active === "all" ? sorted : sorted.filter((post) => post.category === active);
  }, [active]);

  const featured = posts[0] ?? null;
  const rest = featured ? posts.slice(1) : [];
  const empty = posts.length === 0;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter news by category"
        className="flex flex-wrap gap-2"
      >
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

      <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
        {empty ? (
          <>
            <p className="sr-only">
              {active === "all"
                ? "No posts yet."
                : `No posts in ${LABELS[active].toLowerCase()} yet.`}
            </p>
            <NewsFeaturedSkeleton />
            <ul className="grid gap-4 sm:gap-5 lg:grid-cols-2">
              {Array.from({ length: OVERVIEW_CARD_COUNT }, (_, i) => (
                <li key={i}>
                  <NewsCardSkeleton />
                </li>
              ))}
            </ul>
          </>
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

      <nav
        aria-label="News pagination"
        className="mt-10 flex items-center justify-center gap-1.5 sm:mt-12"
      >
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ist-dim"
          aria-hidden="true"
        >
          <NewsChevronIcon dir="left" />
        </span>
        {[1, 2, 3, 4].map((page) => (
          <span
            key={page}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full text-[0.85rem]",
              page === 1
                ? "border border-ist-accent text-ist-accent-bright"
                : "text-ist-muted",
            )}
            aria-current={page === 1 ? "page" : undefined}
          >
            {page}
          </span>
        ))}
        <span className="px-1 text-ist-dim" aria-hidden="true">
          …
        </span>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[0.85rem] text-ist-muted">
          12
        </span>
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ist-dim"
          aria-hidden="true"
        >
          <NewsChevronIcon dir="right" />
        </span>
      </nav>

      <div className="mt-6 flex justify-center sm:mt-8">
        <button
          type="button"
          disabled
          className="inline-flex min-h-11 w-full max-w-md items-center justify-center gap-2.5 rounded-md border border-ist-accent/55 px-6 py-3 text-[0.9rem] font-medium text-ist-accent-bright opacity-80"
        >
          <NewsRefreshIcon />
          Load More Articles
        </button>
      </div>
    </div>
  );
}
