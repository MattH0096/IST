import type { Metadata } from "next";

import { FeaturedResearch } from "@/components/insights/FeaturedResearch";
import { FuturePublications } from "@/components/insights/FuturePublications";
import { InsightsSubscribe } from "@/components/insights/InsightsSubscribe";
import { PageHero } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { INSIGHTS_CTA } from "@/lib/cta";
import { INSIGHTS_INTRO, PAPERS } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description: INSIGHTS_INTRO,
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Insights"
        lead={INSIGHTS_INTRO}
        image="insights-hero"
        alt="Abstract networked research field — IST Insights"
        mobileFocus="right"
      />

      <section className="section-y bg-ist-bg">
        <Container>
          {PAPERS.map((paper, i) => (
            <Reveal key={paper.slug} index={i} variant="expand">
              <FeaturedResearch paper={paper} />
            </Reveal>
          ))}
        </Container>
      </section>

      <FuturePublications />
      <InsightsSubscribe />
      <ClosingCta copy={INSIGHTS_CTA} />
    </>
  );
}
