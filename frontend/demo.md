## 登录业务
### 1 初始化环境
在 frontend 目录执行：
```
pnpm add bcryptjs jose
pnpm add -D @types/bcryptjs

pnpm exec prisma generate
pnpm exec prisma migrate dev --name init
```
成功后
```
pnpm exec prisma studio  # 启动 Prisma Studio：一个本地 Web 界面，用来浏览和编辑当前 DATABASE_URL 里的数据
```