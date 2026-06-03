# 容器常见问题

## 镜像拉取失败

国内服务器无法连接 Docker Hub，需配置镜像加速。

### Docker

**应用** -> **Docker** -> **管理** -> **基础设置** -> **镜像加速**，添加镜像地址（内置了预设，例如 `https://docker.1ms.run`），然后点击**保存**。

你也可以在**配置文件**标签页下直接编辑配置文件（`/etc/docker/daemon.json`）：

```json
{
  "registry-mirrors": [
    "https://docker.1ms.run"
  ]
}
```

### Podman

「应用」->「Podman」->「管理」->「Registry 配置」，末尾添加：

```toml
[[registry]]
location = "docker.io"
[[registry.mirror]]
location = "docker.1ms.run"
```

镜像加速地址可使用 [毫秒镜像](https://1ms.run/) 或其他服务。

## 编排启动失败

1. 点击**启动**后，在弹出的终端中观察实时输出，或在**容器** -> **容器**中查看它创建的容器日志
2. 常见原因：
   - 端口被占用：修改映射端口
   - 镜像拉取失败：配置镜像加速
   - 配置错误：检查 docker-compose.yml 语法

## 容器无法访问

1. 检查容器是否正在运行：在**容器** -> **容器**列表中查看状态
2. 检查端口映射是否正确
3. 检查防火墙是否放行映射的主机端口

## 容器内无法访问外网

检查 Docker 网络配置：

```shell
docker network ls
docker network inspect bridge
```

通过面板创建容器时，网络选择器默认使用内置的 `acepanel-network`（你也可以选择其他网络）。 Compose 编排不会被强制接入此网络——除非 compose 文件另有指定，否则 Docker Compose 会为每个项目创建独立的网络。 查看网络详情：

```shell
docker network inspect acepanel-network
```

`acepanel-network` 是面板自身使用的网络，因此受删除保护：在**容器** -> **网络**中其**删除**按钮被禁用，批量删除时也会被跳过，并且后端会拒绝任何删除它的请求，以免破坏容器编排。

## 数据持久化

容器删除后数据会丢失。 使用卷挂载持久化数据：

在编排配置中添加 volumes：

```yaml
volumes:
  - ./data:/app/data
```

## 查看容器日志

```shell
docker logs 容器名或ID
docker logs -f 容器名或ID  # 实时查看
```

或在面板**容器** -> **容器**列表中点击**日志**。
