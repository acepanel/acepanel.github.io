# Node.js 项目

Node.js 项目用于部署 Express、Koa、NestJS、Next.js 等 Node.js 应用。

## 前置要求

1. 安装 Node.js 运行环境：**应用** > **运行环境** > **Node.js**
2. 项目源代码

## 部署步骤

1. 上传项目代码到服务器
2. 安装依赖：

```bash
cd /opt/ace/project/myapp
npm24 install
```

3. 创建项目：
   - **项目名**：`myapp`
   - **项目目录**：`/opt/ace/project/myapp`
   - **启动命令**：`node24 app.js`
4. 开启 **反向代理**

## 启动命令示例

```bash
# 直接运行
node24 app.js

# 使用 npm scripts
npm24 start

# 使用 npm run
npm24 run start:prod

# 设置环境变量
NODE_ENV=production node24 app.js

# 指定端口
PORT=3000 node24 app.js
```

## 常用框架

### Express

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
```

启动命令：`node24 app.js`

### NestJS

```bash
# 构建
npm24 run build
```

启动命令：`node24 dist/main.js`

### Next.js

```bash
# 构建
npm24 run build
```

启动命令：`npm24 start`

### Nuxt.js

```bash
# 构建
npm24 run build
```

启动命令：`node24 .output/server/index.mjs`

## 进程管理

AcePanel 使用 systemd 管理 Node.js 进程，自动处理：

- 进程崩溃自动重启
- 开机自动启动
- 日志记录

## 环境变量

推荐使用 `.env` 文件管理环境变量：

```bash
# .env
NODE_ENV=production
PORT=3000
DATABASE_URL=mysql://localhost:3306/mydb
```

使用 `dotenv` 包加载：

```javascript
require('dotenv').config();
```

## 常见问题

### 依赖安装失败

尝试清除缓存重新安装：

```bash
rm -rf node_modules package-lock.json
npm24 install
```

### 内存不足

增加 Node.js 内存限制：

```bash
NODE_OPTIONS="--max-old-space-size=4096" node24 app.js
```

### 端口被占用

修改应用监听的端口，或检查是否有其他进程占用。
