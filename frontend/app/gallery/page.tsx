"use client";

import { AuthGate } from "@/components/auth/auth-gate";
import { AppShell } from "@/components/layout/app-shell";
import { ComingSoon } from "@/components/layout/coming-soon";

export default function GalleryPage() {
  return (
    <AuthGate>
      {(session) => (
        <AppShell session={session}>
          <ComingSoon
            title="图库"
            description="公开作品与灵感图集即将上线，可浏览风格与复用提示词。"
          />
        </AppShell>
      )}
    </AuthGate>
  );
}
