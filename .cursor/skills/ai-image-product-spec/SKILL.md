---
name: ai-image-product-spec
description: >-
  Drafts or updates AI image-generation SaaS product specs (产品方案): positioning,
  MVP scope, credits pricing, user flows, UX, risk controls, metrics, and roadmap.
  Use when the user asks for 产品方案, product spec, MVP scope, pricing/credits,
  user journey, or product roadmap for this AI 生图 project.
---

# AI 生图 — 产品方案 Skill

## When to use

- 新建或改写 `docs/产品方案.md`
- 讨论 MVP 范围、定价积分、用户流程、成功指标、路线图
- 需要把「做什么 / 不为谁做 / 怎么收费」写成可评审文档

配套技术实现见 skill `ai-image-tech-spec`；勿在本 skill 中展开数据库、API、部署细节。

## Defaults for this project

Unless the user overrides:

| 项 | 默认 |
|----|------|
| 产品形态 | 积分制 AI 生图 SaaS MVP |
| 核心闭环 | 登录 → 出图 → 扣积分 → 充值 → 再出图 |
| P0 功能 | 文生图、图生图、混元/GPT 切换、积分充值、历史作品 |
| 明确不做（MVP） | 批量、局部重绘、超分、模板市场、团队协作、自建 SD |
| 技术衔接一句话 | 先 Next.js 全栈直连云端 API；成长期再拆 Python Worker |
| 默认输出路径 | `docs/产品方案.md` |

## Workflow

Copy and track:

```
产品方案进度:
- [ ] 1. 确认目标用户与非目标
- [ ] 2. 锁定 MVP P0 / 暂缓清单
- [ ] 3. 写清积分套餐与消耗规则（覆盖 API+存储成本）
- [ ] 4. 画出主用户流程与体验原则
- [ ] 5. 信息架构（页面）+ 生图状态机
- [ ] 6. 风险合规与风控（产品侧）
- [ ] 7. 成功指标 + 分阶段路线图
- [ ] 8. 写总结；指向技术方案文档
- [ ] 9. 落盘为 Markdown（默认 docs/产品方案.md）
```

### Rules while writing

1. **做减法**：每个功能都要回答「是否阻塞付费闭环验证」；否则放后续。
2. **商业可算**：套餐价、单次扣分、成本下限必须写清楚；禁止只有「按次收费」空话。
3. **体验可感知**：异步生成、失败退积分、余额不足引导充值必须出现在流程里。
4. **与技术边界清晰**：架构选型只留「产品约束」一句；细节交给技术方案。
5. **不写业务代码**：本 skill 只产出/修改方案文档，除非用户另行要求编码。

## Document structure (required sections)

Use this outline (titles may vary slightly, order should stay):

1. 背景与机会
2. 市场定位与目标用户（含非目标）
3. MVP 核心功能（P0 表 + 暂不包含）
4. 用户流程 + 关键体验原则
5. 商业模式与定价（套餐表 + 消耗规则 + 毛利原则）
6. 产品信息架构（页面 + 状态机）
7. 关键体验（UX）要点
8. 风险、合规与风控
9. 成功指标（MVP）
10. 产品路线图（Phase 1–4）
11. 与技术方案的衔接说明
12. 总结（一段话收束闭环）

完整空白模板与示例数值见 [reference.md](reference.md)。

## Quality checklist

Before finishing:

- [ ] 三类用户（或用户声明的分层）与「非目标」都写了
- [ ] P0 与「暂不包含」无重叠、无遗漏关键闭环
- [ ] 积分消耗覆盖文生图 / 图生图 / 多模型差价
- [ ] 主流程含：赠分、预扣、失败退分、充值引导
- [ ] 至少 4 个可量化成功指标（含付费转化与毛利）
- [ ] 路线图先验证闭环，再谈增强能力
- [ ] 文末指向 `docs/技术方案.md`（或用户指定的技术文档路径）

## Output

- 默认写入：`docs/产品方案.md`
- 语气：正式、可评审、表格优先；避免空泛营销腔
- 若仓库已有 `docs/产品方案.md`：先读再改，保留用户已确认的定价与范围，除非用户要求重写

## 维护约定 / 变更清单

**真相源**：`docs/产品方案.md`。先改文档，再改本 skill；勿只改 skill 导致文档漂移。

**何时该改本 skill**

- 用户反复纠正 Agent 写出的范围 / 定价 / 流程
- P0 或「暂不包含」发生结构性变化
- 默认套餐、扣分规则、成功指标集合变更
- 必选章节增删（同步 Quality checklist）

**变更清单（改积分/范围时勾选）**

```
产品侧变更同步:
- [ ] 更新 docs/产品方案.md（套餐 / 消耗 / P0 / 流程）
- [ ] 更新本 skill「Defaults」表
- [ ] 更新 reference.md 默认数值
- [ ] 通知对齐：docs/技术方案.md 中的 cost / 流程描述（或提醒用户跑 ai-image-tech-spec）
- [ ] description 触发词是否仍覆盖新话题（如会员制、模板市场）
```

**维护规则**

1. Skill 正文只留规则与清单；长模板、示例价表放 `reference.md`。
2. 过时默认值不要静默留着——改 Defaults，并在 reference 标注「已废弃」或直接删除。
3. 不把整份产品方案粘进 SKILL.md。
4. 与 `ai-image-tech-spec` 冲突时：产品范围以产品文档为准，实现细节以技术文档为准。
