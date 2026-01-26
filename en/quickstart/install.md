# Installation

## System Requirements

- Architecture: `amd64` / `arm64`
- Memory: ≥ 512MB (1GB or more recommended)
- Disk: ≥ 10GB available space

## Supported Operating Systems

| System           | Version | Status          |
|------------------|---------|-----------------|
| AlmaLinux        | 10      | Recommended     |
| AlmaLinux        | 9       | Supported       |
| RockyLinux       | 10      | Recommended     |
| RockyLinux       | 9       | Supported       |
| Debian           | 13      | Recommended     |
| Debian           | 12      | Supported       |
| Ubuntu           | 24      | Recommended     |
| Ubuntu           | 22      | Supported       |
| OpenCloudOS      | 9       | Supported       |
| TencentOS Server | 4       | Supported       |
| CentOS Stream    | 10      | Not Recommended |
| CentOS Stream    | 9       | Not Recommended |

Systems not listed can be tried at your own risk, but technical support is not provided.

## Pre-installation Preparation

- Use a clean system for installation to avoid conflicts with existing environments
- If you need to mount a data disk, complete it before installation; directory migration is not supported after installation
- Ensure the server can access the internet normally

## Start Installation

::: tip AcePanel Recommends
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
