import { fail } from "@/lib/api-response";

export async function POST() {
  // TODO: verify credentials + session/JWT
  return fail("NOT_IMPLEMENTED", "Login API not implemented yet", 501);
}
