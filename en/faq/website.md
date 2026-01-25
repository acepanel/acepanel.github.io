## Configure QUIC (HTTP3)

AcePanel currently supports automatic QUIC configuration, but for compatibility reasons, the `Alt-Svc` header is not added by default. Browsers will not attempt to use QUIC connections without detecting the `Alt-Svc` header.

If you are not using a CDN, you can add the configuration below to your website's rewrite rules to let browsers know that the website supports and uses QUIC connections.

```nginx
add_header Alt-Svc 'h3=":$server_port"; ma=2592000';
```

If you are using a CDN or there are proxy servers in front, then QUIC needs to be enabled on the CDN / frontend.

If the configuration still doesn't work, please check your browser version and the availability of UDP port 443.

* According to Nginx's git commit history, all QUIC draft versions have been removed in version 1.25, so there's no need to add draft version numbers to `Alt-Svc`.

## Configure TLSv1.1 TLSv1

The current Panel OpenResty is compiled with OpenSSL 3.5, which by default disables the deprecated TLSv1.1 and TLSv1 protocols.

Of course, if your business must use these two protocols, you can enable them using the SSL configuration below.

```nginx
ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:@SECLEVEL=0;
ssl_prefer_server_ciphers on;
```

## Configure IPv6

If you want to enable IPv6 support, you need to add `[::]:80` and `[::]:443` to the website's listening address configuration.

## CDN 配置 HTTPS 后网站是否需要开启 HTTPS？

取决于 CDN 侧的回源协议配置：

| CDN 回源协议 | 网站 HTTPS 配置               |
|----------|---------------------------|
| HTTP     | 无需开启 HTTPS                |
| HTTPS    | 必须开启 HTTPS                |
| 协议跟随     | 必须开启 HTTPS 且不能开启 HTTP 重定向 |
