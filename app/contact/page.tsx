import type { Metadata } from "next";

import { ContactAside } from "@/components/contact/ContactAside";
import { ContactHelpBand } from "@/components/contact/ContactHelpBand";
import { ContactPillars } from "@/components/contact/ContactPillars";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const TITLE = "Let's Build the Future of Resilient Communication Together.";
const LEAD =
  "Whether you're evaluating a mission challenge, exploring an investment, or looking to partner — we'd love to hear from you.";

export const metadata: Metadata = {
  title: "Contact IST",
  description: LEAD,
};

/**
 * §9.10. There is no email address anywhere on this page, in the markup, or in
 * schema — the form is the only route in, and the destination address lives in
 * an environment variable read on the server. See `lib/server/deliver.ts`.
 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={TITLE}
        lead={LEAD}
        video="/video/Contact_us_page_backgro.mp4"
      />

      <section className="section-y bg-ist-bg">
        <Container>
          <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-6">
            <Reveal className="h-full">
              <h2 className="sr-only">Send a message</h2>
              <ContactForm />
            </Reveal>

            <Reveal index={1} className="h-full">
              <ContactAside />
            </Reveal>
          </div>

          <Reveal index={2} className="mt-5 lg:mt-6">
            <ContactPillars />
          </Reveal>
        </Container>
      </section>

      <ContactHelpBand />
    </>
  );
}
