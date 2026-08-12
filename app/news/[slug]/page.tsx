import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { NewsCalendarIcon, NewsFilterIcon } from "@/components/news/NewsIcons";
import { Container } from "@/components/ui/Container";
import { getSiteContent } from "@/lib/cms/content";
import { CATEGORY_LABELS } from "@/lib/news";
import { tryImg } from "@/lib/images.server";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getSiteContent();
  const post = content.news.posts.find((p) => p.slug === slug);
  if (!post) return { title: "News" };
  return {
    title: `${post.title} — News`,
    description: post.excerpt,
  };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const content = await getSiteContent();
  const post = content.news.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const asset = tryImg(post.image);
  const paragraphs = post.body
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const dateLabel = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="section-y bg-ist-bg">
      <Container className="max-w-3xl">
        <p className="mb-8">
          <Link
            href="/news"
            className="text-[0.85rem] text-ist-muted transition-colors hover:text-ist-text"
          >
            ← All news
          </Link>
        </p>

        <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ist-accent-bright">
          {CATEGORY_LABELS[post.category]}
        </p>
        <h1 className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-tight text-ist-text sm:text-[2.1rem]">
          {post.title}
        </h1>
        <p className="mt-4 inline-flex flex-wrap items-center gap-2 text-[0.85rem] text-ist-dim">
          <NewsFilterIcon name={post.category} size={14} className="text-ist-muted" />
          <span className="inline-flex items-center gap-1.5">
            <NewsCalendarIcon className="text-ist-muted" />
            <time dateTime={post.date}>{dateLabel}</time>
          </span>
        </p>

        {asset ? (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden border border-ist-line bg-black">
            <Image
              src={asset.src}
              width={asset.width}
              height={asset.height}
              alt=""
              className="h-full w-full object-cover"
              priority
            />
          </div>
        ) : null}

        {post.excerpt ? (
          <p className="mt-8 text-[1.05rem] leading-relaxed text-ist-muted">{post.excerpt}</p>
        ) : null}

        <div className="mt-8 flex flex-col gap-5 text-[1rem] leading-relaxed text-ist-text/90">
          {paragraphs.length > 0 ? (
            paragraphs.map((para) => <p key={para.slice(0, 48)}>{para}</p>)
          ) : (
            <p className="text-ist-muted">Full story coming soon.</p>
          )}
        </div>
      </Container>
    </article>
  );
}
