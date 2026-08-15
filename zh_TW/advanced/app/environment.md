# 執行環境

![執行環境](/images/app/environment.png)

執行環境用於安裝各種程式語言的執行階段，為網站與專案提供執行環境。

## 支援的語言

AcePanel 支援下列程式語言的執行環境：

| 語言                      | 可用版本                                        | 說明                     |
| ----------------------- | ------------------------------------------- | ---------------------- |
| Go                      | 1.20 - 1.25 | 適合用來建置高效能的後端服務         |
| Java                    | JDK 8、11、17、21、25                           | 使用 Amazon Corretto 發行版 |
| Node.js | 20、22、24                                    | 適合前端建置與 Node 應用程式      |
| PHP                     | 7.4 - 8.5   | 適合 Web 開發              |
| Python                  | 3.10 - 3.14 | 適合腳本與 Web 應用程式         |
| .NET    | LTS / STS 版本                                | 適用於現代應用程式與服務的跨平台框架     |

## 執行環境清單

進入 **應用** 頁面，點選 **執行環境** 分頁檢視可用執行環境：

點選頂端的語言分類可篩選特定語言的版本，或使用右側的搜尋框依名稱或說明搜尋：

## 安裝執行環境

1. 進入 **應用** 頁面
2. 點選 **執行環境** 頁籤
3. 選取所需的語言分類（或檢視全部）
4. 點選對應版本的 **安裝** 按鈕

執行環境支援時，安裝對話方塊還會顯示 **預執行指令碼**和**自定義編譯引數**。 只有構建確實需要特定依賴、映象、補丁或編譯選項時才填寫。 指令碼以安裝許可權執行，提交任務前必須檢查內容。

:::tip 版本選擇建議

- 正式環境建議使用 LTS（長期支援）版本
- 標示為「End of Life」的版本不建議用於新專案
- 可同時安裝多個版本，並在專案中指定要使用的版本
  :::

## 管理執行環境

已安裝的執行環境會顯示 **管理** 按鈕。 點選即可進入管理頁面：

### 執行狀態

顯示執行環境目前的狀態，並提供啟動、停止、重新啟動與重新載入等操作。

### 模組管理（PHP）

PHP 執行環境提供模組管理功能，可安裝或解除安裝各種 PHP 模組：

模組管理分頁列出所有可用模組的名稱、說明以及 **安裝** / **刪除** 操作。 安裝或解除安裝模組會提交後臺任務；請在 **任務 > 面板任務** 中檢視結果。

常用模組包括：

- **快取和序列化：** OPcache、APCu、igbinary、Redis（依賴 igbinary）、Memcached。
- **影像和檔案：** ImageMagick、exif、fileinfo、zip、bz2、zstd、xlswriter。
- **資料庫：** pgsql、pdo_pgsql、sqlsrv、pdo_sqlsrv。
- **網路和協議：** ssh2、snmp、ldap、imap、event、grpc、protobuf、rdkafka。
- **國際化和文本：** intl、gettext、enchant、pspell、readline、yaml、xsl。
- **System V IPC：** sysvmsg、sysvsem、sysvshm。
- **數學：** gmp、calendar。
- **分析和除錯：** xhprof、xdebug。
- **高效能和加密：** Swoole、Swow、ionCube，其中 ionCube 必須在 OPcache 之後安裝。

:::tip 依 PHP 版本顯示
模組列表會隨所選 PHP 版本變化：

- **Swow** 僅支援 PHP 8.0 及以上版本
- PHP 8.4 及以上不再提供 **pspell** 和 **imap**（不再建議）
- PHP 8.5 及以上已原生內建 **OPcache**，不再將其作為可安裝模組
  :::

### 配置檔案（PHP）

可以使用內建編輯器，在 **主要設定** 分頁中編輯 PHP 主要設定檔 php.ini，並在 **FPM 設定** 分頁中編輯 FPM 設定檔。 執行狀態頁的 **檢視 PHPInfo**會顯示完整 `phpinfo()` 資訊。

### 引數調優（PHP）

**參數調校** 分頁透過表單調整常用設定，無需編輯原始設定。 其中包含以下分組：

- **常規：** `short_open_tag`、`date.timezone`、`display_errors`、`error_reporting`。
- **停用函式：** 以逗號分隔需要停用的函式，例如 `exec`、`shell_exec`、`system`、`passthru`。
- **上傳限制：** `upload_max_filesize`、`post_max_size`、`max_file_uploads`、`memory_limit`。
- **超時限制：** `max_execution_time`、`max_input_time`、`max_input_vars`。
- **效能調校**：PHP-FPM 程序管理器設定（`pm`、`pm.max_children`，以及 `dynamic` 模式下的 `pm.start_servers`、`pm.min_spare_servers` 和 `pm.max_spare_servers`）
- **工作階段**：`session.save_handler`（files、redis 或 memcached）、對應的連線資訊或儲存路徑、`session.gc_maxlifetime` 及 `session.cookie_lifetime`。 **清理工作階段檔案** 按鈕會刪除全部工作階段檔案；僅當儲存處理器設為 `files` 時生效

### 日誌（PHP）

PHP 還提供獨立的 **負載狀態**（FPM 程序池負載）、**執行日誌**、**錯誤日誌**和**慢日誌**標籤頁。

### 語言專屬設定

部分執行環境的管理頁面還提供專用設定：

- **Go：** 配置 `GOPROXY`，可選擇官方地址、goproxy.cn、阿里雲和騰訊雲等預設。
- **Node.js：** 配置 npm 映象，可選擇官方地址、npmmirror、騰訊雲和華為雲等預設。
- **Python：** 配置 pip 映象，可選擇官方地址、阿里雲、騰訊雲、清華大學和中國科學技術大學等預設。

### 設定為 CLI 預設版本

點選 **設定為 CLI 預設版本**，可把當前版本設為命令列預設版本。 Go、Java、Node.js、PHP、Python 和 .NET 均支援該操作。

## 多版本共存

同一語言可以安裝多個版本。 例如同時安裝 PHP 7.4 和 PHP 8.3，讓不同網站分別使用不同版本。

安裝路徑規則：

- **Go**：`/opt/ace/server/go/version`
- **Java**：`/opt/ace/server/java/version`
- **Node.js**：`/opt/ace/server/nodejs/version`
- **PHP**：`/opt/ace/server/php/version`
- **Python**：`/opt/ace/server/python/version`
- **.NET**：`/opt/ace/server/dotnet/version`

## 在專案中使用

建立專案時，可以在專案設定中選擇執行環境版本。 詳見[專案管理](../project)。

## 更新執行環境

有新版本時，列表會顯示最新版本號。 可以解除安裝舊版本後安裝新版本，也可以保留舊版本並同時安裝新版本，後者更適合逐步驗證。

1. 解除安裝舊版本後安裝新版本
2. 保留舊版本，同時安裝新版本（建議）

:::warning 注意
更新執行環境版本可能導致依賴該版本的專案出現相容性問題。 更新正式環境前，請先在測試環境中驗證。
:::
