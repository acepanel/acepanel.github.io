# 运行环境

![Runtime environments](/images/app/environment.png)

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

Go to the **Apps** page, click the **Runtime Environment** tab to view available runtime environments:

点击顶部的语言分类可筛选特定语言的版本，或使用右侧的搜索框按名称或描述搜索：

## 安装运行环境

1. Go to the **Apps** page
2. 点击 **运行环境** 标签
3. 选择需要的语言分类（或查看全部）
4. 点击对应版本的 **安装** 按钮

When the runtime offers them, the install dialog also accepts a **Pre-execution Script** and **Custom Compile Parameters**. Leave them empty unless the build needs a known dependency, mirror, patch, or compiler option. The script runs with installation privileges, so review it before submitting the task.

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

The Module Management tab lists every available module with its name, description, and an **Install** / **Delete** action. Installing or uninstalling a module is submitted as a background task; check the result in **Tasks > Panel Tasks**.

A wide catalog of modules is available, including (but not limited to):

- **Caching / Serialization**: OPcache (bytecode cache), APCu (user-level in-memory key-value cache), igbinary, Redis (requires igbinary), Memcached
- **Imaging / Files**: ImageMagick, exif, fileinfo, zip, bz2, zstd, xlswriter (Excel)
- **Databases**: pgsql and pdo_pgsql (PostgreSQL), sqlsrv and pdo_sqlsrv (SQL Server)
- **Networking / Protocols**: ssh2, snmp, ldap, imap, event, grpc, protobuf, rdkafka (Kafka)
- **Internationalization / Text**: intl, gettext, enchant, pspell, readline, yaml, xsl
- **System V IPC**: sysvmsg, sysvsem, sysvshm
- **Math**: gmp, calendar
- **Profiling / Debugging**: xhprof, xdebug
- **High-performance / Encryption**: Swoole, Swow, ionCube (must be installed after OPcache)

:::tip Version-Aware Availability
The module catalog adapts to the selected PHP version:

- **Swow** is only available on PHP 8.0 and later
- **pspell** and **imap** are removed on PHP 8.4 and later (no longer recommended)
- **OPcache** is no longer offered as an installable module on PHP 8.5 and later, since it is built in natively
  :::

### Configuration Files (PHP)

You can edit PHP's main configuration file (php.ini) via the **Main Configuration** tab and the FPM configuration file via the **FPM Configuration** tab using a built-in editor. The **View PHPInfo** button on the running status page shows the full `phpinfo()` output.

### Parameter Tuning (PHP)

The **Parameter Tuning** tab provides a form-based way to adjust common settings without editing the raw configuration. It is organized into the following sections:

- **General**: `short_open_tag`, `date.timezone`, `display_errors`, and `error_reporting`
- **Disabled Functions**: a comma-separated list of PHP functions to disable (e.g. `exec`, `shell_exec`, `system`, `passthru`)
- **Upload Limits**: `upload_max_filesize`, `post_max_size`, `max_file_uploads`, and `memory_limit`
- **Timeout Limits**: `max_execution_time`, `max_input_time`, and `max_input_vars`
- **Performance Tuning**: PHP-FPM process manager settings (`pm`, `pm.max_children`, and, for `dynamic` mode, `pm.start_servers`, `pm.min_spare_servers`, `pm.max_spare_servers`)
- **Session**: `session.save_handler` (files, redis, or memcached), the matching connection details or save path, `session.gc_maxlifetime`, and `session.cookie_lifetime`. A **Clean Session Files** button deletes all session files; it only takes effect when the save handler is set to `files`

### Logs (PHP)

The PHP runtime environment provides a separate **Load Status** tab (FPM pool load), along with **Runtime Logs**, **Error Logs**, and **Slow Logs** tabs for monitoring and troubleshooting.

### Language-Specific Settings

Some runtime environments provide dedicated settings on their management page:

- **Go**: Configure the module proxy (`GOPROXY`), with presets for the official proxy and mirrors such as goproxy.cn, Alibaba, and Tencent
- **Node.js**: Configure the npm registry, with presets for the official registry and mirrors such as npmmirror, Tencent, and Huawei
- **Python**: Configure the pip mirror, with presets for the official source and mirrors such as Alibaba, Tencent, Tsinghua, and USTC

### Set as CLI Default Version

Click the **Set as CLI Default Version** button to set the current version as the default version used by the command line. This is available for all runtime environments (Go, Java, Node.js, PHP, Python, and .NET).

## Multiple Version Coexistence

AcePanel supports multiple versions of the same language coexisting. For example, you can install both PHP 7.4 and PHP 8.3 simultaneously, and different websites can use different PHP versions.

Installation path rules:

- **Go**: `/opt/ace/server/go/version`
- **Java**: `/opt/ace/server/java/version`
- **Node.js**: `/opt/ace/server/nodejs/version`
- **PHP**: `/opt/ace/server/php/version`
- **Python**: `/opt/ace/server/python/version`
- **.NET**: `/opt/ace/server/dotnet/version`

## Using in Projects

When creating a project, you can select the runtime environment version to use in the project settings. See [Project Management](../project) documentation for details.

## Update Runtime Environment

When a new version is available, the latest version number will be displayed in the list. You can:

1. Uninstall the old version and install the new version
2. Keep the old version and install the new version simultaneously (recommended)

:::warning Note
Updating runtime environment versions may cause compatibility issues with projects that depend on that version. Please verify in a test environment before updating the production environment.
:::
