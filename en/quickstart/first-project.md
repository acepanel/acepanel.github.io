# 第一个项目：部署 Node.js 应用

本文以一个简单的 Node.js HTTP 服务为例，演示如何通过 AcePanel 部署和管理项目。

## 准备代码

先准备一个简单的 Node.js 应用。在项目目录创建 `app.js`：

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from AcePanel!\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

## 创建项目

进入「项目」页面，点击「创建项目」。

![创建项目](/images/quickstart/project-create.png)

填写配置：

- **项目名**：项目标识，如 `hello-node`
- **项目目录**：留空使用默认路径
- **运行用户**：一般选 `www`
- **启动命令**：`node app.js`
- **反向代理**：如需通过域名访问，可开启自动创建反向代理

## 上传代码

项目创建后，进入「文件」页面，导航到项目目录（如 `/opt/ace/projects/hello-node`），上传 `app.js` 文件。

也可以通过终端用 git clone 拉取代码。

## 配置项目

在项目列表点击「编辑」，可以调整更多设置：

![项目编辑](/images/quickstart/project-edit-run.png)

**运行设置**：
- **预启动命令**：启动前执行，如 `npm install`
- **重启策略**：进程异常退出时的处理方式
- **环境变量**：设置 `NODE_ENV=production` 等

**依赖**：可以关联 Node.js 运行环境版本。

## 启动项目

回到项目列表，点击「启动」按钮。

![项目列表](/images/quickstart/project-list.png)

启动后可点击「日志」查看输出，确认服务正常运行。

## 访问服务

如果开启了反向代理，通过配置的域名访问即可。

如果没有，可以通过 `http://服务器IP:3000` 直接访问（需在防火墙放行 3000 端口）。

::: tip 生产环境
生产环境建议：
- 开启「自启动」，服务器重启后自动恢复
- 配置反向代理，通过 Nginx 转发请求
- 在「资源限制」中设置内存上限，防止内存泄漏
:::
