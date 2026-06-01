# Website FAQ

## Website Inaccessible

1. Check if the domain is resolved to the server IP
2. Check if the firewall has allowed ports 80/443
3. Check if Nginx is running: **Apps** -> **Nginx** -> **Manage**
4. View Nginx error logs

## 403 Forbidden

Usually a permission issue:

```shell
# Fix website directory permissions
chown -R www:www /opt/ace/sites/website-name/public
chmod -R 755 /opt/ace/sites/website-name/public
```

## 502 Bad Gateway

For PHP websites with 502, check if PHP is running:

1. **Apps** -> **Operating Environment** -> **PHP** -> **Manage**
2. Confirm PHP version matches website configuration
3. View PHP error logs

For reverse proxy websites with 502, check if the backend service is running.

## Rewrite Rules Not Working

1. Confirm the correct preset is selected or rules are filled in the **Rewrite** tab
2. Nginx will automatically reload after clicking **Save**
3. Clear browser cache and test

## Configure QUIC (HTTP/3)

In the website editor, open the **Domain & Listening** tab and enable the **QUIC(HTTP3)** switch on the HTTPS listen address. When QUIC is enabled, the panel automatically adds the `Alt-Svc` advertising header for you, so no extra configuration is required:

```nginx
add_header Alt-Svc 'h3=":$server_port"; ma=2592000';
```

Ensure the server security group/firewall allows UDP port 443.

## Enable TLSv1/TLSv1.1

In the website editor, open the **HTTPS** tab and add **TLS 1.0** and/or **TLS 1.1** in the **TLS Version** selector (the default is TLS 1.2 and TLS 1.3 only).

OpenSSL 3.x also lowers the security level so the ciphers used by these old protocols are rejected. If the connection still fails, append a cipher suite ending with `@SECLEVEL=0` via the **Custom Configs** tab:

```nginx
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:AES128-SHA:AES256-SHA:DES-CBC3-SHA:@SECLEVEL=0;
```

## Enable IPv6

Add listening addresses in **Domain & Listening**: `[::]:80` and `[::]:443`.

## CDN Origin and HTTPS

| CDN Origin Protocol | Website HTTPS Configuration                            |
|---------------------|--------------------------------------------------------|
| HTTP                | Not required                                           |
| HTTPS               | Must be enabled                                        |
| Follow Protocol     | Must be enabled, and HTTP redirect must not be enabled |

## Upload File Size Limit

Default limit is 100MB. Modify PHP configuration:

1. **Apps** -> **Operating Environment** -> **PHP** -> **Manage** -> **Main Configuration**
2. Modify `upload_max_filesize` and `post_max_size`
3. Restart PHP after saving

## SSL Certificate Application Failed

1. Confirm the domain is resolved to the server
2. Confirm port 80 is accessible (required for Let's Encrypt verification)
3. Check if Let's Encrypt rate limit is exceeded
4. Try using DNS verification method
5. Switch to another certificate provider
