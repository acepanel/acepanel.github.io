# 数据库常见问题

## 忘记数据库密码

### MySQL/MariaDB/Percona

在面板「数据库」->「用户」中修改用户密码。

如果忘记 root 密码，可前往「应用」->「MySQL/MariaDB/Percona」->「管理」中查看/重置。

### PostgreSQL

在面板「数据库」->「用户」中修改用户密码。

如果忘记 postgres 用户密码，可前往「应用」->「PostgreSQL」->「管理」中查看/重置。

## 远程连接数据库

默认只允许本地连接。如需远程连接：

MySQL/MariaDB/Percona：

1. 在「数据库」->「用户」中，新建一个用户主机为 `%`（允许所有 IP）或指定 IP 的用户
2. 在防火墙放行数据库端口 3306

PostgreSQL：

1. 前往「应用」->「PostgreSQL」->「管理」中编辑主配置找到`listen_addresses`，取消注释并将其值改为 `'*'`
2. 在同一页面编辑用户配置，添加一行：`host    all             用户名           (IP地址/掩码/all)        scram-sha-256` 并保存
3. 重启 PostgreSQL 服务
4. 在防火墙放行数据库端口 5432

::: warning 安全提示
不建议将数据库端口暴露到公网，建议使用 SSH 隧道或 VPN 连接。
:::

## 连接被拒绝

1. 检查数据库服务是否运行
2. 检查用户权限和主机设置
3. 检查连接地址：本地连接用 `localhost` 或 `127.0.0.1`

## 导入大文件失败

phpMyAdmin 有上传限制。大文件建议用命令行导入：

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
ALTER DATABASE 数据库名 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
