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

- **名称**：网站标识，如 `wordpress`
- **域名**：绑定的域名，如 `blog.example.com`
- **端口**：监听端口，默认 80
- **PHP 版本**：选择已安装的 PHP 版本
- **网站目录**：网站文件存放路径
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
- **防跨站攻击**：启用后限制 PHP 只能访问网站目录内的文件

### 伪静态配置

伪静态用于 URL 重写，支持常见 PHP 程序的预设规则。

![伪静态配置](/images/website/website-php-rewrite.png)

点击预设下拉框可以选择常见程序的伪静态规则：

![伪静态预设](/images/website/website-php-rewrite-preset.png)

支持的预设包括：WordPress、Laravel、ThinkPHP、Discuz、Drupal、ECShop 等常见 PHP 程序。

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

## PHP 配置

### php.ini 配置

在 **应用** > **原生应用** > **PHP** 管理页面可以修改 php.ini 配置。

常用配置项：

```ini
upload_max_filesize = 50M    # 最大上传文件大小
post_max_size = 50M          # POST 数据最大大小
max_execution_time = 300     # 最大执行时间
memory_limit = 256M          # 内存限制
```

### 禁用函数

PHP 默认禁用了一些危险函数，如 `exec`、`system`、`passthru` 等。 如需启用，请在 php.ini 中修改 `disable_functions` 配置。

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
