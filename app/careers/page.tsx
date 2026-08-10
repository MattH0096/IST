import type { Metadata } from "next";

import { CareersCta } from "@/components/careers/CareersCta";
import { CareersHiringBand } from "@/components/careers/CareersHiringBand";
import { CareersHiringLead } from "@/components/careers/CareersHiringLead";
import { CareersHowWeWork } from "@/components/careers/CareersHowWeWork";
import { CareersOpenRoles } from "@/components/careers/CareersOpenRoles";
import { CareersWhyBuild } from "@/components/careers/CareersWhyBuild";
import { PageHero } from "@/components/layout/PageHero";
import { CAREERS } from "@/lib/careers";

export const metadata: Metadata = {
  title: "Careers — Build Something That Matters",
  description: CAREERS.lead,
};

/**
 * §9.9 — locked hiring line first; culture bands are soft presentation.
 * Open roles stay empty until real openings are added to `ROLES`
 * (blank cards ship for layout review).
 */
export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={CAREERS.titleLines}
        lead={CAREERS.lead}
        video="/video/career.mp4"
      />

      <CareersHiringLead />
      <CareersHiringBand />
      <CareersWhyBuild />
      <CareersOpenRoles />
      <CareersHowWeWork />
      <CareersCta />
    </>
  );
}
