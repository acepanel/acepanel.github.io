# PHP 網站

PHP 網站用於運行 PHP 程式，如 WordPress、Laravel、ThinkPHP 等。

## 前置要求

建立 PHP 網站前，需要先安裝：

1. **Web 伺服器**：Nginx、OpenResty 或 Apache
2. **PHP 運行環境**：在 **應用** > **運行環境** 中安裝所需的 PHP 版本

## 建立 PHP 網站

1. 進入 **網站** 頁面
2. 點擊 **PHP** 標籤
3. 點擊 **建立網站**

### 配置項

- **名稱**：網站標識，如 `wordpress`
- **域名**：綁定的域名，如 `blog.example.com`
- **連接埠**：監聽連接埠，預設 80
- **PHP 版本**：選擇已安裝的 PHP 版本
- **網站目錄**：網站檔案存放路徑
- **備註**：可選備註

## 編輯 PHP 網站

點擊網站列表中的 **編輯** 按鈕進入編輯頁面。

### 域名和監聽

配置網站的域名和監聽連接埠。

![域名和監聽配置](/images/website/website-php-edit.png)

### 基本設置

配置網站目錄、PHP 版本等基本資訊。

![基本設置](/images/website/website-php-basic.png)

- **網站目錄**：網站檔案存放的絕對路徑
- **運行目錄**：Laravel 等框架需要設置運行目錄
- **預設文件**：預設首頁檔案，如 `index.php`、`index.html`
- **PHP 版本**：選擇已安裝的 PHP 版本
- **防跨站攻擊**：啟用後限制 PHP 只能存取網站目錄內的檔案

### 重寫配置

重寫用於 URL 重寫，支援常見 PHP 程式的預設規則。

![重寫配置](/images/website/website-php-rewrite.png)

點擊預設下拉框可以選擇常見程式的重寫規則：

![重寫預設](/images/website/website-php-rewrite-preset.png)

支援的預設包括：WordPress、Laravel、ThinkPHP、Discuz、Drupal、ECShop 等常見 PHP 程式。

## 網站目錄結構

建立網站後，預設目錄結構：

```
/opt/ace/sites/網站名稱/public
├── index.php          # 入口檔案
├── .user.ini          # PHP 配置
└── ...
```

## PHP 版本切換

在網站編輯頁面的 **基本設置** 中可以切換 PHP 版本：

1. 進入網站編輯頁面
2. 點擊 **基本設置** 標籤
3. 在 **PHP 版本** 下拉框中選擇新版本
4. 點擊 **儲存**

:::warning 注意
切換 PHP 版本可能導致程式不相容， 請先在測試環境驗證。
:::

## PHP 配置

### php.ini 配置

在 **應用** > **原生應用** > **PHP** 管理頁面可以修改 php.ini 配置。

常用配置項：

```ini
upload_max_filesize = 50M    # 最大上傳檔案大小
post_max_size = 50M          # POST 資料最大大小
max_execution_time = 300     # 最大執行時間
memory_limit = 256M          # 記憶體限制
```

### 禁用函數

PHP 預設禁用了一些危險函數，如 `exec`、`system`、`passthru` 等。 如需啟用，請在 php.ini 中修改 `disable_functions` 配置。

:::danger 警告
啟用危險函數可能帶來安全風險， 請謹慎操作。
:::

## 常見問題

### 502 Bad Gateway

- 檢查 PHP-FPM 是否正常運行
- 檢查 PHP 版本是否正確配置

### 檔案上傳失敗

- 檢查 `upload_max_filesize` 和 `post_max_size` 配置
- 檢查目錄權限

### 頁面空白

- 開啟 PHP 錯誤顯示
- 查看 PHP 錯誤日誌
