# 第一个网站：部署 WordPress

本文以 WordPress 为例，演示如何通过 AcePanel 快速搭建 PHP 网站。

## 安装环境

进入「应用」页面：

1. 在「原生应用」中安装 Nginx 和 MySQL（或 Percona/MariaDB）
2. 在「运行环境」中安装 PHP（建议 8.0+）

安装进度可在「任务」页面查看。

## 创建网站

进入「网站」->「PHP」，点击「创建网站」。

![创建网站](/images/quickstart/website-create.png)

填写配置：

- **名称**：网站标识，如 `wordpress`，创建后不可改
- **域名**：你的域名，没有域名可填服务器 IP
- **根目录**：留空使用默认路径
- **PHP 版本**：选择刚安装的版本
- **数据库**：选择 MySQL，记下生成的数据库名、用户名、密码

## 上传 WordPress

从 [WordPress 官网](https://wordpress.org/download/) 下载安装包。

在网站列表点击「目录」进入文件管理，上传压缩包并解压。进入 `wordpress` 目录，`Ctrl+A` 全选，`Ctrl+X` 剪切，返回上级目录 `Ctrl+V` 粘贴，把文件移到网站根目录。

## 配置伪静态

回到网站列表，点击「编辑」，切换到「伪静态」标签页，选择预设的 `wordpress` 规则并保存。

![伪静态配置](/images/quickstart/website-rewrite.png)

::: tip HTTPS
可在「HTTPS」标签页一键签发免费的 Let's Encrypt 证书。
:::

## 安装 WordPress

浏览器访问你的域名，按提示完成安装：

1. 选择语言
2. 填写站点信息（标题、管理员账号等）
3. 数据库配置：填入之前记下的数据库信息，主机填 `localhost`

安装完成后即可登录 WordPress 后台。
