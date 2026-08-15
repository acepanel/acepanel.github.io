# 網站

![Website overview](/images/website/overview.png)

網站模組用於管理 Web 伺服器上的站台設定。 AcePanel 支援三種類型的網站：反向代理、PHP 與靜態。

## 事前準備

在使用網站功能之前，您需要先安裝 Web 伺服器：

1. Go to **Apps** > **Native Applications**
2. 安裝 Nginx、OpenResty 或 Apache

## 網站類型

| 類型                      | 說明         | 使用情境                                 |
| ----------------------- | ---------- | ------------------------------------ |
| [反向代理](./website/proxy) | 將請求轉發至後端服務 | Node.js、Go、Java 應用程式 |
| [PHP](./website/php)    | 執行 PHP 程式  | WordPress、Laravel 等                  |
| [靜態](./website/static)  | 託管靜態檔案     | HTML、Vue/React 建置產物                  |

## 網站清單

In addition to **All**, **Reverse Proxy**, **PHP**, and **Pure Static**, the page provides **Stats** and [**Settings**](./website/setting) tabs.

網站清單會顯示以下資訊：

- **網站名稱**：站台的唯一識別碼
- **網站類型**：反向代理、PHP 或純靜態
- **執行中**：站台是否已啟用
- **目錄**：網站檔案所在的目錄
- **HTTPS**：是否已啟用 HTTPS
- **憑證到期**：SSL 憑證到期時間
- **到期**：站台到期時間，到期後會自動停止站台
- **備註**：自訂備註
- **操作**：編輯、刪除等

## 建立網站

1. 前往 **網站** 頁面
2. 選擇網站類型分頁（反向代理／PHP／靜態）
3. 點選 **建立網站**
4. 填寫網站資訊
5. 點選建立

### 常用設定項目

- **名稱**：網站的唯一識別碼，僅允許字母、數字、連字號與底線；建立後無法變更
- **網域**：所綁定的網域，可新增多個（貼上以逗號／空格／換行分隔的內容即可批次新增）
- **連接埠**：監聽連接埠，預設為 80
- **備註**：選填的備註

類型專屬項目：

- **反向代理**：需要填寫 **代理目標**（例如 `http://127.0.0.1:3000`）
- **PHP**：需要選擇 **PHP 版本**，並可在建立站台的同時一併建立 **資料庫**（資料庫名稱／使用者／密碼）
- **PHP／純靜態**：支援自訂網站 **目錄**（留空時預設為 `網站目錄/網站名稱/public`）

## 網站管理

點選網站的 **編輯** 按鈕進入管理頁面，該頁面以分頁方式組織：

- **網域與監聽**：修改所綁定的網域與監聽連接埠
- **基本設定**：網站目錄、執行目錄、預設首頁檔案
- **上游** / **代理**：設定後端上游與代理行為（僅反向代理站台）
- **HTTPS**：綁定 SSL 憑證、HTTP 重新導向、HSTS、OCSP、TLS 版本
- **偽靜態**：設定重寫規則（僅 PHP 站台）
- **重新導向**：設定重新導向規則
- **進階設定**：存取統計、記錄檔設定、速率限制、真實 IP 與基本驗證
- **自訂設定**：新增自訂設定片段（站台範圍或共用）
- **存取記錄檔** / **錯誤記錄檔**：即時檢視站台的記錄檔

### Change the Website Type

An existing reverse-proxy, PHP, or pure-static website can be converted to either of the other two types. AcePanel keeps its name, domains, listen addresses, directory, files, HTTPS association, expiration, and other shared fields. It removes the old type-specific Web-server configuration and generates a new configuration for the selected type.

Back up the site before converting it. Upstreams and proxy rules, PHP runtime and rewrite settings, and static-only behavior must be reviewed or configured again after the change. AcePanel tests the generated Web-server configuration before applying it and displays the concrete Nginx, OpenResty, or Apache error when validation fails.

## 批次建立

點選 **批次建立網站** 即可一次建立多個網站，適用於需要快速部署多個站台的情境。

## 刪除網站

刪除網站時，需要進行 5 秒的確認倒數。 您可以選擇是否一併 **刪除網站目錄** 以及 **刪除同名的本機資料庫**。 Bulk deletion removes the website directory but keeps the same-name database. AcePanel also removes the website from certificates associated with it and deletes a matching tamper-protection rule.

## 後續步驟

- [反向代理](./website/proxy) - 瞭解如何建立反向代理網站
- [PHP 網站](./website/php) - 瞭解如何建立 PHP 網站
- [靜態網站](./website/static) - 瞭解如何建立靜態網站
- [Website Settings](./website/setting) - Configure default site, IPv6 listening, error pages, and statistics
