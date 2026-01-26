# 資料庫常見問題

## 忘記資料庫密碼

### MySQL/MariaDB/Percona

在面板「資料庫」->「使用者」中修改使用者密碼。

如果忘記 root 密碼，可前往「應用」->「MySQL/MariaDB/Percona」->「管理」中查看/重置。

### PostgreSQL

在面板「資料庫」->「使用者」中修改使用者密碼。

如果忘記 postgres 使用者密碼，可前往「應用」->「PostgreSQL」->「管理」中查看/重置。

## 遠端連接資料庫

預設只允許本地連接。 如需遠端連接：

MySQL/MariaDB/Percona：

1. 在「資料庫」->「使用者」中，新建一個使用者主機為 `%`（允許所有 IP）或指定 IP 的使用者
2. 在防火牆放行資料庫連接埠 3306

PostgreSQL：

1. 前往「應用」->「PostgreSQL」->「管理」中編輯主配置找到`listen_addresses`，取消註解並將其值改為 `'*'`
2. 在同一頁面編輯使用者配置，添加一行：`host    all             用户名           (IP地址/掩码/all)        scram-sha-256` 並儲存
3. 重啟 PostgreSQL 服務
4. 在防火牆放行資料庫連接埠 5432

:::warning 安全提示
不建議將資料庫連接埠暴露到公網， 建議使用 SSH 隧道或 VPN 連接。
:::

## 連接被拒絕

1. 檢查資料庫服務是否運行
2. 檢查使用者權限和主機設定
3. 檢查連接地址：本地連接用 `localhost` 或 `127.0.0.1`

## 匯入大檔案失敗

phpMyAdmin 有上傳限制。 大檔案建議用命令列匯入：

```shell
mysql -u 用户名 -p 数据库名 < 文件.sql
```

或使用面板的檔案管理上傳後，在終端執行匯入。

## 資料庫備份

1. 「備份」->「建立備份」選擇資料庫
2. 或使用命令列：

```shell
# MySQL
mysqldump -u 用户名 -p 数据库名 > backup.sql

# PostgreSQL
pg_dump -U 用户名 数据库名 > backup.sql
```

## 字元集問題

已有資料庫修改字元集：

```sql
ALTER
DATABASE database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
