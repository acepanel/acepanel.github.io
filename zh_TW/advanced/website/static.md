# 純靜態網站

純靜態網站用於託管 HTML、CSS、JavaScript 等靜態文件，適合部署前端項目構建產物、文檔站點等。

## 創建靜態網站

1. 進入 **網站** 頁面
2. 點擊 **純靜態** 標籤
3. 點擊 **創建網站**

### 配置項

- **名稱**：網站標識，如 `docs`
- **域名**：綁定的域名，如 `docs.example.com`
- **端口**：監聽端口，默認 80
- **網站目錄**：靜態文件存放路徑
- **備註**：可選備註

## 編輯靜態網站

點擊網站列表中的 **編輯** 按鈕進入編輯頁面。

### 域名和監聽

配置網站的域名和監聽端口。

![域名和監聽配置](/images/website/website-static-edit.png)

### 進階設定

配置網站日誌、默認文檔等進階選項。

![進階設定](/images/website/website-static-edit-advanced.png)

- **網站目錄**：靜態文件存放的絕對路徑
- **默認文檔**：默認首頁文件，如 `index.html`

### 自定義配置（偽靜態）

在 **自定義配置** 標籤中可以添加 Nginx 配置，用於 URL 重寫等功能。

![自定義配置](/images/website/website-static-edit-custom.png)

點擊 **添加自定義配置** 按鈕可以添加配置：

![添加自定義配置](/images/website/website-static-edit-custom-add.png)

- **名稱**：配置名稱，支持字母、數字、下劃線、破折號
- **範圍**：配置生效範圍，可選擇「此網站」或「全局」
- **內容**：Nginx 配置內容，如 `location` 塊

## 適用場景

### 前端項目

Vue、React、Angular 等前端框架的構建產物：

```bash
# Vue 項目
npm run build
# 將 dist 目錄內容上傳到網站目錄

# React 項目
npm run build
# 將 build 目錄內容上傳到網站目錄
```

### 文檔站點

VitePress、Docusaurus、Hugo 等靜態站點生成器：

```bash
# VitePress
npm run docs:build
# 將 .vitepress/dist 目錄內容上傳到網站目錄
```

### 單頁應用（SPA）

單頁應用需要配置偽靜態規則，將所有路由指向 index.html。 在 **自定義配置** 中添加：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## 目錄結構

典型的靜態網站目錄結構：

```
/opt/ace/sites/網站名稱/public
├── index.html         # 首頁
├── assets/            # 靜態資源
│   ├── css/
│   ├── js/
│   └── images/
├── favicon.ico        # 網站圖標
└── ...
```

## 常見問題

### 404 錯誤

- 檢查文件是否存在於網站目錄
- 檢查文件名大小寫（Linux 區分大小寫）
- 單頁應用需要配置偽靜態規則

### 資源加載失敗

- 檢查資源路徑是否正確
- 檢查是否使用了絕對路徑
- 檢查 CORS 配置

### 中文文件名亂碼

- 確保文件使用 UTF-8 編碼
