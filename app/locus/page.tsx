import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { LocusDistribution } from "@/components/locus/LocusDistribution";
import { LocusFlow } from "@/components/locus/LocusFlow";
import { LocusImpact } from "@/components/locus/LocusImpact";
import { LocusWhyChoose } from "@/components/locus/LocusWhyChoose";
import { LOCUS_CTA } from "@/lib/cta";
import { LOCUS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Locus — Assured Distribution for the Real World",
  description: LOCUS.lead,
};

export default function LocusPage() {
  return (
    <>
      <PageHero
        eyebrow="Locus — Current, shipping"
        title={
          <>
            <span className="block">
              <span className="text-ist-accent-bright">Locus</span>
              {": Assured Distribution"}
            </span>
            <span className="block">{LOCUS.titleLines[1]}</span>
          </>
        }
        lead={LOCUS.lead}
        video="/video/Locus_Assured_Distribution_fo.mp4"
      />

      <LocusFlow />

      <LocusDistribution />

      <LocusImpact />

      <LocusWhyChoose />

      <ClosingCta copy={LOCUS_CTA} />
    </>
  );
}
