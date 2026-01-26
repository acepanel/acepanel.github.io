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

1. **Apps** -> **Runtimes** -> **PHP** -> **Manage**
2. Confirm PHP version matches website configuration
3. View PHP error logs

For reverse proxy websites with 502, check if the backend service is running.

## Rewrite Rules Not Working

1. Confirm the correct preset is selected or rules are filled in the **Rewrite** tab
2. Nginx will automatically reload after clicking **Save**
3. Clear browser cache and test

## Configure QUIC (HTTP/3)

The panel supports QUIC, but does not add the `Alt-Svc` header by default. Add in custom configuration:

```nginx
add_header Alt-Svc 'h3=":$server_port"; ma=2592000';
```

Ensure the server security group/firewall allows UDP port 443.

## Enable TLSv1/TLSv1.1

OpenSSL 3.x disables old protocols by default. If you must use them, modify the cipher suite in **HTTPS** settings:

```nginx
ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:AES128-SHA:AES256-SHA:DES-CBC3-SHA:@SECLEVEL=0;
```

## Enable IPv6

Add listening addresses in **Domains and Listening**: `[::]:80` and `[::]:443`.

## CDN Origin and HTTPS

| CDN Origin Protocol | Website HTTPS Configuration |
|---------------------|----------------------------|
| HTTP | Not required |
| HTTPS | Must be enabled |
| Follow Protocol | Must be enabled, and HTTP redirect must not be enabled |

## Upload File Size Limit

Default limit is 100MB. Modify PHP configuration:

1. **Apps** -> **Runtimes** -> **PHP** -> **Manage** -> **Main Configuration**
2. Modify `upload_max_filesize` and `post_max_size`
3. Restart PHP after saving

## SSL Certificate Application Failed

1. Confirm the domain is resolved to the server
2. Confirm port 80 is accessible (required for Let's Encrypt verification)
3. Check if Let's Encrypt rate limit is exceeded
4. Try using DNS verification method
5. Switch to another certificate provider
