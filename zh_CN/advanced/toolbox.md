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

## Choose the Right Tool

| Need                                                                        | Open                             |
| --------------------------------------------------------------------------- | -------------------------------- |
| Find a high-CPU process, open file, connection, or physical disk I/O source | [Process](./toolbox/process)     |
| Inspect sockets or safely change an interface address, gateway, or DNS      | [Network](./toolbox/network)     |
| Manage Swap, host name, Hosts, timezone, time, or NTP                       | [System](./toolbox/system)       |
| Change the SSH daemon port, authentication, root policy, password, or key   | [SSH](./toolbox/ssh)             |
| Partition, format, mount, configure LVM, or inspect SMART and RAID          | [Disk](./toolbox/disk)           |
| Estimate and reclaim space used by logs                                     | [Log Cleanup](./toolbox/log)     |
| Expose a controlled script endpoint to Git or CI/CD                         | [WebHook](./toolbox/webhook)     |
| Measure CPU, memory, or disk performance during a maintenance window        | [Benchmark](./toolbox/benchmark) |
| Move supported resources from AcePanel, BaoTa, or 1Panel                    | [Migration](./toolbox/migration) |
| Diagnose AcePanel's Go memory, garbage collection, or goroutines            | [Panel](./toolbox/panel)         |

The [Network](./toolbox/network) tab lists TCP and UDP connections and safely edits supported NetworkManager, netplan, and ifupdown interface configurations.

The [Migration](./toolbox/migration) tab moves supported websites, databases, users, and projects from AcePanel, BaoTa, or 1Panel.

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
