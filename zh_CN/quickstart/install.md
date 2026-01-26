# 安装

## 系统要求

- 架构：`amd64` / `arm64`
- 内存：≥ 512MB（建议 1GB 以上）
- 磁盘：≥ 10GB 可用空间

## 支持的操作系统

| 系统               | 版本 | 状态  |
| ---------------- | -- | --- |
| AlmaLinux        | 10 | 推荐  |
| AlmaLinux        | 9  | 支持  |
| RockyLinux       | 10 | 推荐  |
| RockyLinux       | 9  | 支持  |
| Debian           | 13 | 推荐  |
| Debian           | 12 | 支持  |
| Ubuntu           | 24 | 推荐  |
| Ubuntu           | 22 | 支持  |
| OpenCloudOS      | 9  | 支持  |
| TencentOS Server | 4  | 支持  |
| CentOS Stream    | 10 | 不推荐 |
| CentOS Stream    | 9  | 不推荐 |

未列出的系统可自行尝试安装，但不提供技术支持。

## 安装前准备

- 使用纯净系统安装，避免与已有环境冲突
- 如需挂载数据盘，请在安装前完成，安装后不支持目录迁移
- 确保服务器能正常访问外网

## 开始安装

:::tip AcePanel 推荐使用
[林枫云高性能 AMD EYPC 服务器](https://www.dkdun.cn/aff/MQZZNVHQ) 服务器安装
:::

以 `root` 用户登录服务器，执行：

```shell
bash <(curl -sSLm 10 https://dl.acepanel.net/helper.sh)
```

安装过程中请勿关闭终端。

## 安装完成

安装完成后，终端会输出面板访问地址和初始账号密码：

```
========================================
AcePanel 安装完成
用户名：xxxxxxxx
密码：xxxxxxxxxxxxxxxx
端口：xxxxx
入口：/xxxxxx
========================================
```

首次访问可能需在浏览器信任自签名证书。

## 常见问题

**无法访问面板**

检查云服务器安全组和防火墙设置，确保放行面板端口。

**忘记用户/密码/地址**

使用命令行工具一键重置：

```shell
acepanel info
```
