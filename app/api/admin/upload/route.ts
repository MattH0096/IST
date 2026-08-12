import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";

import { NextResponse } from "next/server";
import sharp from "sharp";

import { isAuthenticated } from "@/lib/cms/auth";
import { patchOverrides, uploadsDir } from "@/lib/cms/store";

export const runtime = "nodejs";

const MAX_BYTES = 12 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Expected multipart form data." }, { status: 400 });
  }

  const key = String(form.get("key") ?? "").trim();
  const file = form.get("file");
  if (!key) {
    return NextResponse.json({ error: "Missing image key." }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is too large (max 12MB)." }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const dir = uploadsDir();
  await fs.mkdir(dir, { recursive: true });

  const id = randomBytes(6).toString("hex");
  const filename = `${key.replace(/[^a-z0-9-_]/gi, "-")}-${id}.webp`;
  const outPath = path.join(dir, filename);

  const pipeline = sharp(bytes).rotate().resize({
    width: 2400,
    height: 2400,
    fit: "inside",
    withoutEnlargement: true,
  });
  const { data, info } = await pipeline.webp({ quality: 82 }).toBuffer({ resolveWithObject: true });
  await fs.writeFile(outPath, data);

  const asset = {
    src: `/uploads/${filename}`,
    width: info.width,
    height: info.height,
  };

  await patchOverrides({ images: { [key]: asset } });
  const { revalidatePath } = await import("next/cache");
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true, key, asset });
}
