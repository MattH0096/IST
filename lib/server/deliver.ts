import "server-only";

/**
 * Outbound delivery for form submissions.
 *
 * {{TBD}} — no email provider or CRM has been chosen yet. Rather than guess at
 * one, this posts a JSON payload to a webhook named by `LEAD_WEBHOOK_URL`, which
 * every candidate (Resend, Postmark, a Zapier/Make hook, an internal endpoint)
 * can sit behind. `LEAD_INBOX` names the destination address and is passed
 * through in the payload; it is never rendered, so no address reaches the markup.
 *
 * Behaviour when unconfigured is intentionally split:
 *   development — log and succeed, so the flow can be exercised end to end
 *   production  — throw, because silently discarding a sales enquiry is worse
 *                 than showing the sender an honest failure
 */

export type Lead = {
  kind: "contact" | "whitepaper" | "subscribe";
  submittedAt: string;
  fields: Record<string, string>;
};

export class DeliveryNotConfiguredError extends Error {
  constructor() {
    super("LEAD_WEBHOOK_URL is not set, so the submission could not be delivered.");
    this.name = "DeliveryNotConfiguredError";
  }
}

export async function deliverLead(lead: Lead): Promise<void> {
  const endpoint = process.env.LEAD_WEBHOOK_URL;

  if (!endpoint) {
    if (process.env.NODE_ENV === "production") throw new DeliveryNotConfiguredError();
    console.info("[lead] delivery not configured — payload was:", lead);
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...lead, inbox: process.env.LEAD_INBOX ?? null }),
    // A form submission should fail fast rather than hold the request open.
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Lead webhook responded ${response.status}`);
  }
}
