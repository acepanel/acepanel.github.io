# 面板常見問題

## 面板打不開

SSH 登入伺服器，檢查面板狀態：

```shell
acepanel status
```

如果服務已停止，啟動它：

```shell
acepanel start
```

如果無法啟動，嘗試修復：

```shell
acepanel fix && acepanel update
```

服務正常但仍無法存取，檢查防火牆：

```shell
# 檢查端口是否監聽
curl -I http://127.0.0.1:面板端口/

# 放行端口（firewalld）
firewall-cmd --add-port=面板端口/tcp --permanent
firewall-cmd --reload
```

雲端伺服器還需檢查安全組設定。

查看面板日誌排查問題：

```shell
journalctl -u acepanel -n 100
```

## 忘記密碼/使用者名稱/地址

```shell
acepanel info
```

輸出面板地址、使用者名稱，並產生新密碼。

## 修改面板端口

```shell
acepanel port 12345
```

修改後需在伺服器安全組/防火牆放行新端口。

## 關閉安全入口

如果忘記安全入口路徑：

```shell
acepanel entrance off
```

## 關閉網域/IP 綁定

綁定後無法存取面板：

```shell
acepanel bind-domain off
acepanel bind-ip off
```

## 關閉兩步驗證

```shell
acepanel user 2fa admin
```

## 憑證錯誤

面板預設使用自簽名憑證，瀏覽器會提示不安全， 點擊「繼續存取」即可。

申請正式憑證：

```shell
acepanel https generate
```

需要確保伺服器 IP 80 端口可直接存取。

## acepanel 命令無權限

必須以 root 使用者執行，或使用 sudo：

```shell
sudo acepanel status
```
