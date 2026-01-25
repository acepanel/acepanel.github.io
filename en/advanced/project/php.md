# PHP 项目

PHP 项目用于部署需要常驻进程的 PHP 应用，如 Laravel Octane、Swoole、Workerman 等。

::: tip 提示
传统的 PHP-FPM 应用（如 WordPress、Laravel）应使用 [PHP 网站](../website/php) 方式部署，而非项目。
:::

## 适用场景

- Laravel Octane（Swoole/RoadRunner）
- Swoole 应用
- Workerman 应用
- ReactPHP 应用
- 其他需要常驻进程的 PHP 应用

## 前置要求

1. 安装 PHP 运行环境：**应用** > **运行环境** > **PHP**
2. 根据需要安装 Swoole 等模块

## 部署 Laravel Octane

### 创建项目

1. 创建项目：
   - **项目名**：`myapp`
   - **项目目录**：`/opt/ace/project/myapp`
   - **启动命令**：`php84 artisan octane:start --host=0.0.0.0 --port=8000`
2. 开启 **反向代理**

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

# Laravel Queue Worker
php84 artisan queue:work --daemon
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
php84 artisan queue:work --daemon --tries=3
```

## 注意事项

1. 常驻进程的 PHP 应用需要注意内存泄漏问题
2. 代码更新后需要重启项目才能生效
3. 建议配置进程监控，异常时自动重启
