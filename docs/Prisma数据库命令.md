# Prisma 数据库命令速查（小白版）

> 适用范围：本仓库 `frontend/` + PostgreSQL（本地 Docker 或腾讯云均可）  
> 所有命令默认在 **`frontend` 目录**下执行。  
> Schema 文件：`frontend/prisma/schema.prisma`

---

## 一句话记住

**改表结构（加字段 / 新建表 / 改字段）→ 改 `schema.prisma` → 跑 migrate →（必要时）重启 `pnpm dev`。**

| 你想做什么 | 改什么 | 跑什么命令 |
|------------|--------|------------|
| 新建一张表 | 在 `schema.prisma` 加 `model` | `pnpm exec prisma migrate dev --name 说明` |
| 给已有表加字段 | 在对应 `model` 里加字段 | `pnpm exec prisma migrate dev --name 说明` |
| 改字段类型 / 默认值 / 是否可空 | 改 `schema.prisma` | `pnpm exec prisma migrate dev --name 说明` |
| 只重新生成客户端（不改库） | — | `pnpm exec prisma generate` |
| 初始化 / 更新管理员账号 | `.env` 里 `ADMIN_*` | `pnpm db:seed` |
| 可视化看数据 | — | `pnpm exec prisma studio` |

`migrate dev` **一般会自动再跑一遍 `generate`**。若报 `Unknown field xxx`，多半是 Client 没更新成功，见文末「EPERM」。

---

## 标准流程：增加字段或创建数据表

### 1. 编辑 Schema

打开 `frontend/prisma/schema.prisma`，例如：

**新建表：**

```prisma
model RechargeOrder {
  id        String   @id @default(cuid())
  userId    String   @map("user_id")
  status    String   @default("pending")
  createdAt DateTime @default(now()) @map("created_at")

  @@map("recharge_orders")
}
```

**给 `User` 加字段：**

```prisma
model User {
  // ...已有字段
  role String @default("user")   // 新增
}
```

保存文件。

### 2. 执行迁移（开发环境）

```bash
cd frontend
pnpm exec prisma migrate dev --name 用英文描述本次改动
```

名称示例：

- 第一次建表：`--name init`
- 加角色：`--name add_user_role`
- 加订单表：`--name add_recharge_orders`

这条命令会：

1. 对比 Schema 与数据库  
2. 在 `prisma/migrations/` 生成 SQL 迁移文件  
3. **在真实数据库上执行**（创建/修改表）  
4. 通常顺带执行 `prisma generate`（更新 `@prisma/client`）

### 3. 验收

```bash
# 用 Studio 看表是否出现新列/新表
pnpm exec prisma studio
```

或在 pgAdmin 里：

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users';
```

### 4. 写业务代码

迁移成功后，才能在代码里使用新字段，例如：

```ts
select: { email: true, credits: true, role: true }
```

---

## 常用命令说明

### `pnpm exec prisma generate`

- **作用**：根据 `schema.prisma` 生成/更新 Prisma Client（TypeScript 能调用的 API）  
- **会不会改数据库？**：否  
- **何时单独跑**：  
  - `pnpm install` 之后  
  - `migrate` 里 generate 失败（如 Windows `EPERM`）时手动补跑  

### `pnpm exec prisma migrate dev --name <名字>`

- **作用**：开发环境同步 Schema → 数据库，并留下迁移历史  
- **会不会改数据库？**：会  
- **前提**：`frontend/.env` 里 `DATABASE_URL` 指向正确库  

等价脚本（若已配置）：

```bash
pnpm db:migrate
# 注意：package.json 里若是 prisma migrate dev 且未带 --name，
# 交互式时会提示你输入迁移名；推荐显式写 --name。
```

### `pnpm exec prisma migrate deploy`

- **作用**：生产/CI 只执行**已有**迁移文件，不交互  
- **何时用**：服务器部署、腾讯云正式环境上线  
- **不要**在生产机随手跑 `migrate dev`

### `pnpm db:seed`（即 `prisma db seed`）

- **作用**：跑 `prisma/seed.ts`，初始化管理员等数据  
- **不会**代替 migrate；表不存在时先 migrate  
- 管理员账号由 `.env` 配置：

```env
ADMIN_EMAIL=admin@moyu.local
ADMIN_PASSWORD=Admin123456
```

默认会创建/更新管理员（`role=admin`）。生产请改掉默认密码。

### `pnpm exec prisma studio`

- **作用**：浏览器里查看、点选表数据（类似轻量版 pgAdmin）  

---

## 第一次把空库建起来（完整顺序）

```bash
cd frontend
# 1. 配好 .env 的 DATABASE_URL、AUTH_SECRET
cp .env.example .env   # 若还没有 .env

# 2. 生成客户端 + 建表
pnpm exec prisma generate
pnpm exec prisma migrate dev --name init

# 3. 初始化管理员
pnpm db:seed

# 4. 启动项目
pnpm dev
```

---

## 以后每次改表（日常）

```bash
cd frontend

# 1. 改 prisma/schema.prisma（加 model 或字段）

# 2. 建议先停掉 pnpm dev / prisma studio（Windows 防 EPERM 锁文件）

# 3. 迁移
pnpm exec prisma migrate dev --name 描述本次改动

# 4. 若代码里报 Unknown field，再强制生成一次
pnpm exec prisma generate

# 5. 重新 pnpm dev
```

---

## 常见报错

| 现象 | 原因 | 处理 |
|------|------|------|
| `Unknown field 'role' for select...` | 库有字段，但 Client 是旧的 | 停掉 `pnpm dev`，执行 `pnpm exec prisma generate`，再启动 |
| `EPERM: rename ... query_engine-windows.dll.node` | Next / Studio 占用 Prisma 引擎文件 | 结束相关 `node`/`pnpm dev`/`prisma studio` 后再 `generate` |
| `AUTH_SECRET missing or too short` | `.env` 未配或太短 | 加 `AUTH_SECRET`（≥16 位），**重启** `pnpm dev` |
| 连不上数据库 | `DATABASE_URL` / 安全组 / SSL | 检查连接串，腾讯云常需 `?sslmode=require` |
| 迁移提示 drift / 冲突 | 库被手工改过或多人迁移不一致 | 开发环境慎用 `db push`；以 migrations 历史为准，必要时对齐团队迁移文件 |

---

## 和 pgAdmin 的关系

- **Prisma migrate**：改**表结构**（建表、加列）的正规方式  
- **pgAdmin**：查数据、跑 `SELECT` 很方便；**不要**长期靠手写 SQL 改结构，否则和 `schema.prisma` / migrations 会不一致  

查用户表示例：

```sql
SELECT id, email, role, credits, created_at
FROM users
ORDER BY created_at DESC;
```

---

## 命令速查表（可打印）

```bash
# 开发：改 schema 后同步到数据库
pnpm exec prisma migrate dev --name <英文说明>

# 只刷新客户端
pnpm exec prisma generate

# 生产：应用已提交的迁移
pnpm exec prisma migrate deploy

# 种子数据（管理员）
pnpm db:seed

# 看数据
pnpm exec prisma studio
```
