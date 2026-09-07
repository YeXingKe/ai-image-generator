"use client";

import { AuthGate } from "@/components/auth/auth-gate";
import { AppShell } from "@/components/layout/app-shell";
import { ComingSoon } from "@/components/layout/coming-soon";

export default function RechargePage() {
  return (
    <AuthGate>
      {(session) => (
        <AppShell session={session}>
          <ComingSoon
            title="充值"
            description="积分套餐与支付即将开通。当前可先用注册赠送积分体验出图。"
          />
        </AppShell>
      )}
    </AuthGate>
  );
}
