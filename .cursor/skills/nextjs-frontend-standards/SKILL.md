---
name: nextjs-frontend-standards
description: >-
  Applies and generates Next.js/TypeScript frontend & BFF coding standards for
  this AI image SaaS (App Router, API routes, Prisma, credits, Tailwind). Use when
  writing or reviewing frontend code, 前端规范, Next.js coding standards, API
  Route conventions, or changes under frontend/.
---

# Next.js 前端代码规范

## When to use

- 在 `frontend/` 新增或修改页面、组件、API Routes、Prisma 相关代码
- 用户要求「按前端规范生成 / 审查代码」
- 统一错误响应、积分预扣、目录与命名

产品范围见 `ai-image-product-spec`；架构边界见 `ai-image-tech-spec` 与 `docs/技术方案.md`。  
Python Worker 规范见 `python-backend-standards`。

## Stack defaults

| 项 | 约定 |
|----|------|
| 根目录 | `frontend/` |
| 框架 | Next.js App Router + TypeScript |
| 样式 | Tailwind CSS |
| 别名 | `@/*` |
| ORM | Prisma 6 + PostgreSQL |
| 校验 | Zod（API 入参） |
| 包管理 | pnpm（无则 npm） |

冲突时：以仓库已有代码与 `docs/技术方案.md` 为准，再回头改本 skill。

## Directory conventions

```text
frontend/
├── app/
│   ├── page.tsx                 # 访客首页（登录/注册入口）
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── workspace/page.tsx       # 生图工作台（需登录；左配置右预览）
│   ├── history/page.tsx         # 历史（需登录）
│   ├── layout.tsx
│   └── api/
│       ├── auth/
│       ├── generate/route.ts
│       ├── status/[id]/route.ts
│       ├── history/route.ts
│       └── recharge/
├── components/                  # 仅 UI；无直连 DB / 无模型 Key
│   ├── auth/
│   ├── generate/
│   └── layout/
├── lib/
│   ├── prisma.ts
│   ├── env.ts
│   ├── auth-session.ts          # 客户端会话（真实鉴权前）
│   ├── credits.ts               # 扣减/退还（服务端逻辑可复用费率）
│   └── providers/               # 阶段 A：模型调用仅服务端
└── prisma/schema.prisma
```

- 不用 `src/`（除非项目已采用）。
- 客户端组件加 `"use client"`；默认 Server Component。
- **模型 API Key、支付密钥只出现在服务端**（Route Handler / server-only 模块）。

## Coding rules

1. **TypeScript strict**：禁止随意 `any`；对外 DTO 用 Zod parse。
2. **API 只做 BFF**：鉴权、积分事务、任务记录；阶段 A 可在此调模型，阶段 B 改为入队。
3. **积分**：预扣与写流水同一事务；失败走退还；禁止只改前端余额展示。
4. **异步生图**：`POST /api/generate` 尽快返回 `taskId`；用 `GET /api/status/[id]` 轮询。
5. **错误响应统一**（见 [reference.md](reference.md)）：勿抛未处理导致 HTML 错误页给 fetch。
6. **命名**：文件 `kebab-case` 或 Next 约定；组件 `PascalCase`；变量/函数 `camelCase`。
7. **UI**：工作台一屏一事；提交前展示预计扣分；余额不足禁用并引导充值。
8. **不做**：把密钥写进客户端；伪造「已生成成功」；大段无关重构。

## Workflow（生成或改代码时）

```
前端规范进度:
- [ ] 1. 读相关已有文件与 docs/技术方案.md 对应章节
- [ ] 2. 按目录约定落文件，复用 lib/ 而非复制逻辑
- [ ] 3. 入参 Zod 校验 + 统一错误 JSON
- [ ] 4. 涉及积分则事务 + credit_transactions
- [ ] 5. 不把密钥与 Provider 细节泄漏到 components/
- [ ] 6. lint / typecheck；按 Quality checklist 自检
```

## Quality checklist

- [ ] 无客户端暴露 `API_KEY` / `DATABASE_URL`
- [ ] Route Handler 有明确成功/失败 JSON
- [ ] 积分变动有流水；失败可退分路径存在或已注明 TODO
- [ ] 类型与 Zod schema 一致
- [ ] 未引入与任务无关的依赖或重构

## 维护约定 / 变更清单

**真相源**：`frontend/` 实现 + `docs/技术方案.md`。规范落后于代码时，先改代码侧共识，再改本 skill。

**何时该改**

- 目录、API 响应形状、鉴权方案变更
- 阶段 A→B（直连模型改为入队）成为默认
- Agent 反复违反同一条规范

**变更清单**

```
前端规范同步:
- [ ] 更新本 skill 规则与目录树
- [ ] 更新 reference.md 示例
- [ ] 与 docs/技术方案.md API/目录对齐
- [ ] 若消息契约变了：同步 python-backend-standards
```

**规则**：长示例放 reference；勿把整份技术方案粘进 SKILL.md。
