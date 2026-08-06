---
name: git-commit-standards
description: >-
  Applies git commit message and commit workflow standards for this AI image
  SaaS (Conventional Commits, split commits by change type, safety checklist).
  Use when the user asks to commit, 提交代码, write a commit message, 拆分提交,
  git commit规范, or review staged changes before committing.
---

# Git 提交规范

## When to use

- 用户明确要求提交 / 写 commit message / 按规范整理提交
- 审查即将提交的 diff 是否合适（范围、密钥、消息质量）

**默认不自动提交**：仅在用户明确要求 commit 时执行。

## Message format（Conventional Commits）

```text
<type>(<scope>): <summary>

[optional body]

[optional footer]
```

| 部分 | 规则 |
|------|------|
| `type` | 见下表；小写 |
| `scope` | 可选；本仓库常用见下 |
| `summary` | 祈使句、现在时；**聚焦 why**；约 50 字符内；不加句号 |
| body | 需要时说明动机、副作用、破坏性变更 |
| footer | `BREAKING CHANGE:`、`Fixes #123` 等 |

### Types

| type | 何时用 |
|------|--------|
| `feat` | 新功能（用户可感知） |
| `fix` | 修 bug |
| `docs` | 仅文档 / 方案 / README |
| `style` | 格式（不影响逻辑） |
| `refactor` | 重构（非 feat/fix） |
| `perf` | 性能 |
| `test` | 测试 |
| `build` | 构建 / 依赖（如 Prisma、pnpm） |
| `ci` | CI 配置 |
| `chore` | 杂项（脚手架、忽略文件等） |
| `revert` | 回滚 |

### Scopes（本仓库）

| scope | 范围 |
|-------|------|
| `frontend` | `frontend/` |
| `worker` | `worker/` |
| `db` | Prisma schema / migrate |
| `api` | API Routes / 契约 |
| `auth` | 登录注册会话 |
| `credits` | 积分扣减/充值 |
| `generate` | 生图任务流 |
| `docs` | `docs/` 产品/技术方案、根 README |
| `skills` | `.cursor/skills/` |
| `infra` | docker-compose、部署相关 |

多范围时选**主变更**一个 scope，或省略 scope。

## 拆分提交（必须）

**一条 commit 只做一类改动。** 工作区混有多种变更时，**默认拆成多次提交**，禁止用一条 message 糊弄过去。

按下列维度分组（命中即拆）：

| 应拆开的情况 | 示例 |
|--------------|------|
| type 不同 | `docs` 与 `feat` 不能混 |
| 子系统不同 | `frontend` 与 `worker` 分开 |
| 关注点不同 | skills / 产品方案 / 业务代码分开 |
| 脚手架 vs 业务 | 初始化骨架 与 登录实现分开 |
| 无关修复 | 顺手修的 typo 与主功能分开 |

**推荐提交顺序（本仓库）：**

1. `docs` / `chore(skills)` — 方案与 Agent 规范  
2. `chore(infra)` / `build` — docker、依赖锁定  
3. `chore` / `feat` — frontend / worker 骨架或功能（按目录再拆）  
4. `feat` / `fix` — 具体业务能力（auth、credits、generate 等）

用户说「一起提交」时：仍按组拆开连续提交；仅当用户明确说「合并成一条」才允许单 commit，并在 message 中如实概括（仍避免伪造单一 type）。

分组与路径对照见 [reference.md](reference.md)。

## Workflow（用户要求提交时）

```
提交进度:
- [ ] 1. 并行：git status / git diff / git log -5
- [ ] 2. 确认无密钥、无无关大文件；警告 .env 等
- [ ] 3. 按「拆分提交」把变更分成若干逻辑组（列出计划）
- [ ] 4. 对每一组：起草 message → git add 仅该组文件 → HEREDOC 提交
- [ ] 5. 重复直到相关改动提交完
- [ ] 6. git status / git log 确认多条 commit 与计划一致
```

### Commit command（Windows / 跨环境）

优先用 HEREDOC，避免 `-m` 截断与引号问题。

**Git Bash / macOS / Linux：**

```bash
git commit -m "$(cat <<'EOF'
feat(generate): add credit pre-deduct before enqueue

Keep balance and task row in one transaction so failed jobs can refund safely.

EOF
)"
```

**PowerShell（本机默认）：**

```powershell
git commit -m @"
feat(generate): add credit pre-deduct before enqueue

Keep balance and task row in one transaction so failed jobs can refund safely.
"@
```

## Safety rules

1. **只在用户要求时提交**；未要求则只可建议 message。
2. **禁止** `git config`、`--no-verify`（除非用户明确要求）、force push 到 main/master。
3. **禁止**把 `.env`、密钥、凭证写入提交；发现则停止并警告。
4. **禁止**交互式 `git add -i` / `git rebase -i`。
5. **amend** 仅当用户要求，且满足：钩子自动改文件需补进上次「本会话创建且未 push」的 commit；否则新建 commit。
6. 不提交与本次请求无关的文件；不确定时先问。
7. push 仅当用户明确要求。
8. **禁止** `git add .` / `git add -A` 后一把梭；必须按逻辑组 `git add <paths>`。

## Quality checklist

- [ ] 已按 type/子系统/关注点拆分；无「大杂烩」单 commit（除非用户明确要求合并）
- [ ] 每条 commit 的 type/scope 与**该条** diff 一致（docs 勿标 feat）
- [ ] summary 说明动机，非「update files」「fix stuff」
- [ ] 无密钥 / 大二进制误加
- [ ] 中英文：本仓库 **summary 默认英文**；用户要求中文则用中文

示例见 [reference.md](reference.md)。

## 维护约定 / 变更清单

**真相源**：本 skill + 用户明确的额外 git 规则。团队若改约定，先改本文件。

**何时该改**

- type/scope 表不够用或与真实目录不符
- 提交语言（中/英）成为团队强制约定
- Agent 反复写出含糊 message

**变更清单**

```
git 规范同步:
- [ ] 更新 type / scope 表
- [ ] 更新 reference.md 正反例
- [ ] README 若提到提交约定则一并改
```
