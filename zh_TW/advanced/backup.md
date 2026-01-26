# 備份

備份模組用於備份和恢復網站檔案和資料庫，支援本地備份和遠端儲存。

## 備份頁面

![備份頁面](/images/backup/backup.png)

## 備份類型

備份模組支援以下類型的備份：

| 類型         | 說明                           |
| ---------- | ---------------------------- |
| 網站         | 備份網站檔案                       |
| MySQL      | 備份 Percona/MySQL/MariaDB 資料庫 |
| PostgreSQL | 備份 PostgreSQL 資料庫            |

## 創建備份

1. 選擇備份類型標籤（網站/MySQL/PostgreSQL）
2. 點擊 **創建備份**
3. 選擇要備份的網站或資料庫
4. 選擇儲存位置
5. 點擊確認

備份檔案格式：

- 網站：`.zip` 壓縮包
- 資料庫：`.sql.zip` 壓縮的 SQL 檔案

## 備份列表

備份列表顯示以下資訊：

- **檔案名**：備份檔案名稱
- **大小**：備份檔案大小
- **更新日期**：備份時間
- **操作**：下載、恢復、刪除

## 恢復備份

1. 在備份列表中找到要恢復的備份
2. 點擊 **恢復** 按鈕
3. 確認恢復操作

:::danger 警告
恢復操作會覆蓋現有資料， 請確保已備份當前資料！
:::

## 上傳備份

點擊 **上傳備份** 按鈕可以上傳本地的備份檔案，用於恢復資料。

## 儲存管理

切換到 **儲存** 標籤頁管理備份儲存位置。

![儲存管理](/images/backup/backup-storage.png)

### 本地儲存

預設的儲存位置，備份檔案保存在伺服器本地。

### 遠端儲存

點擊 **新增儲存** 可以新增遠端儲存，支援：

- **S3 相容儲存**：AWS S3、阿里雲 OSS、騰訊雲 COS 等
- **FTP/SFTP**：FTP 或 SFTP 伺服器
- **WebDAV**：WebDAV 伺服器

遠端儲存的優勢：

- 異地備份，防止資料遺失
- 不佔用伺服器磁碟空間
- 便於多伺服器共享備份

### S3 相容儲存配置

S3 相容儲存是最常用的遠端儲存方式， 大多數雲端儲存服務商都提供 S3 相容介面。

#### 配置參數

| 參數         | 說明                               |
| ---------- | -------------------------------- |
| 名稱         | 儲存配置的名稱，便於識別                     |
| 類型         | 選擇 S3                            |
| Access Key | Access Key ID                    |
| Secret Key | Access Key Secret                |
| 風格         | Virtual Hosted 或 Path Style      |
| 區域         | 區域代碼，如 `us-east-1`、`cn-hangzhou` |
| 端點         | S3 服務端點 URL                      |
| 協定         | HTTPS（推薦）或 HTTP                  |
| 儲存桶        | 儲存桶名稱                            |
| 路徑         | 備份檔案儲存的子路徑（可選）                   |

#### 存取風格說明

S3 有兩種 URL 存取風格：

- **Virtual Hosted Style**：`https://bucket.endpoint/key`
  - 桶名作為子網域
  - AWS S3 預設使用此風格

- **Path Style**：`https://endpoint/bucket/key`
  - 桶名作為路徑的一部分
  - 自建 MinIO 等通常使用此風格

#### 相容性列表

| 服務商           | 文檔                                                                                 | 相容存取風格                      | 相容性 |
| ------------- | ---------------------------------------------------------------------------------- | --------------------------- | --- |
| 阿里雲 OSS       | [文檔](https://help.aliyun.com/document_detail/410748.html)                          | Virtual Hosted 風格           | ✅   |
| 騰訊雲 COS       | [文檔](https://cloud.tencent.com/document/product/436/41284)                         | Virtual Hosted 風格 / Path 風格 | ✅   |
| 七牛雲           | [文檔](https://developer.qiniu.com/kodo/4088/s3-access-domainname)                   | Virtual Hosted 風格 / Path 風格 | ✅   |
| 百度雲 BOS       | [文檔](https://cloud.baidu.com/doc/BOS/s/Fjwvyq9xo)                                  | Virtual Hosted 風格 / Path 風格 | ✅   |
| 京東雲           | [文檔](https://docs.jdcloud.com/cn/object-storage-service/api/regions-and-endpoints) | Virtual Hosted 風格           | ✅   |
| 金山雲           | [文檔](https://docs.ksyun.com/documents/6761)                                        | Virtual Hosted 風格           | ✅   |
| 青雲 QingStor   | [文檔](https://docsv3.qingcloud.com/storage/object-storage/s3/intro/)                | Virtual Hosted 風格 / Path 風格 | ✅   |
| 網易數帆          | [文檔](https://sf.163.com/help/documents/89796157866430464)                          | Virtual Hosted 風格           | ✅   |
| Cloudflare R2 | [文檔](https://developers.cloudflare.com/r2/data-access/s3-api/)                     | Virtual Hosted 風格 / Path 風格 | ✅   |
| 甲骨文雲          | [文檔](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/s3compatibleapi.htm)  | Virtual Hosted 風格 / Path 風格 | ✅   |
| 又拍雲           | [文檔](https://help.upyun.com/knowledge-base/aws-s3%E5%85%BC%E5%AE%B9/)              | Virtual Hosted 風格 / Path 風格 | ✅   |
| 自建 MinIO      | -                                                                                  | Path 風格                     | ✅   |
| 華為雲 OBS       | -                                                                                  | Virtual Hosted 風格           | ❓   |

:::tip 提示
華為雲官方文檔未說明是否相容 S3 API，但實際測試可以使用。
:::

#### 配置範例

**阿里雲 OSS**

```
名稱: aliyun-oss
類型: S3
Access Key: 你的 AccessKey ID
Secret Key: 你的 AccessKey Secret
風格: Virtual Hosted
區域: cn-hangzhou
端點: oss-cn-hangzhou.aliyuncs.com
協定: HTTPS
儲存桶: your-bucket-name
路徑: backup（可選）
```

**騰訊雲 COS**

```
名稱: tencent-cos
類型: S3
Access Key: 你的 SecretId
Secret Key: 你的 SecretKey
風格: Virtual Hosted
區域: ap-guangzhou
端點: cos.ap-guangzhou.myqcloud.com
協定: HTTPS
儲存桶: your-bucket-name
路徑: backup（可選）
```

**Cloudflare R2**

```
名稱: cloudflare-r2
類型: S3
Access Key: 你的 Access Key ID
Secret Key: 你的 Secret Access Key
風格: Path Style
區域: auto
端點: <account-id>.r2.cloudflarestorage.com
協定: HTTPS
儲存桶: your-bucket-name
路徑: backup（可選）
```

**自建 MinIO**

```
名稱: minio
類型: S3
Access Key: minioadmin
Secret Key: minioadmin
風格: Path Style
區域: us-east-1
端點: minio.example.com:9000
協定: HTTP 或 HTTPS
儲存桶: backup
路徑:（可選）
```

:::warning 注意

- 請確保儲存桶已創建且有正確的存取權限
- 建議為備份創建專用的存取金鑰，並限制權限範圍
- 部分服務商的 Endpoint 需要包含區域資訊
  :::

## 定時備份

結合 [計劃任務](./task/schedule) 功能，可以設定定時自動備份：

1. 進入 **任務** > **計劃任務**
2. 創建新任務
3. 選擇備份類型
4. 設定執行週期
5. 選擇儲存位置

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
