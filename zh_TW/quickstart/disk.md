# 掛載分區

如果您的伺服器有未掛載的數據磁碟，您可以在安裝之前以 `root` 用戶登錄並運行以下命令以自動掛載它們。 面板安裝後不支持跨目錄遷移。

```shell
curl -fsLm 10 -o auto_mount.sh https://dl.cdn.haozi.net/panel/auto_mount.sh && bash auto_mount.sh
```

您也可以通過工單聯繫伺服器提供商以請求掛載分區的幫助，或者在安裝面板之前自行掛載分區。
