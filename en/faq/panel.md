## 面板打不开了怎么办？

不要慌，通常来说问题不大，按以下步骤操作即可：

首先尝试 SSH 连接服务器，如果可以连接，进入下一步；如果无法连接，直接联系服务器提供商。

通过 SSH 登录服务器后，首先检查 AcePanel 服务状态，执行以下命令：

```bash
acepanel status
```

如果提示服务已停止，尝试启动服务并再次检查状态：

```bash
acepanel start && sleep 3 && acepanel status
```

如果服务无法启动，尝试修复面板并更新到最新版本：

```bash
acepanel fix && acepanel update
```

如果服务已启动但仍无法访问面板，使用 curl 命令检查面板是否在监听端口：

```bash
curl -I http://127.0.0.1:<your_panel_port>
```

将 `<your_panel_port>` 替换为您面板实际使用的端口号（默认 8888）。如果返回 HTTP 200/307 状态码，说明面板服务正常运行，可能是防火墙或网络问题导致无法访问。

检查防火墙设置，确保面板端口已开放：

```bash
firewall-cmd --list-all
```

如果端口未开放，执行以下命令开放端口：

```bash
firewall-cmd --add-port=<your_panel_port>/tcp --permanent
firewall-cmd --reload
```

服务器的安全组设置也可能阻止访问面板端口，请登录服务器提供商的控制台检查并确保面板端口已开放。

如果以上步骤均无法解决问题，建议查看面板日志获取更多信息或前往[社区发帖](https://tom.moe)联系支持获取帮助：

```bash
journalctl -u acepanel -n 100
cat /opt/ace/panel/storage/logs/app.log
```

## 无权限执行 `acepanel` 命令

`acepanel` 命令必须以 root 用户运行。如果当前用户没有足够权限，请切换到 root 用户或使用 sudo 执行命令，例如：

```bash
sudo acepanel status
```

## 忘记面板管理员用户/密码/地址怎么办？

最快最简单的方法是使用命令行工具重新获取管理员用户信息，执行以下命令：

```bash
acepanel info
```

该命令会输出面板的基本信息，包括管理员用户名、登录地址以及生成一个新的随机密码。
