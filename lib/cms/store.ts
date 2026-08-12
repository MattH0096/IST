import "server-only";

import { promises as fs } from "fs";
import path from "path";

import type { SiteOverrides } from "@/lib/cms/types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const OVERRIDES_PATH = path.join(CONTENT_DIR, "overrides.json");

async function ensureDir() {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
}

export async function readOverrides(): Promise<SiteOverrides> {
  try {
    const raw = await fs.readFile(OVERRIDES_PATH, "utf8");
    return JSON.parse(raw) as SiteOverrides;
  } catch {
    return {};
  }
}

export async function writeOverrides(next: SiteOverrides): Promise<SiteOverrides> {
  await ensureDir();
  const payload: SiteOverrides = {
    ...next,
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(OVERRIDES_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return payload;
}

export async function patchOverrides(
  patch: SiteOverrides,
): Promise<SiteOverrides> {
  const current = await readOverrides();
  const merged: SiteOverrides = {
    ...current,
    ...patch,
    home: { ...current.home, ...patch.home },
    solutions: { ...current.solutions, ...patch.solutions },
    locus: { ...current.locus, ...patch.locus },
    crucible: { ...current.crucible, ...patch.crucible },
    about: { ...current.about, ...patch.about },
    contact: { ...current.contact, ...patch.contact },
    insights: { ...current.insights, ...patch.insights },
    news: { ...current.news, ...patch.news },
    careers: { ...current.careers, ...patch.careers },
    images: { ...current.images, ...patch.images },
  };
  return writeOverrides(merged);
}

export function uploadsDir() {
  return path.join(process.cwd(), "public", "uploads");
}
