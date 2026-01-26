# 容器常见问题

## 镜像拉取失败

国内服务器无法连接 Docker Hub，需配置镜像加速。

### Docker

「应用」->「Docker」->「管理」->「配置」，添加：

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

1. 点击「日志」查看错误信息
2. 常见原因：
   - 端口被占用：修改映射端口
   - 镜像拉取失败：配置镜像加速
   - 配置错误：检查 docker-compose.yml 语法

## 容器无法访问

1. 检查容器是否运行：「容器」->「容器」列表查看状态
2. 检查端口映射是否正确
3. 检查防火墙是否放行映射的主机端口

## 容器内无法访问外网

检查 Docker 网络配置：

```shell
docker network ls
docker network inspect bridge
```

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

或在面板「容器」->「容器」列表点击「日志」。
