# 編排

編排功能基於 Docker Compose，用於定義和運行多容器應用。 通過一個 YAML 文件描述應用的服務、網路和卷，然後一鍵啟動整個應用。

## 編排列表

進入 **容器** > **編排** 標籤頁查看編排列表。

![編排列表](/images/container/compose-list.png)

列表顯示以下資訊：

- **名稱**：編排項目名稱
- **目錄**：docker-compose.yml 文件所在目錄
- **狀態**：運行狀態
- **創建時間**：創建時間
- **操作**：啟動、停止、編輯等

## 創建編排

1. 點擊 **創建編排** 按鈕
2. 輸入編排名稱
3. 編寫或粘貼 docker-compose.yml 內容
4. 配置環境變數（可選）
5. 點擊創建

![創建編排](/images/container/compose-create.png)

### docker-compose.yml 示例

```yaml
version: '3'
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

## 編排操作

### 啟動編排

點擊 **啟動** 按鈕會彈出確認對話框：

![啟動編排](/images/container/compose-start.png)

- **強制拉取鏡像**：勾選後會在啟動前拉取最新鏡像

點擊確認後，會顯示啟動進度：

![啟動進度](/images/container/compose-starting.png)

啟動編排會創建並啟動所有定義的服務容器。

### 停止編排

停止編排會停止所有相關容器，但不會刪除容器和資料。

### 刪除編排

刪除編排會停止並刪除所有相關容器。

:::warning 注意
刪除編排不會刪除資料卷， 如需刪除資料卷請在 **卷** 頁面手動刪除。
:::

### 編輯編排

點擊編排列表中的 **編輯** 按鈕，可以修改 docker-compose.yml 文件內容和環境變數。

![編輯編排](/images/container/compose-edit.png)

修改後需要重新啟動編排才能生效。

## 使用場景

編排適合以下場景：

- **多容器應用**：如 Web 應用 + 資料庫 + 快取
- **開發環境**：快速搭建一致的開發環境
- **微服務架構**：管理多個相互依賴的服務

## 與容器模板的區別

| 特性   | 編排              | 容器模板       |
| ---- | --------------- | ---------- |
| 配置方式 | 手寫 YAML         | 圖形介面       |
| 靈活性  | 完全自定義           | 使用預設配置+自定義 |
| 適用場景 | 自定義複雜應用         | 快速部署常用應用   |
| 學習成本 | 需要了解 Compose 語法 | 無需學習       |
