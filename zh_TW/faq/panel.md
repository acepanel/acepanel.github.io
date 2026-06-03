# 面板常見問題

## 面板打不開

SSH 登入伺服器，檢查面板狀態：

```shell
acepanel status
```

若服務已停止，請啟動它：

```shell
acepanel start
```

若無法啟動，請嘗試修復：

```shell
acepanel fix && acepanel update
```

若服務正在執行但仍無法存取，請檢查防火牆：

```shell
# 檢查連接埠是否正在監聽
curl -I http://127.0.0.1:panel-port/

# 放行連接埠（firewalld）
firewall-cmd --add-port=panel-port/tcp --permanent
firewall-cmd --reload
```

若為雲端伺服器，還需檢查安全性群組設定。

檢視面板記錄檔以排查問題：

```shell
journalctl -u acepanel -n 100
```

## 忘記密碼／使用者名稱／位址

```shell
acepanel info
```

此命令會重新產生**全新的使用者名稱與全新的密碼**，接著印出新的使用者名稱、新的密碼、監聽的連接埠、安全入口，以及本機／公開的 IPv4 與 IPv6 存取位址。 請使用印出的其中一個位址重新登入。

:::warning 注意
由於 `acepanel info` 每次執行都會重設使用者名稱與密碼，執行後先前的登入憑證即會失效。
:::

如需命令列工具命令的完整清單（服務管理、使用者管理、安全性設定、維護等），請參閱 [命令列工具](../quickstart/cli)。

## 變更面板連接埠

```shell
acepanel port 12345
```

變更後，需在伺服器安全性群組／防火牆中放行新的連接埠。

## 停用安全入口

若忘記安全入口路徑：

```shell
acepanel entrance off
```

## 停用網域／IP／UA 綁定

若綁定後無法存取面板：

```shell
acepanel bind-domain off
acepanel bind-ip off
acepanel bind-ua off
```

## 停用兩階段驗證

```shell
acepanel user 2fa admin
```

## 憑證錯誤

面板預設使用自簽憑證，瀏覽器會顯示不安全的警告。 點選「繼續前往」即可。

若要申請正式憑證：

```shell
acepanel https generate
```

需確保可直接存取伺服器 IP 的 80 連接埠。

## acepanel 命令權限遭拒

必須以 root 使用者執行，或使用 sudo：

```shell
sudo acepanel status
```
