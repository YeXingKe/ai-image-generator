import { fail } from "@/lib/api-response";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  if (!id) {
    return fail("VALIDATION_ERROR", "Missing task id", 400);
  }

  // TODO: load GenerationTask by id (and authorize owner)
  return fail("NOT_IMPLEMENTED", "Status API not implemented yet", 501);
}
