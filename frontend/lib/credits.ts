import { getModelVersion, type GenerateMode } from "@/lib/models";

export const IMAGE_TO_IMAGE_EXTRA = 1;

/** Resolve credit cost from concrete model version + mode. */
export function calcGenerationCost(
  modelVersionId: string,
  mode: GenerateMode,
): number {
  const version = getModelVersion(modelVersionId);
  const base = version?.baseCost ?? 2;
  return mode === "image_to_image" ? base + IMAGE_TO_IMAGE_EXTRA : base;
}
