# 應用程式常見問題

## PHP 模組安裝

**應用程式** -> **執行環境** -> **PHP** -> **管理** -> **模組管理**，安裝所需的模組。

部分模組需要編譯安裝，耗時較長。 可在**任務**頁面查看進度。

## PHP 函式被停用

預設停用了部分高風險函式。 若要啟用：

**應用程式** -> **執行環境** -> **PHP** -> **管理** -> **參數調整** -> **停用函式**

從清單中移除要啟用的函式名稱，然後儲存。 也可以在**主設定**索引標籤中直接編輯 `disable_functions`。

:::warning 安全性警告
`exec`、`shell_exec`、`system`、`passthru`、`proc_open`、`popen` 等函式有安全性風險。 啟用前請先確認必要性。
:::

## Nginx 設定錯誤

若修改設定後 Nginx 無法啟動，請查看錯誤：

```shell
nginx -t
```

修正設定後重新啟動：

```shell
systemctl restart nginx
```

## Supervisor 啟動錯誤

### EACCES 權限錯誤

專案目錄權限問題，請確保目錄擁有者為 www：

```shell
chown -R www:www /opt/ace/projects/project-name
```

### 找不到 node/npm

透過 nvm 安裝的 Node.js 不在預設 PATH 中。

**應用程式** -> **Supervisor 管理器** -> **管理** -> **主設定**，新增：

```ini
environment=PATH="/root/.nvm/versions/node/v24.0.0/bin:/usr/local/bin:/usr/bin:/bin"
```

請將版本號替換為實際安裝的版本。 可透過 `whereis node` 查看路徑。

## 應用程式安裝失敗

1. 檢查網路連線
2. 在**任務**頁面查看錯誤訊息
3. 在**應用程式**頁面切換至**原生應用程式**、**執行環境**或**容器範本**索引標籤，然後點選**更新快取**並重試（**更新快取**按鈕在預設的**已安裝**索引標籤中是隱藏的）

## 應用程式無法解除安裝

有相依關係的應用程式需要先解除安裝相依於它的應用程式。

例如 phpMyAdmin 相依於 Nginx，因此需先解除安裝 phpMyAdmin。

## 多版本 PHP 共存

可同時安裝多個 PHP 版本。 在建立網站時選擇對應的版本。

若要為現有網站切換版本：**編輯** -> **基本設定** -> **PHP 版本**。
