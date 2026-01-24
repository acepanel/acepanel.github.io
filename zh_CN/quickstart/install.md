# 安装面板

AcePanel 支持最新的两个稳定版本的主流 `amd64` 和 `arm64` 架构系统。 在下面的表格中列出的所有系统上均已测试 LNMP 环境的安装。

建议使用标注为**推荐**的系统。 无特殊情况不建议使用标注**不推荐**的系统。

不在下表中的其他系统，可自行尝试安装，但不提供无偿技术支持。

| 系统               | 版本 | 备注  |
| ---------------- | -- | --- |
| AlmaLinux        | 10 | 推荐  |
| AlmaLinux        | 9  | 支持  |
| RockyLinux       | 10 | 推荐  |
| RockyLinux       | 9  | 支持  |
| CentOS Stream    | 10 | 不推荐 |
| CentOS Stream    | 9  | 不推荐 |
| Ubuntu           | 24 | 推荐  |
| Ubuntu           | 22 | 支持  |
| Debian           | 13 | 推荐  |
| Debian           | 12 | 支持  |
| OpenCloudOS      | 9  | 支持  |
| TencentOS Server | 4  | 支持  |

随着系统版本的不断更新，我们亦可能会终止部分过于老旧的系统的支持，以保证面板的健壮性。

## 开始安装

> 如需挂载分区，请在安装面板前完成。 在面板安装后不支持目录迁移。

**<span style="color: red;">AcePanel 推荐使用 [林枫云高性能 AMD EYPC 服务器](https://www.dkdun.cn/aff/MQZZNVHQ) 进行安装。</span>**

以 `root` 用户登录服务器，运行以下命令安装面板：

```shell
bash <(curl -sSLm 10 https://dl.acepanel.net/helper.sh)
```

一般 2 分钟内即可完成安装。 安装过程中请勿关闭终端。
