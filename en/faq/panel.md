# 面板常见问题

## 面板打不开

SSH 登录服务器，检查面板状态：

```shell
acepanel status
```

如果服务已停止，启动它：

```shell
acepanel start
```

如果无法启动，尝试修复：

```shell
acepanel fix && acepanel update
```

服务正常但仍无法访问，检查防火墙：

```shell
# 检查端口是否监听
curl -I http://127.0.0.1:面板端口/

# 放行端口（firewalld）
firewall-cmd --add-port=面板端口/tcp --permanent
firewall-cmd --reload
```

云服务器还需检查安全组设置。

查看面板日志排查问题：

```shell
journalctl -u acepanel -n 100
```

## 忘记密码/用户名/地址

```shell
acepanel info
```

输出面板地址、用户名，并生成新密码。

## 修改面板端口

```shell
acepanel port 12345
```

修改后需在服务器安全组/防火墙放行新端口。

## 关闭安全入口

如果忘记安全入口路径：

```shell
acepanel entrance off
```

## 关闭域名/IP 绑定

绑定后无法访问面板：

```shell
acepanel bind-domain off
acepanel bind-ip off
```

## 关闭两步验证

```shell
acepanel user 2fa admin
```

## 证书错误

面板默认使用自签名证书，浏览器会提示不安全，点击「继续访问」即可。

申请正式证书：

```shell
acepanel https generate
```

需要确保服务器 IP 80 端口可直接访问。

## acepanel 命令无权限

必须以 root 用户执行，或使用 sudo：

```shell
sudo acepanel status
```
