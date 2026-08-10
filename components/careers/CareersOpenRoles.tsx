import { CareersRoleMark } from "@/components/careers/CareersIcons";
import { Button } from "@/components/ui/Button";
import { ChassisFrame } from "@/components/ui/ChassisFrame";
import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal } from "@/components/ui/Reveal";
import { OPEN_ROLES, OPEN_ROLE_PLACEHOLDERS, ROLES, type Role } from "@/lib/careers";

function RuleTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4">
      <div aria-hidden="true" className="h-px flex-1 bg-ist-accent/55" />
      <h2 className="shrink-0 text-[1.55rem] font-semibold tracking-tight text-ist-text sm:text-[1.75rem]">
        {title}
      </h2>
      <div aria-hidden="true" className="h-px flex-1 bg-ist-accent/55" />
    </div>
  );
}

function RoleCard({ role }: { role: Role }) {
  return (
    <FeatureCard
      title={role.title}
      meta={role.team}
      body={role.summary}
      icon={<CareersRoleMark size={44} />}
      footer={
        <Button
          href={role.applyHref}
          variant="ghost"
          withArrow
          className="!min-h-0 !px-0 text-ist-accent-bright"
        >
          {OPEN_ROLES.learnMore}
        </Button>
      }
    />
  );
}

/** Blank role chrome for review — no invented titles or listings. */
function RoleCardSkeleton() {
  return (
    <div className="feature-card-shell group h-full">
      <ChassisFrame as="article" inert className="h-full" viewportClassName="h-full">
        <div
          aria-hidden="true"
          className="feature-card flex h-full flex-col px-5 py-7 sm:px-6 sm:py-8"
        >
          <span className="inline-flex h-20 w-20 shrink-0 items-center justify-center border border-ist-accent/25 bg-black/40 text-ist-accent/50">
            <CareersRoleMark size={44} />
          </span>
          <span className="mt-6 h-3.5 w-[72%] rounded-sm bg-white/12" />
          <span className="mt-2 h-2.5 w-24 rounded-sm bg-white/8" />
          <span className="mt-4 h-2.5 w-full rounded-sm bg-white/8" />
          <span className="mt-2 h-2.5 w-[88%] rounded-sm bg-white/8" />
          <span className="mt-2 h-2.5 w-[64%] rounded-sm bg-white/8" />
          <span className="mt-auto pt-5 h-3 w-28 rounded-sm bg-ist-accent/20" />
        </div>
      </ChassisFrame>
    </div>
  );
}

/**
 * Open roles grid. Real `ROLES` when present; otherwise blank cards for layout review.
 */
export function CareersOpenRoles() {
  const hasRoles = ROLES.length > 0;

  return (
    <section id="open-roles" className="section-y bg-ist-bg">
      <Container>
        <Reveal>
          <RuleTitle title={OPEN_ROLES.title} />
        </Reveal>

        {hasRoles ? (
          <>
            <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {ROLES.map((role, i) => (
                <Reveal as="li" key={role.slug} index={i % 3} className="h-full">
                  <RoleCard role={role} />
                </Reveal>
              ))}
            </ul>
            <div className="mt-10 flex justify-center">
              <Button href="#open-roles" variant="secondary" withArrow>
                {OPEN_ROLES.viewAll}
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="sr-only">{OPEN_ROLES.emptyBody}</p>
            <ul
              aria-label="Open roles — layout preview"
              className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
            >
              {Array.from({ length: OPEN_ROLE_PLACEHOLDERS }, (_, i) => (
                <Reveal as="li" key={`role-skeleton-${i}`} index={i} className="h-full">
                  <RoleCardSkeleton />
                </Reveal>
              ))}
            </ul>
            <div className="mt-10 flex justify-center">
              <Button href="#open-roles" variant="secondary" withArrow>
                {OPEN_ROLES.viewAll}
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
