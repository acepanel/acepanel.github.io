# Node.js 專案

Node.js 專案用於部署 Express、Koa、NestJS、Next.js 等 Node.js 應用。

## 前置要求

1. 安裝 Node.js 執行環境：**應用** > **執行環境** > **Node.js**
2. 專案原始碼

## 部署步驟

1. 上傳專案程式碼到伺服器
2. 安裝依賴：

```bash
cd /opt/ace/project/myapp
npm24 install
```

3. 建立專案：
   - **專案名**：`myapp`
   - **專案目錄**：`/opt/ace/project/myapp`
   - **啟動命令**：`node24 app.js`
4. 開啟 **反向代理**

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

啟動命令：`npm24 start`

### Nuxt.js

```bash
# 建置
npm24 run build
```

啟動命令：`node24 .output/server/index.mjs`

## 進程管理

AcePanel 使用 systemd 管理 Node.js 進程，自動處理：

- 進程崩潰自動重啟
- 開機自動啟動
- 日誌記錄

## 環境變數

推薦使用 `.env` 檔案管理環境變數：

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

### 依賴安裝失敗

嘗試清除快取重新安裝：

```bash
rm -rf node_modules package-lock.json
npm24 install
```

### 記憶體不足

增加 Node.js 記憶體限制：

```bash
NODE_OPTIONS="--max-old-space-size=4096" node24 app.js
```

### 連接埠被佔用

修改應用程式監聽的連接埠，或檢查是否有其他進程佔用。
