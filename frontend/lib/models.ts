export type ModelFamily = "hunyuan" | "gpt";
export type GenerateMode = "text_to_image" | "image_to_image";

export type ModelVersion = {
  id: string;
  family: ModelFamily;
  name: string;
  tag: string;
  blurb: string;
  /** Base credit cost for text-to-image */
  baseCost: number;
  supportsImageToImage: boolean;
};

export const MODEL_FAMILIES: {
  id: ModelFamily;
  label: string;
  blurb: string;
}[] = [
  {
    id: "hunyuan",
    label: "混元",
    blurb: "腾讯混元，性价比友好",
  },
  {
    id: "gpt",
    label: "GPT Image",
    blurb: "OpenAI 图像模型，细节更强",
  },
];

/** Catalog — ids map to provider model names later */
export const MODEL_VERSIONS: ModelVersion[] = [
  {
    id: "hunyuan-image",
    family: "hunyuan",
    name: "混元 Image",
    tag: "标准",
    blurb: "通用文生图，速度快、成本低",
    baseCost: 2,
    supportsImageToImage: true,
  },
  {
    id: "hunyuan-image-pro",
    family: "hunyuan",
    name: "混元 Image Pro",
    tag: "高清",
    blurb: "更高清晰度与构图稳定性",
    baseCost: 3,
    supportsImageToImage: true,
  },
  {
    id: "gpt-image-1",
    family: "gpt",
    name: "GPT Image 1",
    tag: "旗舰",
    blurb: "文字与细节表现更好",
    baseCost: 3,
    supportsImageToImage: true,
  },
  {
    id: "gpt-image-1-mini",
    family: "gpt",
    name: "GPT Image 1 Mini",
    tag: "轻量",
    blurb: "更快更省积分，适合草稿试错",
    baseCost: 2,
    supportsImageToImage: false,
  },
];

/** Common AI image aspect ratios (approx. ~1K edge). Provider may remap to nearest supported size. */
export const IMAGE_SIZES = [
  { id: "1024x1024", label: "1:1", hint: "方形", group: "常用" },
  { id: "1536x1024", label: "3:2", hint: "横图", group: "常用" },
  { id: "1024x1536", label: "2:3", hint: "竖图", group: "常用" },
  { id: "1344x768", label: "16:9", hint: "宽屏", group: "影视" },
  { id: "768x1344", label: "9:16", hint: "竖屏", group: "影视" },
  { id: "1536x640", label: "21:9", hint: "超宽", group: "影视" },
  { id: "1152x896", label: "4:3", hint: "横拍", group: "摄影" },
  { id: "896x1152", label: "3:4", hint: "竖拍", group: "摄影" },
  { id: "1280x1024", label: "5:4", hint: "略宽", group: "摄影" },
  { id: "1024x1280", label: "4:5", hint: "社媒", group: "摄影" },
] as const;

export type ImageSizeId = (typeof IMAGE_SIZES)[number]["id"];

export const IMAGE_SIZE_IDS = IMAGE_SIZES.map((s) => s.id) as [
  ImageSizeId,
  ...ImageSizeId[],
];

export function versionsForFamily(family: ModelFamily): ModelVersion[] {
  return MODEL_VERSIONS.filter((v) => v.family === family);
}

export function getModelVersion(id: string): ModelVersion | undefined {
  return MODEL_VERSIONS.find((v) => v.id === id);
}

export function defaultVersionId(family: ModelFamily): string {
  return versionsForFamily(family)[0]!.id;
}
