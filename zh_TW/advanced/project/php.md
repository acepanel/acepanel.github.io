# PHP 網站

PHP 網站用於運行 PHP 程式，如 WordPress、Laravel、ThinkPHP 等。

:::tip 警告
傳統的 PHP-FPM 應用（如 WordPress、Laravel）應使用 [PHP 網站](../website/php) 方式部署，而非項目。
:::

## 適用場景

- Laravel Octane（Swoole/RoadRunner）
- Swoole 應用
- Workerman 應用
- ReactPHP 應用
- 其他需要常駐進程的 PHP 應用

## 前置要求

1. **PHP 運行環境**：在 **應用** > **運行環境** 中安裝所需的 PHP 版本
2. 根據需要安裝 Swoole 等模組

## 部署 Laravel Octane

### 建立項目

1. 建立項目：
   - **項目名**：`myapp`
   - **項目目錄**：`/opt/ace/project/myapp`
   - **啟動命令**：`php84 artisan octane:start --host=0.0.0.0 --port=8000`
2. 開啟 **反向代理**

## 啟動命令示例

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

## Swoole 應用示例

```php
<?php
$server = new Swoole\HTTP\Server("0.0.0.0", 9501);

$server->on("request", function ($request, $response) {
    $response->header("Content-Type", "text/plain");
    $response->end("Hello World");
});

$server->start();
```

啟動命令：`php84 server.php`

## Workerman 應用示例

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

啟動命令：`php84 start.php start`

## 佇列處理

Laravel 佇列 Worker 也可以作為項目運行：

```bash
php84 artisan queue:work --daemon --tries=3
```

## 注意

1. 常駐進程的 PHP 應用需要注意記憶體洩漏問題
2. 程式碼更新後需要重啟項目才能生效
3. 建議配置進程監控，異常時自動重啟
