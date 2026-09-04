"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setSession, type ClientSession } from "@/lib/auth-session";
import { authApi } from "@/lib/api/auth";

type AuthGateProps = {
  children: (session: ClientSession) => React.ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const [session, setLocal] = useState<ClientSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await authApi.me();
        setSession(data);
        setLocal(data);
      } catch {
        router.replace("/login");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (loading || !session) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[var(--bg)] text-[var(--muted)]">
        加载中…
      </div>
    );
  }

  return <>{children(session)}</>;
}