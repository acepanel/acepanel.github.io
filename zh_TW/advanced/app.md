# 應用程式

![Installed applications and runtimes](/images/app/app.png)

應用程式模組是 AcePanel 的核心功能之一，用於管理伺服器上的各類軟體。 透過應用程式模組，你可以方便地安裝、設定和管理 Web 伺服器、資料庫、執行環境等常用軟體。

## 功能分類

The **Apps** page has four tabs:

- **Installed**: Native applications and runtimes already installed on the server, with their current status and management actions.
- **原生應用程式**：直接安裝在系統上的軟體，如 Nginx、MySQL、Redis 等
- **執行環境**：各類程式語言的執行環境，如 PHP、Node.js、Python、Go、Java 與 .NET
- **容器範本**：基於 Docker 的一鍵部署範本，可快速部署各類應用程式

## Native Application vs Container Template

| Feature               | Native Application                             | Container Template                          |
| --------------------- | ---------------------------------------------- | ------------------------------------------- |
| Performance           | Higher                                         | Slight overhead                             |
| Isolation             | Shared system environment                      | Fully isolated                              |
| Deployment Difficulty | Requires configuration                         | One-click deployment                        |
| Resource Usage        | Lower                                          | Higher                                      |
| Use Cases             | Production environment, high performance needs | Quick testing, multiple version coexistence |

## Application Categories

Native applications are preset with multiple categories by function, including but not limited to:

- **Web Servers**: Nginx, OpenResty, Apache
- **Databases**: MySQL, MariaDB, PostgreSQL, Percona, MongoDB, ClickHouse
- **Search Engines**: Elasticsearch, OpenSearch
- **Containers**: Docker, Podman
- **Middleware**: Redis, Valkey, Memcached, Kafka, RocketMQ
- **Monitoring**: Prometheus, Grafana
- **Storage**: MinIO, S3fs
- **Tools**: phpMyAdmin, Pure-FTPd, Supervisor, Rsync, Frp, Fail2ban, Gitea, Code Server

## Update Cache

The category, native application, runtime environment, and container template lists are fetched from the AcePanel app store and cached locally. When you switch to the **Native App**, **Operating Environment**, or **Container Template** tab, an **Update Cache** button appears at the top of the page. Clicking it refreshes all four cached lists at once (categories, applications, runtime environments, and templates), which is useful when a list is incomplete or you want to pull the latest available software.

The button is hidden on the **Installed** tab, and the operation is unavailable when [Offline Mode](./setting/safe) is enabled.

## Next Steps

- [Native Applications](./app/native) - Learn how to install and manage native applications
- [Runtime Environments](./app/environment) - Learn how to install programming language runtime environments
- [Container Templates](./app/template) - Learn how to use container templates to quickly deploy applications
- [FRP Manager](./app/frp) - Configure Frps, Frpc, proxies, and Visitors
- [Fail2ban Manager](./app/fail2ban) - Manage jails, bans, and allowlists
- [Rsync Manager](./app/rsync) - Publish authenticated rsync modules
- [Supervisor Manager](./app/supervisor) - Manage long-running processes
