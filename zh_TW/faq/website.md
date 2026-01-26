# 網站常見問題

## 網站無法訪問

1. 檢查域名是否解析到伺服器 IP
2. 檢查防火牆是否放行 80/443 連接埠
3. 檢查 Nginx 是否運行：「應用」->「Nginx」->「管理」
4. 查看 Nginx 錯誤日誌

## 403 Forbidden

通常是權限問題：

```shell
# 修復網站目錄權限
chown -R www:www /opt/ace/sites/網站名/public
chmod -R 755 /opt/ace/sites/網站名/public
```

## 502 Bad Gateway

PHP 網站出現 502，檢查 PHP 是否運行：

1. 「應用」->「運行環境」->「PHP」->「管理」
2. 確認 PHP 版本與網站配置一致
3. 查看 PHP 錯誤日誌

反向代理網站出現 502，檢查後端服務是否運行。

## 偽靜態不生效

1. 確認在「偽靜態」標籤頁選擇了正確的預設或填寫了規則
2. 點擊「保存」後 Nginx 會自動重載
3. 清除瀏覽器快取後測試

## 配置 QUIC (HTTP/3)

面板支援 QUIC，但預設不添加 `Alt-Svc` 頭。 在自訂配置中添加：

```nginx
add_header Alt-Svc 'h3=":$server_port"; ma=2592000';
```

確保伺服器安全組/防火牆放行 UDP 443 連接埠。

## 啟用 TLSv1/TLSv1.1

OpenSSL 3.x 預設禁用舊協議。 如必須使用，在「HTTPS」設定中修改密碼套件：

```nginx
ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:AES128-SHA:AES256-SHA:DES-CBC3-SHA:@SECLEVEL=0;
```

## 啟用 IPv6

在「域名和監聽」添加監聽地址：`[::]:80` 和 `[::]:443`。

## CDN 回源與 HTTPS

| CDN 回源協議 | 網站 HTTPS 配置         |
| -------- | ------------------- |
| HTTP     | 無需開啟                |
| HTTPS    | 必須開啟                |
| 協議跟隨     | 必須開啟，且不能開啟 HTTP 重定向 |

## 上傳檔案大小限制

預設限制 100MB。 修改 PHP 配置：

1. 「應用」->「運行環境」->「PHP」->「管理」->「主配置」
2. 修改 `upload_max_filesize` 和 `post_max_size`
3. 保存後重啟 PHP

## SSL 憑證申請失敗

1. 確認域名已解析到伺服器
2. 確認 80 連接埠可訪問（Let's Encrypt 驗證需要）
3. 檢查是否超過 Let's Encrypt 速率限制
4. 嘗試使用 DNS 驗證方式
5. 更換其他憑證提供商
