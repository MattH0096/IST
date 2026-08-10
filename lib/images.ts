/**
 * Typed access to the processed image set.
 *
 * The manifest is written by `npm run assets` and carries real dimensions, so
 * every `next/image` gets explicit width and height and nothing shifts on load.
 * Referring to images by key means a mistyped filename is a build error.
 */

import manifest from "@/lib/generated/image-manifest.json";

export type ImageKey = keyof typeof manifest;

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
};

export function img(key: ImageKey): ImageAsset {
  return manifest[key];
}
