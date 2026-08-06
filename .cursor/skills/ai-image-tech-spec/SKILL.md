---
name: ai-image-tech-spec
description: >-
  Drafts or updates AI image-generation SaaS technical specs (技术方案): architecture
  evolution (Next.js MVP vs Python Worker), stack, schema, async generate flow,
  APIs, model/OSS integration, security, deploy cost, and milestones. Use when the
  user asks for 技术方案, tech spec, system architecture, DB design, API design,
  queue/worker design, or deployment plan for this AI 生图 project.
---

# AI 生图 — 技术方案 Skill

## When to use

- 新建或改写 `docs/技术方案.md`
- 讨论架构演进、选型、库表、异步生图、API、部署与成本
- 需要把「怎么实现 / 如何扩展」写成可落地文档

产品范围与定价见 skill `ai-image-product-spec`；本 skill 服从产品已锁定的 MVP 边界。

## Architecture stance (do not invert)

| 阶段 | 形态 | 何时用 |
|------|------|--------|
| **A（MVP 默认先做）** | 浏览器 → Next.js（页面+API）→ 混元/GPT；PostgreSQL + OSS | 验证付费闭环；无自建 GPU |
| **B（成长再拆）** | Next.js BFF → Redis 队列 → Python FastAPI Worker → 模型/OSS | 复杂图像处理或自建模型 |

原则：**可拆不可先拆**。文档应同时写清阶段 A 落地与阶段 B 目标架构，并标明当前推荐从 A 开工。

专业分工一句话：Next.js 管接待（页面/鉴权/积分/支付）；Python 管干活（模型 SDK/图像/未来 GPU）。MVP 可让 Next.js 直连云端 API，不必先上 Worker。

## Defaults for this project

Unless the user overrides:

| 项 | 默认 |
|----|------|
| 前端/BFF | Next.js + TypeScript |
| 主库 | PostgreSQL + Prisma |
| 对象存储 | 阿里云 OSS / 腾讯云 COS |
| 队列（阶段 B） | Redis + BullMQ |
| Worker（阶段 B） | Python FastAPI |
| 模型 | 混元 + GPT Image（统一 Provider 抽象） |
| 积分 | 服务端预扣；失败退还；事务一致 |
| 默认输出路径 | `docs/技术方案.md` |

## Workflow

Copy and track:

```
技术方案进度:
- [ ] 1. 写目标与约束（对齐产品 MVP）
- [ ] 2. 写架构策略：阶段 A vs B + 推荐路径
- [ ] 3. 逻辑架构图 + 一次生图数据流
- [ ] 4. 技术选型表（含 MVP 降本列）
- [ ] 5. 目录结构（frontend / worker）
- [ ] 6. 核心表：users / generation_tasks / credit_transactions（+ 订单表建议）
- [ ] 7. 异步流程：预扣、入队、轮询、失败退分、幂等与限流
- [ ] 8. API 草案（auth / generate / status / history / recharge）
- [ ] 9. 模型接入、OSS、安全风控、可观测
- [ ] 10. 部署拓扑 + 月成本粗估 + 里程碑
- [ ] 11. 落盘为 Markdown（默认 docs/技术方案.md）
```

### Rules while writing

1. **积分正确性优先于炫架构**：扣减/退还必须事务 + 流水；写进核心流程。
2. **密钥不出前端**：模型 Key、支付密钥仅服务端环境变量。
3. **异步默认推荐**：生图耗时长；阶段 A 可同步简化，但须标明何时升级队列。
4. **Provider 抽象**：业务层不绑死单一厂商 URL；混元/GPT 可替换。
5. **不写完整业务代码**：方案里最多保留短伪代码/接口 JSON；实现另开任务。
6. **与产品一致**：功能范围、扣分规则若与 `docs/产品方案.md` 冲突，先对齐产品再写技术。

## Document structure (required sections)

1. 设计目标与约束
2. 架构选型策略（双语言理由 + 阶段 A/B）
3. 整体技术架构（图 + 数据流）
4. 技术选型（含 MVP 降本）
5. 目录结构
6. 数据库设计（含积分一致性要点）
7. 核心业务流程（异步；附阶段 A 简化）
8. API 设计草案
9. 模型接入设计
10. 对象存储与文件策略
11. 安全、风控与可观测
12. 部署与环境 + 成本粗估
13. 开发阶段与里程碑
14. 技术风险与应对
15. 总结

表字段、API 列表示例与成本表见 [reference.md](reference.md)。

## Quality checklist

Before finishing:

- [ ] 同时描述阶段 A 与 B，并标明 MVP 从 A 开始
- [ ] 数据流含：预扣 → 任务 →（队列）→ 模型 → OSS → 轮询/退分
- [ ] 至少 3 张核心表字段完整；支付建议订单表
- [ ] API 覆盖注册登录、生图、状态、历史、充值回调
- [ ] 写明重试/幂等/限流
- [ ] 成本与里程碑可执行；未过早强制双服务部署
- [ ] 文首或文中引用 `docs/产品方案.md`

## Output

- 默认写入：`docs/技术方案.md`
- 语气：工程可评审；图表用 ASCII/Markdown 表即可
- 若已有文档：先读再改，保留已确认选型，除非用户要求重写

## 维护约定 / 变更清单

**真相源**：`docs/技术方案.md`（功能/定价边界服从 `docs/产品方案.md`）。先改文档，再改本 skill。

**何时该改本 skill**

- 阶段默认从 A 切到 B（或反过来）成为团队共识
- 选型变更（ORM、队列、存储、鉴权、支付）
- 核心表 / API 契约与代码已稳定，草案需升级为「已实现」
- Agent 反复写出与仓库不符的目录或错误架构立场

**变更清单（改架构/接口/积分实现时勾选）**

```
技术侧变更同步:
- [ ] 更新 docs/技术方案.md（架构图、选型、表、API、成本、里程碑）
- [ ] 若涉及扣分/套餐：先确认 docs/产品方案.md 已改
- [ ] 更新本 skill「Defaults」与「Architecture stance」
- [ ] 更新 reference.md（表字段 / API 列表 / 成本锚点）
- [ ] 若目录/API 约定变了：同步 nextjs-frontend-standards、python-backend-standards
- [ ] description 触发词是否覆盖新组件（如 SSE、BullMQ、对账）
```

**维护规则**

1. 立场句「可拆不可先拆」未经理解决定不得删；若默认阶段翻转，必须改 stance 表并写明生效条件。
2. API/表结构以代码与迁移为准时，把 reference 从「草案」改为与实现一致，避免双真相。
3. 长示例、字段表放 `reference.md`；SKILL.md 保持可扫读。
4. 代码落盘规范由 `nextjs-frontend-standards` / `python-backend-standards` 约束；架构与闭环说明仍留在本 skill / 技术方案。
