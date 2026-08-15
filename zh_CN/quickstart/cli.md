# 命令行工具

`acepanel` 是随 AcePanel 安装、仅允许 root 使用的恢复和管理命令行工具。 执行不可逆操作前，先在服务器上运行 `acepanel <command> --help` 核对参数。

## 输出与安全

需要机器可读的列表输出时，添加全局 `--json` 参数：

```bash
acepanel --json website list
acepanel --json database list-server
```

该参数只适用于受支持的列表输出，并非所有交互或修改命令都支持。 后台任务或[迁移](../advanced/toolbox/migration)正在运行时，不要停止或重启面板。

## 服务与维护

```bash
acepanel status
acepanel start
acepanel stop
acepanel restart
acepanel update
acepanel fix
acepanel sync
acepanel sync-time
```

`acepanel info` 用于显示当前访问信息，默认不会在每次运行时重置密码：

```bash
acepanel info
acepanel info --username <user>
acepanel info --username <user> --force
```

只有确实需要重置密码时才使用 `--force`（`-f`）。 `--username`（`-u`）用于选择账号；不填写时使用第一个面板用户。

## 面板访问控制

```bash
acepanel port <port>
acepanel https on|off
acepanel https generate
acepanel entrance on|off
acepanel bind-domain on <domain> [domain...]
acepanel bind-domain off
acepanel bind-ip on <ip> [ip...]
acepanel bind-ip off
acepanel bind-ua on <user-agent> [user-agent...]
acepanel bind-ua off
```

修改端口或任何绑定前，先在系统防火墙和云安全组中放行新的访问方式，并保留一个 SSH 会话。

## 用户和密码输入

```bash
acepanel user list
acepanel user create <username> [password] [--email <address>]
acepanel user delete <username>
acepanel user username <old-username> <new-username>
acepanel user password <username> [password]
acepanel user 2fa <username>
acepanel user passkey <username>
```

`user create` 和 `user password` 按以下优先级读取密码：

1. 命令参数；
2. `ACEPANEL_PASSWORD` 环境变量；
3. 不回显的交互输入。

在多人使用的系统上，明文密码参数可能通过 Shell 历史或进程信息泄露，应避免使用。 环境变量适合短期自动化，但不能写入日志或保存在权限不安全的服务文件中。

## 防火墙

```bash
acepanel firewall status
acepanel firewall on
acepanel firewall off
acepanel firewall list
acepanel firewall port 443
acepanel firewall port 8000-9000 --protocol tcp
acepanel firewall port 443 --remove
```

`firewall port` 支持单个端口或端口范围。 `--protocol`（`-p`）可设为 `tcp`、`udp` 或 `tcp/udp`，默认是 `tcp/udp`；`--remove` 用于删除匹配规则。 远程管理时，除非已经验证其他访问控制有效，否则不要关闭防火墙。

## 网站和证书

```bash
acepanel website list
acepanel website create --type static --name <name> --domains <domain> --listens 80
acepanel website remove --name <name>
acepanel website delete --name <name>
acepanel website cert --name <name> --cert <fullchain-path> --key <private-key-path>
acepanel cert list
acepanel cert renew --id <id>
acepanel cert renew --all
```

创建网站时，`--type`（`-t`）支持 `proxy`、`static` 和 `php`；`--domains`（`-d`）与 `--listens`（`-l`）可以重复填写；还可使用 `--path`（`-p`）、`--proxy`、`--php`、`--db`、`--db-name`、`--db-user`、`--db-password` 和 `--remark`。

`website remove` 会保留网站目录和同名数据库； `website delete` 会同时删除这些数据并自动解除证书关联，且不可恢复。 `website cert` 从服务器文件读取证书和私钥，应保护两个文件路径，绝不能把私钥粘贴到 Shell 历史中。

## 数据库服务器

```bash
acepanel database list-server
acepanel database add-server --type <type> --name <name> --host <host> --port <port> [--username <user>] [--password <password>] [--remark <text>]
acepanel database delete-server --name <name>
```

`add-server` 支持 `mysql`、`postgresql`、`mongodb`、`clickhouse`、`redis` 和 `elasticsearch`。 删除服务器登记后，其数据库可能无法继续通过面板操作；该操作不能替代数据保留方案。

## 备份和恢复

```bash
acepanel backup list --type <type>
acepanel backup website --name <name> [--storage <id>]
acepanel backup database --type <type> --name <name> [--storage <id>]
acepanel backup path --path <directory> [--storage <id>]
acepanel backup panel
acepanel backup clear --type <type> --file <prefix> --keep <count> [--storage <id>]

acepanel restore website --name <name> --file <backup>
acepanel restore database --type <type> --name <name> --file <backup>
acepanel restore panel --file <backup>
```

备份列表支持 `website`、`path`、`panel`、`mysql`、`postgresql`、`clickhouse`、`redis` 和 `valkey`。 数据库备份和恢复支持 MySQL、PostgreSQL、ClickHouse、Redis 和 Valkey。 备份文件名可以是绝对路径，也可以是相对于命令所述默认备份目录的路径。 恢复面板后会自动重启面板服务。

## 计划任务

```bash
acepanel cron list
acepanel cron run --id <id>
acepanel cron status --id <id>
acepanel cron status --id <id> --off
```

`cron run` 会立即执行所选任务。 `cron status` 用于启用任务；添加 `--off` 则禁用任务。

## 应用

```bash
acepanel app list
acepanel app install <slug> [channel]
acepanel app update <slug>
acepanel app uninstall <slug>
```

安装、更新或卸载可能创建面板后台任务，可在 **任务 > 面板任务**中查看进度。

## 日志切割

```bash
acepanel cutoff website --name <name> [--storage <id>]
acepanel cutoff container --name <name> [--storage <id>]
acepanel cutoff clear --type website|container --name <name> --keep <count> [--storage <id>]
```

## 故障排查

- 服务看起来不可用时，先运行 `acepanel status`，再决定是否重启。
- 首页报告面板数据库或更新健康问题时，按提示使用 `acepanel fix`。
- 优先使用文档列出的公开命令。 隐藏的 `init`、`setting`、任务清理、应用标记、计划任务包装和数据库写入命令属于内部恢复接口，仅应在项目方指导下使用。
- JSON 自动化失败时，确认该命令属于支持的列表命令，并分别检查退出状态和标准错误输出。
