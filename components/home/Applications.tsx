import { ApplicationTile } from "@/components/ui/ApplicationTile";
import { BandBackdrop } from "@/components/ui/BandBackdrop";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { APPLICATIONS } from "@/lib/home";
import { img } from "@/lib/images";

/** §9.1.8 and §9.5 [LOCKED] — tile grid; closer as full-bleed centered band. */
export function Applications() {
  const band = img("band-one-platform");

  return (
    <>
      <section id="applications" className="section-y bg-ist-bg">
        <Container>
          <Reveal variant="expand">
            <SectionHeader
              eyebrow="Applications"
              title={APPLICATIONS.heading}
              lead={APPLICATIONS.lead}
            />
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {APPLICATIONS.tiles.map((tile, i) => (
              <Reveal key={tile.id} as="li" index={i} step={110} variant="rise">
                <ApplicationTile
                  label={tile.label}
                  line={tile.line}
                  image={tile.image}
                  alt={tile.alt}
                  href={`/applications#${tile.id}`}
                  className="h-full"
                />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="group relative isolate overflow-hidden bg-ist-bg" aria-label={APPLICATIONS.closer.heading}>
        <BandBackdrop
          src={band.src}
          width={band.width}
          height={band.height}
          mode="bleed"
          pinLeft
          greyscale
        />
        <Container className="relative z-10 flex min-h-[min(48svh,26rem)] items-center justify-center py-16 sm:min-h-[min(52svh,30rem)] sm:py-20 lg:py-24">
          <Reveal variant="expand" className="w-full">
            <div className="mx-auto w-full max-w-2xl text-center sm:max-w-3xl">
              <h3 className="t-h2 text-balance text-ist-text">{APPLICATIONS.closer.heading}</h3>
              <p className="t-body mx-auto mt-5 max-w-2xl text-pretty text-ist-text/90">
                {APPLICATIONS.closer.body}
              </p>
              <div className="mt-8 flex justify-center">
                <Button href={APPLICATIONS.closer.href} variant="secondary" withArrow>
                  {APPLICATIONS.closer.cta}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
