# 管理面板

请勿在面板仍有任务运行时操作停止 / 重启面板，否则可能会造成问题。

- Start Panel: `acepanel start`
- Stop Panel: `acepanel stop`
- Restart Panel: `acepanel restart`

## 面板命令行

```bash
acepanel
```

可根据提示补全需要的命令进行操作。

例如，要更改用户的密码，您可以使用：

```bash
acepanel user password haozi 123456
```

这将把用户 `haozi` 的密码更改为 `123456`。

## 卸载面板

优先建议备份数据重装系统，这样可以保证系统纯净。

如果您无法重装系统，请以`root`用户登录服务器，执行以下命令卸载面板：

```shell
bash <(curl -sSLm 10 https://dl.acepanel.net/helper.sh)
```

卸载面板前请务必备份好所有数据，提前卸载面板全部应用。 卸载后数据将**无法恢复**！
