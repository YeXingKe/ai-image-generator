# 墨屿（Moyu）

积分制 AI 生图 SaaS（MVP）。产品与技术约定见 `docs/产品方案.md`、`docs/技术方案.md`。

## 架构（阶段 A）

```text
浏览器 → frontend (Next.js 页面 + API Routes) → 混元 / GPT
                ↓
         PostgreSQL +（可选）OSS
```

阶段 B 再启用 `worker/`（Python FastAPI + Redis 队列）。

## 仓库结构

```text
docs/              产品方案、技术方案
frontend/          Next.js + Prisma（BFF + UI）
worker/            Python Worker（阶段 B 骨架）
docker-compose.yml PostgreSQL（默认）/ Redis（profile: worker）
.cursor/skills/    Agent 产品/技术/代码规范
```

## 快速开始

### 1. 数据库

```bash
docker compose up -d postgres
```

### 2. 前端

```bash
cd frontend
pnpm install
cp .env.example .env
pnpm add @prisma/client@6 zod server-only
pnpm add -D prisma@6
pnpm exec prisma generate
# 数据库就绪后：
# pnpm exec prisma migrate dev --name init
pnpm dev
```

> 说明：当前锁定 **Prisma 6**（Prisma 7 的 datasource 配置方式不同，MVP 暂不升级）。

打开 [http://localhost:3000](http://localhost:3000)。

### 3. Worker（可选，阶段 B）

```bash
cd worker
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Redis（可选）：

```bash
docker compose --profile worker up -d redis
```

## API 占位

多数业务路由当前返回 `501 NOT_IMPLEMENTED`，套餐列表除外：

- `GET /api/recharge/packages`
- `POST /api/generate`（校验入参后 501）
- `GET /api/status/[id]`
- `GET /api/history`
- `POST /api/auth/register|login`、`GET /api/auth/me`

## 文档与规范

| 文件 / Skill | 用途 |
|--------------|------|
| `docs/产品方案.md` | 功能、定价、流程 |
| `docs/技术方案.md` | 架构、表、API |
| `nextjs-frontend-standards` | 前端代码规范 |
| `python-backend-standards` | Worker 代码规范 |
