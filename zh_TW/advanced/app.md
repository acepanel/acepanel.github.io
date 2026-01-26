# 應用程式

應用程式模組是 AcePanel 的核心功能之一，用於管理伺服器上的各類軟體。 透過應用程式模組，你可以方便地安裝、配置和管理 Web 伺服器、資料庫、執行環境等常用軟體。

## 功能分類

應用程式模組分為三個部分：

- **原生應用程式**：直接安裝在系統上的軟體，如 Nginx、MySQL、Redis 等
- **執行環境**：各類程式語言的執行時環境，如 PHP、Node.js、Python、Go、Java 等
- **容器範本**：基於 Docker 的一鍵部署範本，可快速部署各類應用程式

![應用程式列表](/images/app/app-list.png)

## 原生應用程式 vs 容器範本

| 特性   | 原生應用程式     | 容器範本       |
| ---- | ---------- | ---------- |
| 效能   | 更高         | 略有損耗       |
| 隔離性  | 共享系統環境     | 完全隔離       |
| 部署難度 | 需要配置       | 一鍵部署       |
| 資源佔用 | 較低         | 較高         |
| 適用場景 | 生產環境、高效能需求 | 快速測試、多版本共存 |

## 應用程式分類

原生應用程式按功能預設了多個分類，包括但不限於：

- **Web 伺服器**：Nginx、OpenResty、Apache
- **資料庫**：MySQL、MariaDB、PostgreSQL、Percona
- **容器**：Docker、Podman
- **中介軟體**：Redis、Memcached
- **儲存**：MinIO、S3fs
- **工具**：phpMyAdmin、Pure-FTPd、Supervisor、Rsync、Frp

## 下一步

- [原生應用程式](./app/native) - 了解如何安裝和管理原生應用程式
- [執行環境](./app/environment) - 了解如何安裝程式語言執行環境
- [容器範本](./app/template) - 了解如何使用容器範本快速部署應用程式
