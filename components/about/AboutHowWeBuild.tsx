import { AboutBuildIcon } from "@/components/about/AboutBuildIcons";
import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal } from "@/components/ui/Reveal";
import { HOW_WE_BUILD } from "@/lib/about";

/**
 * How We Build — five FeatureCards matching sitewide card chrome.
 */
export function AboutHowWeBuild() {
  return (
    <section className="section-y bg-ist-bg">
      <Container>
        <Reveal className="text-center">
          <p className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ist-accent-bright">
            {HOW_WE_BUILD.eyebrow}
          </p>
          <h2 className="mt-4 text-[1.75rem] font-semibold leading-[1.2] tracking-tight text-ist-text sm:text-[2rem] lg:text-[2.15rem]">
            {HOW_WE_BUILD.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {HOW_WE_BUILD.items.map((item, index) => (
            <Reveal as="li" key={item.id} index={index % 3} className="h-full min-w-0">
              <FeatureCard
                title={item.title}
                body={item.body}
                align="center"
                icon={<AboutBuildIcon name={item.icon} size={52} />}
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
