# 第一个网站：部署 WordPress

本文以 WordPress 为例，演示如何通过 AcePanel 快速搭建 PHP 网站。

## 安装环境

进入「应用商店」页面：

1. 在「原生应用」中安装 Nginx 和 Percona（或 MySQL/MariaDB）
2. 在「运行环境」中安装 PHP（推荐 8.3+）

安装进度可在「任务」页面的「面板任务」标签页查看。

## 创建网站

进入「网站」->「PHP」，点击「创建网站」。

![创建网站](/images/quickstart/website-create.png)

:::tip 网站类型
像上面那样从「PHP」标签页进入会预选 PHP 类型并隐藏类型选择器。 如果改从顶部的「全部」标签页开始，表单会多出一个 **网站类型** 选择器，包含三个选项：**反向代理**、**PHP** 和 **纯静态**。 在那里选择 **PHP** 即可得到下面描述的相同字段。
:::

填写配置：

- **名称**：网站标识，例如 `wordpress`，仅支持字母、数字、连字符和下划线，创建后无法修改
- **域名**：你的域名，没有域名可填服务器 IP
- **端口**：默认为 `80`
- **PHP 版本**：选择刚安装的版本
- **数据库**：选择 MySQL，记下自动生成的数据库名、用户名和密码
- **目录**：网站根目录，留空则默认为 `网站目录/网站名称/public`

## 上传 WordPress

从 [WordPress 官网](https://wordpress.org/download/) 下载安装包。

点击网站列表中「目录」列的路径进入文件管理，上传压缩包并解压。 进入 `wordpress` 目录，`Ctrl+A` 全选，`Ctrl+X` 剪切，返回上级目录 `Ctrl+V` 粘贴，把文件移到网站根目录。

## 配置伪静态

回到网站列表，点击「编辑」，切换到「伪静态」标签页，选择预设的 `wordpress` 规则并保存。

![伪静态配置](/images/quickstart/website-rewrite.png)

:::tip WordPress 多站点
如果你运行的是 WordPress 多站点网络而非单站点，请从同一下拉菜单中选择 `wordpress-multisite` 预设。
:::

:::tip HTTPS
可在「HTTPS」标签页一键签发免费的 Let's Encrypt 证书。
:::

## 安装 WordPress

浏览器访问你的域名，按提示完成安装：

1. 选择语言
2. 填写站点信息（标题、管理员账号等）
3. 数据库配置：填入之前记下的数据库信息，主机填 `localhost`

安装完成后即可登录 WordPress 后台。
