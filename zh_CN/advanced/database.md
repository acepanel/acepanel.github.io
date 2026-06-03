# 数据库

数据库模块用于管理关系型数据库（MySQL、MariaDB、PostgreSQL 等）、NoSQL 和分析型数据库（MongoDB、ClickHouse）、搜索引擎（Elasticsearch）、键值存储（Redis）以及嵌入式数据库（SQLite）。 它支持创建数据库、管理用户、浏览数据以及配置数据库服务器。

## 前置要求

在使用数据库功能之前，需要先安装相应的数据库软件：

1. 进入 **应用** > **原生应用**
2. 安装你需要的数据库，例如 Percona、MySQL、MariaDB、PostgreSQL、MongoDB、ClickHouse、Elasticsearch、OpenSearch、Redis 或 Valkey

## 功能概览

数据库模块按数据库类型组织，每种类型一个标签页（MySQL、PostgreSQL、ClickHouse、MongoDB、SQLite、Elasticsearch、Redis），其后是两个管理标签页：

| 功能                         | 说明            |
| -------------------------- | ------------- |
| [数据库](./database/database) | 为所选类型创建和管理数据库 |
| [用户](./database/user)      | 管理数据库用户和权限    |
| [服务器](./database/server)   | 管理数据库服务器连接    |

Elasticsearch 和 Redis 标签页提供在线数据浏览器，可直接管理索引/文档和键值数据，而不是创建数据库的工作流。

![数据库列表](/images/database/database-list.png)

## 支持的数据库

| 数据库           | 说明                     |
| ------------- | ---------------------- |
| MySQL         | 世界上最流行的开源关系型数据库        |
| MariaDB       | MySQL 的开源分支，完全兼容 MySQL |
| Percona       | MySQL 的高性能分支，适合高负载场景   |
| PostgreSQL    | 功能强大的开源对象关系型数据库        |
| ClickHouse    | 面向列的数据库，适用于海量数据集的实时分析  |
| MongoDB       | 文档数据库，用于存储海量非结构化数据     |
| Elasticsearch | 用于全文检索的分布式搜索与分析引擎      |
| Redis         | 内存键值存储，常用于缓存           |
| SQLite        | 轻量级嵌入式数据库，以单个文件形式存储    |

MariaDB 和 Percona 在 **MySQL** 标签页下管理，因为它们与 MySQL 协议兼容。

## 快速开始

### 创建数据库

1. 进入 **数据库** 页面，切换到你想要的数据库类型标签页（MySQL、PostgreSQL、ClickHouse 或 MongoDB）
2. 点击 **创建数据库**
3. 选择服务器
4. 输入数据库名称
5. 可选择开启 **创建用户**，或指定一个已有的授权用户
6. 点击提交

### 创建用户

1. 切换到 **用户** 标签
2. 点击 **创建用户**
3. 选择服务器，然后输入用户名和密码
4. 设置权限（用户可访问的数据库名称；不存在的数据库会自动创建）
5. 点击提交

:::tip 注意
用户管理仅适用于 MySQL、PostgreSQL 和 ClickHouse。 其他数据库类型不提供用户管理入口。
:::

## 连接数据库

### 本地连接

```
主机：127.0.0.1 或 localhost\nSocket：Percona/MySQL/MariaDB /tmp/mysql.sock，PostgreSQL /tmp/.s.PGSQL.5432
```

各数据库类型的默认端口：

| 数据库                   | 默认端口  |
| --------------------- | ----- |
| Percona/MySQL/MariaDB | 3306  |
| PostgreSQL            | 5432  |
| ClickHouse            | 8123  |
| MongoDB               | 27017 |
| Elasticsearch         | 9200  |
| Redis                 | 6379  |

### 远程连接

如需远程连接数据库：

1. 在防火墙中开放数据库端口
2. 创建一个允许远程访问的用户

对于 MySQL（包括 MariaDB 和 Percona），**创建用户** 表单提供了一个 **主机** 选择器，包含三个选项，用于控制该用户可以从何处连接：

| 主机选项          | 含义                  |
| ------------- | ------------------- |
| 本地（localhost） | 仅允许来自本机的连接          |
| 全部（%）         | 允许来自任意主机的连接（远程访问所需） |
| 指定            | 仅允许来自你输入的主机地址的连接    |

要为 MySQL 用户启用远程访问，请选择 **全部（%）**（或选择 **指定** 并输入客户端地址）。 PostgreSQL 和 ClickHouse 用户没有这种按主机的设置，因此这些类型不会显示主机选择器。

:::warning 安全提示
不建议将数据库端口暴露到公网， 如需远程管理建议使用 SSH 隧道或 VPN。
:::

## 下一步

- [数据库管理](./database/database) - 了解如何创建和管理数据库
- [用户管理](./database/user) - 了解如何管理数据库用户
- [服务器管理](./database/server) - 了解如何管理数据库服务器
