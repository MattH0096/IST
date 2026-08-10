import type { Metadata } from "next";

import { Applications } from "@/components/home/Applications";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Problem } from "@/components/home/Problem";
import { ProductSpotlight } from "@/components/home/ProductSpotlight";
import { Solution } from "@/components/home/Solution";
import { StackSignal } from "@/components/home/StackSignal";
import { Vision } from "@/components/home/Vision";
import { PRODUCTS } from "@/lib/home";

export const metadata: Metadata = {
  title: "Every Device. Any Network.",
  description:
    "IST intelligently stores, routes, and delivers information through changing networks until every intended destination receives what it needs.",
};

/** Sections run in the order §9.1 fixes them, alternating bg / surface for rhythm. */
export default function HomePage() {
  const [locus, crucible] = PRODUCTS;

  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <ProductSpotlight {...locus} surface="surface" />
      <ProductSpotlight {...crucible} surface="bg" flip />
      <Applications />
      <StackSignal />
      <Vision />
    </>
  );
}
