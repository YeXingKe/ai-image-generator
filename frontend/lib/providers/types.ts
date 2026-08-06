export type GenerateParams = {
  prompt: string;
  mode: "text_to_image" | "image_to_image";
  refImageUrl?: string | null;
  size?: string;
};
