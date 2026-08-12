"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Could not sign in.");
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md border border-ist-line bg-black p-6 sm:p-8">
      <h1 className="text-[1.35rem] font-semibold tracking-tight">Sign in</h1>
      <p className="mt-2 text-[0.9rem] text-ist-muted">
        Use the admin password from your hosting environment.
      </p>

      <label className="mt-6 block text-[0.75rem] font-medium uppercase tracking-[0.08em] text-ist-dim">
        Password
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full border border-ist-line bg-[#0a0a0a] px-3 py-2.5 text-[0.95rem] text-ist-text outline-none focus:border-ist-accent"
          required
        />
      </label>

      {error ? <p className="mt-3 text-[0.85rem] text-ist-accent-bright">{error}</p> : null}

      <button
        type="submit"
        disabled={busy}
        className="mt-6 w-full bg-ist-accent px-4 py-2.5 text-[0.95rem] font-medium text-white hover:bg-ist-accent-deep disabled:opacity-60"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
