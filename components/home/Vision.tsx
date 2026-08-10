import { PageCta } from "@/components/ui/PageCta";
import { HOME_CTA } from "@/lib/cta";

/** Homepage closing CTA — shared plate; homepage vision copy. */
export function Vision() {
  return <PageCta copy={HOME_CTA} />;
}
