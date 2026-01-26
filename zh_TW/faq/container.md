# 容器常見問題

## 鏡像拉取失敗

國內伺服器無法連接 Docker Hub，需配置鏡像加速。

### Docker

「應用」->「Docker」->「管理」->「配置」，添加：

```json
{
  "registry-mirrors": [
    "https://docker.1ms.run"
  ]
}
```

### Podman

「應用」->「Podman」->「管理」->「Registry 配置」，末尾添加：

```toml
[[registry]]
location = "docker.io"
[[registry.mirror]]
location = "docker.1ms.run"
```

鏡像加速地址可使用 [毫秒鏡像](https://1ms.run/) 或其他服務。

## 編排啟動失敗

1. 點擊「日誌」查看錯誤訊息
2. 常見原因：
   - 端口被佔用：修改映射端口
   - 鏡像拉取失敗：配置鏡像加速
   - 配置錯誤：檢查 docker-compose.yml 語法

## 容器無法訪問

1. 檢查容器是否運行：「容器」->「容器」列表查看狀態
2. 檢查端口映射是否正確
3. 檢查防火牆是否放行映射的主機端口

## 容器內無法訪問外網

檢查 Docker 網路配置：

```shell
docker network ls
docker network inspect bridge
```

## 資料持久化

容器刪除後資料會丟失。 使用卷掛載持久化資料：

在編排配置中添加 volumes：

```yaml
volumes:
  - ./data:/app/data
```

## 查看容器日誌

```shell
docker logs 容器名或ID
docker logs -f 容器名或ID  # 實時查看
```

或在面板「容器」->「容器」列表點擊「日誌」。
