# 应用常见问题

## PHP 模块安装

「应用」->「运行环境」->「PHP」->「管理」->「模块」，安装需要的模块。

部分模块需要编译安装，耗时较长，可在「任务」页面查看进度。

## PHP 函数被禁用

默认禁用了部分高危函数。如需启用：

「应用」->「运行环境」->「PHP」->「管理」->「配置」

找到 `disable_functions`，删除需要启用的函数名。

::: warning 安全提示
`exec`、`shell_exec`、`system` 等函数有安全风险，启用前需确认必要性。
:::

## Nginx 配置错误

修改配置后 Nginx 无法启动，查看错误：

```shell
nginx -t
```

修复配置后重启：

```shell
systemctl restart nginx
```

## Supervisor 启动报错

### EACCES 权限错误

项目目录权限问题，确保目录所有者为 www：

```shell
chown -R www:www /opt/ace/projects/项目名
```

### 找不到 node/npm

通过 nvm 安装的 Node.js 不在默认 PATH 中。

「应用」->「Supervisor 管理器」->「管理」->「配置」，添加：

```ini
environment=PATH="/root/.nvm/versions/node/v24.0.0/bin:/usr/local/bin:/usr/bin:/bin"
```

版本号替换为实际安装的版本，可通过 `whereis node` 查看路径。

## 应用安装失败

1. 检查网络连接
2. 查看「任务」页面的错误信息
3. 尝试「应用」页面点击「更新缓存」后重试

## 应用无法卸载

有依赖关系的应用需要先卸载依赖它的应用。

如 phpMyAdmin 依赖 Nginx，需先卸载 phpMyAdmin。

## 多版本 PHP 共存

可同时安装多个 PHP 版本，在创建网站时选择对应版本。

已有网站切换版本：「编辑」->「基本设置」->「PHP 版本」。
