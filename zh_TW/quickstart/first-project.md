# 第一個專案：部署 Node.js 應用

本文以一個簡單的 Node.js HTTP 服務為例，演示如何通過 AcePanel 部署和管理專案。

## 準備程式碼

先準備一個簡單的 Node.js 應用。 在專案目錄建立 `app.js`：

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

進入「專案」頁面，點擊「建立專案」。

![建立專案](/images/quickstart/project-create.png)

填寫配置：

- **專案名**：專案標識，如 `hello-node`
- **專案目錄**：留空使用預設路徑
- **執行使用者**：一般選 `www`
- **啟動命令**：`node app.js`
- **反向代理**：如需通過網域存取，可開啟自動建立反向代理

## 上傳程式碼

專案建立後，進入「檔案」頁面，導航到專案目錄（如 `/opt/ace/projects/hello-node`），上傳 `app.js` 檔案。

也可以通過終端機用 git clone 拉取程式碼。

## 配置專案

在專案列表點擊「編輯」，可以調整更多設定：

![專案編輯](/images/quickstart/project-edit-run.png)

**執行設定**：

- **預啟動命令**：啟動前執行，如 `npm install`
- **重啟策略**：程序異常退出時的處理方式
- **環境變數**：設定 `NODE_ENV=production` 等

**依賴**：可以關聯 Node.js 執行環境版本。

## 啟動專案

回到專案列表，點擊「啟動」按鈕。

![專案列表](/images/quickstart/project-list.png)

啟動後可點擊「日誌」查看輸出，確認服務正常執行。

## 存取服務

如果開啟了反向代理，通過配置的網域存取即可。

如果沒有，可以通過 `http://伺服器IP:3000` 直接存取（需在防火牆放行 3000 連接埠）。

:::tip 生產環境
生產環境建議：

- 開啟「自啟動」，伺服器重啟後自動恢復
- 配置反向代理，通過 Nginx 轉發請求
- 在「資源限制」中設定記憶體上限，防止記憶體洩漏
  :::
