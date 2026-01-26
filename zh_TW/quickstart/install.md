# Installation

## System Requirements

- Architecture: `amd64` / `arm64`
- Memory: ≥ 512MB (1GB or more recommended)
- Disk: ≥ 10GB available space

## Supported Operating Systems

| 系統               | 版本 | Status |
| ---------------- | -- | ------ |
| AlmaLinux        | 10 | 推薦     |
| AlmaLinux        | 9  | 支持     |
| RockyLinux       | 10 | 推薦     |
| RockyLinux       | 9  | 支持     |
| Debian           | 13 | 推薦     |
| Debian           | 12 | 支持     |
| Ubuntu           | 24 | 推薦     |
| Ubuntu           | 22 | 支持     |
| OpenCloudOS      | 9  | 支持     |
| TencentOS Server | 4  | 支持     |
| CentOS Stream    | 10 | 不推薦    |
| CentOS Stream    | 9  | 不推薦    |

Systems not listed can be tried at your own risk, but technical support is not provided.

## Pre-installation Preparation

- Use a clean system for installation to avoid conflicts with existing environments
- If you need to mount a data disk, complete it before installation; directory migration is not supported after installation
- Ensure the server can access the internet normally

## 開始安裝

:::tip AcePanel Recommends
[LF Cloud High-Performance AMD EPYC Servers](https://www.dkdun.cn/aff/MQZZNVHQ) for installation
:::

Log in to the server as `root` user and execute:

```shell
bash <(curl -sSLm 10 https://dl.acepanel.net/helper.sh)
```

Do not close the terminal during installation.

## Installation Complete

After installation, the terminal will display the panel access address and initial account credentials:

```
========================================
AcePanel Installation Complete
Username: xxxxxxxx
Password: xxxxxxxxxxxxxxxx
Port: xxxxx
Entry: /xxxxxx
========================================
```

First-time access may require trusting the self-signed certificate in your browser.

## FAQ

**Cannot access the panel**

Check the cloud server security group and firewall settings to ensure the panel port is allowed.

**Forgot username/password/address**

Use the command line tool to reset:

```shell
acepanel info
```
