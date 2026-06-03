# Webhook

Webhook 允許您透過 HTTP 請求觸發伺服器上的腳本執行，藉此實現自動化部署、CI/CD 整合等功能。

![Webhook](/images/toolbox/toolbox-webhook.png)

## 建立 Webhook

點選 **建立 Webhook** 按鈕並填寫以下資訊：

![建立 Webhook](/images/toolbox/toolbox-webhook-create.png)

- **名稱**：Webhook 的名稱，用於識別其用途
- **使用者**：執行腳本的系統使用者，預設為 root
- **原始輸出**：啟用時回傳腳本的原始輸出；停用時回傳 JSON 格式
- **腳本**：要執行的 Shell 腳本內容。 表單預設預填了 `#!/bin/bash` 範本

建立 Webhook 時，腳本內容會儲存為一個獨立的 `.sh` 檔案（權限 `0755`），位於面板資料根目錄下的 `server/webhook` 目錄中，並以產生的 Key 命名。 刪除 Webhook 時也會一併刪除該腳本檔案。

腳本透過 `bash` 執行。 當設定的使用者為 `root`（或留空）時，腳本會直接以面板行程的擁有者身分執行；對於其他使用者，則使用 `su -s /bin/bash -c` 以該使用者身分執行，因此請確保目標使用者存在且有權限執行該腳本。

## 使用方式

建立後，系統會產生一組唯一的 Key。 存取以下 URL 即可觸發腳本執行：

```
https://your-panel-domain/webhook/{key}
```

同時支援 GET 與 POST 請求。 您也可以使用清單中的 **複製 URL** 按鈕，直接複製完整的呼叫 URL。

## 編輯 Webhook

點選某一列的 **編輯** 按鈕即可修改現有的 Webhook。 編輯對話框提供與建立表單相同的 **名稱**、**使用者**、**原始輸出** 和 **腳本** 欄位，並額外提供一個 **啟用** 開關，讓您可以在編輯時直接開啟或關閉該 Webhook。 儲存時會重寫底層的腳本檔案並更新已儲存的設定；Key 保持不變。

## 操作

清單中的每一列都提供以下操作：

| 操作     | 說明                                               |
| ------ | ------------------------------------------------ |
| 複製 URL | 將完整的呼叫 URL（`{panel-origin}/webhook/{key}`）複製到剪貼簿 |
| 編輯     | 開啟編輯對話框以修改該 Webhook                              |
| 刪除     | 在確認對話框後刪除該 Webhook；這同時會刪除對應的腳本檔案                 |

此外，**啟用** 欄中顯示一個開關，您可以直接在清單中切換它，無需開啟編輯對話框即可啟用或停用某個 Webhook。

## 使用情境

### Git 自動部署

搭配 GitHub/GitLab 的 Webhook 功能，可在程式碼推送後實現自動部署：

```bash
#!/bin/bash
cd /opt/ace/projects/myproject
git pull origin main
npm install
npm run build
```

### 排程任務觸發

透過外部服務（例如監控系統）觸發特定操作：

```bash
#!/bin/bash
# Clean temporary files
rm -rf /tmp/cache/*
# Restart service
systemctl restart myapp
```

### CI/CD 整合

在 CI/CD 流水線中呼叫 Webhook 以完成部署：

```bash
# In CI script
curl -X POST https://panel.example.com/webhook/your-key
```

## 清單說明

| 欄位      | 說明               |
| ------- | ---------------- |
| 名稱      | Webhook 名稱       |
| Key     | 唯一識別碼，用於建構呼叫 URL |
| 執行身分使用者 | 執行腳本的系統使用者       |
| 原始輸出    | 是否回傳原始文字輸出       |
| 已啟用     | Webhook 是否已啟用    |
| 呼叫次數    | 累計呼叫次數           |
| 上次呼叫    | 上次呼叫時間           |
| 建立時間    | Webhook 的建立時間    |

## 注意事項

1. Key 屬於敏感資訊，請勿洩漏給不信任的人
2. 腳本會以指定的使用者身分執行，請留意權限控管
3. 建議在腳本中加入必要的錯誤處理
4. 您可以使用停用開關暫時停用某個 Webhook
