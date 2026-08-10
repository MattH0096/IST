import Image from "next/image";

import { PsIcon } from "@/components/icons/ProblemSolutionIcons";
import { ChassisFrame } from "@/components/ui/ChassisFrame";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SOLUTION } from "@/lib/home";
import { img } from "@/lib/images";

/**
 * §9.1.4 — Solution. Split: outside → in.
 */
export function Solution() {
  const asset = img("section-solution");

  return (
    <section id="solution" className="section-y bg-ist-bg">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal variant="fromLeft">
            <ChassisFrame media inert>
              <Image
                src={asset.src}
                width={asset.width}
                height={asset.height}
                alt="Satellite, drone, ship, ground vehicle and operators linked by orange network paths across coastal terrain."
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </ChassisFrame>
          </Reveal>

          <Reveal index={1} step={80} className="min-w-0" variant="fromRight">
            <p className="t-eyebrow flex items-center gap-2.5 text-ist-accent-bright">
              <PsIcon name="markSolution" size={18} className="shrink-0 text-ist-accent-bright" />
              The Solution
            </p>
            <h2 className="ps-heading mt-5 text-ist-text">
              <span className="block">{SOLUTION.headingLines[0]}</span>
              <span className="block">{SOLUTION.headingLines[1]}</span>
            </h2>

            <p className="mt-6 text-[0.95rem] leading-relaxed text-ist-text sm:text-base">
              {SOLUTION.body}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
