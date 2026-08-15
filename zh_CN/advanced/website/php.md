# PHP 网站

![PHP 网站设置](/images/website/php.png)

PHP 网站用于运行 PHP 程序，如 WordPress、Laravel、ThinkPHP 等。

## 前置要求

创建 PHP 网站前，需要先安装：

1. **Web 服务器**：Nginx、OpenResty 或 Apache
2. **PHP 运行环境**：在 **应用** > **运行环境**中安装所需 PHP 版本

## 创建 PHP 网站

1. 进入 **网站** 页面
2. 点击 **PHP** 选项卡
3. 点击 **创建网站**

### 配置项

- **名称**：网站标识，例如 `wordpress`。 仅允许使用字母、数字、连字符和下划线
- **域名**：绑定的域名，如 `blog.example.com`
- **端口**：监听端口，默认 80
- **PHP 版本**：选择已安装的 PHP 版本
- **数据库**：可选择已安装的数据库类型，在创建网站的同时一并创建数据库、用户和密码
- **目录**：网站文件的存放路径。 若留空，则默认为网站目录加上 `<name>/public`
- **备注**：可选备注

## 编辑 PHP 网站

点击网站列表中的 **编辑** 按钮进入编辑页面。

可以在基本设置中切换为反向代理或纯静态网站。 域名、监听、文件等通用内容会保留；PHP 运行环境、Rewrite 等 PHP 专属 Web 配置会删除，并重新生成所选类型的配置。 切换前必须备份网站并记录 PHP 设置。

### 域名和监听

配置网站的域名和监听端口。

### 基本设置

配置网站目录、PHP 版本等基本信息。

- **网站目录**：网站文件存放的绝对路径
- **运行目录**：Laravel 等框架需要设置运行目录
- **默认文档**：默认首页文件，如 `index.php`、`index.html`
- **PHP 版本**：选择已安装的 PHP 版本
- **防跨站攻击**：启用后会设置 `open_basedir`，使 PHP 只能访问网站目录（以及 `/tmp`）内的文件

### 伪静态配置

伪静态用于 URL 重写，支持常见 PHP 程序的预设规则。

点击预设下拉框可以选择常见程序的伪静态规则：

面板内置以下 27 个预设：

`crmeb`、`dabr`、`dbshop`、`dedecms`、`discuz`、`discuzq`、`discuzx`、`drupal`、`ecshop`、`edusoho`、`emlog`、`empirecms`、`laravel`、`maccms`、`niushop`、`pbootcms`、`phpcms`、`phpwind`、`sablog`、`seacms`、`shopex`、`shopwind`、`thinkphp`、`typecho`、`wordpress`、`wordpress-multisite`、`zblog`。

选择预设后，规则会写入下方编辑器，可以继续调整再保存。

:::tip 注意
只有使用 Nginx 时才显示预设下拉框（预设仅适用于 Nginx/OpenResty）。 使用 Apache 时，请直接在编辑器中编写 Rewrite 规则。
:::

### HTTPS

为网站启用并配置 HTTPS。

- **总开关**：启用或关闭 HTTPS。 启用后，面板会自动增加 `443` 监听，Nginx 还会增加 `quic`
- **使用已有证书：** 从证书管理中选择证书，自动填充证书和私钥。
- **HSTS：** 强制浏览器仅使用 HTTPS。
- **HTTP 重定向：** 自动将 HTTP 请求跳转到 HTTPS。
- **OCSP Stapling：** 启用 OCSP 装订。
- **TLS 版本：** 可选 TLS 1.0、1.1、1.2 和 1.3。
- **证书** / **私钥**：直接粘贴 PEM 证书和 KEY 私钥内容

网站已绑定域名时，底部 **一键签发证书**可以通过 ACME 申请免费证书。 存在 `*.example.com` 等通配符域名时，需要选择已经在证书管理中添加的 DNS 提供商进行 DNS 验证。

### 重定向

配置重定向规则。 每条规则支持：

- **类型：** URL 重定向、Host 重定向或 404 重定向。
- **状态码：** 301、302、307 或 308。
- **来源** / **目标**：要匹配的路径或主机以及目标地址
- **保留 URI：** 跳转时保留原请求路径和查询参数。

### 高级设置

- **访问统计：** 仅 Nginx 支持，用于采集该网站访问统计。
- **日志设置**：设置 **访问日志**和 **错误日志**路径，或将其设为 **关闭**
- **限流**：设置 **并发限制**、**单 IP 限制**和 **速率限制**
- **真实 IP：** 网站位于 CDN 或 Frp 后方时，配置每行一个的可信代理 IP、真实 IP 请求头和递归查找。
- **基本认证：** 添加用户名和密码，访问网站前必须通过 HTTP Basic Authentication。

### 自定义配置

可以追加 Web 服务器配置片段。 每个片段包含 **名称**、**作用范围**（**当前网站**或**全局**）和 **内容**；编辑器会按已安装的 Web 服务器提供 Nginx 或 Apache 语法高亮。

### 访问日志和错误日志

启用对应日志路径后，**访问日志**和 **错误日志**选项卡会实时显示日志文件。 底部 **清空日志**会截断当前查看的日志文件。

:::tip 注意
点击编辑对话框底部的 **重置配置**，会根据面板模板重新生成网站的 Web 服务器配置，并丢弃对生成配置文件所做的手工修改。
:::

## 网站目录结构

默认目录结构：

```
/opt/ace/sites/website-name/public
├── index.php          # 入口文件
├── .user.ini          # PHP 配置
└── ...
```

## 切换 PHP 版本

可以在网站编辑页的 **基本设置** 中切换 PHP 版本：

1. 打开网站编辑页。
2. 进入 **基本设置**。
3. 在 **PHP 版本**中选择新版本。
4. 点击 **保存**。

:::warning 注意
切换 PHP 版本可能导致程序不兼容， 应先在测试环境验证。
:::

## PHP 管理页面

进入 **应用** > **运行环境**，点击已安装 PHP 版本的 **管理**，打开 PHP 管理页。 页面包含：

- **运行状态：** 查看 `php-fpm-<version>` 服务状态，提供启动、停止、重启和重载； 此处还提供两项操作：
  - **设为 CLI 默认版本**：将此 PHP 版本设为系统 CLI 中默认的 `php` 命令
  - **查看 PHPInfo**：打开弹窗查看该版本完整的 `phpinfo()` 输出
- **模块管理：** 安装或卸载 PHP 扩展。
- **参数调优**：通过表单调整常用参数（参阅[参数调优](#parameter-tuning)）
- **主配置：** 编辑原始 `php.ini`。
- **FPM 配置：** 编辑 PHP-FPM 配置文件。
- **负载状态：** 查看 PHP-FPM 当前负载。
- **运行日志**：实时查看 `php-fpm-<version>` 服务的运行日志
- **错误日志**：实时查看 PHP 错误日志；点击 **清空日志**可截断文件
- **慢日志**：实时查看 PHP-FPM 慢日志；点击 **清空慢日志**可截断文件

### 模块管理

**模块管理**选项卡列出所选版本支持的扩展。 **安装**或**删除**操作。 安装会创建后台任务， 安装和卸载都需要确认。

可用扩展包括 `fileinfo`、**OPcache**、`igbinary`、**Redis**（依赖 `igbinary`）、**Memcached**、**APCu**、**ImageMagick**、`exif`、`pgsql` / `pdo_pgsql`、`sqlsrv` / `pdo_sqlsrv`、`imap`、`zip`、`bz2`、`ssh2`、`event`、`readline`、`snmp`、`ldap`、`enchant`、`pspell`、`calendar`、`gmp`、`xlswriter`、`xsl`、`intl`、`gettext`、`grpc`、`protobuf`、`rdkafka`、`xhprof`、**Xdebug**、`yaml`、`zstd`、`sysvmsg` / `sysvsem` / `sysvshm`、**ionCube**、**Swoole** 和 **Swow**。

:::tip 版本差异
可用扩展会随 PHP 版本变化：**Swow** 仅支持 PHP 8.0 及以上版本；PHP 8.4 及以上不再提供 `pspell` 和 `imap`；PHP 8.5 及以上已内置 **OPcache**，不再将其作为可安装扩展。
:::

### 参数调优

**参数调优** 选项卡将常用设置分组为多个子选项卡，无需手工编辑文件即可调整：

- **常规：** `short_open_tag`、`date.timezone`、`display_errors`、`error_reporting`。
- **禁用函数**：编辑 `disable_functions` 列表（参阅[禁用函数](#disabled-functions)）
- **上传限制：** `upload_max_filesize`、`post_max_size`、`max_file_uploads`、`memory_limit`。
- **超时限制：** `max_execution_time`、`max_input_time`、`max_input_vars`。
- **性能调优**：写入 `php-fpm.conf` 的 PHP-FPM 进程管理器设置，包括 `pm`、`pm.max_children`，以及 `dynamic` 模式下的 `pm.start_servers`、`pm.min_spare_servers` 和 `pm.max_spare_servers`
- **会话**：配置 `session.save_handler`（`files`、`redis` 或 `memcached`）、保存路径、`session.gc_maxlifetime` 及 `session.cookie_lifetime`。 **清理会话文件**会删除该版本全部会话文件。

## PHP 配置

### php.ini 配置

可以在 PHP 管理页的 **主配置**中编辑 `php.ini`。常用项目也可通过参数调优修改：

对于常用项目，**参数调优** 选项卡提供表单，无需手工编辑文件即可调整：

```ini
upload_max_filesize = 50M
post_max_size = 50M
max_execution_time = 300
memory_limit = 256M
```

### 禁用函数

PHP 默认禁用 `exec`、`system`、`passthru` 等危险函数。 如需启用，请编辑 php.ini 中的 `disable_functions` 值，或在 PHP 管理页的 **参数调优** 选项卡中修改 **禁用函数** 字段。

:::danger 警告
启用危险函数会增加安全风险， 必须确认程序确实需要并采取额外隔离措施。
:::

## 常见问题

### 502 Bad Gateway

- 检查 PHP-FPM 是否正常运行。
- 检查网站选择的 PHP 版本是否正确。

### 文件上传失败

- 检查 `upload_max_filesize` 和 `post_max_size`。
- 检查目录权限。

### 页面空白

- 临时启用 PHP 错误显示。
- 检查 PHP 错误日志。
