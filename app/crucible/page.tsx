import type { Metadata } from "next";

import { CrucibleFlow } from "@/components/crucible/CrucibleFlow";
import { CrucibleFuture } from "@/components/crucible/CrucibleFuture";
import { CrucibleQuestions } from "@/components/crucible/CrucibleQuestions";
import { PageHero } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { CRUCIBLE_CTA } from "@/lib/cta";
import { CRUCIBLE } from "@/lib/products";

export const metadata: Metadata = {
  title: "Crucible — Simulate. Validate. Deploy with Confidence.",
  description: CRUCIBLE.lead,
};

export default function CruciblePage() {
  return (
    <>
      <PageHero
        eyebrow="Crucible — Current, shipping"
        title={
          <>
            <span className="block">
              <span className="text-ist-accent-bright">Crucible</span>
              {": Simulate. Validate."}
            </span>
            <span className="block">{CRUCIBLE.titleLines[1]}</span>
          </>
        }
        leadIntro={CRUCIBLE.leadIntro}
        lead={CRUCIBLE.lead}
        video="/video/Crucible_Simulate_Validate.mp4"
      />

      <CrucibleFlow />

      <CrucibleQuestions />

      <CrucibleFuture />

      <ClosingCta copy={CRUCIBLE_CTA} />
    </>
  );
}
