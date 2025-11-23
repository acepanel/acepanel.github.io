# Install Panel

AcePanel supports the latest two stable releases of mainstream `amd64` and `arm64` architecture systems. Installation of the LNMP environment has been tested on all systems listed in the table below.

It is recommended to use systems marked as **Recommended**. Unless there are special circumstances, it is not recommended to use systems marked as **Not Recommended**.

For systems not listed in the table below, you can try installing on your own, but no free technical support will be provided.

| System              | Version | Note            |
|---------------------|---------|-----------------|
| AlmaLinux           | 10      | Recommended     |
| AlmaLinux           | 9       | Recommended     |
| RockyLinux          | 10      | Supported       |
| RockyLinux          | 9       | Supported       |
| CentOS Stream       | 10      | Not Recommended |
| CentOS Stream       | 9       | Not Recommended |
| Ubuntu              | 24      | Recommended     |
| Ubuntu              | 22      | Supported       |
| Debian              | 13      | Recommended     |
| Debian              | 12      | Recommended     |
| OpenCloudOS         | 9       | Supported       |
| TencentOS Server    | 4       | Supported       |
| TencentOS Server    | 3       | Not Recommended |
| Alibaba Cloud Linux | 3       | Not Recommended |
| Anolis              | 8       | Not Recommended |

As system versions continue to update, we may also terminate support for some overly outdated systems to ensure the robustness of the Panel.

## Start Installation

> If you need to mount partitions, please complete before installing the Panel. Cross-directory migration is not supported after Panel installation.

**<span style="color: red;">AcePanel recommends using [LFCloud high-performance AMD EYPC server](https://www.dkdun.cn/aff/MQZZNVHQ) for installation.</span>**

Log in to the server as `root` user and run the following command to install the Panel:

```shell
curl -fsLm 10 -o install.sh https://dl.cdn.haozi.net/panel/install.sh && bash install.sh
```

Installation is usually completed within 2 minutes. Do not close the terminal during the installation process.
