# 容器

容器模組提供了完整的 Docker 容器管理功能，包括容器、編排、映像、網路和卷的管理。

## 前置要求

使用容器功能前，需要先安裝 Docker 或 Podman：

1. 進入 **應用** > **原生應用**
2. 找到 Docker 或 Podman，點擊 **安裝**

## 功能概覽

容器模組分為五個部分：

| 功能                          | 說明                        |
| --------------------------- | ------------------------- |
| [容器](./container/container) | 管理運行中的容器實例                |
| [編排](./container/compose)   | 使用 Docker Compose 管理多容器應用 |
| [映像](./container/image)     | 管理本地映像                    |
| [網路](./container/network)   | 管理 Docker 網路              |
| [卷](./container/volume)     | 管理資料卷                     |

![容器列表](/images/container/container-list.png)

## 快速開始

### 創建容器

1. 進入 **容器** 頁面
2. 點擊 **創建容器**
3. 填寫映像名稱（如 `nginx:latest`）
4. 配置連接埠映射、卷掛載等
5. 點擊 **創建**

### 使用容器模板

如果你想快速部署常用應用，推薦使用 [容器模板](./app/template)，無需手動配置即可一鍵部署。

## 容器 vs 原生應用

| 特性   | 容器      | 原生應用   |
| ---- | ------- | ------ |
| 隔離性  | 完全隔離    | 共享系統環境 |
| 性能   | 略有損耗    | 原生性能   |
| 部署   | 標準化、可移植 | 依賴系統環境 |
| 資源佔用 | 較高      | 較低     |
| 版本管理 | 方便切換    | 需要手動管理 |

## 下一步

- [容器管理](./container/container) - 了解如何管理容器
- [編排管理](./container/compose) - 了解如何使用 Docker Compose
- [映像管理](./container/image) - 了解如何管理映像
- [網路管理](./container/network) - 了解如何管理網路
- [卷管理](./container/volume) - 了解如何管理資料卷
