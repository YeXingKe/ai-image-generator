import { z } from "zod";
import { IMAGE_SIZE_IDS } from "@/lib/models";

export const generateBodySchema = z.object({
  model: z.enum(["hunyuan", "gpt"]),
  modelVersion: z.string().min(1),
  mode: z.enum(["text_to_image", "image_to_image"]),
  size: z.enum(IMAGE_SIZE_IDS).default("1024x1024"),
  prompt: z.string().min(1).max(4000),
  refImageUrl: z.string().url().nullable().optional(),
});

export type GenerateBody = z.infer<typeof generateBodySchema>;
