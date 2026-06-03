# 第一個專案：部署 Node.js 應用程式

本文以一個簡單的 Node.js HTTP 服務為例，示範如何透過 AcePanel 部署與管理專案。

## 準備程式碼

首先，準備一個簡單的 Node.js 應用程式。 在專案目錄中建立 `app.js`：

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello from AcePanel!\n');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
```

## 建立專案

前往「專案」頁面，切換到「Node.js」分頁，然後點選「建立專案」。

![建立專案](/images/quickstart/project-create.png)

填寫設定：

- **專案名稱**：專案識別碼，例如 `hello-node`
- **專案目錄**：留空則使用預設路徑（`專案目錄/專案名稱`）
- **Node.js 版本** / **框架**：選擇一個已安裝的 Node.js 版本與框架範本（Express、Koa、Fastify、NestJS、Next.js、Nuxt.js、Hapi、AdonisJS）。 啟動指令會自動產生；選擇「自訂」則可自行填寫
- **執行使用者**：通常選擇 `www`
- **啟動指令**：`node app.js`
- **反向代理**：若需透過網域存取，請啟用自動建立反向代理。 啟用後，請一併填寫 **網域** 與你的應用程式所監聽的 **專案連接埠**（例如 `3000`），系統會自動建立一個代理至 `http://127.0.0.1:<port>` 的網站

### 其他專案類型

本文以 Node.js 為例，但「專案」頁面同時也提供 **通用**、**Go**、**Java**、**PHP**、**Python** 與 **.NET** 等分頁。 在點選「建立專案」前，請先切換到對應的分頁。 每種語言類型都可讓你選擇一個已安裝的執行環境版本，以及一個會自動產生啟動指令的框架範本（選擇「自訂」則可自行撰寫）：

| 類型                       | 版本 + 範本選項                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **通用**                   | 無版本／框架選擇器；只需手動填寫啟動指令（適用於任何未綁定受管執行環境的行程）                                                                                               |
| **Go**                   | **原始碼** 的 **執行模式**（選擇一個 Go 版本與一個 **進入點檔案**，例如 `main.go`，會執行 `go run`）或 **執行檔**（執行專案目錄中已編譯的執行檔）                                        |
| **Java**                 | Java 版本 + Spring Boot（JAR/WAR）、Quarkus、Micronaut、Vert.x、Dropwizard                                                    |
| **PHP**                  | PHP 版本 + Laravel Octane、Laravel（Artisan Serve）、ThinkPHP、Webman、Hyperf、Swoole HTTP、RoadRunner                                          |
| **Python**               | Python 版本 + Django、Flask、FastAPI（Uvicorn）、Tornado、Sanic、aiohttp、Gunicorn                                                              |
| **.NET** | .NET 版本 + ASP.NET Core Web、ASP.NET Core API、Blazor Server、gRPC Service、Worker Service |

:::tip
版本選擇器僅會列出已透過「執行環境」頁面安裝的執行環境。 若下拉選單為空，請先安裝你需要的語言版本。
:::

## 上傳程式碼

專案建立完成後，前往「檔案」頁面，瀏覽至專案目錄（例如 `/opt/ace/projects/hello-node`），並上傳 `app.js` 檔案。

你也可以在終端機中使用 git clone 來拉取程式碼。

## 設定專案

在專案清單中點選「編輯」即可調整更多設定。 編輯器共有五個分頁：基本設定、執行環境設定、相依套件、資源限制與安全設定。

![專案編輯](/images/quickstart/project-edit-run.png)

**執行環境設定**：

- **啟動前指令**：在啟動前執行，例如 `npm install`
- **重啟策略**：處理行程結束的方式（不重啟／一律重啟／失敗時／異常時／中止時／成功時），以及重啟間隔、最大重啟次數與啟動／停止逾時
- **標準輸出／標準錯誤**：記錄檔的輸出位置（journal、syslog、檔案等）
- **環境變數**：設定 `NODE_ENV=production` 等。

**相依套件**：設定 systemd 服務相依性（Requires／Wants／After／Before）以控制啟動順序，例如 `network.target` 或 `mysqld.service`。

**資源限制**：限制該服務可使用的主機資源量。

- **記憶體限制（MB）**：最大記憶體；設為 `0` 則停用限制
- **CPU 配額**：該服務可使用的 CPU 時間，以百分比表示，`100%` 等於一個完整的 CPU 核心（例如 `50%` 為半個核心，`200%` 為兩個核心）。 留空則不限制

**安全設定**：套用 systemd 沙箱機制以隔離服務。 這些設定可能會影響功能，因此在生產環境中正式採用前請充分測試。

- **禁止新增權限**：防止行程及其子行程取得新權限（例如透過 setuid 執行檔）
- **保護 /tmp**：為服務提供一個與其他行程隔離的私有 `/tmp`
- **保護 /home**：對服務隱藏 `/home`、`/root` 與 `/run/user`
- **保護系統**：以唯讀方式掛載系統目錄——`true` 會將 `/usr` 與 `/boot` 設為唯讀，`full` 會額外保護 `/etc`，而 `strict` 則會將整個檔案系統設為唯讀（明確允許的路徑除外）
- **讀寫路徑**：即使已啟用「保護系統」，服務仍可寫入的路徑
- **唯讀路徑**：服務可讀取但不可修改的路徑

## 啟動專案

回到專案清單，點選「啟動」按鈕。

![專案清單](/images/quickstart/project-list.png)

啟動後，執行中的專案會出現「重啟」與「重新載入」按鈕。 點選「記錄檔」可檢視輸出，確認服務正常執行。

## 存取服務

若已啟用反向代理，可透過設定的網域存取。

若未啟用，則可直接透過 `http://ServerIP:3000` 存取（需在防火牆中放行 3000 連接埠）。

:::tip 生產環境
生產環境建議：

- 在專案清單中切換「開機自動啟動」開關，即可在伺服器重啟後自動復原
- 設定反向代理，透過 Nginx 轉發請求
- 在「資源限制」分頁中設定記憶體限制，以防止記憶體洩漏
  :::
