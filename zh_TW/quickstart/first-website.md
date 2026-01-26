# 第一個網站：部署 WordPress

本文以 WordPress 為例，演示如何通過 AcePanel 快速搭建 PHP 網站。

## 安裝環境

進入「應用」頁面：

1. 在「原生應用」中安裝 Nginx 和 Percona（或 MySQL/MariaDB）
2. 在「運行環境」中安裝 PHP（建議 8.3+）

安裝進度可在「任務」頁面查看。

## 創建網站

進入「網站」->「PHP」，點擊「創建網站」。

![創建網站](/images/quickstart/website-create.png)

填寫配置：

- **名稱**：網站標識，如 `wordpress`，創建後不可改
- **域名**：你的域名，沒有域名可填伺服器 IP
- **根目錄**：留空使用預設路徑
- **PHP 版本**：選擇剛安裝的版本
- **資料庫**：選擇 MySQL，記下生成的資料庫名、用戶名、密碼

## 上傳 WordPress

從 [WordPress 官網](https://wordpress.org/download/) 下載安裝包。

在網站列表點擊「目錄」進入檔案管理，上傳壓縮包並解壓。 進入 `wordpress` 目錄，`Ctrl+A` 全選，`Ctrl+X` 剪切，返回上級目錄 `Ctrl+V` 貼上，把檔案移到網站根目錄。

## 配置重寫

回到網站列表，點擊「編輯」，切換到「重寫」標籤頁，選擇預設的 `wordpress` 規則並儲存。

![重寫配置](/images/quickstart/website-rewrite.png)

:::tip HTTPS
可在「HTTPS」標籤頁一鍵簽發免費的 Let's Encrypt 證書。
:::

## 安裝 WordPress

瀏覽器訪問你的域名，按提示完成安裝：

1. 選擇語言
2. 填寫站點資訊（標題、管理員帳號等）
3. 資料庫配置：填入之前記下的資料庫資訊，主機填 `localhost`

安裝完成後即可登入 WordPress 後台。
