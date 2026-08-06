"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  getServerSessionSnapshot,
  getSessionSnapshot,
  subscribeSession,
  type ClientSession,
} from "@/lib/auth-session";

export function useClientSession(): ClientSession | null {
  const raw = useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getServerSessionSnapshot,
  );

  return useMemo(() => {
    if (!raw) return null;
    try {
      const data = JSON.parse(raw) as ClientSession;
      if (!data?.email || typeof data.credits !== "number") return null;
      return data;
    } catch {
      return null;
    }
  }, [raw]);
}
