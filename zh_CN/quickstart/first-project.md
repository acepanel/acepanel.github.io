# 第一个项目：部署 Node.js 应用

本文以一个简单的 Node.js HTTP 服务为例，演示如何通过 AcePanel 部署和管理项目。

## 准备代码

先准备一个简单的 Node.js 应用。 在项目目录创建 `app.js`：

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello from AcePanel!\n');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
```

## 创建项目

进入“项目”页面，切换到“Node.js”选项卡，点击“创建项目”。

![创建项目](/images/quickstart/project-create.png)

填写配置：

- **项目名**：项目标识，如 `hello-node`
- **项目目录**：留空则使用默认路径（`项目目录/项目名称`）
- **Node.js 版本** / **框架**：选择一个已安装的 Node.js 版本和框架预设（Express、Koa、Fastify、NestJS、Next.js、Nuxt.js、Hapi、AdonisJS）。 启动命令会自动生成；选择“自定义”可自行填写
- **运行用户**：一般选 `www`
- **启动命令**：`node app.js`
- **反向代理**：如果需要通过域名访问，启用自动创建反向代理。 启用后，还需填写 **域名** 和应用监听的 **项目端口**（如 `3000`），系统会自动创建一个指向 `http://127.0.0.1:<port>` 的代理网站

### 其他项目类型

本文以 Node.js 为例，但“项目”页面还提供了 **通用**、**Go**、**Java**、**PHP**、**Python** 和 **.NET** 选项卡。 在点击“创建项目”前，切换到对应的选项卡。 每种语言类型都允许你选择一个已安装的运行时版本和一个自动生成启动命令的框架预设（选择“自定义”可自行编写）：

| 类型                       | 版本 + 预设选项                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **通用**                   | 无版本/框架选择器；只需手动填写启动命令（适用于任何不依赖托管运行时的进程）                                                                                                |
| **Go**                   | **源码** 的 **运行模式**（选择一个 Go 版本和 **入口文件**，如 `main.go`，执行 `go run`）或 **二进制**（运行项目目录中编译好的二进制文件）                                            |
| **Java**                 | Java 版本 + Spring Boot（JAR/WAR）、Quarkus、Micronaut、Vert.x、Dropwizard                                                    |
| **PHP**                  | PHP 版本 + Laravel Octane、Laravel（Artisan Serve）、ThinkPHP、Webman、Hyperf、Swoole HTTP、RoadRunner                                          |
| **Python**               | Python 版本 + Django、Flask、FastAPI（Uvicorn）、Tornado、Sanic、aiohttp、Gunicorn                                                              |
| **.NET** | .NET 版本 + ASP.NET Core Web、ASP.NET Core API、Blazor Server、gRPC Service、Worker Service |

:::tip
版本选择器只会列出已通过“环境”页面安装的运行时。 如果下拉框为空，请先安装你需要的语言版本。
:::

## 上传代码

项目创建后，进入「文件」页面，导航到项目目录（如 `/opt/ace/projects/hello-node`），上传 `app.js` 文件。

也可以通过终端用 git clone 拉取代码。

## 配置项目

在项目列表中点击“编辑”可调整更多设置。 编辑器有五个选项卡：基本设置、运行设置、依赖、资源限制和安全设置。

![项目编辑](/images/quickstart/project-edit-run.png)

**运行设置**：

- **预启动命令**：启动前执行，如 `npm install`
- **重启策略**：如何处理进程退出（不重启 / 总是 / 失败时 / 异常时 / 中止时 / 成功时），以及重启间隔、最大重启次数和启动/停止超时
- **标准输出 / 标准错误**：日志的去向（journal、syslog、文件等）
- **环境变量**：设置 `NODE_ENV=production` 等

**依赖**：配置 systemd 服务依赖（Requires / Wants / After / Before）以控制启动顺序，如 `network.target` 或 `mysqld.service`。

**资源限制**：限制服务可使用的主机资源量。

- **内存限制（MB）**：最大内存；设为 `0` 则禁用限制
- **CPU 配额**：服务可使用的 CPU 时间，以百分比表示，`100%` 等于一个完整的 CPU 核心（如 `50%` 表示半个核心，`200%` 表示两个核心）。 留空则不限制

**安全设置**：应用 systemd 沙箱以隔离服务。 这些设置可能影响功能，因此在生产环境依赖它们之前请充分测试。

- **禁止新权限**：阻止进程及其子进程获取新权限（如通过 setuid 程序）
- **保护 /tmp**：为服务提供一个与其他进程隔离的私有 `/tmp`
- **保护 /home**：对服务隐藏 `/home`、`/root` 和 `/run/user`
- **保护系统**：以只读方式挂载系统目录——`true` 使 `/usr` 和 `/boot` 只读，`full` 额外保护 `/etc`，`strict` 使整个文件系统只读（明确允许的路径除外）
- **读写路径**：即使启用了保护系统，服务仍被允许写入的路径
- **只读路径**：服务可以读取但不能修改的路径

## 启动项目

回到项目列表，点击「启动」按钮。

![项目列表](/images/quickstart/project-list.png)

启动后，运行中的项目会出现“重启”和“重载”按钮。 点击“日志”查看输出，确认服务运行正常。

## 访问服务

如果开启了反向代理，通过配置的域名访问即可。

如果没有，可以通过 `http://服务器IP:3000` 直接访问（需在防火墙放行 3000 端口）。

:::tip 生产环境
生产环境建议：

- 在项目列表中切换“开机自启”开关，可在服务器重启后自动恢复
- 配置反向代理，通过 Nginx 转发请求
- 在“资源限制”选项卡中设置内存限制，以防止内存泄漏
  :::
