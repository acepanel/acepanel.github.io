# AcePanel 3.0 正式发布

好久不见，经过几次跳票延期，AcePanel 3.0 终于在 2026 年初完成开发，经过了约 3 个星期的内测，现在是时候发布了。

## 升级全新品牌名称 AcePanel

AcePanel 原名耗子面板，是本人 2022 年底开发的服务器运维管理面板。

之前收到最多的一个反馈就是耗子面板这个名字不好听，于是我们现在换了更高端大气上档次的名字 - AcePanel，你也可以叫它王牌面板/艾斯面板。

![AcePanel Logo](https://wmimg.com/i/1424/2026/01/6975d8a45a01d.png)

本文以下 AcePanel 均表示 AcePanel 3.0 版本

## 支持运行环境与项目管理

AcePanel 这次最大的更新就是新增了运行环境功能，支持一键安装与管理 Go、Java、Node.js、PHP、Python 等运行环境，支持多版本同时共存。

![AcePanel 运行环境](https://wmimg.com/i/1424/2026/01/6975d8a49a638.png)

同时 AcePanel 基于 Linux systemd 的强大能力全新开发了项目管理功能，支持通过安装的运行环境一键创建与管理各类 Web 项目和常驻程序，可平替 PM2、Supervisor 等工具。

![AcePanel 项目列表](https://wmimg.com/i/1424/2026/01/6975d8a386a79.png)

![AcePanel 项目编辑](https://wmimg.com/i/1424/2026/01/6975d8a4454f7.png)

## 网站管理重构

AcePanel 还对网站管理功能进行了重构，重新组织了网站目录结构，支持反向代理、纯静态、PHP 3 种网站类型，并新增了多项常用配置以及自定义功能。

![AcePanel 反向代理网站上游编辑](https://wmimg.com/i/1424/2026/01/6975d8a3e8c5b.png)

![AcePanel 反向代理网站代理编辑](https://wmimg.com/i/1424/2026/01/6975d8a59b896.png)

新的网站目录结构允许灵活添加各种自定义配置，且不易冲突。

## 应用中心优化

AcePanel 正式上线期待已久的容器编排模版功能，支持一键部署 WordPress、Nextcloud、GitLab 等常用程序。

![AcePanel 编排模版](https://wmimg.com/i/1424/2026/01/6975d8a59c3b9.png)

（缺少你想要的程序？欢迎向 AcePanel 模版库提交 PR，方式可见文末）

AcePanel 在原有 OpenResty 与 Percona 的基础上新增 Nginx 与 MySQL、MariaDB，同时还优化了许多应用的安装流程以提高安装速度，特别对 Percona/MySQL/MariaDB 为常用系统使用预制安装包以极大提高安装速度和成功率。

（实测 MySQL 通常可以在 2 分钟内完成安装）

## 备份优化

AcePanel 优化了备份功能，新增备份存储设置，支持添加 S3、SFTP 等常用远程存储。

（你可能会问为什么没有 OSS、COS？这是因为 OSS、COS 等均提供 S3 兼容接口，可直接使用 S3 配置，因此没必要单独为它们引入依赖以及额外开发。）

![AcePanel 添加备份存储](https://wmimg.com/i/1424/2026/01/6975d8a5c18e5.png)

## 全新的面板助手

AcePanel 使用 Go 语言重写了原来基于 shell 脚本的安装器，新的面板助手全面支持交互式安装及多语言，提供更好、更现代的用户体验。

![AcePanel 安装器](https://wmimg.com/i/1424/2026/01/6975d8a5d98b9.png)

## 使用优化

AcePanel 全面优化了文件管理，还原类似 Windows 资源管理器的操作体验（支持快捷键操作）。

![AcePanel 文件管理（列表）](https://wmimg.com/i/1424/2026/01/6975d8a64b601.png)

![AcePanel 文件管理（图标）](https://wmimg.com/i/1424/2026/01/6975d959712cf.png)

基于 Monaco 开发全新的文件编辑器，即是编辑器，亦可作为在线 IDE 使用（同样支持快捷键操作）。

![AcePanel 文件编辑](https://wmimg.com/i/1424/2026/01/6975d95a50149.png)

工具箱能力全面提升，进程管理支持右键操作，同时新增 SSH 服务管理，磁盘管理，日志清理以及 Web 钩子等功能。

![AcePanel 进程管理](https://wmimg.com/i/1424/2026/01/6975d95ab38b2.png)

![AcePanel SSH 管理](https://wmimg.com/i/1424/2026/01/6975d95a283e1.png)

![AcePanel Web 钩子](https://wmimg.com/i/1424/2026/01/6975d95932b1d.png)

计划任务周期选择器重写，提供更友好的交互体验。

![AcePanel 创建计划任务](https://wmimg.com/i/1424/2026/01/6975d95b1ac63.png)

## 其他优化

- 支持使用 ACME 申请 Let's Encrypt IP 证书
- 入口错误页支持自定义
- 登录支持自动开启验证码
- 自定义 Logo 与隐藏菜单支持长期保存
- 新增操作日志记录与查看功能
- 证书管理新增 ACME ARI 支持
- 图标全面本地化，不再需要依赖外部 CDN
- Nginx/OpenResty 新增 Stream 支持（四层代理）
- 新增 PHP 8.5 支持
- 新增 Apache Web 服务器基础支持
- 新增 LiteSSL 证书支持
- 容器与编排创建/启动支持实时显示进度
- 容器支持一键进入终端
- 资源监控支持自定义时间范围与网卡/磁盘选择
- 首页应用支持拖拽排序
- 文件管理支持大文件分片上传
- 文件管理支持压缩包双击解压
- 应用与运行环境、容器模版支持分类筛选
- SSH 终端支持私钥登录
- 系统工具箱 - DNS 适配现代网络管理方式
- 支持可视化修改 Docker 基本设置
- 数据库服务器列表支持一键进入终端
- 部分删除操作新增 5s 倒计时确认

## 问题修复

- 修复登录超过 120 分钟后面板自动登出的问题
- 修复 Docker 29+ 版本无法使用面板容器功能的问题
- 修复面板偶现 ERR_CONNECTION_REFUSED 错误的问题
- 修复面板 Websocket 会话存在资源泄露的问题
- 修复部分情况下防火墙端口放行不生效的问题
- 修复 PHP 设置默认 cli 版本不生效的问题
- 修复 rsync secrets 换行符写入不正确的问题
- 修复 fail2ban IPv6 地址显示和解封问题
- 其他已知问题修复

## 兼容性变化

鉴于 openEuler 及 Alibaba Cloud Linux 4 和 Anolis 23 等新版信创系统把软件源改的面目全非，适配极其困难，因此 AcePanel 3.0 决定放弃对这三个发行版的支持。建议切换到 AlmaLinux / Rocky Linux 使用，如必须使用信创系统可考虑 OpenCloudOS 9 或 TencentOS Server 4。

同时 AcePanel 3.0 版本起，不再支持基于 4.x 内核的 RHEL 8-based 系统（AlmaLinux 8/Rocky Linux 8），请升级至 9.x/10.x 使用。

其次为支持预制安装包以解决饱受诟病的 MySQL 编译慢问题，AcePanel 修改了默认安装目录为 `/opt/ace` 且不再允许自定义（预计影响不大，仍可在安装前挂载数据盘）。


## 关于旧版本升级及维护

计划在 AcePanel 3.0 稳定一段时间之后推出旧版耗子面板 2.x 升级至 AcePanel 3.0 的脚本，鉴于改动较大，预计无法实现完美升级，请留意。

旧版耗子面板 2.x 仍将继续维护一段时间的安全更新（预计到 2026 年底），您可在此期间自行安排时间点进行升级。

## 开源协议变化

新版本 AcePanel 决定使用更宽松的开源协议 BSD-3，希望未来能有更多的开发者参与进来，一起打造更好用的服务器面板。

当前可参与贡献的项目如下：

- [AcePanel 主程序（求star）](https://github.com/acepanel/panel)
- [AcePanel 安装器](https://github.com/acepanel/helper)
- [AcePanel 容器模版库](https://github.com/acepanel/templates)
- [AcePanel 文档](https://github.com/acepanel/acepanel.github.io)
- [AcePanel 翻译](https://zh.crowdin.com/project/acepanel)

不会代码？没关系，欢迎发表使用 AcePanel 搭建各种服务、发掘不同玩法的文章，帮助推广 AcePanel。

## 结束语

写这篇文章的时候是夜里 4 点多，转眼这个项目已经在上个月度过其 3 岁生日，当年写下第一行代码时我还对 Go 一窍不通，如今已经成长为有些人口中的大佬。

AcePanel 是我的青春，我希望将其写到极致而不留遗憾，因此来回重构了数次，如果因此影响了您的使用，我在此说声道歉。现在自己年纪也慢慢大了，加上工作与生活的琐事繁多，未来再想重构也不一定折腾得动了。

2026 年的 AI 已经非常强大，AcePanel 新版本中有大量复杂的交互逻辑均使用 Claude Opus 4.5 辅助开发，我承认以我的水平难以写出这样完善的交互。也许继续发展下去未来或将不再需要面板，而是直接对 AI 说：帮我安装 Nginx；帮我创建 xxx 项目。谁知道呢？

最后，感谢赞助商微晓朵和林枫云以及参与 AcePanel 内测的所有用户，没有你们的帮助 AcePanel 将难以如期发布。

附上 AcePanel 新版本的安装命令，欢迎测试体验：

```bash
bash <(curl -sSLm 10 https://dl.acepanel.net/helper.sh)
```
