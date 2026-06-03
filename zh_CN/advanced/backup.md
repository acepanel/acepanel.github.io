# 备份

备份模块用于备份和恢复网站文件和数据库，支持本地备份和远程存储。

## 备份页面

![备份页面](/images/backup/backup.png)

## 备份类型

备份模块支持以下类型的备份：

| 类型         | 说明                           |
| ---------- | ---------------------------- |
| 网站         | 备份网站文件                       |
| MySQL      | 备份 Percona/MySQL/MariaDB 数据库 |
| PostgreSQL | 备份 PostgreSQL 数据库            |

MySQL 和 PostgreSQL 选项卡仅在安装了相应的数据库引擎时才会出现。

## 创建备份

1. 选择备份类型标签（网站/MySQL/PostgreSQL）
2. 点击 **创建备份**
3. 选择要备份的网站（网站类型）或输入数据库名称（数据库类型）
4. 选择备份存储
5. 点击提交

备份归档的压缩格式由 **设置** > **基础** > **备份压缩格式** 控制，支持 `tar.xz`（默认）、`tar.gz`、`tar.zst`、`zip` 和 `7z`。

备份文件格式（`<format>` 为配置的压缩格式）：

- 网站：`<name>.<format>` 网站目录的归档
- 数据库：`<name>.sql.<format>` 压缩的 SQL 转储

## 备份列表

备份列表显示以下信息：

- **文件名**：备份文件名称
- **大小**：备份文件大小
- **更新日期**：备份时间
- **操作**：恢复、删除

## 恢复备份

1. 在备份列表中找到要恢复的备份
2. 点击 **恢复** 按钮
3. 在对话框中选择目标网站（网站类型）或输入目标数据库名称（数据库类型），然后点击提交

:::danger 警告
恢复操作会覆盖现有数据， 请确保已备份当前数据！
:::

## 上传备份

点击 **上传备份** 按钮可以上传本地的备份文件，用于恢复数据。 支持的文件类型为 `.sql`、`.zip`、`.tar`、`.gz`、`.tgz`、`.bz2`、`.xz`、`.zst` 和 `.7z`。

## 存储管理

切换到 **存储** 标签页管理备份存储位置。

![存储管理](/images/backup/backup-storage.png)

### 本地存储

默认的存储位置，备份文件保存在服务器本地。

### 远程存储

点击 **添加存储** 可以添加远程存储，支持：

- **S3 兼容存储**：AWS S3、阿里云 OSS、腾讯云 COS 等
- **SFTP**：SFTP 服务器（使用密码或私钥进行身份验证）
- **WebDAV**：WebDAV 服务器

远程存储的优势：

- 异地备份，防止数据丢失
- 不占用服务器磁盘空间
- 便于多服务器共享备份

### S3 兼容存储配置

S3 兼容存储是最常用的远程存储方式， 大多数云存储服务商都提供 S3 兼容接口。

#### 配置参数

| 参数         | 说明                               |
| ---------- | -------------------------------- |
| 名称         | 存储配置的名称，便于识别                     |
| 类型         | 选择 S3                            |
| Access Key | Access Key ID                    |
| Secret Key | Access Key Secret                |
| 风格         | Virtual Hosted 或 Path Style      |
| 区域         | 区域代码，如 `us-east-1`、`cn-hangzhou` |
| 端点         | S3 服务端点 URL                      |
| 协议         | HTTPS（推荐）或 HTTP                  |
| 存储桶        | 存储桶名称                            |
| 路径         | 备份文件存储的子路径（可选）                   |

#### 访问风格说明

S3 有两种 URL 访问风格：

- **Virtual Hosted Style**：`https://bucket.endpoint/key`
  - 桶名作为子域名
  - AWS S3 默认使用此风格

- **Path Style**：`https://endpoint/bucket/key`
  - 桶名作为路径的一部分
  - 自建 MinIO 等通常使用此风格

#### 兼容性列表

| 服务商           | 文档                                                                                 | 兼容访问风格                      | 兼容性 |
| ------------- | ---------------------------------------------------------------------------------- | --------------------------- | --- |
| 阿里云 OSS       | [文档](https://help.aliyun.com/document_detail/410748.html)                          | Virtual Hosted 风格           | ✅   |
| 腾讯云 COS       | [文档](https://cloud.tencent.com/document/product/436/41284)                         | Virtual Hosted 风格 / Path 风格 | ✅   |
| 七牛云           | [文档](https://developer.qiniu.com/kodo/4088/s3-access-domainname)                   | Virtual Hosted 风格 / Path 风格 | ✅   |
| 百度云 BOS       | [文档](https://cloud.baidu.com/doc/BOS/s/Fjwvyq9xo)                                  | Virtual Hosted 风格 / Path 风格 | ✅   |
| 京东云           | [文档](https://docs.jdcloud.com/cn/object-storage-service/api/regions-and-endpoints) | Virtual Hosted 风格           | ✅   |
| 金山云           | [文档](https://docs.ksyun.com/documents/6761)                                        | Virtual Hosted 风格           | ✅   |
| 青云 QingStor   | [文档](https://docsv3.qingcloud.com/storage/object-storage/s3/intro/)                | Virtual Hosted 风格 / Path 风格 | ✅   |
| 网易数帆          | [文档](https://sf.163.com/help/documents/89796157866430464)                          | Virtual Hosted 风格           | ✅   |
| Cloudflare R2 | [文档](https://developers.cloudflare.com/r2/data-access/s3-api/)                     | Virtual Hosted 风格 / Path 风格 | ✅   |
| 甲骨文云          | [文档](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/s3compatibleapi.htm)  | Virtual Hosted 风格 / Path 风格 | ✅   |
| 又拍云           | [文档](https://help.upyun.com/knowledge-base/aws-s3%E5%85%BC%E5%AE%B9/)              | Virtual Hosted 风格 / Path 风格 | ✅   |
| 自建 MinIO      | -                                                                                  | Path 风格                     | ✅   |
| 华为云 OBS       | -                                                                                  | Virtual Hosted 风格           | ❓   |

:::tip 提示
华为云官方文档未说明是否兼容 S3 API，但实际测试可以使用。
:::

#### 配置示例

**阿里云 OSS**

```
Name: aliyun-oss
Type: S3
Access Key: 你的 AccessKey ID
Secret Key: 你的 AccessKey Secret
Style: Virtual Hosted
Region: cn-hangzhou
Endpoint: oss-cn-hangzhou.aliyuncs.com
Scheme: HTTPS
Bucket: your-bucket-name
Path: backup (可选)
```

**腾讯云 COS**

```
Name: tencent-cos
Type: S3
Access Key: 你的 SecretId
Secret Key: 你的 SecretKey
Style: Virtual Hosted
Region: ap-guangzhou
Endpoint: cos.ap-guangzhou.myqcloud.com
Scheme: HTTPS
Bucket: your-bucket-name
Path: backup (可选)
```

**Cloudflare R2**

```
Name: cloudflare-r2
Type: S3
Access Key: 你的 Access Key ID
Secret Key: 你的 Secret Access Key
Style: Path Style
Region: auto
Endpoint: <account-id>.r2.cloudflarestorage.com
Scheme: HTTPS
Bucket: your-bucket-name
Path: backup (可选)
```

**自建 MinIO**

```
Name: minio
Type: S3
Access Key: minioadmin
Secret Key: minioadmin
Style: Path Style
Region: us-east-1
Endpoint: minio.example.com:9000
Scheme: HTTP or HTTPS
Bucket: backup
Path: (可选)
```

:::warning 注意

- 请确保存储桶已创建且有正确的访问权限
- 建议为备份创建专用的访问密钥，并限制权限范围
- 部分服务商的 Endpoint 需要包含区域信息
  :::

## 定时备份

结合 [计划任务](./task/schedule) 功能，可以设置定时自动备份：

1. 进入 **任务** > **计划任务**
2. 创建新任务
3. 选择备份类型
4. 设置执行周期
5. 选择存储位置

## 命令行备份

除了 Web 界面，还可以通过[命令行工具](../quickstart/cli)触发备份。 这对于自定义 shell 脚本以及计划任务运行的命令非常有用。 大多数命令接受一个可选的 `-s, --storage` 参数来指定存储 ID（`panel` 命令除外）；省略时备份将保存到本地存储。

```shell
# 按名称备份网站
acepanel backup website -n <website_name> [-s <storage_id>]

# 备份数据库（type 为 mysql 或 postgresql）
acepanel backup database -t <type> -n <database_name> [-s <storage_id>]

# 备份任意目录
acepanel backup path -p <directory_path> [-s <storage_id>]

# 备份面板自身
acepanel backup panel

# 清理旧备份，保留最近的 <keep> 份
# <file> 是用于匹配同一目标备份的文件名前缀
acepanel backup clear -t <type> -f <file> -k <keep> [-s <storage_id>]
```

:::tip 注意
命令行工具可以备份目录（`path`）和面板（`panel`），这些在 Web 备份模块中没有对应的选项卡。 `clear` 命令与计划备份任务使用的保留清理相同：对每个目标保留最新的 `keep` 份归档并删除其余的。
:::

## 备份策略建议

### 备份频率

| 数据类型 | 建议频率    |
| ---- | ------- |
| 数据库  | 每天      |
| 网站文件 | 每周      |
| 配置文件 | 修改后立即备份 |

### 保留策略

- 保留最近 7 天的每日备份
- 保留最近 4 周的每周备份
- 保留最近 3 个月的每月备份

### 存储位置

- 至少保留一份本地备份
- 重要数据应同时备份到远程存储
- 定期验证备份文件的完整性
