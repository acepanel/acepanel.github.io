# 執行環境

執行環境用於安裝各種程式語言的執行階段，為網站與專案提供執行環境。

## 支援的語言

AcePanel 支援下列程式語言的執行環境：

| 語言                      | 可用版本                                        | 說明                     |
| ----------------------- | ------------------------------------------- | ---------------------- |
| Go                      | 1.20 - 1.25 | 適合用來建置高效能的後端服務         |
| Java                    | JDK 8、11、17、21、25                           | 採用 Amazon Corretto 發行版 |
| Node.js | 20、22、24                                    | 適合前端建置與 Node 應用程式      |
| PHP                     | 7.4 - 8.5   | 適合 Web 開發              |
| Python                  | 3.10 - 3.14 | 適合腳本與 Web 應用程式         |
| .NET    | LTS / STS 版本                                | 適用於現代應用程式與服務的跨平台框架     |

## 執行環境清單

前往 **應用程式** 頁面，點選 **執行環境** 頁籤即可檢視可用的執行環境：

![執行環境](/images/app/app-runtime.png)

點選頂端的語言分類可篩選特定語言的版本，或使用右側的搜尋框依名稱或說明搜尋：

![PHP 執行環境](/images/app/app-runtime-php.png)

## 安裝執行環境

1. 前往 **應用程式** 頁面
2. 點選 **執行環境** 頁籤
3. 選取所需的語言分類（或檢視全部）
4. 點選對應版本的 **安裝** 按鈕

:::tip 版本選擇建議

- 正式環境建議使用 LTS（長期支援）版本
- 標示為「End of Life」的版本不建議用於新專案
- 可同時安裝多個版本，並在專案中指定要使用的版本
  :::

## 管理執行環境

已安裝的執行環境會顯示 **管理** 按鈕。 點選即可進入管理頁面：

![執行環境管理](/images/app/app-runtime-manage.png)

### 執行狀態

顯示執行環境目前的狀態，並提供啟動、停止、重新啟動與重新載入等操作。

### 模組管理（PHP）

PHP 執行環境提供模組管理功能，可安裝或解除安裝各種 PHP 模組：

![PHP 模組管理](/images/app/app-runtime-modules.png)

模組管理頁籤會列出每個可用模組的名稱、說明，以及 **安裝** / **刪除** 操作。 安裝或解除安裝模組會以背景任務的形式提交，請在 **背景任務** 中檢視結果。

可安裝的模組種類豐富，包括（但不限於）：

- **快取 / 序列化**：OPcache（位元組碼快取）、APCu（使用者層級記憶體鍵值快取）、igbinary、Redis（需要 igbinary）、Memcached
- **影像 / 檔案**：ImageMagick、exif、fileinfo、zip、bz2、zstd、xlswriter（Excel）
- **資料庫**：pgsql 與 pdo_pgsql（PostgreSQL）、sqlsrv 與 pdo_sqlsrv（SQL Server）
- **網路 / 通訊協定**：ssh2、snmp、ldap、imap、event、grpc、protobuf、rdkafka（Kafka）
- **國際化 / 文字**：intl、gettext、enchant、pspell、readline、yaml、xsl
- **System V IPC**：sysvmsg、sysvsem、sysvshm
- **數學**：gmp、calendar
- **效能分析 / 偵錯**：xhprof、xdebug
- **高效能 / 加密**：Swoole、Swow、ionCube（必須在 OPcache 之後安裝）

:::tip 版本感知的可用性
模組目錄會依所選的 PHP 版本進行調整：

- **Swow** 僅在 PHP 8.0 以後的版本可用
- **pspell** 與 **imap** 在 PHP 8.4 以後的版本已移除（不再建議使用）
- **OPcache** 在 PHP 8.5 以後的版本不再以可安裝模組形式提供，因為它已原生內建
  :::

### 設定檔（PHP）

您可以透過 **主設定** 頁籤使用內建編輯器編輯 PHP 的主設定檔（php.ini），並透過 **FPM 設定** 頁籤編輯 FPM 設定檔。 執行狀態頁面上的 **檢視 PHPInfo** 按鈕會顯示完整的 `phpinfo()` 輸出。

### 參數調校（PHP）

**參數調校** 頁籤提供以表單方式調整常用設定，無需直接編輯原始設定。 其分為下列幾個部分：

- **一般**：`short_open_tag`、`date.timezone`、`display_errors` 與 `error_reporting`
- **停用函式**：以逗號分隔的待停用 PHP 函式清單（例如 `exec`、`shell_exec`、`system`、`passthru`）
- **上傳限制**：`upload_max_filesize`、`post_max_size`、`max_file_uploads` 與 `memory_limit`
- **逾時限制**：`max_execution_time`、`max_input_time` 與 `max_input_vars`
- **效能調校**：PHP-FPM 行程管理器設定（`pm`、`pm.max_children`，以及 `dynamic` 模式下的 `pm.start_servers`、`pm.min_spare_servers`、`pm.max_spare_servers`）
- **工作階段**：`session.save_handler`（files、redis 或 memcached）、對應的連線資訊或儲存路徑、`session.gc_maxlifetime` 與 `session.cookie_lifetime`。 **清理工作階段檔案** 按鈕會刪除所有工作階段檔案；僅在儲存處理器設定為 `files` 時生效

### 記錄檔（PHP）

PHP 執行環境提供獨立的 **負載狀態** 頁籤（FPM 行程集區負載），以及 **執行記錄**、**錯誤記錄** 與 **慢速記錄** 頁籤，用於監控與疑難排解。

### 語言專屬設定

部分執行環境會在其管理頁面提供專屬設定：

- **Go**：設定模組代理（`GOPROXY`），內建官方代理以及 goproxy.cn、阿里、騰訊等映像站的預設項
- **Node.js**：設定 npm 套件來源（registry），內建官方來源以及 npmmirror、騰訊、華為等映像站的預設項
- **Python**：設定 pip 映像，內建官方來源以及阿里、騰訊、清華、中科大等映像站的預設項

### 設為 CLI 預設版本

點選 **設為 CLI 預設版本** 按鈕，可將目前版本設為命令列使用的預設版本。 所有執行環境（Go、Java、Node.js、PHP、Python 與 .NET）均支援此功能。

## 多版本共存

AcePanel 支援同一語言的多個版本共存。 例如，您可以同時安裝 PHP 7.4 與 PHP 8.3，不同網站可使用不同的 PHP 版本。

安裝路徑規則：

- **Go**：`/opt/ace/server/go/version`
- **Java**：`/opt/ace/server/java/version`
- **Node.js**：`/opt/ace/server/nodejs/version`
- **PHP**：`/opt/ace/server/php/version`
- **Python**：`/opt/ace/server/python/version`
- **.NET**：`/opt/ace/server/dotnet/version`

## 在專案中使用

建立專案時，您可以在專案設定中選擇要在專案內使用的執行環境版本。 詳情請參閱 [專案管理](../project) 文件。

## 更新執行環境

當有新版本可用時，清單中會顯示最新的版本號。 您可以：

1. 解除安裝舊版本並安裝新版本
2. 保留舊版本並同時安裝新版本（建議）

:::warning 注意
更新執行環境版本可能導致相依該版本的專案發生相容性問題。 請先在測試環境中驗證，再更新正式環境。
:::
