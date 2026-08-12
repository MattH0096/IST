"use client";

import { useRouter } from "next/navigation";

export function AdminLogout() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="rounded-sm border border-ist-line px-3 py-1.5 text-[0.85rem] text-ist-muted hover:border-ist-accent hover:text-ist-text"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
    >
      Log out
    </button>
  );
}
