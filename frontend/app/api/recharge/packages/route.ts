import { ok } from "@/lib/api-response";

const PACKAGES = [
  { id: "basic", name: "基础包", priceYuan: 9.9, credits: 50 },
  { id: "standard", name: "标准包", priceYuan: 29.9, credits: 200 },
  { id: "pro", name: "专业包", priceYuan: 99, credits: 800 },
] as const;

export async function GET() {
  return ok({ packages: PACKAGES });
}
