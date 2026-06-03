# Node.js 项目

Node.js 项目用于部署 Express、Koa、NestJS、Next.js 等 Node.js 应用。

## 前置要求

1. 安装 Node.js 运行环境：**应用** > **运行环境** > **Node.js**
2. 项目源代码

## 部署步骤

1. 上传项目代码到服务器
2. 安装依赖：

```bash
cd /opt/ace/projects/myapp
npm24 install
```

3. 创建项目（参见下方 **创建 Node.js 项目**）
4. 开启 **反向代理**

## 创建 Node.js 项目

1. 进入 **项目** 页面，打开 **Node.js** 选项卡
2. 点击 **创建项目**
3. 填写配置：
   - **项目名称**：`myapp`（用作服务标识符）
   - **项目目录**：留空则默认为 `/opt/ace/projects/<项目名称>`，或选择一个目录
   - **Node.js 版本**：选择已安装的 Node.js 版本
   - **框架**：选择预设（Express、Koa、Fastify、NestJS、Next.js、Nuxt.js、Hapi、AdonisJS）以自动生成启动命令，或保持 **自定义** 自行编写
   - **运行用户**：默认为 `www`（也可选择 `root`/`nobody` 或输入自定义用户）
   - **启动命令**：根据上方的版本和框架自动填充，可编辑
4. 启用 **反向代理** 并填写 **域名** 和 **项目端口**，以自动创建反向代理网站供外部访问

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

### Koa

启动命令：`node24 app.js`

### Fastify

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

启动命令：`node24 node_modules/.bin/next start`

### Nuxt.js

```bash
# 构建
npm24 run build
```

启动命令：`node24 node_modules/.bin/nuxt start`

### Hapi

启动命令：`node24 server.js`

### AdonisJS

```bash
# 构建
npm24 run build
```

启动命令：`node24 server.js`

## 管理项目

**Node.js** 选项卡上的每个项目行都提供以下操作：

- **启动** / **停止**：切换服务的运行状态
- **重启**：重启服务（仅在运行时显示）
- **重载**：在不完全重启的情况下重载服务（仅在运行时显示）；如果配置了 **重载命令** 则使用它
- **日志**：打开服务输出的实时日志查看器
- **编辑**：打开项目设置（参见下方 **编辑项目**）
- **删除**：移除项目；需要经过带 5 秒倒计时的确认
- **开机自启**：用于启用或禁用开机时启动服务的开关

项目名称用作 systemd 服务标识符，因此只能包含字母、数字、下划线和连字符。

## 编辑项目

点击项目上的 **编辑** 以打开其设置，设置分为以下选项卡。

### 基本设置

- **项目名称**：服务标识符
- **描述**：关于项目的可选备注
- **项目目录**：项目根目录
- **工作目录**：可选，默认为项目目录（对应 systemd `WorkingDirectory`）
- **运行用户**：服务运行所使用的用户

### 运行设置

- **启动命令**：用于启动服务的命令（`ExecStart`）
- **启动前命令**：启动前运行的命令（`ExecStartPre`）
- **启动后命令**：启动后运行的命令（`ExecStartPost`）
- **停止命令**：自定义停止命令（`ExecStop`）
- **重载命令**：自定义重载命令（`ExecReload`）

**重启策略**：

- **重启策略**：`no`、`always`、`on-failure`、`on-abnormal`、`on-abort`、`on-success` 之一
- **重启间隔**：重启前的延迟，例如 `5s`、`1min`（`RestartSec`）
- **最大重启次数**：最大重启尝试次数（`StartLimitBurst`）
- **启动超时（秒）**：允许启动的时间（`TimeoutStartSec`）
- **停止超时（秒）**：允许关闭的时间（`TimeoutStopSec`）

**其他**：

- **标准输出** / **标准错误**：日志的发送位置，`journal`、`syslog`、`kmsg`、`null` 之一，或一个文件（`append:` / `truncate:`）
- **环境变量**：注入到服务环境中的键/值对

### 依赖

控制相对于其他 systemd 单元的启动顺序。 常见服务包括 `network.target`、`mysqld.service`、`postgresql.service`、`redis.service`。

- **Requires**：强依赖；如果这些不可用，服务将失败
- **Wants**：弱依赖；即使这些失败，服务仍会启动
- **After**：在指定服务之后启动此服务
- **Before**：在指定服务之前启动此服务

### 资源限制

- **内存限制（MB）**：最大内存；设置为 `0` 表示无限制（`MemoryLimit`）
- **CPU 配额**：CPU 分配，例如 `50%` 或 `200%`，其中 `100%` 等于一个 CPU 核心（`CPUQuota`）

### 安全设置

增强服务隔离的加固选项。 启用前请充分测试，因为它们可能影响功能。

- **禁止新权限**：阻止服务获取新权限（`NoNewPrivileges`）
- **保护 /tmp**：为服务提供私有的 `/tmp`（`ProtectTmp`）
- **保护 /home**：使 `/home` 不可访问（`ProtectHome`）
- **保护系统**：`true` 使 `/usr` 和 `/boot` 只读，`full` 还使 `/etc` 只读，`strict` 使整个文件系统只读（`ProtectSystem`）
- **读写路径**：服务可以读写的路径（`ReadWritePaths`）
- **只读路径**：服务只能读取的路径（`ReadOnlyPaths`）

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
