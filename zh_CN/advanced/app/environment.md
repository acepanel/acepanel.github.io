# 运行环境

![运行环境](/images/app/environment.png)

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

进入 **应用** 页面，点击 **运行环境** 选项卡查看可用运行环境：

点击顶部的语言分类可筛选特定语言的版本，或使用右侧的搜索框按名称或描述搜索：

## 安装运行环境

1. 进入 **应用** 页面
2. 点击 **运行环境** 标签
3. 选择需要的语言分类（或查看全部）
4. 点击对应版本的 **安装** 按钮

运行环境支持时，安装对话框还会显示 **预执行脚本**和**自定义编译参数**。 只有构建确实需要特定依赖、镜像、补丁或编译选项时才填写。 脚本以安装权限执行，提交任务前必须检查内容。

:::tip 版本选择建议

- 生产环境建议使用 LTS（长期支持）版本
- 标注「已停止维护」的版本不建议用于新项目
- 可以同时安装多个版本，在项目中指定使用
  :::

## 管理运行环境

已安装的运行环境会显示 **管理** 按钮。 点击进入管理页面：

### 运行状态

显示运行环境的当前状态，提供启动、停止、重启、重载等操作。

### 模块管理（PHP）

PHP 运行环境提供模块管理功能，可以安装或卸载各种 PHP 模块：

模块管理选项卡列出所有可用模块的名称、说明以及 **安装** / **删除** 操作。 安装或卸载模块会提交后台任务；请在 **任务 > 面板任务** 中查看结果。

常用模块包括：

- **缓存和序列化：** OPcache、APCu、igbinary、Redis（依赖 igbinary）、Memcached。
- **图像和文件：** ImageMagick、exif、fileinfo、zip、bz2、zstd、xlswriter。
- **数据库：** pgsql、pdo_pgsql、sqlsrv、pdo_sqlsrv。
- **网络和协议：** ssh2、snmp、ldap、imap、event、grpc、protobuf、rdkafka。
- **国际化和文本：** intl、gettext、enchant、pspell、readline、yaml、xsl。
- **System V IPC：** sysvmsg、sysvsem、sysvshm。
- **数学：** gmp、calendar。
- **分析和调试：** xhprof、xdebug。
- **高性能和加密：** Swoole、Swow、ionCube，其中 ionCube 必须在 OPcache 之后安装。

:::tip 按 PHP 版本显示
模块列表会随所选 PHP 版本变化：

- **Swow** 仅支持 PHP 8.0 及以上版本
- PHP 8.4 及以上不再提供 **pspell** 和 **imap**（不再推荐）
- PHP 8.5 及以上已原生内置 **OPcache**，不再将其作为可安装模块
  :::

### 配置文件（PHP）

可以使用内置编辑器，在 **主配置** 选项卡中编辑 PHP 主配置文件 php.ini，并在 **FPM 配置** 选项卡中编辑 FPM 配置文件。 运行状态页的 **查看 PHPInfo**会显示完整 `phpinfo()` 信息。

### 参数调优（PHP）

**参数调优** 选项卡通过表单调整常用设置，无需编辑原始配置。 其中包含以下分组：

- **常规：** `short_open_tag`、`date.timezone`、`display_errors`、`error_reporting`。
- **禁用函数：** 以逗号分隔需要禁用的函数，例如 `exec`、`shell_exec`、`system`、`passthru`。
- **上传限制：** `upload_max_filesize`、`post_max_size`、`max_file_uploads`、`memory_limit`。
- **超时限制：** `max_execution_time`、`max_input_time`、`max_input_vars`。
- **性能调优**：PHP-FPM 进程管理器设置（`pm`、`pm.max_children`，以及 `dynamic` 模式下的 `pm.start_servers`、`pm.min_spare_servers` 和 `pm.max_spare_servers`）
- **会话**：`session.save_handler`（files、redis 或 memcached）、对应的连接信息或保存路径、`session.gc_maxlifetime` 及 `session.cookie_lifetime`。 **清理会话文件** 按钮会删除全部会话文件；仅当保存处理器设为 `files` 时生效

### 日志（PHP）

PHP 还提供独立的 **负载状态**（FPM 进程池负载）、**运行日志**、**错误日志**和**慢日志**标签页。

### 语言专属设置

部分运行环境的管理页面还提供专用设置：

- **Go：** 配置 `GOPROXY`，可选择官方地址、goproxy.cn、阿里云和腾讯云等预设。
- **Node.js：** 配置 npm 镜像，可选择官方地址、npmmirror、腾讯云和华为云等预设。
- **Python：** 配置 pip 镜像，可选择官方地址、阿里云、腾讯云、清华大学和中国科学技术大学等预设。

### 设置为 CLI 默认版本

点击 **设置为 CLI 默认版本**，可把当前版本设为命令行默认版本。 Go、Java、Node.js、PHP、Python 和 .NET 均支持该操作。

## 多版本共存

同一语言可以安装多个版本。 例如同时安装 PHP 7.4 和 PHP 8.3，让不同网站分别使用不同版本。

安装路径规则：

- **Go**：`/opt/ace/server/go/version`
- **Java**：`/opt/ace/server/java/version`
- **Node.js**：`/opt/ace/server/nodejs/version`
- **PHP**：`/opt/ace/server/php/version`
- **Python**：`/opt/ace/server/python/version`
- **.NET**：`/opt/ace/server/dotnet/version`

## 在项目中使用

创建项目时，可以在项目设置中选择运行环境版本。 详见[项目管理](../project)。

## 更新运行环境

有新版本时，列表会显示最新版本号。 可以卸载旧版本后安装新版本，也可以保留旧版本并同时安装新版本，后者更适合逐步验证。

1. 卸载旧版本后安装新版本
2. 保留旧版本，同时安装新版本（推荐）

:::warning 注意
更新运行环境版本可能导致依赖该版本的项目出现兼容问题。 更新生产环境前，请先在测试环境中验证。
:::
