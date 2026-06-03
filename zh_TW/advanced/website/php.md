# PHP 網站

PHP 網站用於執行 PHP 程式，例如 WordPress、Laravel、ThinkPHP 等。

## 前置需求

在建立 PHP 網站之前，您需要安裝：

1. **Web 伺服器**：Nginx、OpenResty 或 Apache
2. **PHP 執行環境**：在 **應用程式** > **執行環境** 中安裝所需的 PHP 版本

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

### 網域與監聽

設定網站的網域與監聽連接埠。

![網域與監聽設定](/images/website/website-php-edit.png)

### 基本設定

設定網站目錄與 PHP 版本等基本資訊。

![基本設定](/images/website/website-php-basic.png)

- **網站目錄**：存放網站檔案的絕對路徑
- **執行目錄**：Laravel 等框架需要設定執行目錄
- **預設文件**：預設首頁檔案，例如 `index.php`、`index.html`
- **PHP 版本**：選擇已安裝的 PHP 版本
- **防跨站攻擊**：啟用後會設定 `open_basedir`，使 PHP 只能存取網站目錄（以及 `/tmp`）內的檔案

### Rewrite 設定

Rewrite 用於 URL 重寫，支援常見 PHP 程式的預設規則。

![Rewrite 設定](/images/website/website-php-rewrite.png)

點選預設下拉選單以選擇常見程式的重寫規則：

![Rewrite 預設](/images/website/website-php-rewrite-preset.png)

面板內建以下 27 個預設：

`crmeb`、`dabr`、`dbshop`、`dedecms`、`discuz`、`discuzq`、`discuzx`、`drupal`、`ecshop`、`edusoho`、`emlog`、`empirecms`、`laravel`、`maccms`、`niushop`、`pbootcms`、`phpcms`、`phpwind`、`sablog`、`seacms`、`shopex`、`shopwind`、`thinkphp`、`typecho`、`wordpress`、`wordpress-multisite`、`zblog`

選擇預設後，其規則會寫入下方的編輯器中，您可以在儲存前對其進行微調。

:::tip 注意
僅當 Web 伺服器為 Nginx 時才會顯示預設下拉選單（預設僅針對 Nginx/OpenResty 提供）。 在 Apache 上，請直接在編輯器中撰寫重寫規則。
:::

### HTTPS

為網站啟用並設定 HTTPS。

- **主開關**：啟用或停用 HTTPS。 啟用後，面板會自動新增 `443` 監聽（Nginx 還會新增 `quic`）
- **使用現有憑證**：從憑證管理中選擇一個憑證，自動填入憑證與私鑰
- **HSTS**：強制瀏覽器僅透過 HTTPS 存取網站
- **HTTP 重新導向**：自動將 HTTP 請求重新導向至 HTTPS
- **OCSP Stapling**：啟用 OCSP Stapling
- **TLS 版本**：在 TLS 1.0 / 1.1 / 1.2 / 1.3 中選擇允許的協定
- **憑證** / **私鑰**：直接貼上 PEM 憑證與 KEY 私鑰內容

當網站已綁定網域時，底部的 **一鍵簽發憑證** 按鈕會透過 ACME 申請免費憑證。 如果網域為萬用網域（例如 `*.example.com`），系統會要求您選擇一個 DNS 服務商進行 DNS 驗證（請先在憑證管理中新增）。

### 重新導向

設定重新導向規則。 每條規則支援：

- **重新導向類型**：URL 重新導向、網域重新導向或 404 重新導向
- **狀態碼**：301（永久移動）、302（找到）、307（暫時重新導向）或 308（永久重新導向）
- **來源** / **目標**：相符的路徑/網域以及目標位址
- **保留 URI**：重新導向時保留原始請求路徑與查詢參數

### 進階設定

- **存取統計**（僅 Nginx）：開關此網站的存取統計收集
- **記錄設定**：設定 **存取記錄** 與 **錯誤記錄** 路徑，或將其設定為 **停用**
- **速率限制**：限制 **並發限制**（站台最大並發連線數）、**單一 IP 限制**（每個 IP 的最大並發連線數）與 **速率限制**（單次請求速率，單位 KB）
- **真實 IP**：設定信任的代理 IP 來源（每行一個），以便在 CDN 或 Frp 後方辨識訪客的真實 IP；選擇 IP 標頭（X-Real-IP、X-Forwarded-For、CF-Connecting-IP 等） 並可選擇啟用遞迴查詢
- **基本驗證**：新增使用者名稱/密碼，要求訪客在存取網站前先通過 HTTP 基本驗證

### 自訂設定

附加自訂的 Web 伺服器設定片段。 每個片段都有一個 **名稱**、一個 **作用範圍**（**本網站** 或 **全域**）與一個 **內容** 區塊，內容會依據已安裝的 Web 伺服器使用 Nginx 或 Apache 語法醒目提示進行編輯。

### 存取記錄 / 錯誤記錄

當對應的記錄路徑已啟用時，**存取記錄** 與 **錯誤記錄** 分頁會即時串流顯示記錄檔。 使用底部的 **清除記錄** 按鈕可清空目前檢視的記錄。

:::tip 注意
點選編輯對話方塊底部的 **重設設定**，可從面板範本重新產生網站的 Web 伺服器設定，捨棄對所產生設定檔所做的手動變更。
:::

## 網站目錄結構

建立網站後，預設的目錄結構：

```
/opt/ace/sites/website-name/public
├── index.php          # 進入點檔案
├── .user.ini          # PHP 設定
└── ...
```

## PHP 版本切換

您可以在網站編輯頁面的 **基本設定** 中切換 PHP 版本：

1. 進入網站編輯頁面
2. 點選 **基本設定** 分頁
3. 在 **PHP 版本** 下拉選單中選擇新版本
4. 點選 **儲存**

:::warning 注意
切換 PHP 版本可能導致程式不相容。 請先在測試環境中驗證。
:::

## PHP 管理頁面

前往 **應用程式** > **執行環境**，在已安裝的 PHP 版本上點選 **管理**，開啟 PHP 管理頁面。 它提供以下分頁：

- **執行狀態**：顯示 `php-fpm-<version>` 服務的執行狀態，並提供啟動/停止/重新啟動/重新載入控制。 這裡還提供兩個額外操作：
  - **設為 CLI 預設版本**：將此 PHP 版本設為系統 CLI 中的預設 `php` 命令
  - **檢視 PHPInfo**：彈出視窗顯示此版本完整的 `phpinfo()` 輸出
- **模組管理**：安裝或解除安裝 PHP 擴充功能（見下文）
- **參數調整**：透過表單調整常用參數（見 [參數調整](#parameter-tuning)）
- **主設定**：編輯原始的 `php.ini` 檔案
- **FPM 設定**：編輯原始的 PHP-FPM 設定檔
- **負載狀態**：檢視目前的 PHP-FPM 負載指標
- **執行記錄**：即時串流顯示 `php-fpm-<version>` 服務的執行記錄
- **錯誤記錄**：即時串流顯示 PHP 錯誤記錄；**清除記錄** 按鈕可將其清空
- **慢速記錄**：即時串流顯示 PHP-FPM 慢速記錄；**清除慢速記錄** 按鈕可將其清空

### 模組管理

**模組管理** 分頁列出所選版本支援的擴充功能。 每一列顯示模組名稱與描述，並帶有 **安裝** 或 **刪除** 操作。 安裝以背景任務的形式執行，因此請在背景任務清單中檢視進度。 安裝與解除安裝都需要確認。

可用擴充功能包括 `fileinfo`、**OPcache**、`igbinary`、**Redis**（需要 `igbinary`）、**Memcached**、**APCu**、**ImageMagick**、`exif`、`pgsql` / `pdo_pgsql`、`sqlsrv` / `pdo_sqlsrv`、`imap`、`zip`、`bz2`、`ssh2`、`event`、`readline`、`snmp`、`ldap`、`enchant`、`pspell`、`calendar`、`gmp`、`xlswriter`、`xsl`、`intl`、`gettext`、`grpc`、`protobuf`、`rdkafka`、`xhprof`、**Xdebug**、`yaml`、`zstd`、`sysvmsg` / `sysvsem` / `sysvshm`、**ionCube**（在 OPcache 之後安裝）、**Swoole** 與 **Swow**。

:::tip 版本差異
可用清單會依據 PHP 版本進行調整：**Swow** 僅在 PHP 8.0 及以上提供；`pspell` 與 `imap` 在 PHP 8.4 及以上被移除；**OPcache** 在 PHP 8.5 及以上不再作為可安裝的擴充功能提供，因為它已內建。
:::

### 參數調整

**參數調整** 分頁將常用設定分組至子分頁中，讓您無需手動編輯檔案即可調整：

- **一般**：`short_open_tag`、`date.timezone`、`display_errors`、`error_reporting`
- **停用的函式**：編輯 `disable_functions` 清單（見 [停用的函式](#disabled-functions)）
- **上傳限制**：`upload_max_filesize`、`post_max_size`、`max_file_uploads`、`memory_limit`
- **逾時限制**：`max_execution_time`、`max_input_time`、`max_input_vars`
- **效能調整**：寫入 `php-fpm.conf` 的 PHP-FPM 行程管理器設定 —— `pm`、`pm.max_children`，以及（在 `dynamic` 模式下）`pm.start_servers`、`pm.min_spare_servers`、`pm.max_spare_servers`
- **工作階段**：`session.save_handler`（`files`、`redis` 或 `memcached`）、儲存路徑（redis 與 memcached 的主機/連接埠/密碼）、`session.gc_maxlifetime` 與 `session.cookie_lifetime`。 **清理工作階段檔案** 按鈕（需確認）會刪除此版本的所有工作階段檔案

## PHP 設定

### php.ini 設定

您可以在 PHP 管理頁面的 **主設定** 分頁中編輯原始的 `php.ini`。

對於常用項目，**參數調整** 分頁提供了一個表單，讓您無需手動編輯檔案即可調整：

```ini
upload_max_filesize = 50M    # 最大上傳檔案大小
post_max_size = 50M          # 最大 POST 資料大小
max_execution_time = 300     # 最大執行時間
memory_limit = 256M          # 記憶體限制
```

### 停用的函式

PHP 預設停用部分危險函式，例如 `exec`、`system`、`passthru` 等。 若要啟用它們，請編輯 php.ini 中的 `disable_functions` 值，或在 PHP 管理頁面的 **參數調整** 分頁的 **停用的函式** 欄位中進行調整。

:::danger 警告
啟用危險函式可能帶來安全風險。 請謹慎操作。
:::

## 常見問題

### 502 Bad Gateway

- 檢查 PHP-FPM 是否正常執行
- 檢查 PHP 版本是否設定正確

### 檔案上傳失敗

- 檢查 `upload_max_filesize` 與 `post_max_size` 設定
- 檢查目錄權限

### 空白頁面

- 啟用 PHP 錯誤顯示
- 檢查 PHP 錯誤記錄
