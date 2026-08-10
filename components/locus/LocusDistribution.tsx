import Image from "next/image";

import { ChassisFrame } from "@/components/ui/ChassisFrame";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/lib/images";

/**
 * Assured Distribution in Action — framed diagram, greyscale → color on hover.
 */
export function LocusDistribution() {
  const asset = img("locus-distribution");

  return (
    <section className="section-y bg-ist-bg">
      <Container>
        <Reveal variant="expand">
          <header className="mx-auto max-w-3xl text-center">
            <h2 className="t-h2 text-balance text-ist-text">Assured Distribution in Action</h2>
            <p className="mt-4 text-[1.05rem] text-ist-muted sm:text-[1.15rem]">
              Store. Route. Adapt. Deliver.
            </p>
          </header>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10" variant="expand">
          <ChassisFrame as="figure" media className="w-full">
            <Image
              src={asset.src}
              width={asset.width}
              height={asset.height}
              alt="Locus assured distribution across satellite, drone, ground vehicle, relay, and ship nodes — connected, intermittent, and absent links with data stores and packets in transit."
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="h-auto w-full"
              priority={false}
            />
          </ChassisFrame>
        </Reveal>
      </Container>
    </section>
  );
}
