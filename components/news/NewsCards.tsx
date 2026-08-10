import Image from "next/image";
import Link from "next/link";

import {
  NewsCalendarIcon,
  NewsFilterIcon,
} from "@/components/news/NewsIcons";
import { cn } from "@/lib/cn";
import { img, type ImageKey } from "@/lib/images";
import { CATEGORY_LABELS, type NewsPost } from "@/lib/news";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Horizontal news card — image left, copy right. */
export function NewsCard({ post }: { post: NewsPost }) {
  const asset = post.image ? img(post.image as ImageKey) : null;

  return (
    <article className="group overflow-hidden rounded-md border border-ist-line bg-[#0a0a0a] transition-[border-color] duration-[180ms] ease-ist hover:border-ist-line-strong">
      <Link
        href={`/news/${post.slug}`}
        className="grid min-h-[9.5rem] grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] sm:min-h-[10.5rem]"
      >
        <div className="relative min-h-[9.5rem] bg-ist-raised sm:min-h-[10.5rem]">
          {asset ? (
            <Image
              src={asset.src}
              width={asset.width}
              height={asset.height}
              alt=""
              sizes="(min-width: 1024px) 18vw, 40vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#141414_0%,#0a0a0a_55%,#1a120e_100%)]" />
          )}
        </div>

        <div className="flex flex-col px-4 py-3.5 sm:px-5 sm:py-4">
          <p className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-ist-accent-bright">
            {CATEGORY_LABELS[post.category]}
          </p>
          <h3 className="mt-2 text-[0.95rem] font-semibold leading-snug tracking-tight text-ist-text sm:text-[1.02rem]">
            {post.title}
          </h3>
          <p className="t-small mt-2 line-clamp-2 text-ist-muted">{post.excerpt}</p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
            <p className="inline-flex items-center gap-1.5 text-[0.72rem] text-ist-dim">
              <NewsCalendarIcon className="text-ist-muted" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
            <span className="inline-flex items-center gap-1 text-[0.78rem] font-medium text-ist-accent-bright transition-transform duration-[180ms] ease-ist group-hover:translate-x-0.5">
              Read More <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/** Blank overview card — layout chrome only, no fabricated headlines. */
export function NewsCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="overflow-hidden rounded-md border border-ist-line bg-[#0a0a0a]"
    >
      <div className="grid min-h-[9.5rem] grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] sm:min-h-[10.5rem]">
        <div className="min-h-[9.5rem] bg-[#141414] sm:min-h-[10.5rem]" />
        <div className="flex flex-col px-4 py-3.5 sm:px-5 sm:py-4">
          <span className="h-2.5 w-16 rounded-sm bg-ist-accent/25" />
          <span className="mt-3 h-3.5 w-[88%] rounded-sm bg-white/12" />
          <span className="mt-2 h-3.5 w-[70%] rounded-sm bg-white/10" />
          <span className="mt-3 h-2.5 w-full rounded-sm bg-white/8" />
          <span className="mt-1.5 h-2.5 w-[82%] rounded-sm bg-white/8" />
          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="h-2.5 w-24 rounded-sm bg-white/8" />
            <span className="h-2.5 w-16 rounded-sm bg-ist-accent/20" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function NewsFeatured({ post }: { post: NewsPost }) {
  const asset = post.image ? img(post.image as ImageKey) : null;

  return (
    <article className="overflow-hidden rounded-md border border-ist-line bg-[#0a0a0a]">
      <Link
        href={`/news/${post.slug}`}
        className="group grid lg:grid-cols-2"
      >
        <div className="relative min-h-[14rem] bg-ist-raised sm:min-h-[16rem] lg:min-h-[18rem]">
          {asset ? (
            <Image
              src={asset.src}
              width={asset.width}
              height={asset.height}
              alt=""
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#141414_0%,#0a0a0a_50%,#1a120e_100%)]" />
          )}
          <span className="absolute left-3 top-3 rounded-sm bg-black/65 px-2.5 py-1 text-[0.68rem] font-medium text-ist-text backdrop-blur-sm">
            Featured
          </span>
        </div>

        <div className="flex flex-col px-5 py-6 sm:px-7 sm:py-8 lg:px-8">
          <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ist-accent-bright">
            Featured Story
          </p>
          <h2 className="mt-3 text-[1.35rem] font-semibold leading-snug tracking-tight text-ist-text sm:text-[1.55rem] lg:text-[1.7rem]">
            {post.title}
          </h2>
          <p className="t-body mt-3 max-w-xl text-ist-muted">{post.excerpt}</p>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
            <p className="inline-flex items-center gap-2 text-[0.78rem] text-ist-dim">
              <NewsFilterIcon name={post.category} size={14} className="text-ist-muted" />
              <span>{CATEGORY_LABELS[post.category]}</span>
              <span aria-hidden="true" className="text-ist-line-strong">
                ·
              </span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
            <span className="inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-ist-accent-bright transition-transform duration-[180ms] ease-ist group-hover:translate-x-0.5">
              Read More <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/** Blank featured plate for the empty overview. */
export function NewsFeaturedSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="overflow-hidden rounded-md border border-ist-line bg-[#0a0a0a]"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[14rem] bg-[#141414] sm:min-h-[16rem] lg:min-h-[18rem]">
          <span className="absolute left-3 top-3 rounded-sm bg-black/55 px-2.5 py-1 text-[0.68rem] text-ist-text/70">
            Featured
          </span>
        </div>
        <div className="flex flex-col px-5 py-6 sm:px-7 sm:py-8 lg:px-8">
          <span className="h-2.5 w-28 rounded-sm bg-ist-accent/25" />
          <span className="mt-4 h-5 w-[92%] rounded-sm bg-white/12" />
          <span className="mt-2.5 h-5 w-[70%] rounded-sm bg-white/10" />
          <span className="mt-5 h-2.5 w-full rounded-sm bg-white/8" />
          <span className="mt-2 h-2.5 w-[95%] rounded-sm bg-white/8" />
          <span className="mt-2 h-2.5 w-[78%] rounded-sm bg-white/8" />
          <div className="mt-auto flex items-center justify-between pt-10">
            <span className="h-2.5 w-36 rounded-sm bg-white/8" />
            <span className="h-2.5 w-20 rounded-sm bg-ist-accent/20" />
          </div>
        </div>
      </div>
    </article>
  );
}
