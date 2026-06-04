# PHP 项目

PHP 项目用于部署需要常驻进程的 PHP 应用，例如 Laravel Octane、Swoole、Workerman 等。

:::tip 提示
传统的 PHP-FPM 应用（如 WordPress、Laravel）应使用 [PHP 网站](../website/php) 方式部署，而非项目。
:::

## 工作原理

每个项目都作为 `systemd` 服务（`Type=simple`）进行管理。 创建项目时，AcePanel 会在 `/etc/systemd/system/<name>.service` 生成一个 unit 文件，因此启动、停止、重启、开机自启、失败自动重启和日志收集均由 `systemd` 处理。

由于 `systemd` 直接运行启动命令（而非通过 shell），该命令**不**支持 `cd`、`&&`、管道或内联环境变量前缀等 shell 特性。 启动命令中的相对路径（例如 `server.php`）相对于**工作目录**解析，该目录默认为项目目录。 创建后可通过编辑项目来设置环境变量和工作目录。

## 适用场景

- Laravel Octane（Swoole/RoadRunner）
- ThinkPHP
- Webman
- Hyperf
- Swoole 应用
- Workerman 应用
- 其他需要常驻进程的 PHP 应用

创建 PHP 项目时，创建对话框提供了框架预设（Laravel Octane、Laravel Artisan Serve、ThinkPHP、Webman、Hyperf、Swoole HTTP、RoadRunner）。 选择 PHP 版本和预设即可自动填充启动命令，或选择**自定义**来编写自己的命令。

## 前置要求

1. **PHP 运行环境**：在 **应用** > **运行环境** 中安装所需的 PHP 版本
2. 按需安装 Swoole 或其他扩展

## 部署 Laravel Octane

### 创建项目

1. 创建项目：
   - **项目名**：`myapp`
   - **项目目录**：`/opt/ace/projects/myapp`（若留空，则默认为项目路径设置加上项目名）
   - **运行用户**：服务运行所使用的用户（默认为 `www`）
   - **启动命令**：`php84 artisan octane:start --host=0.0.0.0 --port=8000`
2. 启用**反向代理**可为此项目自动创建一个反向代理网站

## 启动命令示例

```bash
# Laravel Octane (Swoole)
php84 artisan octane:start --host=0.0.0.0 --port=8000

# Laravel Octane (RoadRunner)
php84 artisan octane:start --server=roadrunner --host=0.0.0.0 --port=8000

# Swoole HTTP Server
php84 server.php

# Workerman
php84 start.php start

# RoadRunner
php84 vendor/bin/rr serve

# Laravel Queue Worker
php84 artisan queue:work
```

## Swoole 应用示例

```php
<?php
$server = new Swoole\HTTP\Server("0.0.0.0", 9501);

$server->on("request", function ($request, $response) {
    $response->header("Content-Type", "text/plain");
    $response->end("Hello World");
});

$server->start();
```

启动命令：`php84 server.php`

## Workerman 应用示例

```php
<?php
require_once __DIR__ . '/vendor/autoload.php';

use Workerman\Worker;

$worker = new Worker("http://0.0.0.0:8080");
$worker->onMessage = function($connection, $request) {
    $connection->send("Hello World");
};

Worker::runAll();
```

启动命令：`php84 start.php start`

## 队列处理

Laravel 队列 Worker 也可以作为项目运行：

```bash
php84 artisan queue:work --tries=3
```

## 管理项目

每个项目都列在**项目**页面上，显示其状态（运行中 / 已停止 / 失败 / 未激活）、类型、自启状态和目录。 每行提供以下操作：

- **启动 / 停止**：启动已停止的项目或停止运行中的项目。
- **重启**：重启服务。 仅在项目运行时显示。 更新代码后使用此操作以使更改生效。
- **重载**：向服务发送重载信号。 仅在项目运行时显示；若配置了**重载命令**则使用该命令。
- **日志**：打开服务的实时日志查看器。
- **编辑**：打开下文所述的编辑器。
- **删除**：移除该项目。 删除前需要进行带 5 秒倒计时的确认。
- **开机自启**：表格中的开关用于切换服务是否随开机启动。

你也可以选中多个项目，使用表格上方的**删除**按钮批量移除它们（同样有 5 秒倒计时保护）。 点击**目录**标签会在文件管理器中打开项目目录。

## 编辑项目设置

打开**编辑**会显示五个选项卡，它们直接对应生成的 `systemd` unit 文件。 保存后，unit 文件会被重写。

### 基本设置

- **项目名**：服务标识符。
- **描述**：显示在项目列表中的自由文本备注，并写入 unit 的 `Description`。
- **项目目录**：项目根目录。
- **工作目录**：服务的 `WorkingDirectory`。 可选；默认为项目目录。 命令中的相对路径相对于此目录解析。
- **运行用户**：服务运行所使用的用户（`www`、`root`、`nobody` 或自定义值）。

### 运行设置

- **启动命令**：`ExecStart` 命令（不支持 shell 特性，详见[工作原理](#how-it-works)）。
- **启动前命令** / **启动后命令**：可选的 `ExecStartPre` / `ExecStartPost` 命令，在主进程启动前/后运行。
- **停止命令** / **重载命令**：可选的自定义 `ExecStop` / `ExecReload` 命令。
- **重启策略**：`Restart=` 策略。 可选项：不重启、总是重启、失败时重启（默认）、异常时重启、中止时重启、成功时重启。
- **重启间隔**：`RestartSec`，例如 `5s` 或 `1min`。
- **最大重启次数**：对应 `StartLimitBurst`，即在限流窗口内允许的最大重启次数。
- **启动超时（秒）** / **停止超时（秒）**：`TimeoutStartSec` / `TimeoutStopSec`。
- **标准输出** / **标准错误**：`StandardOutput` / `StandardError` 目标。 可选项包括 `journal`、`syslog`、`kmsg`、`null`，或采用追加/截断模式的文件（例如 `append:/var/log/...`）。
- **环境变量**：以 `Environment` 条目形式写入的键值对。

### 依赖

控制启动顺序和服务依赖。 常见值：`network.target`、`mysqld.service`、`postgresql.service`、`redis.service`。

- **Requires**：强依赖；若这些依赖不可用，服务将无法启动。
- **Wants**：弱依赖；即使这些依赖失败，服务仍会启动。
- **After**：在所列服务之后启动本服务。
- **Before**：在所列服务之前启动本服务。

### 资源限制

- **内存限制（MB）**：服务的 `MemoryLimit`。 设为 `0` 表示无限制。 适用于限制内存逐渐增长的常驻 PHP 进程。
- **CPU 配额**：`CPUQuota`，例如 `50%` 或 `200%`（100% = 1 个 CPU 核心）。

### 安全设置

这些选项可加强服务隔离。 启用前请充分测试，因为它们可能会破坏功能。

- **禁止新权限**：设置 `NoNewPrivileges=true`。
- **保护 /tmp**：为服务提供独立的 `/tmp`。
- **保护 /home**：设置 `ProtectHome=true`。
- **保护系统**：`ProtectSystem` 模式 —— `true`（`/usr`、`/boot` 只读）、`full`（同时 `/etc` 只读）或 `strict`（整个文件系统只读）。
- **读写路径** / **只读路径**：`ReadWritePaths` / `ReadOnlyPaths` 列表，通常与**保护系统**配合使用，以授予或限制对特定目录的访问。

## 注意

1. 常驻进程的 PHP 应用需要注意内存泄漏问题
2. 代码更新后需要重启项目才能生效
3. 服务默认使用 `Restart=on-failure`，因此若进程异常退出，`systemd` 会自动重启它
