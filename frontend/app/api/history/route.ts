import { fail } from "@/lib/api-response";

export async function GET() {
  // TODO: auth → paginate GenerationTask for current user
  return fail("NOT_IMPLEMENTED", "History API not implemented yet", 501);
}
