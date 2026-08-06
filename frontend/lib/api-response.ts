import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "VALIDATION_ERROR"
  | "INSUFFICIENT_CREDITS"
  | "NOT_FOUND"
  | "GENERATION_FAILED"
  | "NOT_IMPLEMENTED"
  | "INTERNAL";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true as const, data }, { status });
}

export function fail(code: ApiErrorCode, message: string, status = 400) {
  return NextResponse.json(
    { ok: false as const, error: { code, message } },
    { status },
  );
}
