# 資料庫常見問題

## 我可以管理哪些資料庫類型？

**資料庫**模組不僅限於 MySQL 和 PostgreSQL。 它為以下每種引擎提供了專屬分頁：MySQL（同時涵蓋 MariaDB 和 Percona）、PostgreSQL、ClickHouse、MongoDB、SQLite、Elasticsearch 和 Redis，此外還有共用的**使用者**和**伺服器**分頁。

每個分頁支援的操作會因引擎而異：

- **MySQL / PostgreSQL / ClickHouse / MongoDB**：透過分頁的**建立資料庫**按鈕建立與管理資料庫。
- **SQLite**：依路徑註冊資料庫檔案（每個檔案都會新增為獨立的伺服器項目）。
- **Elasticsearch**：瀏覽索引與文件並線上建立/刪除它們，而非建立資料庫的流程。
- **Redis**：線上瀏覽、搜尋、建立、重新命名鍵，為鍵設定 TTL 及刪除鍵，以及清空資料庫。
- **使用者**分頁：建立資料庫使用者。 使用者管理僅適用於 **MySQL、PostgreSQL 和 ClickHouse**；其他引擎不提供使用者管理入口。

各引擎的逐步使用方法，請參閱 [資料庫參考](../advanced/database)。

## 忘記資料庫密碼

### MySQL/MariaDB/Percona

在面板**資料庫** -> **使用者**中修改使用者密碼。

如果您忘記了 root 密碼，可以在**應用程式** -> **MySQL/MariaDB/Percona** -> **管理**中檢視/重設。

### PostgreSQL

在面板**資料庫** -> **使用者**中修改使用者密碼。

如果您忘記了 postgres 使用者密碼，可以在**應用程式** -> **PostgreSQL** -> **管理**中檢視/重設。

### 其他引擎（ClickHouse / MongoDB / Redis / Valkey / Elasticsearch / OpenSearch）

這些引擎在**資料庫** -> **使用者**下沒有一般使用者管理入口。 可在何處修改管理員憑證取決於該引擎：

- **MongoDB / ClickHouse**：在**應用程式** -> **MongoDB** / **ClickHouse** 下的應用程式管理頁面檢視或重設管理員密碼。
- **Redis / Valkey**：在**應用程式** -> **Redis** / **Valkey** -> **參數調校**中設定或修改密碼（`requirepass`）。
- **Elasticsearch / OpenSearch**：面板未提供內建的密碼管理畫面；請依照引擎自身的文件來管理憑證。

儲存的連線憑證也可在**資料庫** -> **伺服器**中檢視：每個伺服器列都會顯示其使用者名稱和一個帶有複製按鈕的隱藏密碼欄位。

## 遠端資料庫連線

預設只允許本機連線。 若要進行遠端連線：

MySQL/MariaDB/Percona：

1. 在**資料庫** -> **使用者**中建立一個新使用者，並將**主機**設定為**全部 (%)**（允許所有 IP），或選擇**指定**來輸入單一 IP
2. 在防火牆中放行資料庫連接埠 3306

PostgreSQL：

1. 前往**應用程式** -> **PostgreSQL** -> **管理**，開啟**主設定**分頁，找到 `listen_addresses`，取消其註解並將其值改為 `'*'`
2. 開啟**使用者設定**分頁，新增一行：`host    all             username           (IP-address/mask/all)        scram-sha-256` 並儲存
3. 重新啟動 PostgreSQL 服務
4. 在防火牆中放行資料庫連接埠 5432

:::warning 安全性警告
不建議將資料庫連接埠暴露至公開網路。 建議使用 SSH 通道或 VPN 連線。
:::

## 連線遭拒

1. 檢查資料庫服務是否正在執行
2. 檢查使用者權限與主機設定
3. 檢查連線位址：本機連線請使用 `localhost` 或 `127.0.0.1`
4. 請檢查您是否使用了該引擎的正確連接埠。 預設連接埠為 3306（MySQL/MariaDB/Percona）、5432（PostgreSQL）、8123（ClickHouse）、27017（MongoDB）、9200（Elasticsearch）和 6379（Redis）

如果面板在**資料庫** -> **伺服器**下將某個伺服器標記為**無效**，表示面板本身無法使用儲存的憑證連線到它；請先核對該伺服器列上的主機、連接埠、使用者名稱和密碼。 若要快速檢查，請點選伺服器列上的**終端機**，使用儲存的連線參數開啟原生用戶端。

## 大型檔案匯入失敗

phpMyAdmin 有上傳限制。 對於大型檔案，建議透過命令列匯入：

```shell
mysql -u username -p database_name < file.sql
```

或使用面板的檔案管理員上傳，然後在終端機中執行匯入。

## 資料庫備份

1. **備份** -> **建立備份**，選擇資料庫
2. 或使用命令列：

```shell
# MySQL\nmysqldump -u username -p database_name > backup.sql\n\n# PostgreSQL\npg_dump -U username database_name > backup.sql
```

## 字元集問題

若要修改現有資料庫的字元集：

```sql
ALTER\nDATABASE database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
