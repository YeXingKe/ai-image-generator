# Next.js 前端规范 — 示例片段

按需取用，勿整文件塞进对话。

## API 统一响应

成功：

```ts
return NextResponse.json({
  ok: true,
  data: { taskId, status, cost, creditsLeft },
});
```

失败：

```ts
return NextResponse.json(
  { ok: false, error: { code: "INSUFFICIENT_CREDITS", message: "积分不足" } },
  { status: 402 }
);
```

常用 `code`：`UNAUTHORIZED` | `VALIDATION_ERROR` | `INSUFFICIENT_CREDITS` | `NOT_FOUND` | `GENERATION_FAILED` | `INTERNAL`

## generate 入参（Zod 草案）

```ts
import { z } from "zod";

export const generateBodySchema = z.object({
  model: z.enum(["hunyuan", "gpt"]),
  mode: z.enum(["text_to_image", "image_to_image"]),
  prompt: z.string().min(1).max(4000),
  refImageUrl: z.string().url().nullable().optional(),
});
```

## lib/prisma.ts

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

## Server-only 标记

模型调用、密钥读取模块顶部：

```ts
import "server-only";
```

## 扣分事务要点（伪代码）

```ts
await prisma.$transaction(async (tx) => {
  const user = await tx.user.findUniqueOrThrow({ where: { id: userId } });
  if (user.credits < cost) throw new InsufficientCreditsError();
  await tx.user.update({
    where: { id: userId },
    data: { credits: { decrement: cost } },
  });
  await tx.creditTransaction.create({
    data: { userId, amount: -cost, type: "generation", description: "..." },
  });
  return tx.generationTask.create({ data: { /* pending */ } });
});
```

## 组件边界

| 位置 | 允许 | 禁止 |
|------|------|------|
| `components/` | UI、hooks、调用自家 API | Prisma、模型 SDK、密钥 |
| `app/api/**` | DB、积分、入队/调模型 | 返回密钥、无校验的大 body |
| `app/**/page.tsx` | 组合 UI、读 session | 直接 fetch 混元/GPT |
