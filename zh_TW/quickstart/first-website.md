# 第一個網站：部署 WordPress

本文以 WordPress 為例，示範如何透過 AcePanel 快速架設 PHP 網站。

## 安裝環境

進入「應用程式商店」頁面：

1. 在「原生應用程式」中安裝 Nginx 和 Percona（或 MySQL/MariaDB）
2. 在「執行環境」中安裝 PHP（建議 8.3+）

安裝進度可在「任務」頁面的「面板任務」標籤頁檢視。

## 建立網站

進入「網站」->「PHP」，點選「建立網站」。

![建立網站](/images/quickstart/website-create.png)

:::tip 網站類型
像上面那樣從「PHP」標籤頁進入會預選 PHP 類型並隱藏類型選擇器。 如果改從頂部的「全部」標籤頁開始，表單會多出一個 **網站類型** 選擇器，包含三個選項：**反向代理**、**PHP** 和 **純靜態**。 在那裡選擇 **PHP** 即可取得下方描述的相同欄位。
:::

填寫設定：

- **名稱**：網站識別碼，例如 `wordpress`，僅支援字母、數字、連字號和底線，建立後無法修改
- **網域**：你的網域名稱，沒有網域可填伺服器 IP
- **連接埠**：預設為 `80`
- **PHP 版本**：選擇剛安裝的版本
- **資料庫**：選擇 MySQL，記下自動產生的資料庫名稱、使用者名稱和密碼
- **目錄**：網站根目錄，留空則預設為 `網站目錄/網站名稱/public`

## 上傳 WordPress

從 [WordPress 官方網站](https://wordpress.org/download/) 下載安裝包。

點選網站清單中「目錄」欄的路徑進入檔案管理，上傳壓縮包並解壓縮。 進入 `wordpress` 目錄，`Ctrl+A` 全選，`Ctrl+X` 剪下，返回上層目錄 `Ctrl+V` 貼上，把檔案移到網站根目錄。

## 設定重寫規則

回到網站清單，點選「編輯」，切換到「重寫」標籤頁，選擇預設的 `wordpress` 規則並儲存。

![重寫設定](/images/quickstart/website-rewrite.png)

:::tip WordPress 多站台
如果你執行的是 WordPress 多站台網路而非單一站台，請從同一個下拉式選單中選擇 `wordpress-multisite` 預設。
:::

:::tip HTTPS
可在「HTTPS」標籤頁一鍵簽發免費的 Let's Encrypt 憑證。
:::

## 安裝 WordPress

在瀏覽器存取你的網域，依照提示完成安裝：

1. 選擇語言
2. 填寫網站資訊（標題、管理員帳號等）
3. 資料庫設定：填入先前記下的資料庫資訊，主機填 `localhost`

安裝完成後即可登入 WordPress 後台。
