# Security Settings

The security settings page is used to configure panel security-related options to protect the panel from unauthorized access.

![Security Settings](/images/setting/setting-safe.png)

## Login Timeout

Set the validity period of login sessions in minutes. If there is no activity beyond this time, you will be automatically logged out and need to re-authenticate.

The default value is 120 minutes.

## Access Entry

Set the access path for the panel. After setting the access entry, you need to access via `https://IP:port/entry-path`.

For example, if set to `/admin`, the access address becomes `https://IP:port/admin`.

This is a simple but effective security measure that can prevent the panel from being discovered by scanners.

## Entry Error Page

The HTTP status code returned when accessing an incorrect entry path:

- **418 I'm a teapot**: Returns an interesting error code and error page
- **Nginx 404**: Returns the same 404 page as Nginx
- **Close Connection**: Closes the connection directly without returning any content

## Login Captcha

When enabled, entering the wrong password multiple times during login will trigger a captcha to prevent brute force attacks.

## Request IP Header

When the panel is deployed behind a reverse proxy (such as Nginx, CDN), you need to set the correct IP header to obtain the real client IP.

Common values:
- `X-Real-IP`: Default used by Nginx
- `X-Forwarded-For`: Standard proxy header
- `CF-Connecting-IP`: Used by Cloudflare

## Bind Domain

Restrict panel access to specified domains only. After adding a domain, access via IP or other domains will be blocked.

Suitable for:
- Improving security
- Using with SSL certificates

## Bind IP

Restrict panel access to specified IP addresses only. Multiple IP addresses can be added.

Suitable for:
- Fixed office networks
- Jump server access

::: warning Note
Before binding IP, please ensure your IP address is static, otherwise you may be unable to access the panel.
:::

## Bind UA

Restrict panel access to browsers with specified User-Agent only.

This is an advanced security option that can be used with custom browser plugins.

## Offline Mode

When enabled, the panel will not connect to external networks, including:
- Checking for updates
- Downloading applications
- Syncing cache data

Suitable for intranet environments or scenarios with strict network restrictions.

## Auto Update

When enabled, the panel will automatically check and install updates daily. It is recommended to keep this enabled to receive the latest security fixes.

## Panel HTTPS

Enable HTTPS encrypted access for the panel:

- **Disabled**: Access via HTTP
- **ACME (Auto)**: Automatically apply for and renew Let's Encrypt certificates, requires IP to support port 80 access
- **Custom Certificate**: Use your own SSL certificate

::: tip Recommended
It is recommended to enable HTTPS in production environments to protect the transmission security of login credentials and sensitive data.
:::

## Panel Public IP

Configure the public IP address of the panel, currently mainly used for applying IP certificates from Let's Encrypt.

Supports both IPv4 and IPv6 addresses.
