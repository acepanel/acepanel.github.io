# 應用程式

![已安裝應用和執行環境](/images/app/app.png)

應用程式模組是 AcePanel 的核心功能之一，用於管理伺服器上的各類軟體。 透過應用程式模組，你可以方便地安裝、設定和管理 Web 伺服器、資料庫、執行環境等常用軟體。

## 功能分類

**應用**頁面包含四個標籤頁：

- **已安裝：** 顯示伺服器上已經安裝的原生應用和執行環境，以及當前狀態和管理操作。
- **原生應用程式**：直接安裝在系統上的軟體，如 Nginx、MySQL、Redis 等
- **執行環境**：各類程式語言的執行環境，如 PHP、Node.js、Python、Go、Java 與 .NET
- **容器範本**：基於 Docker 的一鍵部署範本，可快速部署各類應用程式

## 原生應用與容器模板

| 功能分類 | 原生應用       | 容器範本       |
| ---- | ---------- | ---------- |
| 效能   | 較高         | 有少量容器開銷    |
| 隔離   | 共用系統環境     | 獨立隔離       |
| 部署難度 | 需要配置       | 一鍵部署       |
| 資源佔用 | 較低         | 較高         |
| 常見用途 | 生產環境、高效能需求 | 快速測試、多版本共存 |

## 應用分類

原生應用按功能預設了多個分類，包括：

- **Web 伺服器：** Nginx、OpenResty、Apache。
- **資料庫：** MySQL、MariaDB、PostgreSQL、Percona、MongoDB、ClickHouse。
- **搜尋引擎：** Elasticsearch、OpenSearch。
- **容器：** Docker、Podman。
- **中介軟體：** Redis、Valkey、Memcached、Kafka、RocketMQ。
- **監控：** Prometheus、Grafana。
- **儲存：** MinIO、S3fs。
- **工具：** phpMyAdmin、Pure-FTPd、Supervisor、Rsync、Frp、Fail2ban、Gitea、Code Server。

## 更新快取

分類、原生應用、執行環境和容器模板列表從 AcePanel 應用商店獲取並快取在本地。 切換到 **原生應用**、**執行環境**或**容器模板**標籤頁後，頁面頂部會顯示 **更新快取**。 點選一次會同時重新整理分類、應用、執行環境和模板列表，適用於列表不完整或需要獲取最新可用軟體的情況。

**已安裝**標籤頁不顯示該按鈕；啟用[離線模式](./setting/safe)後也無法更新快取。

## 後續閱讀

- [原生應用](./app/native)：安裝和管理原生應用。
- [執行環境](./app/environment)：安裝程式語言執行環境。
- [容器模板](./app/template)：通過模板快速部署應用。
- [FRP 管理器](./app/frp)：配置 Frps、Frpc、代理和 Visitor。
- [Fail2ban 管理器](./app/fail2ban)：管理規則、封禁和白名單。
- [Rsync 管理器](./app/rsync)：釋出帶認證的 rsync 模組。
- [Supervisor 管理器](./app/supervisor)：管理長期執行程序。
