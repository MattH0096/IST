import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { NewsIndex } from "@/components/news/NewsIndex";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Container } from "@/components/ui/Container";
import { NEWS_CTA } from "@/lib/cta";

const LEAD = "Stay informed on partnerships, milestones, product updates, and company news.";

export const metadata: Metadata = {
  title: "News — Latest News & Updates",
  description: LEAD,
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="Latest News & Updates"
        lead={LEAD}
        image="news-hero"
        alt="IST news — networked systems and updates"
        mobileFocus="right"
      />

      <section className="section-y bg-ist-bg">
        <Container>
          <NewsIndex />
        </Container>
      </section>

      <ClosingCta copy={NEWS_CTA} />
    </>
  );
}
