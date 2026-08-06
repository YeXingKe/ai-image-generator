import { fail } from "@/lib/api-response";
import { generateBodySchema } from "@/lib/validators/generate";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return fail("VALIDATION_ERROR", "Invalid JSON body", 400);
  }

  const parsed = generateBodySchema.safeParse(json);
  if (!parsed.success) {
    return fail("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Invalid body", 400);
  }

  // TODO: auth → calc cost → credit transaction → create task → enqueue or call provider
  return fail("NOT_IMPLEMENTED", "Generate API not implemented yet", 501);
}
