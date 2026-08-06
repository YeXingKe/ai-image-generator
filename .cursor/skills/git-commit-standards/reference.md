# Git 提交规范 — 示例与拆分

## Good（单类改动）

```text
feat(auth): add email register with trial credits

Gift 10 credits on signup so users can try generate before recharge.
```

```text
fix(credits): refund on generation failure

Failed tasks left balances deducted; add refund txn in the same path as status=failed.
```

```text
docs: align worker layout with FastAPI app package

Match 技术方案 directory section to providers/ under worker/app.
```

```text
chore(skills): add git commit standards skill
```

```text
build(frontend): pin prisma to v6 for classic datasource url
```

## Bad

```text
update
```

```text
fix bug
```

```text
feat: 改了很多东西包括前端和文档
```

```text
chore: init project and add product docs and skills and worker
```

（上一条：文档、skills、脚手架混在一起 — 必须拆开。）

```text
WIP
```

```text
asdf
```

## Mapping quick guide

| Diff 主要内容 | 建议 |
|---------------|------|
| 新 API / 页面能力 | `feat(api)` / `feat(frontend)` |
| 积分算错、退分 | `fix(credits)` |
| 仅 md / skill | `docs` / `chore(skills)` |
| docker-compose | `chore(infra)` 或 `build(infra)` |
| 依赖版本 | `build(frontend)` / `build(worker)` |

## 拆分对照（本仓库常见）

| 逻辑组 | 典型路径 | 示例 message |
|--------|----------|--------------|
| 产品/技术文档 | `docs/产品方案.md` `docs/技术方案.md` | `docs: add MVP product and tech specs` |
| Agent skills | `.cursor/skills/**` | `chore(skills): add product and coding standard skills` |
| 基础设施 | `docker-compose.yml` `.gitignore` | `chore(infra): add postgres compose and gitignore` |
| 前端骨架 | `frontend/**`（无真实业务逻辑时） | `chore(frontend): scaffold Next.js app with API stubs` |
| Worker 骨架 | `worker/**` | `chore(worker): scaffold FastAPI worker package` |
| README | `README.md` | `docs: add monorepo quickstart` |
| 认证功能 | `frontend/app/api/auth/**` 等 | `feat(auth): ...` |
| 生图功能 | `frontend/app/api/generate/**` 等 | `feat(generate): ...` |

## 示例：当前初始化工作区应拆成

若一次要提交「方案 + skills + frontend + worker + compose」：

1. `docs: add MVP product and tech specs`
2. `chore(skills): add product, tech, and coding standard skills`
3. `chore(infra): add docker-compose and root gitignore`
4. `chore(frontend): scaffold Next.js with prisma and API stubs`
5. `chore(worker): scaffold FastAPI health and providers`
6. `docs: add monorepo README quickstart`

不要合成一条 `chore: init everything`。

## 同一文件有两类改动时

尽量用两次 `git add -p` **以外**的方式：先完成一类再改另一类。若必须拆且无法按文件分开，向用户说明后：

- 优先按文件归属到主逻辑组，或  
- 请用户确认「合并成一条」  

禁止在未说明的情况下把无关 diff 塞进同一 commit。
