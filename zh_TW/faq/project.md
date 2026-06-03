# 專案常見問題

## 專案啟動失敗

點選**日誌**以查看錯誤訊息。 常見原因：

### 權限問題

專案目錄應位於 `/opt/ace/projects/` 之下，並由 www 擁有：

```shell
chown -R www:www /opt/ace/projects/project-name
```

若部署於 `/root` 下，則需以 root 使用者身分執行（不建議）。

### 找不到命令

例如 `node: No such file or directory`，表示執行環境不在服務的 `PATH` 中。

解決方案：

1. 在**啟動命令**中使用帶版本前綴的執行檔，例如 `node22 app.js`、`go1.23 run main.go` 或 `php8.3 artisan serve`。 建立專案時選擇語言版本與框架後，面板會自動產生這個帶前綴的命令。
2. 或在**編輯** -> **執行環境設定** -> **環境變數**中加入 `PATH`（或其他任意變數）。

### 連接埠已被佔用

修改應用程式的監聽連接埠，或停止佔用該連接埠的行程：

```shell
lsof -i:3000  # 查看佔用連接埠的行程
```

## 專案類型與框架預設

建立專案時需先選擇一個**專案類型**。 支援的類型有**通用**、**Go**、**Java**、**Node.js**、**PHP**、**Python** 與 **.NET**。 專案清單也為每種類型提供對應的分頁標籤，方便篩選專案。

選擇語言類型（通用除外）後會顯示一個**版本**選擇器，其中列出你已安裝的執行環境，以及一個**框架**預設。 選擇版本與框架後會自動填入**啟動命令**，使用帶版本前綴的執行檔，確保它能在服務最小化的 `PATH` 下執行。 你隨時可以將框架切換為**自訂**並自行撰寫命令。

各類型可用的框架預設：

| 類型                      | 預設                                                                                                                            |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Go                      | 執行模式：**原始碼**（`go<version> run <entry file>`，例如 `main.go`）或**二進位**（執行編譯後的 `<root_dir>/main`）                                   |
| Java                    | Spring Boot (JAR)、Spring Boot (WAR)、Quarkus、Micronaut、Vert.x、Dropwizard |
| Node.js | Express、Koa、Fastify、NestJS、Next.js、Nuxt.js、Hapi、AdonisJS                                      |
| PHP                     | Laravel Octane、Laravel (Artisan Serve)、ThinkPHP、Webman、Hyperf、Swoole HTTP、RoadRunner                       |
| Python                  | Django、Flask、FastAPI (Uvicorn)、Tornado、Sanic、aiohttp、Gunicorn                                              |
| .NET    | ASP.NET Core Web、ASP.NET Core API、Blazor Server、gRPC Service、Worker Service                   |

例如，選擇 **Node.js**、版本 `22` 與 **Express** 預設會產生 `node22 app.js`；選擇 **PHP**、版本 `8.3` 與 **Laravel (Artisan Serve)** 會產生 `php8.3 artisan serve`。

## 設定環境變數

**編輯** -> **執行環境設定** -> **環境變數**，點選**新增**。

常見設定：

- `NODE_ENV=production`
- `PORT=3000`

## 啟動前命令

在**編輯** -> **執行環境設定** -> **啟動前命令**中設定。 於專案啟動前執行，例如安裝相依套件：

- Node.js：`npm install` 或 `yarn`
- Python：`pip install -r requirements.txt`
- Go：`go build`

啟動前與啟動後命令與服務本身使用**相同的最小化 `PATH`**（產生的單元不會設定自訂 `PATH`）。 若某個裸命令在你的 shell 中可用，但啟動前命令回報 `command not found`，請使用帶版本前綴的執行檔（例如 `npm22 install`、`pip3.12 install -r requirements.txt`）或絕對路徑，與**啟動命令**的處理方式相同。

若你需要覆寫 systemd 的預設行為，同一面板中還提供了**啟動後命令**（啟動後執行）、**停止命令**與**重新載入命令**。

## 查看專案日誌

1. 面板：在專案清單中點選**日誌**
2. 命令列：`journalctl -u project-name -f`（systemd 單元以專案命名，例如 `myapp.service`）

## 專案自動重啟

在**執行環境設定** -> **重啟策略**中設定：

- **重啟策略**：不重啟 / 總是重啟 / 失敗時重啟 / 異常時重啟 / 中止時重啟 / 成功時重啟
- **重啟間隔**：兩次重啟之間的等待時間（例如 `5s`、`1min`）
- **最大重啟次數**：防止無限重啟

## 服務相依性

在**編輯** -> **相依性**中，你可以控制相對於其他 systemd 單元的啟動順序（常見服務：`network.target`、`mysqld.service`、`postgresql.service`、`redis.service`）：

- **Requires**：強相依。 若所需的單元無法使用，本服務將啟動失敗。
- **Wants**：弱相依。 即使這些單元啟動失敗，本服務仍會啟動。
- **After**：在所列單元之後啟動本服務。
- **Before**：在所列單元之前啟動本服務。

## 資源限制

在**編輯** -> **資源限制**中，你可以限制服務的資源用量：

- **記憶體限制 (MB)**：最大記憶體。 設為 `0` 表示不限制。
- **CPU 配額**：以百分比表示的 CPU 時間，`100%` 等於一個 CPU 核心（例如 `50%` = 半個核心，`200%` = 兩個核心）。 留空表示不限制。

## 安全設定

在**編輯** -> **安全設定**中，你可以加強服務隔離。 這些設定對應 systemd 的沙箱指令，可能導致功能異常，因此在依賴它們之前請先測試。

**權限控制：**

- **禁止新權限**：阻止服務及其子行程取得新權限（例如透過 setuid）。
- **保護 /tmp**：為服務提供獨立的 `/tmp`。
- **保護 /home**：使 `/home`、`/root` 與 `/run/user` 無法存取。
- **保護系統**：將部分檔案系統掛載為唯讀 —— `true`：`/usr` 與 `/boot` 唯讀；`full`：同時將 `/etc` 設為唯讀；`strict`：整個檔案系統唯讀。

**路徑存取控制：**

- **讀寫路徑**：允許服務讀取與寫入的路徑（在啟用保護系統時可用於開放例外）。
- **唯讀路徑**：服務僅可讀取的路徑。

## 反向代理設定

建立專案時啟用**反向代理**，然後填入**網域**與**專案連接埠**。 系統會自動建立一個監聽 80 連接埠的反向代理網站，將請求代理至 `http://127.0.0.1:project-port`。

手動設定：建立一個反向代理網站，上游位址為 `http://127.0.0.1:project-port`。
