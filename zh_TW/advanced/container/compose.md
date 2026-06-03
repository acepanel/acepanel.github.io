# Compose

Compose 功能基於 Docker Compose，用於定義及執行多容器應用程式。 透過 YAML 檔案描述應用程式的服務、網路與儲存卷，即可一鍵啟動整個應用程式。

## Compose 清單

前往 **容器** > **Compose** 分頁即可檢視 Compose 清單。

![Compose 清單](/images/container/compose-list.png)

清單會顯示下列資訊：

- **名稱**：Compose 專案名稱
- **目錄**：docker-compose.yml 檔案所在的目錄
- **狀態**：執行狀態
- **建立時間**：建立時間
- **操作**：啟動、停止、編輯等。

## 建立 Compose

1. 點選 **建立 Compose** 按鈕
2. 輸入 Compose 名稱
3. 撰寫或貼上 docker-compose.yml 內容
4. 設定環境變數（選填）
5. 點選 **送出**

![建立 Compose](/images/container/compose-create.png)

### docker-compose.yml 範例

```yaml
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    depends_on:
      - app
  app:
    image: php:8.4-fpm
    volumes:
      - ./html:/var/www/html
  db:
    image: mysql:8.4
    environment:
      MYSQL_ROOT_PASSWORD: your_password
      MYSQL_DATABASE: myapp
    volumes:
      - db_data:/var/lib/mysql
volumes:
  db_data:
```

## Compose 操作

### 啟動 Compose

點選 **啟動** 按鈕後，會跳出確認對話方塊：

![啟動 Compose](/images/container/compose-start.png)

- **強制拉取映像檔**：勾選後，會在啟動前拉取最新的映像檔

點選確認後，會開啟一個終端機視窗並顯示啟動指令的即時輸出：

![啟動進度](/images/container/compose-starting.png)

啟動 Compose 會建立並啟動所有已定義的服務容器。

### 停止 Compose

停止 Compose 會停止所有相關容器，但不會刪除容器與資料。

### 刪除 Compose

刪除 Compose 會停止並刪除所有相關容器，並移除 Compose 專案目錄。

你也可以在清單中選取多個 Compose，點選頂端的 **刪除** 按鈕進行批次刪除。

:::warning 注意
刪除 Compose 不會刪除資料卷。 若要刪除資料卷，請於 **儲存卷** 頁面手動刪除。
:::

### 編輯 Compose

點選 Compose 清單中的 **編輯** 按鈕，即可修改 docker-compose.yml 檔案內容與環境變數。

![編輯 Compose](/images/container/compose-edit.png)

修改後，需要重新啟動 Compose 才會生效。

## 使用情境

Compose 適用於下列情境：

- **多容器應用程式**：例如 Web 應用程式 + 資料庫 + 快取
- **開發環境**：快速建置一致的開發環境
- **微服務架構**：管理多個相互依賴的服務

## 與容器範本的差異

| 功能   | Compose         | 容器範本        |
| ---- | --------------- | ----------- |
| 設定方式 | 手動撰寫 YAML       | 圖形化介面       |
| 彈性   | 完全可自訂           | 使用預設設定 + 自訂 |
| 使用情境 | 自訂複雜的應用程式       | 快速部署常見應用程式  |
| 學習成本 | 需要瞭解 Compose 語法 | 無須學習        |
