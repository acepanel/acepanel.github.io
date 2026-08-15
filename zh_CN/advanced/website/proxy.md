# 反向代理

![Reverse proxy website settings](/images/website/proxy.png)

反向代理网站用于将外部请求转发到后端服务，常用于部署 Node.js、Go、Java、Python 等应用。

## 工作原理

```
用户请求 -> Nginx (反向代理) -> 后端应用 (如 localhost:3000)
```

Nginx 接收用户的 HTTP/HTTPS 请求，然后将请求转发到指定的后端地址。

## 创建反向代理网站

1. 进入 **网站** 页面
2. 确保选中 **反向代理** 标签
3. 点击 **创建网站**

### 配置项

- **名称**：网站标识，如 `myapp`
- **域名**：绑定的域名，如 `app.example.com`
- **端口**：监听端口，默认 80
- **代理目标**：后端服务地址，如 `http://127.0.0.1:3000`
- **备注**：可选备注

### 代理目标格式

```
http://127.0.0.1:3000      # 本地服务
http://localhost:8080       # 本地服务
http://172.18.0.2:80        # Docker 容器
https://backend.internal    # 内部 HTTPS 服务
```

## 编辑反向代理网站

点击网站列表中的 **编辑** 按钮进入编辑页面。

You can change this website to PHP or pure static from its basic settings. Domains, listeners, files, and other shared fields are kept, while proxy upstreams and proxy rules are deleted and the selected type's configuration is generated. Back up and record the proxy configuration before converting.

### 域名和监听

配置网站的域名和监听端口，支持添加多个域名和端口。

- **域名**：可添加多个域名
- **监听地址**：可配置多个端口，支持 HTTPS 和 QUIC(HTTP3)

### 上游配置

上游（Upstream）定义了后端服务器地址，支持配置多个后端实现负载均衡。

- **上游名称**：上游的标识名称
- **负载均衡算法**：对于 Nginx，支持轮询（默认）、`least_conn`、`ip_hash`、`hash` 和 `random`；对于 Apache，支持轮询（默认）、最少繁忙和按流量分配
- **保持连接数**：与后端维持的长连接数量
- **DNS 解析器**：自定义 DNS 解析器及解析超时时间（仅 Nginx）

点击 **添加服务器** 按钮可以添加后端服务器：

- **服务器地址**：后端服务器地址，如 `127.0.0.1:8080`
- **选项**：可选参数，如 `weight=5`（权重）、`backup`（备用服务器）等

### 代理配置

配置代理行为和请求头转发。 每条代理规则将一个 location 映射到一个后端。

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
