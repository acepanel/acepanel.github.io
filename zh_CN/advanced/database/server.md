# 服务器管理

服务器管理页面用于管理数据库服务器连接，同时支持本地和远程数据库服务器。 支持的数据库类型有 MySQL、PostgreSQL、ClickHouse、MongoDB、SQLite、Elasticsearch 和 Redis。

## 服务器列表

进入 **数据库** > **服务器** 标签页查看服务器列表。

![服务器列表](/images/database/database-server.png)

列表显示以下信息：

- **名称**：服务器名称
- **用户名**：管理员用户名（未设置时显示 None）
- **密码**：管理员密码（默认隐藏，带复制按钮）
- **主机**：服务器地址和端口
- **备注**：备注信息（可内联编辑）
- **状态**：连接状态（有效/无效）
- **更新日期**：最后更新时间
- **操作**：终端、同步、修改、删除

## 本地服务器

安装对应的数据库软件后，AcePanel 会自动添加内置的本地服务器。 这些服务器无法直接删除；如需移除，请卸载对应的应用：

- **local_mysql**：本地 Percona/MySQL/MariaDB 服务器
- **local_postgresql**：本地 PostgreSQL 服务器
- **local_redis**：本地 Redis 服务器
- **local_valkey**：本地 Valkey 服务器
- **local_clickhouse**：本地 ClickHouse 服务器
- **local_mongodb**：本地 MongoDB 服务器
- **local_elasticsearch**：本地 Elasticsearch 服务器
- **local_opensearch**：本地 OpenSearch 服务器

## 添加远程服务器

1. 点击 **添加服务器** 按钮
2. 填写配置：
   - **类型**：选择数据库类型（MySQL/PostgreSQL/ClickHouse/MongoDB/SQLite/Elasticsearch/Redis）。 从特定类型的标签页打开对话框时，此选择器会被隐藏。
   - **名称**：服务器名称（用于标识，仅允许字母、数字、`-` 和 `_`）
   - **主机**：服务器地址。 对于 SQLite，此处会变为**文件路径**字段，用于选择数据库文件。
   - **端口**：数据库端口
   - **用户名**：管理员用户名（Redis 和 SQLite 不显示）
   - **密码**：管理员密码（SQLite 不显示）
   - **备注**：备注信息
3. 点击提交

### 远程服务器使用场景

- 连接云数据库（如阿里云 RDS、腾讯云 CDB）
- 连接容器中的数据库服务
- 连接其他服务器上的数据库
- 数据库读写分离架构

## 服务器操作

### 终端

点击 **终端** 按钮打开数据库命令行终端，可以直接执行 SQL 语句。 终端会为所选的服务器类型启动原生客户端，并自动传入面板中存储的连接参数（主机、端口、用户名和密码）：

| 类型            | 启动的客户端              | 说明                                                             |
| ------------- | ------------------- | -------------------------------------------------------------- |
| MySQL         | `mysql`             | 使用配置的用户名、密码、主机和端口进行连接。                                         |
| PostgreSQL    | `psql`              | 设置了密码时使用 `PGPASSWORD`；未设置密码时则回退到 `su - postgres -c 'psql'`。    |
| Redis         | `redis-cli`         | 仅在设置了密码时才添加 `-a` 密码参数。                                         |
| ClickHouse    | `clickhouse-client` | 始终连接原生 TCP 端口 **9000**，而非下方端口表中显示的 HTTP 端口 `8123`。             |
| MongoDB       | `mongosh`           | 通过 `mongodb://` URI 连接到 `admin` 数据库。                           |
| SQLite        | `sqlite3`           | 使用配置的文件路径直接打开数据库文件。                                            |
| Elasticsearch | `curl`              | 运行 `curl .../_cat/indices?v` 列出索引；这是一个只读的 HTTP 请求，而非交互式 shell。 |

### 同步

点击**同步**按钮可将数据库用户（不含其密码）同步到面板。 当用户直接在数据库中创建时，可以使用此功能将其同步到面板。

:::tip
同步功能适用于 MySQL、PostgreSQL 和 ClickHouse 服务器。 它不会为 Redis、MongoDB、SQLite 和 Elasticsearch 显示，因为这些数据库不支持面板用户管理。
:::

### 修改

点击 **修改** 按钮可以修改服务器连接信息，如密码、主机地址等。

### 删除

点击 **删除** 按钮删除服务器配置。 删除生效前需要 5 秒的确认倒计时。

:::warning 注意
删除服务器配置不会删除实际的数据库服务，只是从面板中移除该服务器的管理。 内置的本地服务器无法在此删除；请改为卸载对应的应用。
:::

## 连接测试

添加或修改服务器后，系统会自动测试连接。 如果连接失败，请检查：

1. 服务器地址和端口是否正确
2. 用户名和密码是否正确
3. 防火墙是否允许连接
4. 数据库服务是否正常运行
5. 数据库用户是否允许从当前主机连接

## 默认端口

| 数据库                   | 默认端口  |
| --------------------- | ----- |
| Percona/MySQL/MariaDB | 3306  |
| PostgreSQL            | 5432  |
| Redis                 | 6379  |
| ClickHouse            | 8123  |
| MongoDB               | 27017 |
| Elasticsearch         | 9200  |
| SQLite                | 文件路径  |
