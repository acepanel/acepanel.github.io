# 项目常见问题

## 项目启动失败

点击**日志**查看错误信息。 常见原因：

### 权限问题

项目目录应在 `/opt/ace/projects/` 下，所有者为 www：

```shell
chown -R www:www /opt/ace/projects/项目名
```

如果部署在 `/root` 下，需使用 root 用户运行（不推荐）。

### 找不到命令

如 `node: No such file or directory`，表示运行时不在服务的 `PATH` 中。

解决方法：

1. 在**启动命令**中使用带版本前缀的可执行文件，例如 `node22 app.js`、`go1.23 run main.go` 或 `php8.3 artisan serve`。 创建项目时选择语言版本和框架后，面板会自动生成这个带前缀的命令。
2. 或在**编辑** -> **运行设置** -> **环境变量**中添加 `PATH`（或其他任意变量）。

### 端口被占用

修改应用监听端口，或停止占用端口的进程：

```shell
lsof -i:3000  # 查看占用端口的进程
```

## 项目类型与框架预设

创建项目时需要先选择一个**项目类型**。 支持的类型有**通用**、**Go**、**Java**、**Node.js**、**PHP**、**Python** 和 **.NET**。 项目列表也为每种类型提供了对应的标签页，便于筛选项目。

选择语言类型（通用除外）后会显示一个**版本**选择器，其中列出你已安装的运行时，以及一个**框架**预设。 选择版本和框架后会自动填充**启动命令**，使用带版本前缀的可执行文件，确保它能在服务最小化的 `PATH` 下运行。 你随时可以将框架切换为**自定义**并自行编写命令。

各类型可用的框架预设：

| 类型                      | 预设                                                                                                                            |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Go                      | 运行模式：**源代码**（`go<version> run <entry file>`，例如 `main.go`）或**二进制**（运行编译后的 `<root_dir>/main`）                                   |
| Java                    | Spring Boot (JAR)、Spring Boot (WAR)、Quarkus、Micronaut、Vert.x、Dropwizard |
| Node.js | Express、Koa、Fastify、NestJS、Next.js、Nuxt.js、Hapi、AdonisJS                                      |
| PHP                     | Laravel Octane、Laravel (Artisan Serve)、ThinkPHP、Webman、Hyperf、Swoole HTTP、RoadRunner                       |
| Python                  | Django、Flask、FastAPI (Uvicorn)、Tornado、Sanic、aiohttp、Gunicorn                                              |
| .NET    | ASP.NET Core Web、ASP.NET Core API、Blazor Server、gRPC Service、Worker Service                   |

例如，选择 **Node.js**、版本 `22` 和 **Express** 预设会生成 `node22 app.js`；选择 **PHP**、版本 `8.3` 和 **Laravel (Artisan Serve)** 会生成 `php8.3 artisan serve`。

## 配置环境变量

**编辑** -> **运行设置** -> **环境变量**，点击**添加**。

常用配置：

- `NODE_ENV=production`
- `PORT=3000`

## 预启动命令

在**编辑** -> **运行设置** -> **启动前命令**中配置。 在项目启动前执行，如安装依赖：

- Node.js：`npm install` 或 `yarn`
- Python：`pip install -r requirements.txt`
- Go：`go build`

启动前和启动后命令与服务本身使用**相同的最小化 `PATH`**（生成的单元不会设置自定义 `PATH`）。 如果某个裸命令在你的 shell 中可用，但启动前命令报告 `command not found`，请使用带版本前缀的可执行文件（例如 `npm22 install`、`pip3.12 install -r requirements.txt`）或绝对路径，与**启动命令**的处理方式相同。

如果你需要覆盖 systemd 的默认行为，同一面板中还提供了**启动后命令**（启动后运行）、**停止命令**和**重载命令**。

## 查看项目日志

1. 面板：项目列表点击**日志**
2. 命令行：`journalctl -u project-name -f`（systemd 单元以项目命名，例如 `myapp.service`）

## 项目自动重启

在**运行设置** -> **重启策略**中配置：

- **重启策略**：不重启 / 总是重启 / 失败时重启 / 异常时重启 / 中止时重启 / 成功时重启
- **重启间隔**：两次重启之间的等待时间（例如 `5s`、`1min`）
- **最大重启次数**：防止无限重启

## 服务依赖

在**编辑** -> **依赖**中，你可以控制相对于其他 systemd 单元的启动顺序（常见服务：`network.target`、`mysqld.service`、`postgresql.service`、`redis.service`）：

- **Requires**：强依赖。 如果所需的单元不可用，本服务将启动失败。
- **Wants**：弱依赖。 即使这些单元启动失败，本服务仍会启动。
- **After**：在所列单元之后启动本服务。
- **Before**：在所列单元之前启动本服务。

## 资源限制

在**编辑** -> **资源限制**中，你可以限制服务的资源占用：

- **内存限制 (MB)**：最大内存。 设为 `0` 表示不限制。
- **CPU 配额**：以百分比表示的 CPU 时间，`100%` 等于一个 CPU 核心（例如 `50%` = 半个核心，`200%` = 两个核心）。 留空表示不限制。

## 安全设置

在**编辑** -> **安全设置**中，你可以加强服务隔离。 这些设置对应 systemd 的沙箱指令，可能导致功能异常，因此在依赖它们之前请先测试。

**权限控制：**

- **禁止新权限**：阻止服务及其子进程获取新权限（例如通过 setuid）。
- **保护 /tmp**：为服务提供独立的 `/tmp`。
- **保护 /home**：使 `/home`、`/root` 和 `/run/user` 不可访问。
- **保护系统**：将部分文件系统挂载为只读 —— `true`：`/usr` 和 `/boot` 只读；`full`：同时将 `/etc` 设为只读；`strict`：整个文件系统只读。

**路径访问控制：**

- **读写路径**：允许服务读取和写入的路径（在启用保护系统时可用于开放例外）。
- **只读路径**：服务仅可读取的路径。

## 反向代理配置

创建项目时启用**反向代理**，然后填写**域名**和**项目端口**。 系统会自动创建一个监听 80 端口的反向代理网站，将请求代理到 `http://127.0.0.1:project-port`。

手动配置：创建反向代理网站，上游地址填 `http://127.0.0.1:项目端口`。
