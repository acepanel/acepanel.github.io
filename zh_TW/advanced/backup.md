# 備份

備份模組用於備份和還原網站檔案及資料庫，支援本機備份和遠端儲存。

## 備份頁面

![備份頁面](/images/backup/backup.png)

## 備份類型

備份模組支援以下類型的備份：

| 類型         | 說明                           |
| ---------- | ---------------------------- |
| 網站         | 備份網站檔案                       |
| MySQL      | 備份 Percona/MySQL/MariaDB 資料庫 |
| PostgreSQL | 備份 PostgreSQL 資料庫            |

MySQL 和 PostgreSQL 分頁僅在安裝了對應的資料庫引擎時才會出現。

## 建立備份

1. 選擇備份類型分頁（網站/MySQL/PostgreSQL）
2. 點選 **建立備份**
3. 選擇要備份的網站（網站類型）或輸入資料庫名稱（資料庫類型）
4. 選擇備份儲存
5. 點選提交

備份封存檔的壓縮格式由 **設定** > **基本** > **備份壓縮格式** 控制，支援 `tar.xz`（預設）、`tar.gz`、`tar.zst`、`zip` 和 `7z`。

備份檔案格式（`<format>` 為設定的壓縮格式）：

- 網站：`<name>.<format>` 網站目錄的封存檔
- 資料庫：`<name>.sql.<format>` 壓縮的 SQL 傾印

## 備份清單

備份清單會顯示以下資訊：

- **檔案名稱**：備份檔案名稱
- **大小**：備份檔案大小
- **更新日期**：備份時間
- **操作**：還原、刪除

## 還原備份

1. 在備份清單中找到要還原的備份
2. 點選 **還原** 按鈕
3. 在對話方塊中選擇目標網站（網站類型）或輸入目標資料庫名稱（資料庫類型），然後點選提交

:::danger 警告
還原操作會覆寫現有資料。 請確保已備份目前的資料！
:::

## 上傳備份

點選 **上傳備份** 按鈕，上傳本機備份檔案以進行資料還原。 支援的檔案類型為 `.sql`、`.zip`、`.tar`、`.gz`、`.tgz`、`.bz2`、`.xz`、`.zst` 和 `.7z`。

## 儲存管理

切換至 **儲存** 分頁來管理備份儲存位置。

![儲存管理](/images/backup/backup-storage.png)

### 本機儲存

預設的儲存位置，備份檔案會儲存在伺服器本機。

### 遠端儲存

點選 **新增儲存** 來新增遠端儲存，支援：

- **S3 相容儲存**：AWS S3、阿里雲 OSS、騰訊雲 COS 等。
- **SFTP**：SFTP 伺服器（使用密碼或私密金鑰進行驗證）
- **WebDAV**：WebDAV 伺服器

遠端儲存的優點：

- 異地備份，防止資料遺失
- 不佔用伺服器磁碟空間
- 便於在多台伺服器之間共用備份

### S3 相容儲存設定

S3 相容儲存是最常用的遠端儲存方式。 大多數雲端儲存服務商都提供 S3 相容介面。

#### 設定參數

| 參數         | 說明                                |
| ---------- | --------------------------------- |
| 名稱         | 儲存設定的名稱，用於識別                      |
| 類型         | 選擇 S3                             |
| Access Key | Access Key ID                     |
| Secret Key | Access Key Secret                 |
| 風格         | 虛擬主機風格或路徑風格                       |
| 區域         | 區域代碼，例如 `us-east-1`、`cn-hangzhou` |
| Endpoint   | S3 服務端點 URL                       |
| 通訊協定       | HTTPS（建議）或 HTTP                   |
| Bucket     | 儲存貯體名稱                            |
| 路徑         | 備份檔案儲存的子路徑（選填）                    |

#### 存取風格說明

S3 有兩種 URL 存取風格：

- **虛擬主機風格**：`https://bucket.endpoint/key`
  - 儲存貯體名稱作為子網域
  - AWS S3 預設使用此風格

- **路徑風格**：`https://endpoint/bucket/key`
  - 儲存貯體名稱作為路徑的一部分
  - 自建 MinIO 通常使用此風格

#### 相容性清單

| 服務商           | 文件                                                                                 | 相容的存取風格       | 相容性 |
| ------------- | ---------------------------------------------------------------------------------- | ------------- | --- |
| 阿里雲 OSS       | [文件](https://help.aliyun.com/document_detail/410748.html)                          | 虛擬主機風格        | ✅   |
| 騰訊雲 COS       | [文件](https://cloud.tencent.com/document/product/436/41284)                         | 虛擬主機風格 / 路徑風格 | ✅   |
| 七牛雲           | [文件](https://developer.qiniu.com/kodo/4088/s3-access-domainname)                   | 虛擬主機風格 / 路徑風格 | ✅   |
| 百度雲 BOS       | [文件](https://cloud.baidu.com/doc/BOS/s/Fjwvyq9xo)                                  | 虛擬主機風格 / 路徑風格 | ✅   |
| 京東雲           | [文件](https://docs.jdcloud.com/cn/object-storage-service/api/regions-and-endpoints) | 虛擬主機風格        | ✅   |
| 金山雲           | [文件](https://docs.ksyun.com/documents/6761)                                        | 虛擬主機風格        | ✅   |
| 青雲 QingStor   | [文件](https://docsv3.qingcloud.com/storage/object-storage/s3/intro/)                | 虛擬主機風格 / 路徑風格 | ✅   |
| 網易數帆          | [文件](https://sf.163.com/help/documents/89796157866430464)                          | 虛擬主機風格        | ✅   |
| Cloudflare R2 | [文件](https://developers.cloudflare.com/r2/data-access/s3-api/)                     | 虛擬主機風格 / 路徑風格 | ✅   |
| Oracle Cloud  | [文件](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/s3compatibleapi.htm)  | 虛擬主機風格 / 路徑風格 | ✅   |
| 又拍雲           | [文件](https://help.upyun.com/knowledge-base/aws-s3%E5%85%BC%E5%AE%B9/)              | 虛擬主機風格 / 路徑風格 | ✅   |
| 自建 MinIO      | -                                                                                  | 路徑風格          | ✅   |
| 華為雲 OBS       | -                                                                                  | 虛擬主機風格        | ❓   |

:::tip 注意
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

## 排程備份

結合[排程任務](./task/schedule)功能，可以設定自動排程備份：

1. 進入 **任務** > **排程任務**
2. 建立一個新任務
3. 選擇備份類型
4. 設定執行排程
5. 選擇儲存位置

## 命令列備份

除了 Web 介面，還可以透過[命令列工具](../quickstart/cli)觸發備份。 這對於自訂 shell 腳本以及排程任務執行的命令非常有用。 大多數命令接受一個選填的 `-s, --storage` 參數來指定儲存 ID（`panel` 命令除外）；省略時備份會儲存到本機儲存。

```shell
# 依名稱備份網站
acepanel backup website -n <website_name> [-s <storage_id>]

# 備份資料庫（type 為 mysql 或 postgresql）
acepanel backup database -t <type> -n <database_name> [-s <storage_id>]

# 備份任意目錄
acepanel backup path -p <directory_path> [-s <storage_id>]

# 備份面板本身
acepanel backup panel

# 清理舊備份，保留最近的 <keep> 份
# <file> 是用於比對同一目標備份的檔案名稱前綴
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
| 設定檔  | 修改後立即備份 |

### 保留策略

- 保留最近 7 天的每日備份
- 保留最近 4 週的每週備份
- 保留最近 3 個月的每月備份

### 儲存位置

- 至少保留一份本機備份
- 重要資料還應備份到遠端儲存
- 定期驗證備份檔案的完整性
