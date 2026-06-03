# 工具箱

工具箱提供了一系列系统管理工具，包括进程管理、网络连接、系统信息、SSH 配置、磁盘管理、日志清理等。

## 功能列表

工具箱按以下选项卡进行组织：

| 功能                          | 说明                 |
| --------------------------- | ------------------ |
| [进程](./toolbox/process)     | 查看和管理系统进程          |
| [网络](./toolbox/network)     | 查看系统 TCP/UDP 网络连接  |
| [系统](./toolbox/system)      | 查看系统信息和配置          |
| [SSH](./toolbox/ssh)        | SSH 服务配置           |
| [磁盘](./toolbox/disk)        | 磁盘使用情况和管理          |
| [日志清理](./toolbox/log)       | 清理系统日志             |
| [Web 钩子](./toolbox/webhook) | 配置 Webhook 通知      |
| [跑分](./toolbox/benchmark)   | 服务器性能测试            |
| [迁移](./toolbox/migration)   | 将数据迁移到另一个 AcePanel |
| [面板](./toolbox/panel)       | 查看面板的运行时信息         |

[网络](./toolbox/network)选项卡列出了系统所有的 TCP 和 UDP 连接（包括 IPv6），显示协议类型、PID、进程名、本地和远程地址以及连接状态，并支持按状态、PID、进程名或端口进行筛选。

[迁移](./toolbox/migration)选项卡让你可以将网站、数据库、数据库用户和项目从本服务器迁移到另一个 AcePanel 实例。 使用目标面板的地址和 API 令牌连接到它，运行预检查，选择要迁移的项目，并跟踪实时进度。

[面板](./toolbox/panel)选项卡显示面板自身的运行时信息，包括运行时长、Go 版本、内存和堆统计、GC 指标以及 goroutine 数量，这对诊断问题很有帮助。

![工具箱](/images/toolbox/toolbox-process.png)

## 下一步

- [进程管理](./toolbox/process) - 查看和管理系统进程
- [网络连接](./toolbox/network) - 查看 TCP/UDP 网络连接
- [系统信息](./toolbox/system) - 查看系统配置
- [SSH 配置](./toolbox/ssh) - 配置 SSH 服务
- [磁盘管理](./toolbox/disk) - 管理磁盘空间
- [日志清理](./toolbox/log) - 清理系统日志
- [Web 钩子](./toolbox/webhook) - 配置通知
- [跑分测试](./toolbox/benchmark) - 测试服务器性能
- [迁移](./toolbox/migration) - 将数据迁移到另一个 AcePanel
- [面板](./toolbox/panel) - 查看面板的运行时信息
