# PHP 專案

PHP 專案用於部署需要常駐行程的 PHP 應用程式，例如 Laravel Octane、Swoole、Workerman 等。

:::tip 提示
傳統的 PHP-FPM 應用程式（例如 WordPress、Laravel）應使用 [PHP 網站](../website/php) 方式部署，而非作為專案。
:::

## 運作原理

每個專案都作為 `systemd` 服務（`Type=simple`）進行管理。 建立專案時，AcePanel 會在 `/etc/systemd/system/<name>.service` 產生一個 unit 檔案，因此啟動、停止、重新啟動、開機自動啟動、失敗自動重新啟動與日誌收集皆由 `systemd` 處理。

由於 `systemd` 直接執行啟動指令（而非透過 shell），該指令**不**支援 `cd`、`&&`、管線或內嵌環境變數前綴等 shell 功能。 啟動指令中的相對路徑（例如 `server.php`）會相對於**工作目錄**解析，該目錄預設為專案目錄。 建立後可透過編輯專案來設定環境變數與工作目錄。

## 適用場景

- Laravel Octane（Swoole/RoadRunner）
- ThinkPHP
- Webman
- Hyperf
- Swoole 應用程式
- Workerman 應用程式
- 其他需要常駐行程的 PHP 應用程式

建立 PHP 專案時，建立對話框提供了框架預設組態（Laravel Octane、Laravel Artisan Serve、ThinkPHP、Webman、Hyperf、Swoole HTTP、RoadRunner）。 選擇 PHP 版本與預設組態即可自動填入啟動指令，或選擇**自訂**來撰寫自己的指令。

## 事前準備

1. 安裝 PHP 執行環境：**應用程式** > **執行環境** > **PHP**
2. 視需要安裝 Swoole 或其他擴充套件

## 部署 Laravel Octane

### 建立專案

1. 建立專案：
   - **專案名稱**：`myapp`
   - **專案目錄**：`/opt/ace/projects/myapp`（若留空，則預設為專案路徑設定加上專案名稱）
   - **執行使用者**：服務執行時所使用的使用者（預設為 `www`）
   - **啟動指令**：`php84 artisan octane:start --host=0.0.0.0 --port=8000`
2. 啟用**反向代理**可為此專案自動建立一個反向代理網站

## 啟動指令範例

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

## Swoole 應用程式範例

```php
<?php
$server = new Swoole\HTTP\Server("0.0.0.0", 9501);

$server->on("request", function ($request, $response) {
    $response->header("Content-Type", "text/plain");
    $response->end("Hello World");
});

$server->start();
```

啟動指令：`php84 server.php`

## Workerman 應用程式範例

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

啟動指令：`php84 start.php start`

## 佇列處理

Laravel 佇列 Worker 也可以作為專案執行：

```bash
php84 artisan queue:work --tries=3
```

## 管理專案

每個專案都會列在**專案**頁面上，並顯示其狀態（執行中 / 已停止 / 失敗 / 未啟用）、類型、自動啟動狀態與目錄。 每一列提供以下操作：

- **啟動 / 停止**：啟動已停止的專案或停止執行中的專案。
- **重新啟動**：重新啟動服務。 僅在專案執行時顯示。 更新程式碼後使用此操作以使變更生效。
- **重新載入**：向服務傳送重新載入訊號。 僅在專案執行時顯示；若有設定**重新載入指令**則會使用該指令。
- **日誌**：開啟服務的即時日誌檢視器。
- **編輯**：開啟下方所述的編輯器。
- **刪除**：移除該專案。 刪除前需要進行帶有 5 秒倒數計時的確認。
- **自動啟動**：表格中的開關用於切換服務是否於開機時啟動。

你也可以選取多個專案，並使用表格上方的**刪除**按鈕來批次移除它們（同樣有 5 秒倒數計時保護）。 點選**目錄**標籤會在檔案管理員中開啟專案目錄。

## 編輯專案設定

開啟**編輯**會顯示五個分頁，它們直接對應到所產生的 `systemd` unit 檔案。 儲存後，unit 檔案會被重新寫入。

### 基本設定

- **專案名稱**：服務識別碼。
- **描述**：顯示在專案清單中的自由文字備註，並寫入 unit 的 `Description`。
- **專案目錄**：專案根目錄。
- **工作目錄**：服務的 `WorkingDirectory`。 選填；預設為專案目錄。 指令中的相對路徑會相對於此目錄解析。
- **執行使用者**：服務執行時所使用的使用者（`www`、`root`、`nobody` 或自訂值）。

### 執行設定

- **啟動指令**：`ExecStart` 指令（不支援 shell 功能，詳見[運作原理](#how-it-works)）。
- **啟動前指令** / **啟動後指令**：選填的 `ExecStartPre` / `ExecStartPost` 指令，會在主行程啟動前/後執行。
- **停止指令** / **重新載入指令**：選填的自訂 `ExecStop` / `ExecReload` 指令。
- **重新啟動策略**：`Restart=` 策略。 選項：不重新啟動、總是重新啟動、失敗時重新啟動（預設）、異常時重新啟動、中止時重新啟動、成功時重新啟動。
- **重新啟動間隔**：`RestartSec`，例如 `5s` 或 `1min`。
- **最大重新啟動次數**：對應到 `StartLimitBurst`，即在速率限制視窗內允許的最大重新啟動次數。
- **啟動逾時（秒）** / **停止逾時（秒）**：`TimeoutStartSec` / `TimeoutStopSec`。
- **標準輸出** / **標準錯誤**：`StandardOutput` / `StandardError` 目標。 選項包括 `journal`、`syslog`、`kmsg`、`null`，或採用附加/截斷模式的檔案（例如 `append:/var/log/...`）。
- **環境變數**：以 `Environment` 項目形式寫入的鍵值對。

### 相依性

控制啟動順序與服務相依性。 常見值：`network.target`、`mysqld.service`、`postgresql.service`、`redis.service`。

- **Requires**：強相依性；若這些相依項目無法使用，服務將無法啟動。
- **Wants**：弱相依性；即使這些相依項目失敗，服務仍會啟動。
- **After**：在所列服務之後啟動本服務。
- **Before**：在所列服務之前啟動本服務。

### 資源限制

- **記憶體限制（MB）**：服務的 `MemoryLimit`。 設為 `0` 表示無限制。 適用於限制記憶體逐漸增長的常駐 PHP 行程。
- **CPU 配額**：`CPUQuota`，例如 `50%` 或 `200%`（100% = 1 個 CPU 核心）。

### 安全設定

這些選項可加強服務隔離。 啟用前請充分測試，因為它們可能會破壞功能。

- **禁止新增權限**：設定 `NoNewPrivileges=true`。
- **保護 /tmp**：為服務提供獨立的 `/tmp`。
- **保護 /home**：設定 `ProtectHome=true`。
- **保護系統**：`ProtectSystem` 模式 —— `true`（`/usr`、`/boot` 唯讀）、`full`（同時 `/etc` 唯讀）或 `strict`（整個檔案系統唯讀）。
- **讀寫路徑** / **唯讀路徑**：`ReadWritePaths` / `ReadOnlyPaths` 清單，通常與**保護系統**搭配使用，以授予或限制對特定目錄的存取。

## 注意事項

1. 常駐的 PHP 應用程式需要注意記憶體洩漏問題
2. 程式碼更新後需要重新啟動專案才能生效
3. 服務預設使用 `Restart=on-failure`，因此若行程異常結束，`systemd` 會自動重新啟動它
