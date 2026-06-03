# 資料庫

資料庫模組用於管理關聯式資料庫（MySQL、MariaDB、PostgreSQL 等）、NoSQL 與分析型資料庫（MongoDB、ClickHouse）、搜尋引擎（Elasticsearch）、鍵值儲存（Redis）以及嵌入式資料庫（SQLite）。 它支援建立資料庫、管理使用者、瀏覽資料以及設定資料庫伺服器。

## 前置需求

在使用資料庫功能之前，需要先安裝對應的資料庫軟體：

1. 前往 **應用程式** > **原生應用程式**
2. 安裝你需要的資料庫，例如 Percona、MySQL、MariaDB、PostgreSQL、MongoDB、ClickHouse、Elasticsearch、OpenSearch、Redis 或 Valkey

## 功能總覽

資料庫模組依資料庫類型組織，每種類型一個標籤頁（MySQL、PostgreSQL、ClickHouse、MongoDB、SQLite、Elasticsearch、Redis），其後是兩個管理標籤頁：

| 功能                         | 說明            |
| -------------------------- | ------------- |
| [資料庫](./database/database) | 為所選類型建立與管理資料庫 |
| [使用者](./database/user)     | 管理資料庫使用者與權限   |
| [伺服器](./database/server)   | 管理資料庫伺服器連線    |

Elasticsearch 與 Redis 標籤頁提供線上資料瀏覽器，可直接管理索引/文件與鍵值資料，而非建立資料庫的流程。

![資料庫清單](/images/database/database-list.png)

## 支援的資料庫

| 資料庫           | 說明                       |
| ------------- | ------------------------ |
| MySQL         | 全球最受歡迎的開源關聯式資料庫          |
| MariaDB       | MySQL 的開源分支，與 MySQL 完全相容 |
| Percona       | MySQL 的高效能分支，適合高負載情境     |
| PostgreSQL    | 功能強大的開源物件關聯式資料庫          |
| ClickHouse    | 面向資料行的資料庫，適用於海量資料集的即時分析  |
| MongoDB       | 文件資料庫，用於儲存海量非結構化資料       |
| Elasticsearch | 用於全文搜尋的分散式搜尋與分析引擎        |
| Redis         | 記憶體鍵值儲存，常用於快取            |
| SQLite        | 輕量級嵌入式資料庫，以單一檔案形式儲存      |

MariaDB 與 Percona 在 **MySQL** 標籤頁下管理，因為它們與 MySQL 協定相容。

## 快速開始

### 建立資料庫

1. 前往 **資料庫** 頁面，切換到你想要的資料庫類型標籤頁（MySQL、PostgreSQL、ClickHouse 或 MongoDB）
2. 點選 **建立資料庫**
3. 選擇伺服器
4. 輸入資料庫名稱
5. 可選擇啟用 **建立使用者**，或指定一個既有的授權使用者
6. 點選提交

### 建立使用者

1. 切換到 **使用者** 標籤頁
2. 點選 **建立使用者**
3. 選擇伺服器，然後輸入使用者名稱與密碼
4. 設定權限（使用者可存取的資料庫名稱；不存在的資料庫會自動建立）
5. 點選提交

:::tip 注意
使用者管理僅適用於 MySQL、PostgreSQL 與 ClickHouse。 其他資料庫類型不提供使用者管理入口。
:::

## 連線資料庫

### 本機連線

```
主機：127.0.0.1 或 localhost\nSocket：Percona/MySQL/MariaDB /tmp/mysql.sock，PostgreSQL /tmp/.s.PGSQL.5432
```

各資料庫類型的預設連接埠：

| 資料庫                   | 預設連接埠 |
| --------------------- | ----- |
| Percona/MySQL/MariaDB | 3306  |
| PostgreSQL            | 5432  |
| ClickHouse            | 8123  |
| MongoDB               | 27017 |
| Elasticsearch         | 9200  |
| Redis                 | 6379  |

### 遠端連線

如需從遠端連線資料庫：

1. 在防火牆中開放資料庫連接埠
2. 建立一個允許遠端存取的使用者

對於 MySQL（包括 MariaDB 與 Percona），**建立使用者** 表單提供了一個 **主機** 選擇器，包含三個選項，用於控制該使用者可從何處連線：

| 主機選項          | 意義                  |
| ------------- | ------------------- |
| 本機（localhost） | 僅允許來自本機的連線          |
| 全部（%）         | 允許來自任意主機的連線（遠端存取所需） |
| 指定            | 僅允許來自你輸入的主機位址的連線    |

若要為 MySQL 使用者啟用遠端存取，請選擇 **全部（%）**（或選擇 **指定** 並輸入用戶端位址）。 PostgreSQL 與 ClickHouse 使用者沒有這種依主機的設定，因此這些類型不會顯示主機選擇器。

:::warning 安全提示
不建議將資料庫連接埠暴露至公開網路， 如需遠端管理，建議使用 SSH 通道或 VPN。
:::

## 下一步

- [資料庫管理](./database/database) - 瞭解如何建立與管理資料庫
- [使用者管理](./database/user) - 瞭解如何管理資料庫使用者
- [伺服器管理](./database/server) - 瞭解如何管理資料庫伺服器
