import "server-only";

import { promises as fs } from "fs";
import path from "path";

import { del, list, put } from "@vercel/blob";

import type { SiteOverrides } from "@/lib/cms/types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const OVERRIDES_PATH = path.join(CONTENT_DIR, "overrides.json");
const BLOB_PREFIX = "cms/overrides/";
const UPLOAD_PREFIX = "cms/uploads/";

let snapshot: SiteOverrides | null = null;

function blobEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function onVercel() {
  return Boolean(process.env.VERCEL);
}

async function ensureDir() {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
}

async function readFromFs(): Promise<SiteOverrides> {
  try {
    const raw = await fs.readFile(OVERRIDES_PATH, "utf8");
    return JSON.parse(raw) as SiteOverrides;
  } catch {
    return {};
  }
}

async function readFromBlob(): Promise<SiteOverrides | null> {
  const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 1000 });
  if (blobs.length === 0) return null;
  const latest = blobs[blobs.length - 1];
  if (!latest) return null;
  const response = await fetch(latest.url, { cache: "no-store" });
  if (!response.ok) return null;
  return (await response.json()) as SiteOverrides;
}

/** Last loaded overrides (layout primes this so `img()` stays sync). */
export function peekOverrides(): SiteOverrides | null {
  return snapshot;
}

export async function readOverrides(): Promise<SiteOverrides> {
  if (blobEnabled()) {
    try {
      const fromBlob = await readFromBlob();
      if (fromBlob) {
        snapshot = fromBlob;
        return fromBlob;
      }
    } catch (error) {
      console.error("[cms] blob read failed, falling back to committed file", error);
    }
  }

  const fromFs = await readFromFs();
  snapshot = fromFs;
  return fromFs;
}

export async function writeOverrides(next: SiteOverrides): Promise<SiteOverrides> {
  const payload: SiteOverrides = {
    ...next,
    updatedAt: new Date().toISOString(),
  };
  const body = `${JSON.stringify(payload, null, 2)}\n`;

  if (blobEnabled()) {
    const stamp = payload.updatedAt!.replace(/[:.]/g, "-");
    const pathname = `${BLOB_PREFIX}${stamp}.json`;
    await put(pathname, body, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      cacheControlMaxAge: 60,
    });

    const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 1000 });
    const stale = blobs.filter((b) => b.pathname !== pathname);
    if (stale.length) {
      await del(stale.map((b) => b.url)).catch((error) => {
        console.warn("[cms] could not prune old override blobs", error);
      });
    }

    snapshot = payload;
    return payload;
  }

  if (onVercel()) {
    throw new Error(
      "Admin cannot save on Vercel without Blob storage. In the Vercel project: Storage → Create Blob → connect it, then redeploy.",
    );
  }

  await ensureDir();
  await fs.writeFile(OVERRIDES_PATH, body, "utf8");
  snapshot = payload;
  return payload;
}

export async function patchOverrides(patch: SiteOverrides): Promise<SiteOverrides> {
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

export async function putUpload(filename: string, data: Buffer, contentType: string) {
  if (blobEnabled()) {
    const blob = await put(`${UPLOAD_PREFIX}${filename}`, data, {
      access: "public",
      contentType,
      addRandomSuffix: false,
    });
    return blob.url;
  }

  if (onVercel()) {
    throw new Error(
      "Image uploads need Vercel Blob. Create a Blob store on the project and redeploy.",
    );
  }

  const dir = uploadsDir();
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), data);
  return `/uploads/${filename}`;
}
