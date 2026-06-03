# 数据库常见问题

## 我可以管理哪些数据库类型？

**数据库**模块不局限于 MySQL 和 PostgreSQL。 它为以下每种引擎提供了专属选项卡：MySQL（同时涵盖 MariaDB 和 Percona）、PostgreSQL、ClickHouse、MongoDB、SQLite、Elasticsearch 和 Redis，此外还有共用的**用户**和**服务器**选项卡。

每个选项卡支持的操作因引擎而异：

- **MySQL / PostgreSQL / ClickHouse / MongoDB**：通过选项卡的**创建数据库**按钮创建和管理数据库。
- **SQLite**：按路径注册数据库文件（每个文件都作为独立的服务器条目添加）。
- **Elasticsearch**：浏览索引和文档并在线创建/删除它们，而非创建数据库的流程。
- **Redis**：在线浏览、搜索、创建、重命名键，为键设置 TTL 和删除键，以及清空数据库。
- **用户**选项卡：创建数据库用户。 用户管理仅适用于 **MySQL、PostgreSQL 和 ClickHouse**；其他引擎不提供用户管理入口。

各引擎的分步使用方法，请参阅 [数据库参考](../advanced/database)。

## 忘记数据库密码

### MySQL/MariaDB/Percona

在面板**数据库** -> **用户**中修改用户密码。

如果忘记 root 密码，可前往「应用」->「MySQL/MariaDB/Percona」->「管理」中查看/重置。

### PostgreSQL

在面板**数据库** -> **用户**中修改用户密码。

如果忘记 postgres 用户密码，可前往「应用」->「PostgreSQL」->「管理」中查看/重置。

### 其他引擎（ClickHouse / MongoDB / Redis / Valkey / Elasticsearch / OpenSearch）

这些引擎在**数据库** -> **用户**下没有普通用户管理入口。 可在何处修改管理员凭据取决于具体引擎：

- **MongoDB / ClickHouse**：在**应用** -> **MongoDB** / **ClickHouse** 下的应用管理页面查看或重置管理员密码。
- **Redis / Valkey**：在**应用** -> **Redis** / **Valkey** -> **参数调优**中设置或修改密码（`requirepass`）。
- **Elasticsearch / OpenSearch**：面板未提供内置的密码管理界面；请根据引擎自身的文档来管理凭据。

存储的连接凭据也可在**数据库** -> **服务器**中查看：每个服务器行都会显示其用户名和一个带复制按钮的隐藏密码字段。

## 远程连接数据库

默认只允许本地连接。 如需远程连接：

MySQL/MariaDB/Percona：

1. 在**数据库** -> **用户**中创建一个新用户，并将**主机**设置为**全部 (%)**（允许所有 IP），或选择**指定**来输入单个 IP
2. 在防火墙放行数据库端口 3306

PostgreSQL：

1. 进入**应用** -> **PostgreSQL** -> **管理**，打开**主配置**选项卡，找到 `listen_addresses`，取消其注释并将其值改为 `'*'`
2. 打开**用户配置**选项卡，添加一行：`host    all             username           (IP-address/mask/all)        scram-sha-256` 并保存
3. 重启 PostgreSQL 服务
4. 在防火墙放行数据库端口 5432

:::warning 安全提示
不建议将数据库端口暴露到公网， 建议使用 SSH 隧道或 VPN 连接。
:::

## 连接被拒绝

1. 检查数据库服务是否运行
2. 检查用户权限和主机设置
3. 检查连接地址：本地连接用 `localhost` 或 `127.0.0.1`
4. 检查你是否使用了该引擎的正确端口。 默认端口为 3306（MySQL/MariaDB/Percona）、5432（PostgreSQL）、8123（ClickHouse）、27017（MongoDB）、9200（Elasticsearch）和 6379（Redis）

如果面板在**数据库** -> **服务器**下将某个服务器标记为**无效**，说明面板自身无法使用存储的凭据连接到它；请先核对该服务器行上的主机、端口、用户名和密码。 若要快速检查，请点击服务器行上的**终端**，使用存储的连接参数打开原生客户端。

## 导入大文件失败

phpMyAdmin 有上传限制。 大文件建议用命令行导入：

```shell
mysql -u 用户名 -p 数据库名 < 文件.sql
```

或使用面板的文件管理上传后，在终端执行导入。

## 数据库备份

1. 「备份」->「创建备份」选择数据库
2. 或使用命令行：

```shell
# MySQL
mysqldump -u 用户名 -p 数据库名 > backup.sql

# PostgreSQL
pg_dump -U 用户名 数据库名 > backup.sql
```

## 字符集问题

已有数据库修改字符集：

```sql
ALTER
DATABASE database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
