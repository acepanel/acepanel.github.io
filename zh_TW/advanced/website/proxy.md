# Reverse Proxy

Reverse proxy websites are used to forward external requests to backend services, commonly used for deploying Node.js, Go, Java, Python, and other applications.

## How It Works

```
User Request -> Nginx (Reverse Proxy) -> Backend Application (e.g., localhost:3000)
```

Nginx receives HTTP/HTTPS requests from users and forwards them to the specified backend address.

## Create Reverse Proxy Website

1. Go to the **Website** page
2. Make sure the **Reverse Proxy** tab is selected
3. Click **Create Website**

### Configuration Items

- **Name**: Website identifier, e.g., `myapp`
- **Domain**: Bound domain, e.g., `app.example.com`
- **Port**: Listening port, default 80
- **Proxy Target**: Backend service address, e.g., `http://127.0.0.1:3000`
- **Remarks**: Optional remarks

### Proxy Target Format

```
http://127.0.0.1:3000      # Local service
http://localhost:8080       # Local service
http://172.18.0.2:80        # Docker container
https://backend.internal    # Internal HTTPS service
```

## Edit Reverse Proxy Website

Click the **Edit** button in the website list to enter the edit page.

### Domain and Listen

Configure the website's domain and listening port, supporting multiple domains and ports.

![Domain and Listen Configuration](/images/website/website-proxy-edit.png)

- **Domain**: Multiple domains can be added
- **Listen Address**: Multiple ports can be configured, supporting HTTPS and QUIC(HTTP3)

### Upstream Configuration

Upstream defines backend server addresses, supporting multiple backends for load balancing.

![Upstream Configuration](/images/website/website-proxy-upstream.png)

- **Upstream Name**: Identifier name for the upstream
- **Load Balancing Algorithm**: Supports round-robin (default), IP Hash, and other algorithms
- **Keep-Alive Connections**: Number of persistent connections to maintain with the backend
- **DNS Resolver**: Custom DNS resolver

Click the **Add Server** button to add backend servers:

![Add Server](/images/website/website-proxy-upstream-add.png)

- **Server Address**: Backend server address, e.g., `127.0.0.1:8080`
- **Options**: Optional parameters, e.g., `weight=5` (weight), `backup` (backup server), etc.

### Proxy Configuration

Configure proxy behavior and request header forwarding.

![Proxy Configuration](/images/website/website-proxy-proxy.png)

- **Match Type**: Match type, such as prefix match, regex match, etc.
- **Match Expression**: URL expression to match
- **Proxy Target**: Enter upstream name or directly enter backend address
- **Enable Cache**: Whether to enable proxy cache
- **Enable Buffer**: Whether to enable buffer, AI applications are recommended to disable otherwise it may affect streaming output
- **Proxy SNI**: Whether to enable SNI (only valid for HTTPS proxy)
- **Custom Request Headers**: Add or modify request headers passed to the backend
- **Response Content Replacement**: Can replace strings in response content

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

### Custom Configuration

You can edit Nginx configuration in the website management page to add custom configurations:

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
