# 技术方案 — 模板与默认细节

Agent 写文档时按需读取；按章节取用，避免整文件灌进上下文。

## 空白大纲模板

```markdown
# AI 生图付费系统 — 技术方案

> 版本：MVP v1.0  
> 配套文档：docs/产品方案.md  
> 原则：先简单可上线，再按需微服务化

## 1. 设计目标与约束
## 2. 架构选型策略
## 3. 整体技术架构
## 4. 技术选型
## 5. 目录结构
## 6. 数据库设计
## 7. 核心业务流程
## 8. API 设计
## 9. 模型接入设计
## 10. 对象存储与文件策略
## 11. 安全、风控与可观测
## 12. 部署与环境
## 13. 开发阶段与里程碑
## 14. 技术风险与应对
## 15. 总结
```

## 阶段示意

**A：** `浏览器 → Next.js → 混元/GPT` + PostgreSQL + OSS  

**B：** `浏览器 → Next.js BFF → Redis → Python Worker → 模型` + PostgreSQL + OSS

## 核心表（最小集）

### users

`id, email, password, credits, created_at`

### generation_tasks

`id, user_id, model, mode, prompt, ref_image_url, result_url, cost, status, error_message?, created_at, updated_at`

`model`: `hunyuan` | `gpt`  
`mode`: `text_to_image` | `image_to_image`  
`status`: `pending` | `processing` | `done` | `failed`

### credit_transactions

`id, user_id, amount, type, description, related_task_id?, created_at`

`type`: `recharge` | `generation` | `refund`

### recharge_orders（支付上线建议）

订单号、金额、套餐、渠道、状态、第三方流水号、回调时间等。

## API 最小集合

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/auth/register` | 注册赠分 |
| POST | `/api/auth/login` | 登录 |
| GET | `/api/auth/me` | 当前用户与余额 |
| POST | `/api/generate` | 提交生图 |
| GET | `/api/status/[id]` | 任务状态 |
| GET | `/api/history` | 历史 |
| GET | `/api/recharge/packages` | 套餐 |
| POST | `/api/recharge/create` | 下单 |
| POST | `/api/recharge/webhook` | 支付回调（验签+幂等） |

### generate 请求/响应示例

```json
// request
{ "model": "hunyuan", "mode": "text_to_image", "prompt": "...", "refImageUrl": null }

// response
{ "taskId": "uuid", "cost": 2, "creditsLeft": 8, "status": "pending" }
```

## 目录结构（目标）

```
project/
├── frontend/                 # Next.js
│   ├── app/api/...
│   └── prisma/schema.prisma
├── worker/                   # 阶段 B：Python FastAPI
│   ├── main.py
│   ├── worker.py
│   └── models/
└── docker-compose.yml        # PostgreSQL (+ Redis)
```

## 成本粗估锚点（MVP，可改）

| 资源 | 月成本约 |
|------|----------|
| Next.js（Vercel 等） | ¥0–100 |
| Worker 2c4g（阶段 B） | ¥200–300 |
| PostgreSQL | ¥100–200 |
| Redis | ¥50–100 |
| OSS | ¥100–200 |
| 模型 API | 按量 |
| 基础设施合计 | 约 ¥500–1000（含 B）；阶段 A 更低 |

## 里程碑锚点

| Phase | 周期 | 交付 |
|-------|------|------|
| 1 | 1–2 周 | 鉴权+积分+混元文生图（优先阶段 A） |
| 2 | 1 周 | GPT+切换+图生图+OSS |
| 3 | 1 周 | 支付+历史+限流 |
| 4 | 持续 | 队列化/Worker 拆分、监控、成本优化 |
