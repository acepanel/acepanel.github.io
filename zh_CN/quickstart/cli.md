# 命令行工具

AcePanel 提供命令行工具 `acepanel`，用于在无法访问 Web 界面时进行面板管理。

## 服务管理

:::warning 注意
后台任务运行时请勿停止或重启面板，可能导致任务中断或数据丢失。
:::

```shell
acepanel start    # 启动
acepanel stop     # 停止
acepanel restart  # 重启
acepanel status   # 查看状态
```

## 用户管理

```shell
acepanel user list                              # 列出所有用户
acepanel user username <旧用户名> <新用户名>      # 修改用户名
acepanel user password <用户名> <新密码>          # 修改密码
acepanel user 2fa <用户名>                       # 开关两步验证
acepanel user passkey <用户名>                   # 清除用户的所有通行密钥
```

## 安全设置

```shell
acepanel https on|off       # 开关 HTTPS
acepanel https generate     # 生成证书（自签名或 Let's Encrypt）
acepanel entrance on|off    # 开关安全入口
acepanel port <端口号>       # 修改监听端口
acepanel bind-domain off    # 解除域名绑定
acepanel bind-ip off        # 解除 IP 绑定
acepanel bind-ua off        # 解除 UA 绑定
```

## 网站管理

```shell
# 创建网站
acepanel website create -n <名称> -d <域名> -l <监听> [--path <路径>] [--php <版本>]

# 移除网站（保留网站目录和数据库）
acepanel website remove -n <名称>

# 删除网站（同时删除网站目录和同名数据库）
acepanel website delete -n <名称>
```

| 标志          | 别名   | 必填          | 说明                      |
| ----------- | ---- | ----------- | ----------------------- |
| `--name`    | `-n` | 是           | 网站名称                    |
| `--domains` | `-d` | 是（`create`） | 绑定到网站的域名；多个域名时重复使用该标志   |
| `--listens` | `-l` | 是（`create`） | 绑定到网站的监听地址；多个地址时重复使用该标志 |
| `--path`    |      | 否           | 网站托管的目录；省略时使用默认路径       |
| `--php`     |      | 否           | 网站使用的 PHP 版本；省略时不使用 PHP |

:::warning 注意
`website delete` 会同时删除网站目录和同名数据库。 此操作不可逆，请谨慎执行。
:::

## 数据库管理

```shell
# 添加数据库服务器
acepanel database add-server --type <类型> --name <名称> --host <主机> --port <端口> [--username <用户名>] [--password <密码>] [--remark <备注>]

# 删除数据库服务器
acepanel database delete-server -n <名称>
```

| 标志           | 别名                      | 必填              | 说明                                                                                       |
| ------------ | ----------------------- | --------------- | ---------------------------------------------------------------------------------------- |
| `--type`     |                         | 是（`add-server`） | 服务器类型，可选 `mysql`、`postgresql`、`redis`、`clickhouse`、`mongodb`、`sqlite`、`elasticsearch` 之一 |
| `--name`     | `-n`（仅 `delete-server`） | 是               | 服务器名称                                                                                    |
| `--host`     |                         | 是（`add-server`） | 服务器地址                                                                                    |
| `--port`     |                         | 是（`add-server`） | 服务器端口                                                                                    |
| `--username` |                         | 否               | 服务器用户名                                                                                   |
| `--password` |                         | 否               | 服务器密码                                                                                    |
| `--remark`   |                         | 否               | 服务器备注                                                                                    |

## 备份管理

```shell
# 备份网站
acepanel backup website -n <名称> [-s <存储 ID>]

# 备份数据库
acepanel backup database -t <类型> -n <名称> [-s <存储 ID>]

# 备份目录
acepanel backup path -p <路径> [-s <存储 ID>]

# 备份面板
acepanel backup panel

# 清理过期备份
acepanel backup clear -t <类型> -f <文件> -k <保留数量> [-s <存储 ID>]
```

| 标志          | 别名   | 说明                                                                          |
| ----------- | ---- | --------------------------------------------------------------------------- |
| `--name`    | `-n` | 网站或数据库名称                                                                    |
| `--type`    | `-t` | `backup database` 的数据库类型（`mysql`、`postgresql`、`redis`）；`backup clear` 的备份类型 |
| `--path`    | `-p` | 要备份的目录路径                                                                    |
| `--file`    | `-f` | 清理时匹配的备份文件名                                                                 |
| `--keep`    | `-k` | 保留的备份数量                                                                     |
| `--storage` | `-s` | 存储 ID；省略时使用本地存储                                                             |

## 日志切割

```shell
# 切割网站日志
acepanel cutoff website -n <名称> [-s <存储 ID>]

# 切割容器日志
acepanel cutoff container -n <名称> [-s <存储 ID>]

# 清理已切割的日志
acepanel cutoff clear -t <类型> -n <名称> -k <保留数量> [-s <存储 ID>]
```

| 标志          | 别名   | 说明                                              |
| ----------- | ---- | ----------------------------------------------- |
| `--name`    | `-n` | 网站或容器名称                                         |
| `--type`    | `-t` | `cutoff clear` 的切割类型，可选 `website` 或 `container` |
| `--keep`    | `-k` | 保留的已切割日志数量                                      |
| `--storage` | `-s` | 存储 ID；省略时使用本地存储                                 |

## 应用管理

```shell
acepanel app install <slug> <channel>   # 安装应用
acepanel app uninstall <slug>           # 卸载应用
acepanel app update <slug>              # 更新应用
```

## 维护命令

```shell
acepanel update      # 更新面板
acepanel fix         # 修复更新问题
acepanel sync        # 同步缓存数据
acepanel sync-time   # 同步服务器时间
acepanel clear-task  # 清理任务队列中卡住的任务（仅在指导下使用）
acepanel info        # 查看面板信息并重置密码
acepanel help        # 帮助
```

## 示例

修改用户 `admin` 的密码为 `newpassword`：

```shell
acepanel user password admin newpassword
```
