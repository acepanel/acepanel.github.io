# 应用

![已安装应用和运行环境](/images/app/app.png)

应用模块是 AcePanel 的核心功能之一，用于管理服务器上的各类软件。 通过应用模块，你可以方便地安装、配置和管理 Web 服务器、数据库、运行环境等常用软件。

## 功能分类

**应用**页面包含四个标签页：

- **已安装：** 显示服务器上已经安装的原生应用和运行环境，以及当前状态和管理操作。
- **原生应用**：直接安装在系统上的软件，如 Nginx、MySQL、Redis 等
- **运行环境**：各类编程语言的运行环境，如 PHP、Node.js、Python、Go、Java 和 .NET
- **容器模板**：基于 Docker 的一键部署模板，可快速部署各类应用

## 原生应用与容器模板

| 功能分类 | 原生应用       | 容器模板       |
| ---- | ---------- | ---------- |
| 性能   | 较高         | 有少量容器开销    |
| 隔离   | 共用系统环境     | 独立隔离       |
| 部署难度 | 需要配置       | 一键部署       |
| 资源占用 | 较低         | 较高         |
| 常见用途 | 生产环境、高性能需求 | 快速测试、多版本共存 |

## 应用分类

原生应用按功能预设了多个分类，包括：

- **Web 服务器：** Nginx、OpenResty、Apache。
- **数据库：** MySQL、MariaDB、PostgreSQL、Percona、MongoDB、ClickHouse。
- **搜索引擎：** Elasticsearch、OpenSearch。
- **容器：** Docker、Podman。
- **中间件：** Redis、Valkey、Memcached、Kafka、RocketMQ。
- **监控：** Prometheus、Grafana。
- **存储：** MinIO、S3fs。
- **工具：** phpMyAdmin、Pure-FTPd、Supervisor、Rsync、Frp、Fail2ban、Gitea、Code Server。

## 更新缓存

分类、原生应用、运行环境和容器模板列表从 AcePanel 应用商店获取并缓存在本地。 切换到 **原生应用**、**运行环境**或**容器模板**标签页后，页面顶部会显示 **更新缓存**。 点击一次会同时刷新分类、应用、运行环境和模板列表，适用于列表不完整或需要获取最新可用软件的情况。

**已安装**标签页不显示该按钮；启用[离线模式](./setting/safe)后也无法更新缓存。

## 后续阅读

- [原生应用](./app/native)：安装和管理原生应用。
- [运行环境](./app/environment)：安装编程语言运行环境。
- [容器模板](./app/template)：通过模板快速部署应用。
- [FRP 管理器](./app/frp)：配置 Frps、Frpc、代理和 Visitor。
- [Fail2ban 管理器](./app/fail2ban)：管理规则、封禁和白名单。
- [Rsync 管理器](./app/rsync)：发布带认证的 rsync 模块。
- [Supervisor 管理器](./app/supervisor)：管理长期运行进程。
