# 容器

容器模組提供完整的 Docker 容器管理功能，包括容器、compose、映像檔、網路與儲存卷的管理。

## 先決條件

使用容器功能前，您需要先安裝 Docker 或 Podman：

1. 前往 **應用程式** > **原生應用程式**
2. 找到 Docker 或 Podman，點選 **安裝**

## 功能概覽

容器模組分為五個部分：

| 功能                             | 說明                          |
| ------------------------------ | --------------------------- |
| [容器](./container/container)    | 管理執行中的容器執行個體                |
| [Compose](./container/compose) | 使用 Docker Compose 管理多容器應用程式 |
| [映像檔](./container/image)       | 管理本機映像檔                     |
| [網路](./container/network)      | 管理 Docker 網路                |
| [儲存卷](./container/volume)      | 管理資料卷                       |

![容器清單](/images/container/container-list.png)

## 快速開始

### 建立容器

1. 前往 **容器** 頁面
2. 點選 **建立容器**
3. 輸入映像檔名稱（例如 `nginx:latest`）
4. 設定連接埠對應、儲存卷掛載等
5. 點選 **建立**

### 使用容器範本

若您想快速部署常見的應用程式，建議使用 [容器範本](./app/template)，可一鍵部署而無需手動設定。

## 容器與原生應用程式的比較

| 功能    | 容器     | 原生應用程式  |
| ----- | ------ | ------- |
| 隔離性   | 完全隔離   | 共用系統環境  |
| 效能    | 些微額外負擔 | 原生效能    |
| 部署    | 標準化、可攜 | 取決於系統環境 |
| 資源使用量 | 較高     | 較低      |
| 版本管理  | 易於切換   | 需要手動管理  |

## 後續步驟

- [容器管理](./container/container) - 瞭解如何管理容器
- [Compose 管理](./container/compose) - 瞭解如何使用 Docker Compose
- [映像檔管理](./container/image) - 瞭解如何管理映像檔
- [網路管理](./container/network) - 瞭解如何管理網路
- [儲存卷管理](./container/volume) - 瞭解如何管理資料卷
