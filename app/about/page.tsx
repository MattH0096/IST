import type { Metadata } from "next";

import { AboutHowWeBuild } from "@/components/about/AboutHowWeBuild";
import { AboutMissionVision } from "@/components/about/AboutMissionVision";
import { AboutStatement } from "@/components/about/AboutStatement";
import { PageHero } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ABOUT } from "@/lib/about";
import { ABOUT_CTA } from "@/lib/cta";

export const metadata: Metadata = {
  title: "About — The Engineering Behind IST",
  description: ABOUT.lead,
};

/**
 * §9.6. Deliberately contains no founder name, biography, employer history or
 * headshot, and no counted metrics of any kind — no years of experience,
 * programs supported, or jurisdictions. The spec forbids all of it, and there is
 * nothing here to fill the gap with.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title={ABOUT.title}
        lead={ABOUT.lead}
        video={["/video/about-1.mp4", "/video/about-2.mp4"]}
      />

      <AboutStatement />
      <AboutMissionVision />
      <AboutHowWeBuild />
      <ClosingCta copy={ABOUT_CTA} />
    </>
  );
}
