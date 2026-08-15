# 工具箱

![Toolbox overview](/images/toolbox/overview.png)

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

## 选择合适的工具

| Need                                | Open                         |
| ----------------------------------- | ---------------------------- |
| 查找高 CPU 进程、打开文件、网络连接或物理磁盘 I/O 来源    | [进程](./toolbox/process)      |
| 查看网络套接字，或安全修改网卡地址、网关和 DNS           | [网络](./toolbox/network)      |
| 管理 Swap、主机名、Hosts、时区、时间或 NTP        | [系统](./toolbox/system)       |
| 修改 SSH 服务端口、认证方式、Root 策略、密码或密钥      | [SSH](./toolbox/ssh)         |
| 磁盘分区、格式化、挂载、配置 LVM，或查看 SMART 和 RAID | [磁盘](./toolbox/disk)         |
| 估算并释放日志占用的空间                        | [日志清理](./toolbox/log)        |
| 提供受控脚本入口供 Git 或 CI/CD 调用            | [WebHook](./toolbox/webhook) |
| 在维护窗口测试 CPU、内存或磁盘性能                 | [跑分](./toolbox/benchmark)    |
| 从 AcePanel、宝塔或 1Panel 迁移支持的资源       | [迁移](./toolbox/migration)    |
| 诊断 AcePanel 的 Go 内存、垃圾回收或 goroutine | [面板](./toolbox/panel)        |

[网络](./toolbox/network)用于查看 TCP、UDP 连接，并安全编辑受支持的 NetworkManager、netplan 和 ifupdown 网卡配置。

[迁移](./toolbox/migration)用于从 AcePanel、宝塔或 1Panel 迁移受支持的网站、数据库、用户和项目。

[面板](./toolbox/panel)选项卡显示面板自身的运行时信息，包括运行时长、Go 版本、内存和堆统计、GC 指标以及 goroutine 数量，这对诊断问题很有帮助。

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
