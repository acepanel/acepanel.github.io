# 常見問題

以下是關於 AcePanel 的一些常見問題和解答。 如果您有任何其他問題，請隨時在 [AcePanel 社區](https://tom.moe/c/technical/acepanel) 提問。 If you find any bugs, please submit a [GitHub Issue](https://github.com/acepanel/panel/issues).

## 配置 QUIC（HTTP3）

AcePanel 目前支持自動 QUIC 配置，但出於兼容性原因，默認不添加 `Alt-Svc` 標頭。 瀏覽器在未檢測到 `Alt-Svc` 標頭時不會嘗試使用 QUIC 連接。

如果您不使用 CDN，可以將下述配置添加到網站的重寫規則中，以告訴瀏覽器該網站支持並使用 QUIC 連接。

```nginx
add_header Alt-Svc 'h3=":$server_port"; ma=2592000';
```

如果您使用 CDN 或有代理伺服器在前端，則 QUIC 需要在 CDN / 前端啟用。

如果配置後仍不生效，請檢查您的瀏覽器版本和 UDP 443 端口的可用性。

- 根據 Nginx 的 git 提交記錄，1.25 版本下所有 QUIC 草案版本已經移除，因此 `Alt-Svc` 無需添加草案版本號。

## 配置 TLSv1.1 TLSv1

當前面板 OpenResty 使用 OpenSSL 3.5 版本編譯，默認禁用已棄用的 TLSv1.1 TLSv1 協議。

當然，如果您的業務必須使用這兩個協議，您可以使用下述 SSL 配置啟用。

```nginx
ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:@SECLEVEL=0;
ssl_prefer_server_ciphers on;
```

## 配置反向代理

AcePanel v2.4.10+ 自帶反向代理配置生成器，您可以通過站點重寫配置頁面的右上角訪問。

注意：如果設置反向代理後出現 CSS/JS 等靜態資源無法正常加載的問題，請移除站點主配置文件中的 **不記錄靜態文件** 部分。

## 配置進程監控

1. 安裝 Supervisor 管理器並打開。
2. 在 Supervisor 管理器中創建需要被監控的進程（不建議使用 root 作為運行用戶）。
3. 常見問題：[https://tom.moe/t/supervisor/3112](https://tom.moe/t/supervisor/3112)

## 配置 IPv6

如果您想要啟用 IPv6 支持，您需要將 `[::]:80` 和 `[::]:443` 添加到網站的監聽地址配置。

## 配置容器鏡像加速

由於一些原因，國內用戶可能無法連接到 Docker Hub 以拉取容器鏡像，因此需要配置鏡像加速。

### 對於 Podman

在面板中打開 Podman 設置頁面，並導航到註冊表配置選項卡。

滾動到配置文件底部，添加如下配置並保存：

```
[[registry]]
location = "docker.io"
[[registry.mirror]]
location = "docker.1ms.run"
```

其中 docker.1ms.run 為配置的鏡像加速地址。 您可以參考其他教程進行設置和使用。

### 對於 Docker

在面板中打開 Docker 設置頁面，並導航到配置選項卡。

添加如下配置並保存：

```json
{
  "registry-mirrors": ["https://docker.1ms.run"]
}
```

其中 https://docker.1ms.run 為配置的鏡像加速地址。 您可以參考其他教程進行設置和使用。
