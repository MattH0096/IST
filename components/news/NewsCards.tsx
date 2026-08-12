import Image from "next/image";
import Link from "next/link";

import {
  NewsCalendarIcon,
  NewsFilterIcon,
} from "@/components/news/NewsIcons";
import type { ImageAsset } from "@/lib/images";
import { CATEGORY_LABELS, type NewsPost } from "@/lib/news";

export type NewsPostView = NewsPost & {
  /** Resolved on the server (CMS overrides + manifest). */
  imageAsset?: ImageAsset | null;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Horizontal news card — image left, copy right. */
export function NewsCard({ post }: { post: NewsPostView }) {
  const asset = post.imageAsset;

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

export function NewsFeatured({ post }: { post: NewsPostView }) {
  const asset = post.imageAsset;

  return (
    <article className="overflow-hidden rounded-md border border-ist-line bg-[#0a0a0a]">
      <Link href={`/news/${post.slug}`} className="group grid lg:grid-cols-2">
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
