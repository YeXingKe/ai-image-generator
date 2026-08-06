import { fail } from "@/lib/api-response";

export async function GET() {
  // TODO: return current user + credits
  return fail("NOT_IMPLEMENTED", "Me API not implemented yet", 501);
}
