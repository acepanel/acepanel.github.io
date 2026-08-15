# 反向代理

![Reverse proxy website settings](/images/website/proxy.png)

反向代理網站用於將外部請求轉發至後端服務，常用於部署 Node.js、Go、Java、Python 等應用程式。

## 運作原理

```
使用者請求 -> Nginx（反向代理）-> 後端應用程式（例如 localhost:3000）
```

Nginx 接收使用者的 HTTP/HTTPS 請求，並將其轉發至指定的後端位址。

## 建立反向代理網站

1. 前往 **網站** 頁面
2. 確認已選取 **反向代理** 分頁
3. 點選 **建立網站**

### 設定項目

- **名稱**：網站識別碼，例如 `myapp`
- **網域**：綁定的網域，例如 `app.example.com`
- **連接埠**：監聽連接埠，預設為 80
- **代理目標**：後端服務位址，例如 `http://127.0.0.1:3000`
- **備註**：選填備註

### 代理目標格式

```
http://127.0.0.1:3000      # 本機服務
http://localhost:8080       # 本機服務
http://172.18.0.2:80        # Docker 容器
https://backend.internal    # 內部 HTTPS 服務
```

## 編輯反向代理網站

點選網站清單中的 **編輯** 按鈕進入編輯頁面。

You can change this website to PHP or pure static from its basic settings. Domains, listeners, files, and other shared fields are kept, while proxy upstreams and proxy rules are deleted and the selected type's configuration is generated. Back up and record the proxy configuration before converting.

### 網域與監聽

設定網站的網域與監聽連接埠，支援多個網域與連接埠。

- **網域**：可新增多個網域
- **監聽位址**：可設定多個連接埠，支援 HTTPS 與 QUIC(HTTP3)

### 上游設定

上游用於定義後端伺服器位址，支援多個後端以進行負載平衡。

- **上游名稱**：上游的識別名稱
- **負載平衡演算法**：對於 Nginx，支援輪詢（預設）、`least_conn`、`ip_hash`、`hash` 與 `random`；對於 Apache，支援輪詢（預設）、最少忙碌與依流量分配
- **保持連線數**：與後端維持的持久連線數量
- **DNS 解析器**：自訂 DNS 解析器與解析逾時時間（僅 Nginx）

點選 **新增伺服器** 按鈕以新增後端伺服器：

- **伺服器位址**：後端伺服器位址，例如 `127.0.0.1:8080`
- **選項**：選填參數，例如 `weight=5`（權重）、`backup`（備援伺服器）等。

### 代理設定

設定代理行為與請求標頭轉發。 每條代理規則會將一個 location 對應到一個後端。

- **Match Type**: Location match type, such as Exact Match (`=`), Priority Prefix Match (`^~`), Prefix Match, Case-sensitive Regex (`~`), and Case-insensitive Regex (`~*`)
- **Match Expression**: URL expression to match
- **Proxy Pass**: Enter upstream name or directly enter backend address, e.g., `http://127.0.0.1:8080` or `http://upstream_name`
- **Proxy Host**: The `Host` header sent to the backend (defaults to `$proxy_host`, or is automatically extracted from Proxy Pass)
- **Enable Cache**: Whether to enable proxy cache
- **Enable Buffering**: Whether to enable buffering, AI applications are recommended to disable otherwise it may affect streaming output
- **Proxy SNI**: SNI to send to the backend (only valid for HTTPS backends)
- **DNS Resolver**: Custom DNS resolver and resolver timeout (Nginx only)
- **Custom Request Headers**: Add or modify request headers passed to the backend
- **Response Content Replacement**: Can replace strings in response content

#### Advanced Settings

For Nginx, each proxy rule also exposes an **Advanced Settings** panel:

- **HTTP Version**: Backend protocol version (HTTP/1.0, HTTP/1.1, HTTP/2)
- **Max Body Size**: Maximum request body size for this rule
- **Timeout Settings**: Connect / read / send timeouts
- **Retry Settings**: Retry conditions, max tries, and retry timeout for failed upstream requests
- **SSL Backend Verify**: Verify the backend certificate (only shown for HTTPS backends)
- **Response Headers**: Hide or add response headers
- **IP Access Control**: Allow or deny visitor IPs/CIDRs for this rule

### Redirects

The **Redirects** tab lets you add redirect rules that are applied before the request reaches the proxy. Each rule is a card and rules can be reordered by dragging.

- **Redirect Type**:
  - **URL Redirect** (`url`): Redirect a source path to a target path
  - **Host Redirect** (`host`): Redirect a source host to a target URL (e.g., force `www` to apex)
  - **404 Redirect** (`404`): Redirect requests that would return 404 to a target URL
- **Status Code**: `301` (Moved Permanently), `302` (Found), `307` (Temporary Redirect), or `308` (Permanent Redirect, default)
- **Source**: The source path (URL type) or source host (Host type); not used for the 404 type
- **Target**: The target path (URL type) or target URL (Host/404 type)
- **Keep URI**: When enabled, the original request path and query parameters are kept and appended to the target

### HTTPS

The **HTTPS** tab manages TLS for the website. When a certificate is already bound, a summary card shows the certificate validity period, issuer, and covered domains.

- **Main Switch**: Enable or disable HTTPS for this website. Enabling it automatically adds a `443` listener (and `quic` for Nginx); disabling it removes the `443` listener and clears the `ssl`/`quic` flags
- **Use Existing Certificate**: Select a certificate already managed in Certificate Management to fill in the certificate and private key
- **HSTS**: Enable HTTP Strict Transport Security
- **HTTP Redirect**: Force plain HTTP requests to redirect to HTTPS
- **OCSP Stapling**: Enable OCSP stapling
- **TLS Version**: Choose the allowed protocols among TLS 1.0, TLS 1.1, TLS 1.2, and TLS 1.3
- **Certificate** / **Private Key**: Paste the PEM certificate and KEY private key contents directly

#### One-click Certificate Issuance

When the website has at least one domain, the **One-click Certificate Issuance** button in the footer requests a free certificate for the bound domains. If any domain is a wildcard (e.g., `*.example.com`), a dialog prompts you to select a DNS provider (configured in Certificate Management) so the certificate can be issued via DNS verification.

### Advanced Settings (Site-wide)

The **Advanced Settings** tab groups several site-wide options into collapsible panels.

#### Access Statistics

Available for Nginx only. Toggle **Enable Statistics** to collect access statistics for this website (viewable on the website statistics page).

#### Log Settings

- **Access Log**: Choose **Disabled** (`off`), the **Default Path**, or enter a custom path
- **Error Log**: Choose **Disabled** (`off`), the **Default Path**, or enter a custom path

When a log path is set (and not disabled), the editor also shows **Access Log** / **Error Log** tabs for real-time viewing, and the footer **Clear Logs** button truncates the currently viewed log file.

#### Rate Limiting

Toggle **Enable Rate Limiting** to turn the feature on; the limit fields below appear only when it is enabled.

- **Concurrent Limit**: Maximum concurrent connections for the whole site (`0` = unlimited)
- **Per IP Limit**: Maximum concurrent connections per visitor IP (`0` = unlimited)
- **Rate Limit**: Per-request transfer rate limit in KB (`0` = unlimited)

#### Real IP

Identifies the real visitor IP when AcePanel itself sits behind a CDN or Frp (this is different from forwarding headers to the backend; see [Forwarding Real IP](#forwarding-real-ip)).

- **Enable**: Turn the feature on or off
- **IP Sources**: Trusted upstream IPs or CIDRs, one per line (e.g., `127.0.0.1`, `10.0.0.0/8`). If using Frp, fill in the Frp IP; if using a CDN, fill in the CDN IP ranges. If unsure you may use `0.0.0.0/0` / `::/0` (insecure)
- **IP Header**: The header carrying the real IP, such as `X-Real-IP`, `X-Forwarded-For`, `CF-Connecting-IP`, `True-Client-IP`, `Ali-Cdn-Real-Ip`, or `EO-Connecting-IP` (custom values allowed)
- **Recursive**: Recursively search for the real IP within the `X-Forwarded-For` header

#### Basic Authentication

Add username/password pairs under **User Credentials** to require HTTP Basic Authentication before visitors can access the website. Leaving the list empty disables authentication.

## Use Cases

### Node.js Application

```bash
# Start Node.js application
node app.js  # Listening on port 3000
```

Proxy Target: `http://127.0.0.1:3000`

### Docker Container

If the backend is a Docker container, you can use the container's IP address or container name (within the same network).

Proxy Target: `http://container-name:port` or `http://container-IP:port`

### Multiple Backends (Load Balancing)

Add multiple backend addresses in the upstream configuration to achieve load balancing.

Proxy Target: `http://upstream-name`

## Common Configurations

### WebSocket Support

Reverse proxy supports WebSocket by default, no additional configuration needed.

### Forwarding Real IP

AcePanel automatically configures the following request headers to pass the user's real IP to the backend:

- `X-Real-IP`
- `X-Forwarded-For`
- `X-Forwarded-Proto`

> [!NOTE]
> This is about forwarding the visitor IP **to your backend service**, and is separate from the **Real IP** feature in [Advanced Settings (Site-wide)](#advanced-settings-site-wide). That feature is about AcePanel itself recovering the **real visitor IP** when it sits behind a CDN or Frp (i.e., reading a trusted upstream header instead of the proxy's own IP). Use Real IP when AcePanel is behind another proxy; use header forwarding when your backend needs the client IP.

### Custom Configuration

You can add custom configuration in the **Custom Configs** tab of the website editor. Each config has a name and a scope (**This Website** or **Global**), letting you inject extra directives without editing files manually:

```nginx
proxy_connect_timeout 60s;
proxy_read_timeout 60s;
proxy_send_timeout 60s;
proxy_buffer_size 64k;
proxy_buffers 4 64k;
```

## Notes

1. Ensure the backend service is started and listening on the specified port
2. If the backend is a Docker container, ensure the port is correctly mapped or use Docker network
3. When the backend service crashes, Nginx will return a 502 error
