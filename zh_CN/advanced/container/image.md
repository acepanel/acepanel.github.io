# 镜像

镜像是容器的模板，包含了运行应用所需的所有文件和配置。 通过镜像管理页面，你可以拉取、查看和删除本地镜像。

## 镜像列表

进入 **容器** > **镜像** 标签页查看本地镜像列表。

![镜像列表](/images/container/container-image.png)

列表显示以下信息：

- **ID**：镜像 ID
- **容器数量**：使用该镜像的容器数量
- **镜像**：镜像名称和标签
- **大小**：镜像占用的磁盘空间
- **创建时间**：镜像创建时间
- **操作**：删除等

## 拉取镜像

1. 点击 **拉取镜像** 按钮
2. 输入镜像名称，如 `nginx:latest`、`mysql:8.4`
3. 点击确认开始拉取

镜像名称格式：`[仓库地址/]镜像名[:标签]`

- `nginx` - 拉取官方 nginx 镜像的 latest 标签
- `nginx:1.28` - 拉取指定版本
- `mysql:8.4` - 拉取 MySQL 8.4 版本
- `registry.cn-hangzhou.aliyuncs.com/xxx/yyy:latest` - 从阿里云镜像仓库拉取

:::tip 提示
国内服务器拉取 Docker Hub 镜像可能较慢， 建议配置镜像加速器或使用国内镜像源。
:::

## 删除镜像

选中镜像后点击 **删除** 按钮删除镜像。

:::warning 注意
如果镜像正在被容器使用，需要先删除相关容器才能删除镜像。
:::

## 清理镜像

点击 **清理镜像** 可以删除所有未被使用的镜像，释放磁盘空间。

清理操作会删除：

- 悬空镜像（dangling images）
- 未被任何容器使用的镜像

## 镜像来源

### Docker Hub

Docker 官方镜像仓库，包含大量官方和社区镜像。

常用官方镜像：

- `nginx` - Web 服务器
- `mysql` / `mariadb` - 数据库
- `redis` - 缓存
- `postgres` - PostgreSQL 数据库
- `node` - Node.js 运行环境
- `python` - Python 运行环境

### 国内镜像源

- 阿里云：`registry.cn-hangzhou.aliyuncs.com`
- 腾讯云：`ccr.ccs.tencentyun.com`
- 华为云：`swr.cn-north-4.myhuaweicloud.com`

### 私有仓库

如果你有私有镜像仓库，可以直接使用完整的镜像地址拉取。
