"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  APPLY_FILE,
  EMPTY_APPLY,
  HONEYPOT_FIELD,
  isValidApply,
  validateApplyFile,
  validateCareersApply,
  type CareersApplyErrors,
  type CareersApplyValues,
} from "@/lib/forms/careers-apply-schema";
import { cn } from "@/lib/cn";

export type ApplyRoleOption = {
  slug: string;
  title: string;
};

type Status = "idle" | "sending" | "sent" | "failed";

type Props = {
  roles: ApplyRoleOption[];
};

const labelClass = "text-[0.95rem] font-medium text-ist-accent";
const inputClass =
  "w-full rounded-lg border-0 bg-[#2c2c2c] px-4 py-3 text-ist-text placeholder:text-white/35 " +
  "outline-none ring-0 transition-[box-shadow] focus:shadow-[0_0_0_2px_rgba(250,98,40,0.55)] " +
  "aria-[invalid=true]:shadow-[0_0_0_2px_rgba(250,98,40,0.9)]";

/**
 * Careers apply plate — field set matches the approved application mock.
 */
export function CareersApplyForm({ roles }: Props) {
  const prefix = useId();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role") ?? "";
  const [values, setValues] = useState<CareersApplyValues>(EMPTY_APPLY);
  const [errors, setErrors] = useState<CareersApplyErrors>({});
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const match = roles.find((r) => r.slug === roleParam);
    if (!match) return;
    setValues((current) => ({
      ...current,
      roleSlug: match.slug,
      roleTitle: match.title,
      subject: current.subject.trim() ? current.subject : `Application — ${match.title}`,
    }));
  }, [roleParam, roles]);

  const fieldId = (name: string) => `${prefix}-${name}`;

  function setField<K extends keyof CareersApplyValues>(name: K, value: CareersApplyValues[K]) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!(name in current)) return current;
      const next = { ...current };
      delete next[name as keyof CareersApplyErrors];
      return next;
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateCareersApply(values);
    const fileErr = validateApplyFile(file);
    if (fileErr) found.file = fileErr;
    setErrors(found);
    if (!isValidApply(found)) {
      const first = Object.keys(found)[0];
      if (first) document.getElementById(fieldId(first))?.focus();
      return;
    }

    setStatus("sending");
    setFailure("");

    try {
      const body = new FormData();
      body.set("firstName", values.firstName);
      body.set("lastName", values.lastName);
      body.set("email", values.email);
      body.set("newsletter", values.newsletter ? "true" : "false");
      body.set("subject", values.subject);
      body.set("message", values.message);
      body.set("roleSlug", values.roleSlug);
      body.set("roleTitle", values.roleTitle);
      body.set(HONEYPOT_FIELD, honeypot.current?.value ?? "");
      if (file) body.set("file", file);

      const response = await fetch("/api/careers/apply", { method: "POST", body });

      if (response.status === 422) {
        const data = (await response.json()) as { errors?: CareersApplyErrors };
        setErrors(data.errors ?? {});
        setStatus("idle");
        return;
      }

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setFailure(data.error ?? "Something went wrong. Please try again.");
        setStatus("failed");
        return;
      }

      setValues(EMPTY_APPLY);
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      setStatus("sent");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setFailure("We could not reach the server. Please check your connection and try again.");
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="rounded-3xl bg-white px-6 py-10 text-center text-black sm:px-10 sm:py-12"
      >
        <h3 className="text-[1.35rem] font-semibold tracking-tight">Application sent.</h3>
        <p className="mt-3 text-[0.95rem] text-black/70">
          Thanks — we received your message and will follow up if there is a fit.
        </p>
        <button
          type="button"
          className="mt-8 rounded-full bg-ist-accent px-8 py-3 text-[0.95rem] font-semibold text-white"
          onClick={() => setStatus("idle")}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-3xl bg-white px-5 py-8 text-black shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:px-8 sm:py-10 lg:px-10"
      noValidate
    >
      {values.roleTitle ? (
        <p className="mb-6 text-[0.9rem] font-medium text-ist-accent">
          Applying for: <span className="text-black">{values.roleTitle}</span>
        </p>
      ) : null}

      <div className="flex flex-col gap-6">
        <fieldset>
          <legend className={labelClass}>Name</legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor={fieldId("firstName")} className={labelClass}>
                First Name (required)
              </label>
              <input
                id={fieldId("firstName")}
                className={inputClass}
                autoComplete="given-name"
                value={values.firstName}
                aria-invalid={Boolean(errors.firstName)}
                onChange={(e) => setField("firstName", e.target.value)}
              />
              <p role="alert" className="min-h-5 text-[0.8rem] text-ist-accent">
                {errors.firstName}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={fieldId("lastName")} className={labelClass}>
                Last Name (required)
              </label>
              <input
                id={fieldId("lastName")}
                className={inputClass}
                autoComplete="family-name"
                value={values.lastName}
                aria-invalid={Boolean(errors.lastName)}
                onChange={(e) => setField("lastName", e.target.value)}
              />
              <p role="alert" className="min-h-5 text-[0.8rem] text-ist-accent">
                {errors.lastName}
              </p>
            </div>
          </div>
        </fieldset>

        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("email")} className={labelClass}>
            Email (required)
          </label>
          <input
            id={fieldId("email")}
            type="email"
            className={inputClass}
            autoComplete="email"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            onChange={(e) => setField("email", e.target.value)}
          />
          <p role="alert" className="min-h-5 text-[0.8rem] text-ist-accent">
            {errors.email}
          </p>
        </div>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            className="h-5 w-5 accent-ist-accent"
            checked={values.newsletter}
            onChange={(e) => setField("newsletter", e.target.checked)}
          />
          <span className={labelClass}>Sign up for news and updates</span>
        </label>

        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("subject")} className={labelClass}>
            Subject (required)
          </label>
          <input
            id={fieldId("subject")}
            className={inputClass}
            value={values.subject}
            aria-invalid={Boolean(errors.subject)}
            onChange={(e) => setField("subject", e.target.value)}
          />
          <p role="alert" className="min-h-5 text-[0.8rem] text-ist-accent">
            {errors.subject}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("message")} className={labelClass}>
            Message / Cover Letter (required)
          </label>
          <textarea
            id={fieldId("message")}
            className={cn(inputClass, "min-h-36 resize-y")}
            rows={6}
            value={values.message}
            aria-invalid={Boolean(errors.message)}
            onChange={(e) => setField("message", e.target.value)}
          />
          <p role="alert" className="min-h-5 text-[0.8rem] text-ist-accent">
            {errors.message}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className={labelClass} id={fieldId("file-label")}>
            File Upload
          </span>
          <input
            ref={fileRef}
            id={fieldId("file")}
            type="file"
            className="sr-only"
            accept={APPLY_FILE.accept}
            aria-labelledby={fieldId("file-label")}
            onChange={(e) => {
              const next = e.target.files?.[0] ?? null;
              setFile(next);
              setErrors((current) => {
                if (!current.file) return current;
                const copy = { ...current };
                delete copy.file;
                return copy;
              });
            }}
          />
          <button
            type="button"
            className="flex min-h-28 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-black/55 bg-transparent px-4 py-6 transition-colors hover:border-ist-accent"
            onClick={() => fileRef.current?.click()}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-[1.6rem] leading-none text-white">
              +
            </span>
            <span className={labelClass}>{file ? file.name : "Add a File"}</span>
          </button>
          <p role="alert" className="min-h-5 text-[0.8rem] text-ist-accent">
            {errors.file}
          </p>
        </div>
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={fieldId("hp")}>Company website</label>
        <input
          ref={honeypot}
          id={fieldId("hp")}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {failure ? (
        <p role="alert" className="mt-4 text-[0.9rem] text-ist-accent">
          {failure}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 rounded-full bg-ist-accent px-10 py-3.5 text-[1rem] font-semibold text-white transition-opacity disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
