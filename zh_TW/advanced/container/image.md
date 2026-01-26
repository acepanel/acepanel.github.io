# 映像

映像是容器的模板，包含了運行應用所需的所有檔案和配置。 透過映像管理頁面，你可以拉取、查看和刪除本地映像。

## 映像列表

進入 **容器** > **映像** 標籤頁查看本地映像列表。

![映像列表](/images/container/container-image.png)

列表顯示以下資訊：

- **ID**：映像 ID
- **容器數量**：使用該映像的容器數量
- **映像**：映像名稱和標籤
- **大小**：映像佔用的磁碟空間
- **建立時間**：映像建立時間
- **操作**：刪除等

## 拉取映像

1. 點擊 **拉取映像** 按鈕
2. 輸入映像名稱，如 `nginx:latest`、`mysql:8.4`
3. 點擊確認開始拉取

映像名稱格式：`[倉庫地址/]映像名[:標籤]`

- `nginx` - 拉取官方 nginx 映像的 latest 標籤
- `nginx:1.28` - 拉取指定版本
- `mysql:8.4` - 拉取 MySQL 8.4 版本
- `registry.cn-hangzhou.aliyuncs.com/xxx/yyy:latest` - 從阿里雲映像倉庫拉取

:::tip 提示
國內伺服器拉取 Docker Hub 映像可能較慢， 建議配置映像加速器或使用國內映像源。
:::

## 刪除映像

選中映像後點擊 **刪除** 按鈕刪除映像。

:::warning 注意
如果映像正在被容器使用，需要先刪除相關容器才能刪除映像。
:::

## 清理映像

點擊 **清理映像** 可以刪除所有未被使用的映像，釋放磁碟空間。

清理操作會刪除：

- 懸空映像（dangling images）
- 未被任何容器使用的映像

## 映像來源

### Docker Hub

Docker 官方映像倉庫，包含大量官方和社群映像。

常用官方映像：

- `nginx` - Web 伺服器
- `mysql` / `mariadb` - 資料庫
- `redis` - 快取
- `postgres` - PostgreSQL 資料庫
- `node` - Node.js 執行環境
- `python` - Python 執行環境

### 國內映像源

- 阿里雲：`registry.cn-hangzhou.aliyuncs.com`
- 騰訊雲：`ccr.ccs.tencentyun.com`
- 華為雲：`swr.cn-north-4.myhuaweicloud.com`

### 私有倉庫

如果你有私有映像倉庫，可以直接使用完整的映像地址拉取。
