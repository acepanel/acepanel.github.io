# 网站常见问题

## 网站无法访问

1. 检查域名是否解析到服务器 IP
2. 检查防火墙是否放行 80/443 端口
3. 检查 Nginx 是否运行：「应用」->「Nginx」->「管理」
4. 查看 Nginx 错误日志

## 403 Forbidden

通常是权限问题：

```shell
# 修复网站目录权限
chown -R www:www /opt/ace/sites/网站名/public
chmod -R 755 /opt/ace/sites/网站名/public
```

## 502 Bad Gateway

PHP 网站出现 502，检查 PHP 是否运行：

1. 「应用」->「运行环境」->「PHP」->「管理」
2. 确认 PHP 版本与网站配置一致
3. 查看 PHP 错误日志

反向代理网站出现 502，检查后端服务是否运行。

## 伪静态不生效

1. 确认在「伪静态」标签页选择了正确的预设或填写了规则
2. 点击「保存」后 Nginx 会自动重载
3. 清除浏览器缓存后测试

## 配置 QUIC (HTTP/3)

面板支持 QUIC，但默认不添加 `Alt-Svc` 头。 在自定义配置中添加：

```nginx
add_header Alt-Svc 'h3=":$server_port"; ma=2592000';
```

确保服务器安全组/防火墙放行 UDP 443 端口。

## 启用 TLSv1/TLSv1.1

OpenSSL 3.x 默认禁用旧协议。 如必须使用，在「HTTPS」设置中修改密码套件：

```nginx
ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:AES128-SHA:AES256-SHA:DES-CBC3-SHA:@SECLEVEL=0;
```

## 启用 IPv6

在「域名和监听」添加监听地址：`[::]:80` 和 `[::]:443`。

## CDN 回源与 HTTPS

| CDN 回源协议 | 网站 HTTPS 配置         |
| -------- | ------------------- |
| HTTP     | 无需开启                |
| HTTPS    | 必须开启                |
| 协议跟随     | 必须开启，且不能开启 HTTP 重定向 |

## 上传文件大小限制

默认限制 100MB。 修改 PHP 配置：

1. 「应用」->「运行环境」->「PHP」->「管理」->「主配置」
2. 修改 `upload_max_filesize` 和 `post_max_size`
3. 保存后重启 PHP

## SSL 证书申请失败

1. 确认域名已解析到服务器
2. 确认 80 端口可访问（Let's Encrypt 验证需要）
3. 检查是否超过 Let's Encrypt 速率限制
4. 尝试使用 DNS 验证方式
5. 更换其他证书提供商
