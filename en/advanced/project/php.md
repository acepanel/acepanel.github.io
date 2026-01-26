# PHP Project

PHP projects are used to deploy PHP applications that require long-running processes, such as Laravel Octane, Swoole, Workerman, etc.

::: tip Tip
Traditional PHP-FPM applications (such as WordPress, Laravel) should be deployed using [PHP Website](../website/php), not as projects.
:::

## Use Cases

- Laravel Octane (Swoole/RoadRunner)
- Swoole applications
- Workerman applications
- ReactPHP applications
- Other PHP applications requiring long-running processes

## Prerequisites

1. Install PHP runtime: **Apps** > **Runtimes** > **PHP**
2. Install Swoole or other modules as needed

## Deploying Laravel Octane

### Creating a Project

1. Create project:
   - **Project Name**: `myapp`
   - **Project Directory**: `/opt/ace/project/myapp`
   - **Startup Command**: `php84 artisan octane:start --host=0.0.0.0 --port=8000`
2. Enable **Reverse Proxy**

## Startup Command Examples

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

## Swoole Application Example

```php
<?php
$server = new Swoole\HTTP\Server("0.0.0.0", 9501);

$server->on("request", function ($request, $response) {
    $response->header("Content-Type", "text/plain");
    $response->end("Hello World");
});

$server->start();
```

Startup command: `php84 server.php`

## Workerman Application Example

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

Startup command: `php84 start.php start`

## Queue Processing

Laravel Queue Worker can also run as a project:

```bash
php84 artisan queue:work --daemon --tries=3
```

## Notes

1. Long-running PHP applications need to be aware of memory leak issues
2. Code updates require restarting the project to take effect
3. It is recommended to configure process monitoring for automatic restart on exceptions
