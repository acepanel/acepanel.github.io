# 应用

应用模块是 AcePanel 的核心功能之一，用于管理服务器上的各类软件。通过应用模块，你可以方便地安装、配置和管理 Web 服务器、数据库、运行环境等常用软件。

## 功能分类

应用模块分为三个部分：

- **原生应用**：直接安装在系统上的软件，如 Nginx、MySQL、Redis 等
- **运行环境**：各类编程语言的运行时环境，如 PHP、Node.js、Python、Go、Java 等
- **容器模板**：基于 Docker 的一键部署模板，可快速部署各类应用

![应用列表](/images/app/app-list.png)

## 原生应用 vs 容器模板

| 特性 | 原生应用 | 容器模板 |
|------|----------|----------|
| 性能 | 更高 | 略有损耗 |
| 隔离性 | 共享系统环境 | 完全隔离 |
| 部署难度 | 需要配置 | 一键部署 |
| 资源占用 | 较低 | 较高 |
| 适用场景 | 生产环境、高性能需求 | 快速测试、多版本共存 |

## 应用分类

原生应用按功能分为以下类别：

- **Web 服务器**：Nginx、OpenResty、Apache
- **数据库**：MySQL、MariaDB、PostgreSQL、Percona
- **容器**：Docker、Podman
- **中间件**：Redis、Memcached
- **存储**：MinIO、S3fs
- **安全**：Fail2ban
- **工具**：phpMyAdmin、Pure-FTPd、Supervisor、Rsync、Frp
- **开发者**：Gitea

## 下一步

- [原生应用](./app/native) - 了解如何安装和管理原生应用
- [运行环境](./app/environment) - 了解如何安装编程语言运行环境
- [容器模板](./app/template) - 了解如何使用容器模板快速部署应用
