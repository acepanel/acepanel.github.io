# 运行环境

运行环境用于安装各类编程语言的运行时，为网站和项目提供执行环境。

## 支持的语言

AcePanel 支持以下编程语言的运行环境：

| 语言                      | 可用版本                                        | 说明                     |
| ----------------------- | ------------------------------------------- | ---------------------- |
| Go                      | 1.20 - 1.25 | 适合构建高性能后端服务            |
| Java                    | JDK 8, 11, 17, 21, 25                       | 使用 Amazon Corretto 发行版 |
| Node.js | 20, 22, 24                                  | 适合前端构建和 Node 应用        |
| PHP                     | 7.4 - 8.5   | 适合 Web 开发              |
| Python                  | 3.10 - 3.14 | 适合脚本和 Web 应用           |
| .NET    | LTS / STS 版本                                | 面向现代应用和服务的跨平台框架        |

## 运行环境列表

进入 **应用** 页面，点击 **运行环境** 标签查看可用的运行环境：

![运行环境](/images/app/app-runtime.png)

点击顶部的语言分类可筛选特定语言的版本，或使用右侧的搜索框按名称或描述搜索：

![PHP 运行环境](/images/app/app-runtime-php.png)

## 安装运行环境

1. 进入 **应用** 页面
2. 点击 **运行环境** 标签
3. 选择需要的语言分类（或查看全部）
4. 点击对应版本的 **安装** 按钮

:::tip 版本选择建议

- 生产环境建议使用 LTS（长期支持）版本
- 标注「已停止维护」的版本不建议用于新项目
- 可以同时安装多个版本，在项目中指定使用
  :::

## 管理运行环境

已安装的运行环境会显示 **管理** 按钮。 点击进入管理页面：

![运行环境管理](/images/app/app-runtime-manage.png)

### 运行状态

显示运行环境的当前状态，提供启动、停止、重启、重载等操作。

### 模块管理（PHP）

PHP 运行环境提供模块管理功能，可以安装或卸载各种 PHP 模块：

![PHP 模块管理](/images/app/app-runtime-modules.png)

模块管理选项卡列出了每个可用模块的名称、描述以及 **安装** / **删除** 操作。 安装或卸载模块会以后台任务的形式提交，请在 **后台任务** 中查看结果。

可安装的模块种类丰富，包括（但不限于）：

- **缓存 / 序列化**：OPcache（字节码缓存）、APCu（用户级内存键值缓存）、igbinary、Redis（需要 igbinary）、Memcached
- **图像 / 文件**：ImageMagick、exif、fileinfo、zip、bz2、zstd、xlswriter（Excel）
- **数据库**：pgsql 和 pdo_pgsql（PostgreSQL）、sqlsrv 和 pdo_sqlsrv（SQL Server）
- **网络 / 协议**：ssh2、snmp、ldap、imap、event、grpc、protobuf、rdkafka（Kafka）
- **国际化 / 文本**：intl、gettext、enchant、pspell、readline、yaml、xsl
- **System V IPC**：sysvmsg、sysvsem、sysvshm
- **数学**：gmp、calendar
- **性能分析 / 调试**：xhprof、xdebug
- **高性能 / 加密**：Swoole、Swow、ionCube（必须在 OPcache 之后安装）

:::tip 版本感知的可用性
模块目录会根据所选的 PHP 版本进行适配：

- **Swow** 仅在 PHP 8.0 及以上版本可用
- **pspell** 和 **imap** 在 PHP 8.4 及以上版本已移除（不再推荐使用）
- **OPcache** 在 PHP 8.5 及以上版本不再作为可安装模块提供，因为它已原生内置
  :::

### 配置文件（PHP）

您可以通过 **主配置** 选项卡使用内置编辑器编辑 PHP 的主配置文件（php.ini），并通过 **FPM 配置** 选项卡编辑 FPM 配置文件。 运行状态页面上的 **查看 PHPInfo** 按钮会显示完整的 `phpinfo()` 输出。

### 参数调优（PHP）

**参数调优** 选项卡提供以表单方式调整常用设置，无需直接编辑原始配置。 它分为以下几个部分：

- **通用**：`short_open_tag`、`date.timezone`、`display_errors` 和 `error_reporting`
- **禁用函数**：以逗号分隔的待禁用 PHP 函数列表（例如 `exec`、`shell_exec`、`system`、`passthru`）
- **上传限制**：`upload_max_filesize`、`post_max_size`、`max_file_uploads` 和 `memory_limit`
- **超时限制**：`max_execution_time`、`max_input_time` 和 `max_input_vars`
- **性能调优**：PHP-FPM 进程管理器设置（`pm`、`pm.max_children`，以及 `dynamic` 模式下的 `pm.start_servers`、`pm.min_spare_servers`、`pm.max_spare_servers`）
- **会话**：`session.save_handler`（files、redis 或 memcached）、对应的连接信息或保存路径、`session.gc_maxlifetime` 和 `session.cookie_lifetime`。 **清理会话文件** 按钮会删除所有会话文件；仅在保存处理器设置为 `files` 时生效

### 日志（PHP）

PHP 执行环境提供独立的 **负载状态** 选项卡（FPM 进程池负载），以及 **运行日志**、**错误日志** 和 **慢日志** 选项卡，用于监控和故障排查。

### 语言专属设置

部分执行环境在其管理页面提供专属设置：

- **Go**：配置模块代理（`GOPROXY`），内置官方代理以及 goproxy.cn、阿里、腾讯等镜像的预设项
- **Node.js**：配置 npm 镜像源（registry），内置官方源以及 npmmirror、腾讯、华为等镜像的预设项
- **Python**：配置 pip 镜像，内置官方源以及阿里、腾讯、清华、中科大等镜像的预设项

### 设置为 CLI 默认版本

点击 **设为 CLI 默认版本** 按钮，可将当前版本设为命令行使用的默认版本。 所有执行环境（Go、Java、Node.js、PHP、Python 和 .NET）均支持此功能。

## 多版本共存

AcePanel 支持同一语言的多个版本共存。 例如，你可以同时安装 PHP 7.4 和 PHP 8.3，不同的网站可以使用不同的 PHP 版本。

安装路径规则：

- **Go**：`/opt/ace/server/go/版本号`
- **Java**：`/opt/ace/server/java/版本号`
- **Node.js**：`/opt/ace/server/nodejs/版本号`
- **PHP**：`/opt/ace/server/php/版本号`
- **Python**：`/opt/ace/server/python/版本号`
- **.NET**：`/opt/ace/server/dotnet/version`

## 在项目中使用

创建项目时，可以在项目设置中选择使用的运行环境版本。 详见 [项目管理](../project) 文档。

## 更新运行环境

当有新版本可用时，列表中会显示最新版本号。 你可以：

1. 卸载旧版本，安装新版本
2. 保留旧版本，同时安装新版本（推荐）

:::warning 注意
更新运行环境版本可能导致依赖该版本的项目出现兼容性问题， 请在测试环境验证后再更新生产环境。
:::
