# PHP 網站

![PHP 網站設定](/images/website/php.png)

PHP 網站用於執行 PHP 程式，例如 WordPress、Laravel、ThinkPHP 等。

## 前置需求

在建立 PHP 網站之前，您需要安裝：

1. **Web 伺服器**：Nginx、OpenResty 或 Apache
2. **PHP 執行環境**：在 **應用** > **執行環境**中安裝所需 PHP 版本

## 建立 PHP 網站

1. 前往 **網站** 頁面
2. 點選 **PHP** 分頁
3. 點選 **建立網站**

### 設定項目

- **名稱**：網站識別碼，例如 `wordpress`。 僅允許使用字母、數字、連字號與底線
- **網域**：綁定的網域，例如 `blog.example.com`
- **連接埠**：監聽連接埠，預設為 80
- **PHP 版本**：選擇已安裝的 PHP 版本
- **資料庫**：可選擇已安裝的資料庫類型，在建立網站的同時一併建立資料庫、使用者與密碼
- **目錄**：存放網站檔案的路徑。 若留空，則預設為網站目錄加上 `<name>/public`
- **備註**：選填的備註

## 編輯 PHP 網站

點選網站清單中的 **編輯** 按鈕進入編輯頁面。

可以在基本設定中切換為反向代理或純靜態網站。 域名、監聽、檔案等通用內容會保留；PHP 執行環境、Rewrite 等 PHP 專屬 Web 配置會刪除，並重新生成所選型別的配置。 切換前必須備份網站並記錄 PHP 設定。

### 網域與監聽

設定網站的網域與監聽連接埠。

### 基本設定

設定網站目錄與 PHP 版本等基本資訊。

- **網站目錄**：存放網站檔案的絕對路徑
- **執行目錄**：Laravel 等框架需要設定執行目錄
- **預設文件**：預設首頁檔案，例如 `index.php`、`index.html`
- **PHP 版本**：選擇已安裝的 PHP 版本
- **防跨站攻擊**：啟用後會設定 `open_basedir`，使 PHP 只能存取網站目錄（以及 `/tmp`）內的檔案

### Rewrite 設定

Rewrite 用於 URL 重寫，支援常見 PHP 程式的預設規則。

點選預設下拉選單以選擇常見程式的重寫規則：

面板內建以下 27 個預設：

`crmeb`、`dabr`、`dbshop`、`dedecms`、`discuz`、`discuzq`、`discuzx`、`drupal`、`ecshop`、`edusoho`、`emlog`、`empirecms`、`laravel`、`maccms`、`niushop`、`pbootcms`、`phpcms`、`phpwind`、`sablog`、`seacms`、`shopex`、`shopwind`、`thinkphp`、`typecho`、`wordpress`、`wordpress-multisite`、`zblog`。

選擇預設後，規則會寫入下方編輯器，可以繼續調整再儲存。

:::tip 注意
只有使用 Nginx 時才顯示預設下拉式選單（預設僅適用於 Nginx/OpenResty）。 使用 Apache 時，請直接在編輯器中編寫 Rewrite 規則。
:::

### HTTPS

為網站啟用並設定 HTTPS。

- **總開關**：啟用或關閉 HTTPS。 啟用後，面板會自動增加 `443` 監聽，Nginx 還會增加 `quic`
- **使用已有證書：** 從證書管理中選擇證書，自動填充證書和私鑰。
- **HSTS：** 強制瀏覽器僅使用 HTTPS。
- **HTTP 重定向：** 自動將 HTTP 請求跳轉到 HTTPS。
- **OCSP Stapling：** 啟用 OCSP 裝訂。
- **TLS 版本：** 可選 TLS 1.0、1.1、1.2 和 1.3。
- **憑證** / **私密金鑰**：直接貼上 PEM 憑證和 KEY 私密金鑰內容

網站已繫結域名時，底部 **一鍵簽發證書**可以通過 ACME 申請免費證書。 存在 `*.example.com` 等萬用字元域名時，需要選擇已經在證書管理中新增的 DNS 提供商進行 DNS 驗證。

### 重定向

設定重新導向規則。 每條規則支援：

- **型別：** URL 重定向、Host 重定向或 404 重定向。
- **狀態碼：** 301、302、307 或 308。
- **來源** / **目標**：要比對的路徑或主機以及目標位址
- **保留 URI：** 跳轉時保留原請求路徑和查詢引數。

### 進階設定

- **訪問統計：** 僅 Nginx 支援，用於採集該網站訪問統計。
- **日誌設定**：設定 **存取日誌**和 **錯誤日誌**路徑，或將其設為 **關閉**
- **流量限制**：設定 **並行限制**、**單一 IP 限制**和 **速率限制**
- **真實 IP：** 網站位於 CDN 或 Frp 後方時，配置每行一個的可信代理 IP、真實 IP 請求頭和遞迴查詢。
- **基本認證：** 新增使用者名稱和密碼，訪問網站前必須通過 HTTP Basic Authentication。

### 自定義配置

可以追加 Web 伺服器配置片段。 每個片段包含 **名稱**、**作用範圍**（**目前網站**或**全域**）和 **內容**；編輯器會依已安裝的 Web 伺服器提供 Nginx 或 Apache 語法醒目提示。

### 訪問日誌和錯誤日誌

啟用對應日誌路徑後，**存取日誌**和 **錯誤日誌**分頁會即時顯示日誌檔案。 底部 **清空日誌**會截斷當前檢視的日誌檔案。

:::tip 注意
點選編輯對話方塊底部的 **重設設定**，會根據面板範本重新產生網站的 Web 伺服器設定，並捨棄對產生設定檔所做的手動修改。
:::

## 網站目錄結構

預設目錄結構：

```
/opt/ace/sites/website-name/public
├── index.php          # 入口檔案
├── .user.ini          # PHP 配置
└── ...
```

## 切換 PHP 版本

可以在網站編輯頁的 **基本設定** 中切換 PHP 版本：

1. 開啟網站編輯頁。
2. 進入 **基本設定**。
3. 在 **PHP 版本**中選擇新版本。
4. 點選 **儲存**。

:::warning 注意
切換 PHP 版本可能導致程式不相容， 應先在測試環境驗證。
:::

## PHP 管理頁面

進入 **應用** > **執行環境**，點選已安裝 PHP 版本的 **管理**，開啟 PHP 管理頁。 頁面包含：

- **執行狀態：** 檢視 `php-fpm-<version>` 服務狀態，提供啟動、停止、重啟和過載； 此處還提供兩項操作：
  - **設為 CLI 預設版本**：將此 PHP 版本設為系統 CLI 中預設的 `php` 指令
  - **檢視 PHPInfo**：開啟彈出視窗檢視該版本完整的 `phpinfo()` 輸出
- **模組管理：** 安裝或解除安裝 PHP 擴充套件。
- **參數調校**：透過表單調整常用參數（參閱[參數調校](#parameter-tuning)）
- **主配置：** 編輯原始 `php.ini`。
- **FPM 配置：** 編輯 PHP-FPM 配置檔案。
- **負載狀態：** 檢視 PHP-FPM 當前負載。
- **執行日誌**：即時檢視 `php-fpm-<version>` 服務的執行日誌
- **錯誤日誌**：即時檢視 PHP 錯誤日誌；點選 **清空日誌**可截斷檔案
- **慢速日誌**：即時檢視 PHP-FPM 慢速日誌；點選 **清空慢速日誌**可截斷檔案

### 模組管理

**模組管理**分頁列出所選版本支援的擴充套件。 **安裝**或**刪除**操作。 安裝會建立後臺任務， 安裝和解除安裝都需要確認。

可用擴充套件包括 `fileinfo`、**OPcache**、`igbinary`、**Redis**（依賴 `igbinary`）、**Memcached**、**APCu**、**ImageMagick**、`exif`、`pgsql` / `pdo_pgsql`、`sqlsrv` / `pdo_sqlsrv`、`imap`、`zip`、`bz2`、`ssh2`、`event`、`readline`、`snmp`、`ldap`、`enchant`、`pspell`、`calendar`、`gmp`、`xlswriter`、`xsl`、`intl`、`gettext`、`grpc`、`protobuf`、`rdkafka`、`xhprof`、**Xdebug**、`yaml`、`zstd`、`sysvmsg` / `sysvsem` / `sysvshm`、**ionCube**、**Swoole** 和 **Swow**。

:::tip 版本差異
可用擴充套件會隨 PHP 版本變化：**Swow** 僅支援 PHP 8.0 及以上版本；PHP 8.4 及以上不再提供 `pspell` 和 `imap`；PHP 8.5 及以上已內建 **OPcache**，不再將其作為可安裝擴充套件。
:::

### 參數調校

**參數調校** 分頁將常用設定分組為多個子分頁，無需手動編輯檔案即可調整：

- **常規：** `short_open_tag`、`date.timezone`、`display_errors`、`error_reporting`。
- **停用函式**：編輯 `disable_functions` 清單（參閱[停用函式](#disabled-functions)）
- **上傳限制：** `upload_max_filesize`、`post_max_size`、`max_file_uploads`、`memory_limit`。
- **超時限制：** `max_execution_time`、`max_input_time`、`max_input_vars`。
- **效能調校**：寫入 `php-fpm.conf` 的 PHP-FPM 程序管理器設定，包括 `pm`、`pm.max_children`，以及 `dynamic` 模式下的 `pm.start_servers`、`pm.min_spare_servers` 和 `pm.max_spare_servers`
- **工作階段**：設定 `session.save_handler`（`files`、`redis` 或 `memcached`）、儲存路徑、`session.gc_maxlifetime` 及 `session.cookie_lifetime`。 **清理會話檔案**會刪除該版本全部會話檔案。

## PHP 配置

### php.ini 設定

可以在 PHP 管理頁的 **主配置**中編輯 `php.ini`。常用專案也可通過引數調優修改：

對於常用項目，**參數調校** 分頁提供表單，無需手動編輯檔案即可調整：

```ini
upload_max_filesize = 50M
post_max_size = 50M
max_execution_time = 300
memory_limit = 256M
```

### 停用函式

PHP 預設停用 `exec`、`system`、`passthru` 等危險函式。 如需啟用，請編輯 php.ini 中的 `disable_functions` 值，或在 PHP 管理頁的 **參數調校** 分頁中修改 **停用函式** 欄位。

:::danger 警告
啟用危險函式會增加安全風險， 必須確認程式確實需要並採取額外隔離措施。
:::

## 常見問題

### 502 Bad Gateway

- 檢查 PHP-FPM 是否正常執行。
- 檢查網站選擇的 PHP 版本是否正確。

### 檔案上傳失敗

- 檢查 `upload_max_filesize` 和 `post_max_size`。
- 檢查目錄許可權。

### 頁面空白

- 臨時啟用 PHP 錯誤顯示。
- 檢查 PHP 錯誤日誌。
