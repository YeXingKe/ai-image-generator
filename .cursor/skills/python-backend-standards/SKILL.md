---
name: python-backend-standards
description: >-
  Applies and generates Python FastAPI worker coding standards for this AI image
  SaaS (providers, queue consumer, OSS, settings). Use when writing or reviewing
  worker/backend code, Python 规范, FastAPI standards, provider adapters, or
  changes under worker/.
---

# Python 后端（Worker）代码规范

## When to use

- 在 `worker/` 新增或修改 FastAPI、provider、队列消费、OSS 上传代码
- 用户要求「按后端/Python 规范生成 / 审查代码」
- 统一分层、配置、错误与任务消息契约

架构阶段见 `ai-image-tech-spec`（阶段 B 主力；阶段 A 可不部署 Worker）。  
前端/BFF 规范见 `nextjs-frontend-standards`。

## Stack defaults

| 项 | 约定 |
|----|------|
| 根目录 | `worker/` |
| 布局 | FastAPI Bigger Apps：`worker/app/` 包 |
| Python | 3.11+ |
| 配置 | `pydantic-settings` + 环境变量 |
| HTTP | FastAPI + Uvicorn |
| HTTP 客户端 | `httpx` / 官方 SDK（如 openai） |
| 依赖文件 | `requirements.txt`（或用户指定的 pyproject） |

冲突时：以 `worker/` 已有代码与 `docs/技术方案.md` 为准。

## Directory conventions

```text
worker/
├── app/
│   ├── main.py              # FastAPI 入口；include_router
│   ├── config.py            # Settings
│   ├── dependencies.py
│   ├── worker.py            # 队列消费循环（勿在 import 时阻塞连 Redis）
│   ├── routers/             # HTTP：health、可选内部回调
│   ├── providers/           # hunyuan / gpt 适配（勿命名为含糊的 models/）
│   └── services/            # storage、task 状态更新等
├── requirements.txt
├── .env.example
└── README.md
```

- 每个包目录含 `__init__.py`。
- 启动：`uvicorn app.main:app`（在 `worker/` 下）。

## Coding rules

1. **分层**：router 薄；业务在 `services/`；厂商差异只在 `providers/`。
2. **Provider 协议统一**：`async def generate(...) -> str`（URL 或随后上传 OSS 的本地结果），见 [reference.md](reference.md)。
3. **密钥**：仅 Settings/环境变量；禁止硬编码；缺 key 抛明确错误。
4. **队列**：`run_worker()` 与 FastAPI 生命周期分离；import 模块不得死循环连 Redis。
5. **幂等**：同一 `taskId` 重复消费不重复扣费（扣费在 BFF）；可安全重试上传与状态更新。
6. **错误分类**：提示词/违规等 4xx 类不重试；超时/5xx 可有限重试（指数退避）。
7. **日志**：带 `task_id`、`model`、`status`；不打 prompt 全文到生产日志（可截断）。
8. **类型**：公开函数注明类型；优先 `str | None` 等现代写法（3.11+）。
9. **不做**：在 Worker 里直接改用户积分（积分由 Next.js BFF 事务负责，除非技术方案明确改为共用 DB 且文档已更新）；不在本 skill 范围实现完整支付。

## Task message contract（与 BFF 对齐）

```json
{
  "taskId": "uuid",
  "userId": "uuid",
  "model": "hunyuan",
  "mode": "text_to_image",
  "prompt": "...",
  "refImageUrl": null,
  "cost": 2
}
```

字段变更必须同时改：`docs/技术方案.md`、本 skill、`nextjs-frontend-standards`。

## Workflow（生成或改代码时）

```
后端规范进度:
- [ ] 1. 读 worker/ 已有结构与 docs/技术方案.md 阶段 B
- [ ] 2. 新代码放入正确层（routers / providers / services）
- [ ] 3. 配置走 Settings；无硬编码密钥
- [ ] 4. 遵守 task 消息契约与幂等
- [ ] 5. import 时无阻塞；health 可独立启动
- [ ] 6. 按 Quality checklist 自检
```

## Quality checklist

- [ ] `uvicorn app.main:app` 可启动（若改了入口）
- [ ] Provider 不泄漏密钥到响应
- [ ] 消费循环可单独启动，不拖垮 `/health`
- [ ] 与 BFF 消息字段一致
- [ ] 无无关大重构；失败路径有日志

## 维护约定 / 变更清单

**真相源**：`worker/` 实现 + `docs/技术方案.md` 阶段 B。

**何时该改**

- 分层目录、Provider 接口、队列协议变更
- 积分/状态更新职责在 BFF vs Worker 之间调整
- 依赖基线或 Python 版本升级

**变更清单**

```
后端规范同步:
- [ ] 更新本 skill 规则与目录树
- [ ] 更新 reference.md 示例
- [ ] 与 docs/技术方案.md、前端入队字段对齐
- [ ] 同步 nextjs-frontend-standards 契约说明
```

**规则**：长示例放 reference；阶段 A 仍可存在本目录但注明「可不部署」。
