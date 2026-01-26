# Web 鉤子

Web 鉤子（Webhook）允許你通過 HTTP 請求觸發伺服器上的腳本執行，實現自動化部署、CI/CD 整合等功能。

![Web 鉤子](/images/toolbox/toolbox-webhook.png)

## 建立 Web 鉤子

點擊 **建立 Web 鉤子** 按鈕，填寫以下資訊：

![建立 Web 鉤子](/images/toolbox/toolbox-webhook-create.png)

- **名稱**：Web 鉤子的名稱，用於標識用途
- **使用者**：執行腳本的系統使用者，預設為 root
- **原始輸出**：開啟後返回腳本的原始輸出，關閉則返回 JSON 格式
- **腳本**：要執行的 Shell 腳本內容

## 使用方式

建立完成後，系統會產生一個唯一的 Key。 通過存取以下 URL 即可觸發腳本執行：

```
https://your-panel-domain/api/webhook/{key}
```

支援 GET 和 POST 請求。

## 適用場景

### Git 自動部署

配合 GitHub/GitLab 的 Webhook 功能，實現程式碼推送後自動部署：

```bash
#!/bin/bash
cd /opt/ace/projects/myproject
git pull origin main
npm install
npm run build
```

### 定時任務觸發

通過外部服務（如監控系統）觸發特定操作：

```bash
#!/bin/bash
# 清理臨時檔案
rm -rf /tmp/cache/*
# 重啟服務
systemctl restart myapp
```

### CI/CD 整合

在 CI/CD 流水線中呼叫 Webhook 完成部署：

```bash
# 在 CI 腳本中
curl -X POST https://panel.example.com/api/webhook/your-key
```

## 列表說明

| 欄位    | 說明              |
| ----- | --------------- |
| 名稱    | Web 鉤子名稱        |
| Key   | 唯一標識，用於建構呼叫 URL |
| 執行使用者 | 執行腳本的系統使用者      |
| 原始輸出  | 是否返回原始文字輸出      |
| 已啟用   | 是否啟用該 Web 鉤子    |
| 呼叫次數  | 累計被呼叫的次數        |
| 最後呼叫  | 最後一次呼叫時間        |

## 注意事項

1. Key 是敏感資訊，不要洩露給不信任的人
2. 腳本以指定使用者身份執行，注意權限控制
3. 建議在腳本中添加必要的錯誤處理
4. 可以通過停用開關臨時停用 Web 鉤子
