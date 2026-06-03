# 網站常見問題

## 網站無法存取

1. 檢查網域是否解析到伺服器 IP
2. 檢查防火牆是否已放行 80/443 連接埠
3. 檢查 Nginx 是否正在執行：**應用程式** -> **Nginx** -> **管理**
4. 檢視 Nginx 錯誤記錄

## 403 Forbidden

通常是權限問題：

```shell
# 修復網站目錄權限
chown -R www:www /opt/ace/sites/網站名稱/public
chmod -R 755 /opt/ace/sites/網站名稱/public
```

## 502 Bad Gateway

PHP 網站出現 502 時，請檢查 PHP 是否正在執行：

1. **應用程式** -> **執行環境** -> **PHP** -> **管理**
2. 確認 PHP 版本與網站設定相符
3. 檢視 PHP 錯誤記錄

反向代理網站出現 502 時，請檢查後端服務是否正在執行。

## 偽靜態規則未生效

1. 確認已在 **偽靜態** 標籤頁選擇正確的範本或填入規則
2. 點選 **儲存** 後 Nginx 會自動重新載入
3. 清除瀏覽器快取後再測試

## 設定 QUIC (HTTP/3)

在網站編輯器中，開啟 **網域與監聽** 標籤頁，並在 HTTPS 監聽位址上啟用 **QUIC(HTTP3)** 開關。 啟用 QUIC 後，面板會自動為你加入 `Alt-Svc` 宣告標頭，因此無需額外設定：

```nginx
add_header Alt-Svc 'h3=\":$server_port\"; ma=2592000';
```

請確保伺服器安全群組/防火牆已放行 UDP 443 連接埠。

## 啟用 TLSv1/TLSv1.1

在網站編輯器中，開啟 **HTTPS** 標籤頁，並在 **TLS 版本** 選擇器中加入 **TLS 1.0** 和/或 **TLS 1.1**（預設僅啟用 TLS 1.2 和 TLS 1.3）。

OpenSSL 3.x 還會降低安全等級，因此這些舊通訊協定所使用的加密套件會被拒絕。 如果連線仍然失敗，請透過 **自訂設定** 標籤頁附加一個以 `@SECLEVEL=0` 結尾的加密套件：

```nginx
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:AES128-SHA:AES256-SHA:DES-CBC3-SHA:@SECLEVEL=0;
```

## 啟用 IPv6

在 **網域與監聽** 中加入監聽位址：`[::]:80` 和 `[::]:443`。

## CDN 回源與 HTTPS

| CDN 回源通訊協定 | 網站 HTTPS 設定          |
| ---------- | -------------------- |
| HTTP       | 無需開啟                 |
| HTTPS      | 必須開啟                 |
| 跟隨通訊協定     | 必須開啟，且不可開啟 HTTP 重新導向 |

## 上傳檔案大小限制

預設限制為 100MB。 修改 PHP 設定：

1. **應用程式** -> **執行環境** -> **PHP** -> **管理** -> **主設定**
2. 修改 `upload_max_filesize` 和 `post_max_size`
3. 儲存後重新啟動 PHP

## SSL 憑證申請失敗

1. 確認網域已解析到伺服器
2. 確認 80 連接埠可存取（Let's Encrypt 驗證所需）
3. 檢查是否超過 Let's Encrypt 速率限制
4. 嘗試使用 DNS 驗證方式
5. 改用其他憑證供應商
