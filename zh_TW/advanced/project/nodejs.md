# Node.js 專案

Node.js 專案用於部署 Express、Koa、NestJS、Next.js 等 Node.js 應用程式。

## 前置需求

1. 安裝 Node.js 執行環境：**應用程式** > **執行環境** > **Node.js**
2. 專案原始碼

## 部署步驟

1. 將專案程式碼上傳至伺服器
2. 安裝相依套件：

```bash
cd /opt/ace/projects/myapp
npm24 install
```

3. 建立專案（請參閱下方的 **建立 Node.js 專案**）
4. 啟用 **反向代理**

## 建立 Node.js 專案

1. 前往 **專案** 頁面，開啟 **Node.js** 分頁
2. 點選 **建立專案**
3. 填寫設定：
   - **專案名稱**：`myapp`（作為服務識別碼使用）
   - **專案目錄**：留空則預設為 `/opt/ace/projects/<專案名稱>`，或選擇一個目錄
   - **Node.js 版本**：選擇已安裝的 Node.js 版本
   - **框架**：選擇預設範本（Express、Koa、Fastify、NestJS、Next.js、Nuxt.js、Hapi、AdonisJS）以自動產生啟動命令，或保持 **自訂** 自行撰寫
   - **執行使用者**：預設為 `www`（也可選擇 `root`/`nobody` 或輸入自訂使用者）
   - **啟動命令**：根據上方的版本與框架自動填入，可編輯
4. 啟用 **反向代理** 並填寫 **網域** 與 **專案連接埠**，以自動建立反向代理網站供外部存取

## 啟動命令範例

```bash
# 直接執行
node24 app.js

# 使用 npm scripts
npm24 start

# 使用 npm run
npm24 run start:prod

# 設定環境變數
NODE_ENV=production node24 app.js

# 指定連接埠
PORT=3000 node24 app.js
```

## 常用框架

### Express

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000);
```

啟動命令：`node24 app.js`

### Koa

啟動命令：`node24 app.js`

### Fastify

啟動命令：`node24 app.js`

### NestJS

```bash
# 建置
npm24 run build
```

啟動命令：`node24 dist/main.js`

### Next.js

```bash
# 建置
npm24 run build
```

啟動命令：`node24 node_modules/.bin/next start`

### Nuxt.js

```bash
# 建置
npm24 run build
```

啟動命令：`node24 node_modules/.bin/nuxt start`

### Hapi

啟動命令：`node24 server.js`

### AdonisJS

```bash
# 建置
npm24 run build
```

啟動命令：`node24 server.js`

## 管理專案

**Node.js** 分頁上的每個專案列都提供以下操作：

- **啟動** / **停止**：切換服務的執行狀態
- **重新啟動**：重新啟動服務（僅在執行時顯示）
- **重新載入**：在不完全重新啟動的情況下重新載入服務（僅在執行時顯示）；若已設定 **重新載入命令** 則會使用它
- **記錄檔**：開啟服務輸出的即時記錄檔檢視器
- **編輯**：開啟專案設定（請參閱下方的 **編輯專案**）
- **刪除**：移除專案；需要經過附帶 5 秒倒數計時的確認
- **開機自動啟動**：用於啟用或停用開機時啟動服務的開關

專案名稱會作為 systemd 服務識別碼使用，因此只能包含英文字母、數字、底線與連字號。

## 編輯專案

點選專案上的 **編輯** 以開啟其設定，設定分為以下分頁。

### 基本設定

- **專案名稱**：服務識別碼
- **描述**：關於專案的選填備註
- **專案目錄**：專案根目錄
- **工作目錄**：選填，預設為專案目錄（對應 systemd `WorkingDirectory`）
- **執行使用者**：服務執行時所使用的使用者

### 執行設定

- **啟動命令**：用於啟動服務的命令（`ExecStart`）
- **啟動前命令**：啟動前執行的命令（`ExecStartPre`）
- **啟動後命令**：啟動後執行的命令（`ExecStartPost`）
- **停止命令**：自訂的停止命令（`ExecStop`）
- **重新載入命令**：自訂的重新載入命令（`ExecReload`）

**重新啟動原則**：

- **重新啟動策略**：`no`、`always`、`on-failure`、`on-abnormal`、`on-abort`、`on-success` 其中之一
- **重新啟動間隔**：重新啟動前的延遲，例如 `5s`、`1min`（`RestartSec`）
- **最大重新啟動次數**：最大重新啟動嘗試次數（`StartLimitBurst`）
- **啟動逾時（秒）**：允許啟動的時間（`TimeoutStartSec`）
- **停止逾時（秒）**：允許關閉的時間（`TimeoutStopSec`）

**其他**：

- **標準輸出** / **標準錯誤**：記錄檔的傳送位置，`journal`、`syslog`、`kmsg`、`null` 其中之一，或一個檔案（`append:` / `truncate:`）
- **環境變數**：注入服務環境中的鍵／值配對

### 相依性

控制相對於其他 systemd 單元的啟動順序。 常見服務包括 `network.target`、`mysqld.service`、`postgresql.service`、`redis.service`。

- **Requires**：強相依性；若這些服務無法使用，本服務將會失敗
- **Wants**：弱相依性；即使這些服務失敗，本服務仍會啟動
- **After**：在指定的服務之後啟動本服務
- **Before**：在指定的服務之前啟動本服務

### 資源限制

- **記憶體限制（MB）**：最大記憶體；設定為 `0` 表示不限制（`MemoryLimit`）
- **CPU 配額**：CPU 配置量，例如 `50%` 或 `200%`，其中 `100%` 等於一個 CPU 核心（`CPUQuota`）

### 安全性設定

可強化服務隔離的加固選項。 啟用前請充分測試，因為這些選項可能影響功能。

- **不允許新增權限**：防止服務取得新權限（`NoNewPrivileges`）
- **保護 /tmp**：為服務提供私有的 `/tmp`（`ProtectTmp`）
- **保護 /home**：使 `/home` 無法存取（`ProtectHome`）
- **保護系統**：`true` 會使 `/usr` 與 `/boot` 唯讀，`full` 會額外使 `/etc` 唯讀，`strict` 會使整個檔案系統唯讀（`ProtectSystem`）
- **可讀寫路徑**：服務可讀取與寫入的路徑（`ReadWritePaths`）
- **唯讀路徑**：服務僅可讀取的路徑（`ReadOnlyPaths`）

## 行程管理

AcePanel 使用 systemd 管理 Node.js 行程，自動處理：

- 行程當機時自動重新啟動
- 開機時自動啟動
- 記錄檔記錄

## 環境變數

建議使用 `.env` 檔案管理環境變數：

```bash
# .env
NODE_ENV=production
PORT=3000
DATABASE_URL=mysql://localhost:3306/mydb
```

使用 `dotenv` 套件載入：

```javascript
require('dotenv').config();
```

## 常見問題

### 相依套件安裝失敗

請嘗試清除快取後重新安裝：

```bash
rm -rf node_modules package-lock.json
npm24 install
```

### 記憶體不足

提高 Node.js 記憶體限制：

```bash
NODE_OPTIONS="--max-old-space-size=4096" node24 app.js
```

### 連接埠已被佔用

修改應用程式監聽的連接埠，或檢查是否有其他行程正在使用它。
