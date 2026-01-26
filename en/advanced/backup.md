# Backup

The backup module is used to backup and restore website files and databases, supporting local backup and remote storage.

## Backup Page

![Backup Page](/images/backup/backup.png)

## Backup Types

The backup module supports the following types of backups:

| Type | Description                           |
|------|---------------------------------------|
| Website | Backup website files                  |
| MySQL | Backup Percona/MySQL/MariaDB databases |
| PostgreSQL | Backup PostgreSQL databases           |

## Create Backup

1. Select the backup type tab (Website/MySQL/PostgreSQL)
2. Click **Create Backup**
3. Select the website or database to backup
4. Select storage location
5. Click Confirm

Backup file formats:
- Website: `.zip` compressed package
- Database: `.sql.zip` compressed SQL file

## Backup List

The backup list displays the following information:

- **Filename**: Backup file name
- **Size**: Backup file size
- **Update Date**: Backup time
- **Actions**: Download, restore, delete

## Restore Backup

1. Find the backup to restore in the backup list
2. Click the **Restore** button
3. Confirm the restore operation

::: danger Warning
The restore operation will overwrite existing data. Please ensure you have backed up current data!
:::

## Upload Backup

Click the **Upload Backup** button to upload local backup files for data restoration.

## Storage Management

Switch to the **Storage** tab to manage backup storage locations.

![Storage Management](/images/backup/backup-storage.png)

### Local Storage

The default storage location, backup files are saved locally on the server.

### Remote Storage

Click **Add Storage** to add remote storage, supporting:

- **S3 Compatible Storage**: AWS S3, Alibaba Cloud OSS, Tencent Cloud COS, etc.
- **FTP/SFTP**: FTP or SFTP servers
- **WebDAV**: WebDAV servers

Advantages of remote storage:
- Off-site backup to prevent data loss
- Does not occupy server disk space
- Convenient for sharing backups across multiple servers

### S3 Compatible Storage Configuration

S3 compatible storage is the most commonly used remote storage method. Most cloud storage providers offer S3 compatible interfaces.

#### Configuration Parameters

| Parameter | Description |
|-----------|-------------|
| Name | Name of the storage configuration for identification |
| Type | Select S3 |
| Access Key | Access Key ID |
| Secret Key | Access Key Secret |
| Style | Virtual Hosted or Path Style |
| Region | Region code, e.g., `us-east-1`, `cn-hangzhou` |
| Endpoint | S3 service endpoint URL |
| Protocol | HTTPS (recommended) or HTTP |
| Bucket | Bucket name |
| Path | Sub-path for backup file storage (optional) |

#### Access Style Explanation

S3 has two URL access styles:

- **Virtual Hosted Style**: `https://bucket.endpoint/key`
  - Bucket name as subdomain
  - AWS S3 uses this style by default

- **Path Style**: `https://endpoint/bucket/key`
  - Bucket name as part of the path
  - Self-hosted MinIO typically uses this style

#### Compatibility List

| Provider | Documentation | Compatible Access Style | Compatibility |
|----------|---------------|------------------------|---------------|
| Alibaba Cloud OSS | [Docs](https://help.aliyun.com/document_detail/410748.html) | Virtual Hosted Style | ✅ |
| Tencent Cloud COS | [Docs](https://cloud.tencent.com/document/product/436/41284) | Virtual Hosted Style / Path Style | ✅ |
| Qiniu Cloud | [Docs](https://developer.qiniu.com/kodo/4088/s3-access-domainname) | Virtual Hosted Style / Path Style | ✅ |
| Baidu Cloud BOS | [Docs](https://cloud.baidu.com/doc/BOS/s/Fjwvyq9xo) | Virtual Hosted Style / Path Style | ✅ |
| JD Cloud | [Docs](https://docs.jdcloud.com/cn/object-storage-service/api/regions-and-endpoints) | Virtual Hosted Style | ✅ |
| Kingsoft Cloud | [Docs](https://docs.ksyun.com/documents/6761) | Virtual Hosted Style | ✅ |
| QingCloud QingStor | [Docs](https://docsv3.qingcloud.com/storage/object-storage/s3/intro/) | Virtual Hosted Style / Path Style | ✅ |
| NetEase Shufan | [Docs](https://sf.163.com/help/documents/89796157866430464) | Virtual Hosted Style | ✅ |
| Cloudflare R2 | [Docs](https://developers.cloudflare.com/r2/data-access/s3-api/) | Virtual Hosted Style / Path Style | ✅ |
| Oracle Cloud | [Docs](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/s3compatibleapi.htm) | Virtual Hosted Style / Path Style | ✅ |
| Upyun | [Docs](https://help.upyun.com/knowledge-base/aws-s3%E5%85%BC%E5%AE%B9/) | Virtual Hosted Style / Path Style | ✅ |
| Self-hosted MinIO | - | Path Style | ✅ |
| Huawei Cloud OBS | - | Virtual Hosted Style | ❓ |

::: tip Note
Huawei Cloud official documentation does not specify S3 API compatibility, but it works in actual testing.
:::

#### Configuration Examples

**Alibaba Cloud OSS**

```
Name: aliyun-oss
Type: S3
Access Key: Your AccessKey ID
Secret Key: Your AccessKey Secret
Style: Virtual Hosted
Region: cn-hangzhou
Endpoint: oss-cn-hangzhou.aliyuncs.com
Protocol: HTTPS
Bucket: your-bucket-name
Path: backup (optional)
```

**Tencent Cloud COS**

```
Name: tencent-cos
Type: S3
Access Key: Your SecretId
Secret Key: Your SecretKey
Style: Virtual Hosted
Region: ap-guangzhou
Endpoint: cos.ap-guangzhou.myqcloud.com
Protocol: HTTPS
Bucket: your-bucket-name
Path: backup (optional)
```

**Cloudflare R2**

```
Name: cloudflare-r2
Type: S3
Access Key: Your Access Key ID
Secret Key: Your Secret Access Key
Style: Path Style
Region: auto
Endpoint: <account-id>.r2.cloudflarestorage.com
Protocol: HTTPS
Bucket: your-bucket-name
Path: backup (optional)
```

**Self-hosted MinIO**

```
Name: minio
Type: S3
Access Key: minioadmin
Secret Key: minioadmin
Style: Path Style
Region: us-east-1
Endpoint: minio.example.com:9000
Protocol: HTTP or HTTPS
Bucket: backup
Path: (optional)
```

::: warning Note
- Please ensure the bucket has been created and has correct access permissions
- It is recommended to create dedicated access keys for backups with limited permissions
- Some providers' Endpoints need to include region information
:::

## Scheduled Backup

Combined with the [Scheduled Tasks](./task/schedule) feature, you can set up automatic scheduled backups:

1. Go to **Tasks** > **Scheduled Tasks**
2. Create a new task
3. Select backup type
4. Set execution schedule
5. Select storage location

## Backup Strategy Recommendations

### Backup Frequency

| Data Type | Recommended Frequency |
|-----------|----------------------|
| Database | Daily |
| Website Files | Weekly |
| Configuration Files | Immediately after modification |

### Retention Policy

- Keep daily backups for the last 7 days
- Keep weekly backups for the last 4 weeks
- Keep monthly backups for the last 3 months

### Storage Location

- Keep at least one local backup
- Important data should also be backed up to remote storage
- Regularly verify the integrity of backup files
