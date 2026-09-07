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
# 初始化管理员账号（可在 .env 配置 ADMIN_EMAIL / ADMIN_PASSWORD）：
# pnpm db:seed
pnpm dev
```

> 说明：当前锁定 **Prisma 6**（Prisma 7 的 datasource 配置方式不同，MVP 暂不升级）。  
> 默认管理员：`admin@moyu.local` / `Admin123456`（务必在生产环境改掉）。

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
| `docs/从零开发手册.md` | 分阶段步骤、验收标准 |
| `docs/从零开发手册-完整代码.md` | **可复制粘贴的完整实现代码** |
| `docs/Prisma数据库命令.md` | **加字段/建表后要跑的 Prisma 命令** |
| `docs/小白入门-架构与业务.md` | 业务分析 + 架构理解（Python 小白向） |
| `docs/产品方案.md` | 功能、定价、流程 |
| `docs/技术方案.md` | 架构、表、API（完整技术方案） |
| `nextjs-frontend-standards` | 前端代码规范 |
| `python-backend-standards` | Worker 代码规范 |
