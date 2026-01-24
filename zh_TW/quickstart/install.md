# 安裝面板

AcePanel supports the latest two stable releases of mainstream `amd64` and `arm64` architecture systems. Installation of
the LNMP environment has been tested on all systems listed in the table below.

It is recommended to use systems marked as **Recommended**. Unless there are special circumstances, it is not
recommended to use systems marked as **Not Recommended**.

For systems not listed in the table below, you can try installing on your own, but no free technical support will be
provided.

| 系統               | 版本 | 備註  |
| ---------------- | -- | --- |
| AlmaLinux        | 10 | 推薦  |
| AlmaLinux        | 9  | 支持  |
| RockyLinux       | 10 | 推薦  |
| RockyLinux       | 9  | 支持  |
| CentOS Stream    | 10 | 不推薦 |
| CentOS Stream    | 9  | 不推薦 |
| Ubuntu           | 24 | 推薦  |
| Ubuntu           | 22 | 支持  |
| Debian           | 13 | 推薦  |
| Debian           | 12 | 支持  |
| OpenCloudOS      | 9  | 支持  |
| TencentOS Server | 4  | 支持  |

As system versions continue to update, we may also terminate support for some overly outdated systems to ensure the
robustness of the Panel.

## 開始安裝

> 如需掛載分區，請在安裝面板前完成。 Directory migration is not
> supported after Panel installation.

**<span style="color: red;">AcePanel recommends
using [LFCloud high-performance AMD EYPC server](https://www.dkdun.cn/aff/MQZZNVHQ) for installation.</span>**

以 `root` 用戶登錄服務器，運行以下命令安裝面板：

```shell
bash <(curl -sSLm 10 https://dl.acepanel.net/helper.sh)
```

一般 2 分鐘內即可完成安裝。 安裝過程中請勿關閉終端。
