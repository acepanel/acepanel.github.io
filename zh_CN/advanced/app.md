# 应用

应用模块是 AcePanel 的核心功能之一，用于管理服务器上的各类软件。 通过应用模块，你可以方便地安装、配置和管理 Web 服务器、数据库、运行环境等常用软件。

## 功能分类

应用模块分为三个部分：

- **原生应用**：直接安装在系统上的软件，如 Nginx、MySQL、Redis 等
- **运行环境**：各类编程语言的运行环境，如 PHP、Node.js、Python、Go、Java 和 .NET
- **容器模板**：基于 Docker 的一键部署模板，可快速部署各类应用

此外，应用页面还提供了**已安装**选项卡，集中列出所有已安装的原生应用和运行环境及其运行状态，方便在一处统一管理、更新或卸载。

![应用列表](/images/app/app-list.png)

## 原生应用 vs 容器模板

| 特性   | 原生应用       | 容器模板       |
| ---- | ---------- | ---------- |
| 性能   | 更高         | 略有损耗       |
| 隔离性  | 共享系统环境     | 完全隔离       |
| 部署难度 | 需要配置       | 一键部署       |
| 资源占用 | 较低         | 较高         |
| 适用场景 | 生产环境、高性能需求 | 快速测试、多版本共存 |

## 应用分类

原生应用按功能预设了多个分类，包括但不限于：

- **Web 服务器**：Nginx、OpenResty、Apache
- **数据库**：MySQL、MariaDB、PostgreSQL、Percona、MongoDB、ClickHouse
- **搜索引擎**：Elasticsearch、OpenSearch
- **容器**：Docker、Podman
- **中间件**：Redis、Valkey、Memcached、Kafka、RocketMQ
- **监控**：Prometheus、Grafana
- **存储**：MinIO、S3fs
- **工具**：phpMyAdmin、Pure-FTPd、Supervisor、Rsync、Frp、Fail2ban、Gitea、Code Server

## 更新缓存

分类、原生应用、运行环境和容器模板列表均从 AcePanel 应用商店获取并缓存到本地。 当你切换到**原生应用**、**运行环境**或**容器模板**选项卡时，页面顶部会出现**更新缓存**按钮。 点击它可一次性刷新全部四个缓存列表（分类、应用、运行环境和模板），当某个列表不完整或你想拉取最新可用软件时非常有用。

该按钮在**已安装**选项卡中隐藏，并且在启用[离线模式](./setting/safe)时无法使用此操作。

## 下一步

- [原生应用](./app/native) - 了解如何安装和管理原生应用
- [运行环境](./app/environment) - 了解如何安装编程语言运行环境
- [容器模板](./app/template) - 了解如何使用容器模板快速部署应用
