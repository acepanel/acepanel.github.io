# 备份

备份模块用于备份和恢复网站文件和数据库，支持本地备份和远程存储。

## 备份页面

![备份页面](/images/backup/backup.png)

## 备份类型

备份模块支持以下类型的备份：

| 类型 | 说明                           |
|------|------------------------------|
| 网站 | 备份网站文件                       |
| MySQL | 备份 Percona/MySQL/MariaDB 数据库 |
| PostgreSQL | 备份 PostgreSQL 数据库            |

## 创建备份

1. 选择备份类型标签（网站/MySQL/PostgreSQL）
2. 点击 **创建备份**
3. 选择要备份的网站或数据库
4. 选择存储位置
5. 点击确认

备份文件格式：
- 网站：`.zip` 压缩包
- 数据库：`.sql.zip` 压缩的 SQL 文件

## 备份列表

备份列表显示以下信息：

- **文件名**：备份文件名称
- **大小**：备份文件大小
- **更新日期**：备份时间
- **操作**：下载、恢复、删除

## 恢复备份

1. 在备份列表中找到要恢复的备份
2. 点击 **恢复** 按钮
3. 确认恢复操作

::: danger 警告
恢复操作会覆盖现有数据，请确保已备份当前数据！
:::

## 上传备份

点击 **上传备份** 按钮可以上传本地的备份文件，用于恢复数据。

## 存储管理

切换到 **存储** 标签页管理备份存储位置。

![存储管理](/images/backup/backup-storage.png)

### 本地存储

默认的存储位置，备份文件保存在服务器本地。

### 远程存储

点击 **添加存储** 可以添加远程存储，支持：

- **S3 兼容存储**：AWS S3、阿里云 OSS、腾讯云 COS 等
- **FTP/SFTP**：FTP 或 SFTP 服务器
- **WebDAV**：WebDAV 服务器

远程存储的优势：
- 异地备份，防止数据丢失
- 不占用服务器磁盘空间
- 便于多服务器共享备份

### S3 兼容存储配置

S3 兼容存储是最常用的远程存储方式，大多数云存储服务商都提供 S3 兼容接口。

#### 配置参数

| 参数 | 说明 |
|------|------|
| 名称 | 存储配置的名称，便于识别 |
| 类型 | 选择 S3 |
| Access Key | 访问密钥 ID |
| Secret Key | 访问密钥密码 |
| 风格 | Virtual Hosted 或 Path Style |
| 区域 | 区域代码，如 `us-east-1`、`cn-hangzhou` |
| 端点 | S3 服务端点 URL |
| 协议 | HTTPS（推荐）或 HTTP |
| 存储桶 | 存储桶名称 |
| 路径 | 备份文件存储的子路径（可选） |

#### 访问风格说明

S3 有两种 URL 访问风格：

- **Virtual Hosted Style**：`https://bucket.endpoint/key`
  - 桶名作为子域名
  - AWS S3 默认使用此风格

- **Path Style**：`https://endpoint/bucket/key`
  - 桶名作为路径的一部分
  - 自建 MinIO 等通常使用此风格

#### 兼容性列表

| 服务商 | 文档 | 兼容访问风格 | 兼容性 |
|--------|------|-------------|--------|
| 阿里云 OSS | [文档](https://help.aliyun.com/document_detail/410748.html) | Virtual Hosted Style | ✅ |
| 腾讯云 COS | [文档](https://cloud.tencent.com/document/product/436/41284) | Virtual Hosted Style / Path Style | ✅ |
| 七牛云 | [文档](https://developer.qiniu.com/kodo/4088/s3-access-domainname) | Virtual Hosted Style / Path Style | ✅ |
| 百度云 BOS | [文档](https://cloud.baidu.com/doc/BOS/s/Fjwvyq9xo) | Virtual Hosted Style / Path Style | ✅ |
| 京东云 | [文档](https://docs.jdcloud.com/cn/object-storage-service/api/regions-and-endpoints) | Virtual Hosted Style | ✅ |
| 金山云 | [文档](https://docs.ksyun.com/documents/6761) | Virtual Hosted Style | ✅ |
| 青云 QingStor | [文档](https://docsv3.qingcloud.com/storage/object-storage/s3/intro/) | Virtual Hosted Style / Path Style | ✅ |
| 网易数帆 | [文档](https://sf.163.com/help/documents/89796157866430464) | Virtual Hosted Style | ✅ |
| Cloudflare R2 | [文档](https://developers.cloudflare.com/r2/data-access/s3-api/) | Virtual Hosted Style / Path Style | ✅ |
| Oracle Cloud | [文档](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/s3compatibleapi.htm) | Virtual Hosted Style / Path Style | ✅ |
| 又拍云 | [文档](https://help.upyun.com/knowledge-base/aws-s3%E5%85%BC%E5%AE%B9/) | Virtual Hosted Style / Path Style | ✅ |
| 自建 MinIO | - | Path Style | ✅ |
| 华为云 OBS | - | Virtual Hosted Style | ❓ |

::: tip 提示
华为云官方文档未说明是否兼容 S3 API，但实际测试可以使用。
:::

#### 配置示例

**阿里云 OSS**

```
名称: aliyun-oss
类型: S3
Access Key: 你的 AccessKey ID
Secret Key: 你的 AccessKey Secret
风格: Virtual Hosted
区域: cn-hangzhou
端点: oss-cn-hangzhou.aliyuncs.com
协议: HTTPS
存储桶: your-bucket-name
路径: backup（可选）
```

**腾讯云 COS**

```
名称: tencent-cos
类型: S3
Access Key: 你的 SecretId
Secret Key: 你的 SecretKey
风格: Virtual Hosted
区域: ap-guangzhou
端点: cos.ap-guangzhou.myqcloud.com
协议: HTTPS
存储桶: your-bucket-name
路径: backup（可选）
```

**Cloudflare R2**

```
名称: cloudflare-r2
类型: S3
Access Key: 你的 Access Key ID
Secret Key: 你的 Secret Access Key
风格: Path Style
区域: auto
端点: <account-id>.r2.cloudflarestorage.com
协议: HTTPS
存储桶: your-bucket-name
路径: backup（可选）
```

**自建 MinIO**

```
名称: minio
类型: S3
Access Key: minioadmin
Secret Key: minioadmin
风格: Path Style
区域: us-east-1
端点: minio.example.com:9000
协议: HTTP 或 HTTPS
存储桶: backup
路径:（可选）
```

::: warning 注意
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

## 备份策略建议

### 备份频率

| 数据类型 | 建议频率 |
|----------|----------|
| 数据库 | 每天 |
| 网站文件 | 每周 |
| 配置文件 | 修改后立即备份 |

### 保留策略

- 保留最近 7 天的每日备份
- 保留最近 4 周的每周备份
- 保留最近 3 个月的每月备份

### 存储位置

- 至少保留一份本地备份
- 重要数据应同时备份到远程存储
- 定期验证备份文件的完整性
