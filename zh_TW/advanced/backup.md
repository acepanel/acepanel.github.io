# 備份

![備份管理](/images/backup/backup.png)

備份模組用於備份和恢復網站檔案和資料庫，支援本地備份和遠端儲存。

## 備份頁面

## 備份類型

備份模組支援以下類型的備份：

| 類型         | 說明                           |
| ---------- | ---------------------------- |
| 網站         | 備份網站檔案                       |
| MySQL      | 備份 Percona/MySQL/MariaDB 資料庫 |
| PostgreSQL | 備份 PostgreSQL 資料庫            |
| ClickHouse | 備份 ClickHouse 資料庫            |
| Redis      | 備份 Redis 資料                  |
| Valkey     | 備份 Valkey 資料                 |

只有存在對應資料庫伺服器時，相關資料庫標籤頁才會顯示。

## 建立備份

1. 選擇備份型別標籤頁（網站、MySQL、PostgreSQL、ClickHouse、Redis 或 Valkey）
2. 點選 **建立備份**
3. 選擇要備份的網站（網站類型）或輸入資料庫名稱（資料庫類型）
4. 選擇備份儲存
5. 點選提交

備份封存檔的壓縮格式由 **設定** > **基本** > **備份壓縮格式** 控制，支援 `tar.xz`（預設）、`tar.gz`、`tar.zst`、`zip` 和 `7z`。

備份檔案格式（`<format>` 為設定的壓縮格式）：

- 網站：`<name>.<format>` 網站目錄的封存檔
- 資料庫：`<name>.sql.<format>` 壓縮的 SQL 傾印

## 備份列表

備份列表顯示以下資訊：

- **檔案名稱**：備份檔案名稱
- **大小**：備份檔案大小
- **更新日期**：備份時間
- **操作**：下載、恢復、刪除

## 恢復備份

1. 在備份列表中找到要恢復的備份
2. 點選 **恢復**
3. 選擇目標網站或資料庫並提交任務
4. 在 **任務 > 面板任務**中跟蹤恢復進度，使用恢復後的資源前先檢查日誌

網站恢復可以識別其他伺服器面板生成的相容歸檔結構。 匯入外部歸檔後，必須檢查目標路徑和網站內容。

:::danger 警告
還原會在後台執行，並可能覆寫現有資料。 先備份當前目標； 關閉對話方塊不會停止任務。
:::

## 上傳備份

點選 **上傳備份** 按鈕，上傳本機備份檔案以進行資料還原。 支援的檔案類型為 `.sql`、`.zip`、`.tar`、`.gz`、`.tgz`、`.bz2`、`.xz`、`.zst` 和 `.7z`。

## 儲存管理

切換到 **儲存** 標籤頁管理備份儲存位置。

### 本地儲存

預設的儲存位置，備份檔案會儲存在伺服器本機。

### 遠端儲存

點選 **新增儲存** 來新增遠端儲存，支援：

- **S3 相容儲存**：AWS S3、阿里雲 OSS、騰訊雲 COS 等
- **SFTP**：SFTP 伺服器（使用密碼或私密金鑰進行驗證）
- **WebDAV**：WebDAV 伺服器

遠端儲存的優勢：

- 異地備份，防止資料遺失
- 不佔用伺服器磁碟空間
- 便於多伺服器共享備份

### S3 相容儲存配置

S3 相容儲存是最常用的遠端儲存方式。 大多數雲端儲存服務商都提供 S3 相容介面。

#### 設定參數

| 參數         | 說明                                |
| ---------- | --------------------------------- |
| 名稱         | 儲存配置的名稱，便於識別                      |
| 類型         | 選擇 S3                             |
| Access Key | Access Key ID                     |
| Secret Key | Access Key Secret                 |
| 風格         | Virtual Hosted 或 Path Style       |
| 區域         | 區域代碼，例如 `us-east-1`、`cn-hangzhou` |
| 端點         | S3 服務端點 URL                       |
| 通訊協定       | HTTPS（推薦）或 HTTP                   |
| Bucket     | 儲存桶名稱                             |
| 路徑         | 備份檔案儲存的子路徑（可選）                    |

#### 存取風格說明

S3 有兩種 URL 存取風格：

- **Virtual Hosted Style**：`https://bucket.endpoint/key`
  - 儲存貯體名稱作為子網域
  - AWS S3 預設使用此風格

- **Path Style**：`https://endpoint/bucket/key`
  - 桶名作為路徑的一部分
  - 自建 MinIO 等通常使用此風格

#### 相容性列表

| 服務商           | 文件                                                                                 | 相容的存取風格                     | 相容性 |
| ------------- | ---------------------------------------------------------------------------------- | --------------------------- | --- |
| 阿里雲 OSS       | [文件](https://help.aliyun.com/document_detail/410748.html)                          | Virtual Hosted 風格           | ✅   |
| 騰訊雲 COS       | [文件](https://cloud.tencent.com/document/product/436/41284)                         | Virtual Hosted 風格 / Path 風格 | ✅   |
| 七牛雲           | [文件](https://developer.qiniu.com/kodo/4088/s3-access-domainname)                   | Virtual Hosted 風格 / Path 風格 | ✅   |
| 百度雲 BOS       | [文件](https://cloud.baidu.com/doc/BOS/s/Fjwvyq9xo)                                  | Virtual Hosted 風格 / Path 風格 | ✅   |
| 京東雲           | [文件](https://docs.jdcloud.com/cn/object-storage-service/api/regions-and-endpoints) | Virtual Hosted 風格           | ✅   |
| 金山雲           | [文件](https://docs.ksyun.com/documents/6761)                                        | Virtual Hosted 風格           | ✅   |
| 青雲 QingStor   | [文件](https://docsv3.qingcloud.com/storage/object-storage/s3/intro/)                | Virtual Hosted 風格 / Path 風格 | ✅   |
| 網易數帆          | [文件](https://sf.163.com/help/documents/89796157866430464)                          | Virtual Hosted 風格           | ✅   |
| Cloudflare R2 | [文件](https://developers.cloudflare.com/r2/data-access/s3-api/)                     | Virtual Hosted 風格 / Path 風格 | ✅   |
| Oracle Cloud  | [文件](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/s3compatibleapi.htm)  | Virtual Hosted 風格 / Path 風格 | ✅   |
| 又拍雲           | [文件](https://help.upyun.com/knowledge-base/aws-s3%E5%85%BC%E5%AE%B9/)              | Virtual Hosted 風格 / Path 風格 | ✅   |
| 自建 MinIO      | -                                                                                  | Path 風格                     | ✅   |
| 華為雲 OBS       | -                                                                                  | Virtual Hosted 風格           | ❓   |

:::tip 提示
華為雲官方文件未說明 S3 API 相容性，但實際測試可用。
:::

#### 設定範例

**阿里雲 OSS**

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
Path: backup (選填)
```

**騰訊雲 COS**

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
Path: backup (選填)
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
Path: backup (選填)
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
Path: (選填)
```

:::warning 注意

- 請確保儲存貯體已建立且具有正確的存取權限
- 建議為備份建立專用的存取金鑰並限制權限
- 部分服務商的 Endpoint 需要包含區域資訊
  :::

## 定時備份

結合 [計劃任務](./task/schedule) 功能，可以設定定時自動備份：

1. 進入 **任務** > **計劃任務**
2. 建立一個新任務
3. 選擇備份類型
4. 設定執行週期
5. 選擇儲存位置

## 命令列備份

除了 Web 介面，還可以透過[命令列工具](../quickstart/cli)觸發備份。 這對於自訂 shell 腳本以及排程任務執行的命令非常有用。 大多數命令接受一個選填的 `-s, --storage` 參數來指定儲存 ID（`panel` 命令除外）；省略時備份會儲存到本機儲存。

```shell
# Backup a website by name
acepanel backup website -n <website_name> [-s <storage_id>]

# Backup a database (mysql, postgresql, clickhouse, redis, or valkey)
acepanel backup database -t <type> -n <database_name> [-s <storage_id>]

# Backup an arbitrary directory
acepanel backup path -p <directory_path> [-s <storage_id>]

# Backup the panel itself
acepanel backup panel

# Clean up old backups, keeping the most recent <keep> copies
# <file> is the file name prefix used to match backups of the same target
acepanel backup clear -t <type> -f <file> -k <keep> [-s <storage_id>]
```

:::tip 注意
命令列工具可以備份目錄（`path`）和面板（`panel`），這些在 Web 備份模組中沒有對應的分頁。 `clear` 命令與排程備份任務使用的保留清理相同：對每個目標保留最新的 `keep` 份封存檔並刪除其餘的。
:::

## 備份策略建議

### 備份頻率

| 資料類型 | 建議頻率    |
| ---- | ------- |
| 資料庫  | 每天      |
| 網站檔案 | 每週      |
| 配置檔案 | 修改後立即備份 |

### 保留策略

- 保留最近 7 天的每日備份
- 保留最近 4 週的每週備份
- 保留最近 3 個月的每月備份

### 儲存位置

- 至少保留一份本地備份
- 重要資料應同時備份到遠端儲存
- 定期驗證備份檔案的完整性
