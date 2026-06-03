# 容器常見問題

## 映像檔拉取失敗

中國大陸的伺服器無法連線 Docker Hub，需要設定映像檔加速。

### Docker

**應用程式** -> **Docker** -> **管理** -> **基本設定** -> **映像檔加速**，加入映像檔位址（內建了預設值，例如 `https://docker.1ms.run`），然後點選**儲存**。

你也可以在**設定檔**分頁下直接編輯設定檔（`/etc/docker/daemon.json`）：

```json
{
  "registry-mirrors": [
    "https://docker.1ms.run"
  ]
}
```

### Podman

**應用程式** -> **Podman** -> **管理** -> **登錄檔設定**，在結尾處加入：

```toml
[[registry]]
location = "docker.io"
[[registry.mirror]]
location = "docker.1ms.run"
```

映像檔加速位址可以使用 [1ms Mirror](https://1ms.run/) 或其他服務。

## Compose 啟動失敗

1. 點選**啟動**後，在彈出的終端機中觀察即時輸出，或在**容器** -> **容器**中檢視它建立的容器日誌
2. 常見原因：
   - 連接埠被占用：修改對應的連接埠
   - 映像檔拉取失敗：設定映像檔加速
   - 設定錯誤：檢查 docker-compose.yml 語法

## 無法存取容器

1. 檢查容器是否正在執行：在**容器** -> **容器**清單中檢視狀態
2. 檢查連接埠對應是否正確
3. 檢查防火牆是否已放行對應的主機連接埠

## 容器無法存取外部網路

檢查 Docker 網路設定：

```shell
docker network ls
docker network inspect bridge
```

透過面板建立容器時，網路選擇器預設使用內建的 `acepanel-network`（你也可以選擇其他網路）。 Compose 編排不會被強制接入此網路——除非 compose 檔案另有指定，否則 Docker Compose 會為每個專案建立獨立的網路。 檢視網路詳細資訊：

```shell
docker network inspect acepanel-network
```

`acepanel-network` 是面板本身使用的網路，因此受刪除保護：在**容器** -> **網路**中其**刪除**按鈕會被停用，批次刪除時也會被略過，而且後端會拒絕任何刪除它的請求，以免破壞容器編排。

## 資料持久化

刪除容器後資料將會遺失。 使用磁碟區掛載來持久化資料：

在 compose 設定中加入磁碟區：

```yaml
volumes:
  - ./data:/app/data
```

## 檢視容器日誌

```shell
docker logs container-name-or-id
docker logs -f container-name-or-id  # 即時檢視
```

或在面板**容器** -> **容器**清單中點選**日誌**。
