import Link from "next/link";
import type { ReactNode } from "react";

import { glassPanel } from "@/components/ui/GlassSupportPanel";
import { BandBackdrop } from "@/components/ui/BandBackdrop";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { img } from "@/lib/images";

type Props = {
  children: ReactNode;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
};

/**
 * Closing CTA — full-bleed image background, center-aligned copy + dual buttons.
 */
export function CtaCard({
  children,
  primaryCta,
  primaryHref,
  secondaryCta,
  secondaryHref,
}: Props) {
  const asset = img("band-vision");

  return (
    <section className="group relative isolate overflow-hidden bg-ist-bg">
      <BandBackdrop
        src={asset.src}
        width={asset.width}
        height={asset.height}
        mode="bleed"
        pinLeft
        greyscale
      />

      <Container className="relative z-10 flex min-h-[min(52svh,28rem)] items-center justify-center py-16 sm:min-h-[min(56svh,32rem)] sm:py-20 lg:py-24">
        <Reveal variant="expand" className="w-full">
          <div className="mx-auto w-full max-w-3xl text-center sm:max-w-4xl">
            {children}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
              <Link
                href={primaryHref}
                className="btn btn--primary btn--lg inline-flex items-center gap-2.5"
              >
                {primaryCta}
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={secondaryHref}
                className={cn(
                  glassPanel,
                  "inline-flex min-h-11 items-center gap-2.5 border-white/25 px-6 py-3 text-[0.95rem] font-medium text-ist-text transition-[border-color,background-color] duration-[180ms] ease-ist hover:border-ist-accent hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ist-focus sm:px-8 sm:text-base",
                )}
              >
                {secondaryCta}
                <span aria-hidden="true" className="text-ist-accent-bright">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
