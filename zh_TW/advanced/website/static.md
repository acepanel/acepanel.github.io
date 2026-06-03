# 靜態網站

靜態網站用於託管 HTML、CSS、JavaScript 等靜態檔案，適合用來部署前端專案的建置產物、文件網站等。

## 建立靜態網站

1. 前往 **網站** 頁面
2. 點選 **純靜態** 分頁
3. 點選 **建立網站**

### 設定項目

- **名稱**：網站識別碼，必須唯一，僅支援英文字母、數字、連字號與底線，例如 `docs`
- **網域**：繫結的網域，例如 `docs.example.com`
- **連接埠**：監聽連接埠，預設為 80
- **目錄**：網站根目錄。 若留空，則預設為 `網站目錄/網站名稱/public`
- **備註**：選填的備註

## 編輯靜態網站

點選網站清單中的 **編輯** 按鈕進入編輯頁面。

### 網域與監聽

設定網站的網域與監聽位址。 每個監聽位址都可以個別啟用 HTTPS 與 QUIC（HTTP/3）。

![網域與監聽設定](/images/website/website-static-edit.png)

### 基本設定

設定網站目錄與預設文件。

![進階設定](/images/website/website-static-edit-advanced.png)

- **網站目錄**：存放靜態檔案的絕對路徑
- **執行目錄**：執行目錄的絕對路徑（靜態網站通常不需要設定）
- **預設文件**：預設首頁檔案清單，例如 `index.html`

### HTTPS

在 **HTTPS** 分頁中，你可以為網站啟用 TLS 並管理其憑證：

- **主開關**：啟用或停用網站 HTTPS 的主開關
- **使用現有憑證**：選擇已在憑證管理中託管的憑證，自動填入憑證與私鑰
- **HSTS**：強制瀏覽器僅透過 HTTPS 存取網站
- **HTTP 重新導向**：自動將純 HTTP 請求重新導向至 HTTPS
- **OCSP Stapling**：啟用 OCSP Stapling 以加快憑證驗證速度
- **TLS 版本**：允許的 TLS 協定版本（TLS 1.0 / 1.1 / 1.2 / 1.3）
- **憑證** / **私鑰**：直接貼上 PEM 憑證與 KEY 私鑰內容

當至少設定了一個網域時，底部還會提供 **一鍵簽發憑證** 按鈕，用於申請免費憑證。 如果網域是萬用網域（例如 `*.example.com`），系統會提示你選擇一個已在憑證管理中設定的 DNS 服務商進行 DNS 驗證。

### 重新導向

在 **重新導向** 分頁中，你可以新增重新導向規則。 點選 **新增重新導向規則** 來建立規則：

- **重新導向類型**：`URL 重新導向`、`主機重新導向` 或 `404 重新導向`
- **狀態碼**：`301`（永久移動）、`302`（已找到）、`307`（暫時重新導向）或 `308`（永久重新導向）
- **來源**：來源路徑（URL 重新導向）或來源主機（主機重新導向）；404 重新導向不需填寫
- **目標**：目標路徑或目標 URL
- **保留 URI**：重新導向時保留原始的請求路徑與查詢參數

可以透過拖曳控制點來重新排序規則。

### 進階設定

在 **進階設定** 分頁中，你可以設定存取統計、記錄檔設定、速率限制、真實 IP 與基本驗證。

### 自訂設定

在 **自訂設定** 分頁中，你可以新增自訂的 Nginx 設定，用於 URL 重寫等功能。

![自訂設定](/images/website/website-static-edit-custom.png)

點選 **新增自訂設定** 按鈕來新增設定：

![新增自訂設定](/images/website/website-static-edit-custom-add.png)

- **名稱**：設定名稱，支援英文字母、數字、底線與連字號
- **範圍**：設定的套用範圍，可選擇「本網站」或「全域」
- **內容**：Nginx 設定內容，例如 `location` 區塊

## 使用情境

### 前端專案

Vue、React、Angular 等前端框架的建置產物：

```bash
# Vue project
npm run build
# Upload dist directory contents to website directory

# React project
npm run build
# Upload build directory contents to website directory
```

### 文件網站

VitePress、Docusaurus、Hugo 等靜態網站產生器：

```bash
# VitePress
npm run docs:build
# Upload .vitepress/dist directory contents to website directory
```

### 單頁應用程式（SPA）

單頁應用程式需要設定重寫規則，將所有路由都指向 index.html。 在 **自訂設定** 中新增：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## 目錄結構

典型的靜態網站目錄結構：

```
/opt/ace/sites/website-name/public
├── index.html         # Homepage
├── assets/            # Static resources
│   ├── css/
│   ├── js/
│   └── images/
├── favicon.ico        # Website icon
└── ...
```

## 常見問題

### 404 錯誤

- 檢查檔案是否存在於網站目錄中
- 檢查檔名大小寫（Linux 會區分大小寫）
- 單頁應用程式需要設定重寫規則

### 資源載入失敗

- 檢查資源路徑是否正確
- 檢查是否使用了絕對路徑
- 檢查 CORS 設定

### 中文檔名亂碼

- 確保檔案使用 UTF-8 編碼
