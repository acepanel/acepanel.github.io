# 容器

容器模块提供了完整的 Docker 容器管理功能，包括容器、编排、镜像、网络和卷的管理。

## 前置要求

使用容器功能前，需要先安装 Docker：

1. 进入 **应用** > **原生应用**
2. 找到 Docker，点击 **安装**

## 功能概览

容器模块分为五个部分：

| 功能 | 说明 |
|------|------|
| [容器](./container/container) | 管理运行中的容器实例 |
| [编排](./container/compose) | 使用 Docker Compose 管理多容器应用 |
| [镜像](./container/image) | 管理本地镜像 |
| [网络](./container/network) | 管理 Docker 网络 |
| [卷](./container/volume) | 管理数据卷 |

![容器列表](/images/container/container-list.png)

## 快速开始

### 创建容器

1. 进入 **容器** 页面
2. 点击 **创建容器**
3. 填写镜像名称（如 `nginx:latest`）
4. 配置端口映射、卷挂载等
5. 点击 **创建**

### 使用容器模板

如果你想快速部署常用应用，推荐使用 [容器模板](./app/template)，无需手动配置即可一键部署。

## 容器 vs 原生应用

| 特性 | 容器 | 原生应用 |
|------|------|----------|
| 隔离性 | 完全隔离 | 共享系统环境 |
| 性能 | 略有损耗 | 原生性能 |
| 部署 | 标准化、可移植 | 依赖系统环境 |
| 资源占用 | 较高 | 较低 |
| 版本管理 | 方便切换 | 需要手动管理 |

## 下一步

- [容器管理](./container/container) - 了解如何管理容器
- [编排管理](./container/compose) - 了解如何使用 Docker Compose
- [镜像管理](./container/image) - 了解如何管理镜像
- [网络管理](./container/network) - 了解如何管理网络
- [卷管理](./container/volume) - 了解如何管理数据卷
