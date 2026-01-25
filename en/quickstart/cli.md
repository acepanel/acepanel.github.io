# 命令行工具

AcePanel 提供命令行工具 `acepanel`，用于在无法访问 Web 界面时进行面板管理。

## 服务管理

::: warning 注意
后台任务运行时请勿停止或重启面板，可能导致任务中断或数据丢失。
:::

```shell
acepanel start    # 启动
acepanel stop     # 停止
acepanel restart  # 重启
acepanel status   # 查看状态
```

## 用户管理

```shell
acepanel user list                              # 列出所有用户
acepanel user username <旧用户名> <新用户名>      # 修改用户名
acepanel user password <用户名> <新密码>          # 修改密码
acepanel user 2fa <用户名>                       # 开关两步验证
```

## 安全设置

```shell
acepanel https on|off       # 开关 HTTPS
acepanel https generate     # 生成证书（自签名或 Let's Encrypt）
acepanel entrance on|off    # 开关安全入口
acepanel port <端口号>       # 修改监听端口
acepanel bind-domain off    # 解除域名绑定
acepanel bind-ip off        # 解除 IP 绑定
acepanel bind-ua off        # 解除 UA 绑定
```

## 维护命令

```shell
acepanel update      # 更新面板
acepanel fix         # 修复更新问题
acepanel sync        # 同步缓存数据
acepanel sync-time   # 同步服务器时间
acepanel clear-task  # 清空任务队列
acepanel info        # 查看面板信息并重置密码
acepanel help        # 帮助
```

## 示例

修改用户 `admin` 的密码为 `newpassword`：

```shell
acepanel user password admin newpassword
```
