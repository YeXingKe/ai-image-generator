import "server-only";

import type { GenerateParams } from "./types";

/** Stage A placeholder — wire Hunyuan/OpenAI SDKs later. */
export async function generateWithProvider(
  model: "hunyuan" | "gpt",
  params: GenerateParams,
): Promise<string> {
  void model;
  void params;
  throw new Error("Image provider not wired yet");
}
