# pgAdmin

![pgAdmin 设置](/images/database/pgadmin.png)

pgAdmin 是 AcePanel 集成的 PostgreSQL Web 管理工具。 安装原生应用后，可以从 PostgreSQL 数据库列表一键进入，也可以在应用管理器中配置访问参数。

## 前置条件

- 在 **应用**中安装至少一个 PostgreSQL 服务器，并在 **数据库 > 服务器**中完成登记。
- 安装 pgAdmin 原生应用。
- 使用系统防火墙、云安全组或受信任的反向代理限制 pgAdmin 监听端口的访问来源。

## 打开 pgAdmin

进入 **数据库**，选择 PostgreSQL 标签页，在数据库行中点击 pgAdmin。 AcePanel 会打开 pgAdmin，并提供已配置服务器的一键访问信息。

数据库类型标签会动态显示：只有存在对应数据库服务器时，MySQL、PostgreSQL、ClickHouse、Redis、Valkey 等类型的标签才会出现。 管理工具的界面语言跟随面板语言。

## 访问设置

进入 **应用 > 已安装 > pgAdmin > 管理**，可以查看或修改：

- 访问地址和端口；
- 管理员邮箱；
- 管理员密码；
- AcePanel 使用的 pgAdmin 账号。

修改管理员邮箱时，AcePanel 会迁移已经同步到 pgAdmin 的 PostgreSQL 服务器配置。 修改后应确认所有预期服务器仍然存在。

## 安全建议

- pgAdmin 管理员密码属于高权限数据库凭据，应妥善保管。
- 不要把 pgAdmin 直接暴露到公网， 应使用访问白名单、VPN 或带认证的反向代理。
- 修改端口后，还需要同步调整防火墙和上游安全组。
- 连接经过不受信任的网络时应使用 TLS。

## 故障排查

- **没有 pgAdmin 操作：** 确认 pgAdmin 已安装，且当前打开的是 PostgreSQL 标签页。
- **服务器未显示：** 先在 **数据库 > 服务器**中核对，再重新打开或同步 pgAdmin。
- **页面无法打开：** 检查 pgAdmin 服务、监听端口、防火墙和应用日志。
- **修改邮箱后无法登录：** 使用当前邮箱，通过管理器重置密码，并核对同步账号。

MySQL 对应提供 phpMyAdmin 入口，并可选择目标 MySQL 服务器。
