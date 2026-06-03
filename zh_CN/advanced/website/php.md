# PHP 网站

PHP 网站用于运行 PHP 程序，如 WordPress、Laravel、ThinkPHP 等。

## 前置要求

创建 PHP 网站前，需要先安装：

1. **Web 服务器**：Nginx、OpenResty 或 Apache
2. **PHP 运行环境**：在 **应用** > **运行环境** 中安装所需的 PHP 版本

## 创建 PHP 网站

1. 进入 **网站** 页面
2. 点击 **PHP** 标签
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

### 域名和监听

配置网站的域名和监听端口。

![域名和监听配置](/images/website/website-php-edit.png)

### 基本设置

配置网站目录、PHP 版本等基本信息。

![基本设置](/images/website/website-php-basic.png)

- **网站目录**：网站文件存放的绝对路径
- **运行目录**：Laravel 等框架需要设置运行目录
- **默认文档**：默认首页文件，如 `index.php`、`index.html`
- **PHP 版本**：选择已安装的 PHP 版本
- **防跨站攻击**：启用后会设置 `open_basedir`，使 PHP 只能访问网站目录（以及 `/tmp`）内的文件

### 伪静态配置

伪静态用于 URL 重写，支持常见 PHP 程序的预设规则。

![伪静态配置](/images/website/website-php-rewrite.png)

点击预设下拉框可以选择常见程序的伪静态规则：

![伪静态预设](/images/website/website-php-rewrite-preset.png)

面板内置以下 27 个预设：

`crmeb`、`dabr`、`dbshop`、`dedecms`、`discuz`、`discuzq`、`discuzx`、`drupal`、`ecshop`、`edusoho`、`emlog`、`empirecms`、`laravel`、`maccms`、`niushop`、`pbootcms`、`phpcms`、`phpwind`、`sablog`、`seacms`、`shopex`、`shopwind`、`thinkphp`、`typecho`、`wordpress`、`wordpress-multisite`、`zblog`

选择预设后，其规则会写入下方的编辑器中，你可以在保存前对其进行微调。

:::tip 注意
仅当 Web 服务器为 Nginx 时才会显示预设下拉框（预设仅针对 Nginx/OpenResty 提供）。 在 Apache 上，请直接在编辑器中编写重写规则。
:::

### HTTPS

为网站启用并配置 HTTPS。

- **总开关**：启用或禁用 HTTPS。 启用后，面板会自动添加 `443` 监听（Nginx 还会添加 `quic`）
- **使用已有证书**：从证书管理中选择一个证书，自动填入证书和私钥
- **HSTS**：强制浏览器仅通过 HTTPS 访问网站
- **HTTP 重定向**：自动将 HTTP 请求重定向到 HTTPS
- **OCSP Stapling**：启用 OCSP Stapling
- **TLS 版本**：在 TLS 1.0 / 1.1 / 1.2 / 1.3 中选择允许的协议
- **证书** / **私钥**：直接粘贴 PEM 证书和 KEY 私钥内容

当网站已绑定域名时，底部的**一键签发证书**按钮会通过 ACME 申请免费证书。 如果域名是泛域名（例如 `*.example.com`），系统会要求你选择一个 DNS 提供商进行 DNS 验证（请先在证书管理中添加）。

### 重定向

配置重定向规则。 每条规则支持：

- **重定向类型**：URL 重定向、域名重定向或 404 重定向
- **状态码**：301（永久移动）、302（找到）、307（临时重定向）或 308（永久重定向）
- **源** / **目标**：匹配的路径/域名以及目标地址
- **保留 URI**：重定向时保留原始请求路径和查询参数

### 高级设置

- **访问统计**（仅 Nginx）：开关此网站的访问统计采集
- **日志设置**：设置**访问日志**和**错误日志**路径，或将其设置为**禁用**
- **速率限制**：限制**并发限制**（站点最大并发连接数）、**单 IP 限制**（每个 IP 的最大并发连接数）和**速率限制**（单次请求速率，单位 KB）
- **真实 IP**：配置可信代理 IP 来源（每行一个），以便在 CDN 或 Frp 后面识别访客的真实 IP；选择 IP 请求头（X-Real-IP、X-Forwarded-For、CF-Connecting-IP 等） 并可选择启用递归查找
- **基础认证**：添加用户名/密码，要求访客在访问网站前先通过 HTTP 基础认证

### 自定义配置

追加自定义的 Web 服务器配置片段。 每个片段都有一个**名称**、一个**作用域**（**本网站**或**全局**）和一个**内容**块，内容会根据已安装的 Web 服务器使用 Nginx 或 Apache 语法高亮进行编辑。

### 访问日志 / 错误日志

当对应的日志路径已启用时，**访问日志**和**错误日志**选项卡会实时流式显示日志文件。 使用底部的**清空日志**按钮可清空当前查看的日志。

:::tip 注意
点击编辑对话框底部的**重置配置**，可从面板模板重新生成网站的 Web 服务器配置，丢弃对生成的配置文件所做的手动修改。
:::

## 网站目录结构

创建网站后，默认目录结构：

```
/opt/ace/sites/网站名称/public
├── index.php          # 入口文件
├── .user.ini          # PHP 配置
└── ...
```

## PHP 版本切换

在网站编辑页面的 **基本设置** 中可以切换 PHP 版本：

1. 进入网站编辑页面
2. 点击 **基本设置** 标签
3. 在 **PHP 版本** 下拉框中选择新版本
4. 点击 **保存**

:::warning 注意
切换 PHP 版本可能导致程序不兼容， 请先在测试环境验证。
:::

## PHP 管理页面

进入 **应用** > **运行环境**，在已安装的 PHP 版本上点击**管理**，打开 PHP 管理页面。 它提供以下选项卡：

- **运行状态**：显示 `php-fpm-<version>` 服务的运行状态，并提供启动/停止/重启/重载控制。 这里还提供两个额外操作：
  - **设为 CLI 默认版本**：将此 PHP 版本设为系统 CLI 中的默认 `php` 命令
  - **查看 PHPInfo**：弹出窗口显示此版本完整的 `phpinfo()` 输出
- **模块管理**：安装或卸载 PHP 扩展（见下文）
- **参数调整**：通过表单调整常用参数（见 [参数调整](#parameter-tuning)）
- **主配置**：编辑原始的 `php.ini` 文件
- **FPM 配置**：编辑原始的 PHP-FPM 配置文件
- **负载状态**：查看当前的 PHP-FPM 负载指标
- **运行日志**：实时流式显示 `php-fpm-<version>` 服务的运行日志
- **错误日志**：实时流式显示 PHP 错误日志；**清空日志**按钮可将其清空
- **慢日志**：实时流式显示 PHP-FPM 慢日志；**清空慢日志**按钮可将其清空

### 模块管理

**模块管理**选项卡列出所选版本支持的扩展。 每一行显示模块名称和描述，并带有**安装**或**删除**操作。 安装以后台任务的形式运行，因此请在后台任务列表中查看进度。 安装和卸载都需要确认。

可用扩展包括 `fileinfo`、**OPcache**、`igbinary`、**Redis**（需要 `igbinary`）、**Memcached**、**APCu**、**ImageMagick**、`exif`、`pgsql` / `pdo_pgsql`、`sqlsrv` / `pdo_sqlsrv`、`imap`、`zip`、`bz2`、`ssh2`、`event`、`readline`、`snmp`、`ldap`、`enchant`、`pspell`、`calendar`、`gmp`、`xlswriter`、`xsl`、`intl`、`gettext`、`grpc`、`protobuf`、`rdkafka`、`xhprof`、**Xdebug**、`yaml`、`zstd`、`sysvmsg` / `sysvsem` / `sysvshm`、**ionCube**（在 OPcache 之后安装）、**Swoole** 和 **Swow**。

:::tip 版本差异
可用列表会根据 PHP 版本进行适配：**Swow** 仅在 PHP 8.0 及以上提供；`pspell` 和 `imap` 在 PHP 8.4 及以上被移除；**OPcache** 在 PHP 8.5 及以上不再作为可安装扩展提供，因为它已内置。
:::

### 参数调整

**参数调整**选项卡将常用设置分组到子选项卡中，让你无需手动编辑文件即可调整：

- **通用**：`short_open_tag`、`date.timezone`、`display_errors`、`error_reporting`
- **禁用函数**：编辑 `disable_functions` 列表（见 [禁用函数](#disabled-functions)）
- **上传限制**：`upload_max_filesize`、`post_max_size`、`max_file_uploads`、`memory_limit`
- **超时限制**：`max_execution_time`、`max_input_time`、`max_input_vars`
- **性能调整**：写入 `php-fpm.conf` 的 PHP-FPM 进程管理器设置 —— `pm`、`pm.max_children`，以及（在 `dynamic` 模式下）`pm.start_servers`、`pm.min_spare_servers`、`pm.max_spare_servers`
- **会话**：`session.save_handler`（`files`、`redis` 或 `memcached`）、保存路径（redis 和 memcached 的主机/端口/密码）、`session.gc_maxlifetime` 和 `session.cookie_lifetime`。 **清理会话文件**按钮（需确认）会删除此版本的所有会话文件

## PHP 配置

### php.ini 配置

你可以在 PHP 管理页面的**主配置**选项卡中编辑原始的 `php.ini`。

对于常用项，**参数调整**选项卡提供了一个表单，让你无需手动编辑文件即可调整：

```ini
upload_max_filesize = 50M    # 最大上传文件大小
post_max_size = 50M          # POST 数据最大大小
max_execution_time = 300     # 最大执行时间
memory_limit = 256M          # 内存限制
```

### 禁用函数

PHP 默认禁用了一些危险函数，如 `exec`、`system`、`passthru` 等。 若要启用它们，请编辑 php.ini 中的 `disable_functions` 值，或在 PHP 管理页面的**参数调整**选项卡的**禁用函数**字段中进行调整。

:::danger 警告
启用危险函数可能带来安全风险， 请谨慎操作。
:::

## 常见问题

### 502 Bad Gateway

- 检查 PHP-FPM 是否正常运行
- 检查 PHP 版本是否正确配置

### 文件上传失败

- 检查 `upload_max_filesize` 和 `post_max_size` 配置
- 检查目录权限

### 页面空白

- 开启 PHP 错误显示
- 查看 PHP 错误日志
