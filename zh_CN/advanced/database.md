# 数据库

数据库模块用于管理 MySQL、MariaDB、PostgreSQL 等数据库。 支持创建数据库、管理用户和配置数据库服务器。

## 前置要求

使用数据库功能前，需要先安装数据库软件：

1. 进入 **应用** > **原生应用**
2. 安装 Percona、MySQL、MariaDB 或 PostgreSQL

## 功能概览

数据库模块分为三个部分：

| 功能                         | 说明         |
| -------------------------- | ---------- |
| [数据库](./database/database) | 创建和管理数据库   |
| [用户](./database/user)      | 管理数据库用户和权限 |
| [服务器](./database/server)   | 管理数据库服务器连接 |

![数据库列表](/images/database/database-list.png)

## 支持的数据库

| 数据库        | 说明                     |
| ---------- | ---------------------- |
| Percona    | MySQL 的高性能分支，适合高负载场景   |
| MySQL      | 世界上最流行的开源关系型数据库        |
| MariaDB    | MySQL 的开源分支，完全兼容 MySQL |
| PostgreSQL | 功能强大的开源对象关系型数据库        |

## 快速开始

### 创建数据库

1. 进入 **数据库** 页面
2. 点击 **创建数据库**
3. 选择数据库类型和服务器
4. 输入数据库名称
5. 选择是否创建用户并设置权限
6. 点击创建

### 创建用户

1. 切换到 **用户** 标签
2. 点击 **创建用户**
3. 输入用户名和密码
4. 设置访问权限
5. 点击创建

## 连接数据库

### 本地连接

```
主机：127.0.0.1 或 localhost
端口：Percona/MySQL/MariaDB 3306，PostgreSQL 5432
Socket：Percona/MySQL/MariaDB /tmp/mysql.sock，PostgreSQL /tmp/.s.PGSQL.5432
```

### 远程连接

如需远程连接数据库：

1. 在防火墙中开放数据库端口
2. 创建允许远程访问的用户（主机设为 `%`）

:::warning 安全提示
不建议将数据库端口暴露到公网， 如需远程管理建议使用 SSH 隧道或 VPN。
:::

## 下一步

- [数据库管理](./database/database) - 了解如何创建和管理数据库
- [用户管理](./database/user) - 了解如何管理数据库用户
- [服务器管理](./database/server) - 了解如何管理数据库服务器
