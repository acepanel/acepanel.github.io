# 數據庫

數據庫模組用於管理 MySQL、MariaDB、PostgreSQL 等數據庫。 支持創建數據庫、管理用戶和配置數據庫服務器。

## 前置要求

使用數據庫功能前，需要先安裝數據庫軟體：

1. 進入 **應用** > **原生應用**
2. 安裝 Percona、MySQL、MariaDB 或 PostgreSQL

## 功能概覽

數據庫模組分為三個部分：

| 功能                         | 說明         |
| -------------------------- | ---------- |
| [數據庫](./database/database) | 創建和管理數據庫   |
| [用戶](./database/user)      | 管理數據庫用戶和權限 |
| [服務器](./database/server)   | 管理數據庫服務器連接 |

![數據庫列表](/images/database/database-list.png)

## 支持的數據庫

| 數據庫        | 說明                     |
| ---------- | ---------------------- |
| Percona    | MySQL 的高性能分支，適合高負載場景   |
| MySQL      | 世界上最流行的開源關係型數據庫        |
| MariaDB    | MySQL 的開源分支，完全兼容 MySQL |
| PostgreSQL | 功能強大的開源對象關係型數據庫        |

## 快速開始

### 創建數據庫

1. 進入 **數據庫** 頁面
2. 點擊 **創建數據庫**
3. 選擇數據庫類型和服務器
4. 輸入數據庫名稱
5. 選擇是否創建用戶並設置權限
6. 點擊創建

### 創建用戶

1. 切換到 **用戶** 標籤
2. 點擊 **創建用戶**
3. 輸入用戶名和密碼
4. 設置訪問權限
5. 點擊創建

## 連接數據庫

### 本地連接

```
主機：127.0.0.1 或 localhost
端口：Percona/MySQL/MariaDB 3306，PostgreSQL 5432
Socket：Percona/MySQL/MariaDB /tmp/mysql.sock，PostgreSQL /tmp/.s.PGSQL.5432
```

### 遠程連接

如需遠程連接數據庫：

1. 在防火牆中開放數據庫端口
2. 創建允許遠程訪問的用戶（主機設為 `%`）

:::warning 安全提示
不建議將數據庫端口暴露到公網， 如需遠程管理建議使用 SSH 隧道或 VPN。
:::

## 下一步

- [數據庫管理](./database/database) - 了解如何創建和管理數據庫
- [用戶管理](./database/user) - 了解如何管理數據庫用戶
- [服務器管理](./database/server) - 了解如何管理數據庫服務器
