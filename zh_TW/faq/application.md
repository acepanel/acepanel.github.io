# 應用常見問題

## PHP 模組安裝

「應用」->「運行環境」->「PHP」->「管理」->「模組」，安裝需要的模組。

部分模組需要編譯安裝，耗時較長， 可在「任務」頁面查看進度。

## PHP 函數被禁用

預設禁用了部分高危函數。 如需啟用：

「應用」->「運行環境」->「PHP」->「管理」->「配置」

找到 `disable_functions`，刪除需要啟用的函數名。

:::warning 安全提示
`exec`、`shell_exec`、`system` 等函數有安全風險， 啟用前需確認必要性。
:::

## Nginx 配置錯誤

修改配置後 Nginx 無法啟動，查看錯誤：

```shell
nginx -t
```

修復配置後重啟：

```shell
systemctl restart nginx
```

## Supervisor 啟動報錯

### EACCES 權限錯誤

專案目錄權限問題，確保目錄所有者為 www：

```shell
chown -R www:www /opt/ace/projects/專案名
```

### 找不到 node/npm

通過 nvm 安裝的 Node.js 不在預設 PATH 中。

「應用」->「Supervisor 管理器」->「管理」->「配置」，添加：

```ini
environment=PATH="/root/.nvm/versions/node/v24.0.0/bin:/usr/local/bin:/usr/bin:/bin"
```

版本號替換為實際安裝的版本， 可通過 `whereis node` 查看路徑。

## 應用程式安裝失敗

1. 檢查網絡連接
2. 查看「任務」頁面的錯誤信息
3. 嘗試「應用」頁面點擊「更新緩存」後重試

## 應用無法卸載

有依賴關係的應用需要先卸載依賴它的應用。

如 phpMyAdmin 依賴 Nginx，需先卸載 phpMyAdmin。

## 多版本 PHP 共存

可同時安裝多個 PHP 版本， 在創建網站時選擇對應版本。

已有網站切換版本：「編輯」->「基本設置」->「PHP 版本」。
