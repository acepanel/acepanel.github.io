# DNS 設定

DNS 設定頁面用於管理透過 DNS 驗證申請憑證所需的 DNS API。

## DNS 清單

前往 **憑證** > **DNS** 分頁即可檢視 DNS 設定清單。

![DNS 清單](/images/cert/cert-dns.png)

清單會顯示以下資訊：

- **備註名稱**：設定名稱
- **類型**：DNS 供應商類型
- **操作**：修改、刪除

## 建立 DNS 設定

1. 點選 **建立 DNS** 按鈕
2. 輸入 **備註名稱**
3. 選擇 DNS 供應商
4. 填寫 API 憑證
5. （選用）設定用於傳播檢查的 **DNS 伺服器**（預設為 `8.8.8.8`）
6. （選用）為內網環境啟用 **略過 DNS 驗證**，此時 AcePanel 會等待 60 秒以完成傳播，而不會輪詢 DNS 伺服器
7. 點選 **提交**

## 支援的 DNS 供應商

### 國內供應商

| 供應商  | 所需憑證                         |
| ---- | ---------------------------- |
| 阿里雲  | Access Key, Secret Key       |
| 騰訊雲  | SecretId, SecretKey          |
| 華為雲  | AccessKeyId, SecretAccessKey |
| 西部數碼 | Username, API Password       |

### 國際供應商

| 供應商        | 所需憑證                   |
| ---------- | ---------------------- |
| CloudFlare | API Key                |
| Gcore      | API Key                |
| Porkbun    | API Key, Secret Key    |
| NameSilo   | API Token              |
| ClouDNS    | Auth ID, Auth Password |

:::tip ClouDNS 子帳號 Auth ID
ClouDNS 也支援子帳號 Auth ID。 使用時，在 Auth ID 欄位中填入帶有 `sub-` 前綴的值（例如 `sub-12345`）。
:::

## 取得 API 憑證

### 阿里雲

1. 登入阿里雲主控台
2. 前往 **AccessKey 管理**
3. 建立 AccessKey
4. 記錄 AccessKey ID 與 AccessKey Secret

:::warning 安全提醒
建議建立子帳號，並僅授予 DNS 管理權限。 避免使用主帳號的 AccessKey。
:::

### 騰訊雲

1. 登入騰訊雲主控台
2. 前往 **存取管理** > **API 金鑰管理**
3. 建立金鑰
4. 記錄 SecretId 與 SecretKey

### Cloudflare

1. 登入 Cloudflare 主控台
2. 前往 **我的個人檔案** > **API Tokens**
3. 建立 Token，並選擇 **Edit zone DNS** 範本
4. 記錄產生的 Token，並填入 **API Key** 欄位

## DNS 驗證原理

1. 申請憑證時，CA 會要求在網域的 DNS 中新增一筆特定的 TXT 記錄
2. AcePanel 會透過 DNS API 自動新增驗證記錄
3. CA 驗證該 TXT 記錄是否存在
4. 驗證通過後簽發憑證
5. AcePanel 會自動刪除驗證記錄

## DNS 別名（CNAME 委派）

:::tip 版本
在 v3.2.0 及以上版本可用
:::

DNS 別名可讓你將 `_acme-challenge` TXT 記錄寫入到**另一個**（委派的）網域上，以完成某個網域的 DNS-01 驗證，而不必寫入到正在申請憑證的網域上。 適用於下列情況：

- 你想申請憑證的網域代管在 AcePanel 不支援的 DNS 供應商上，但你掌控著另一個受支援的網域。
- 基於安全考量，你希望將 ACME 自動化憑證限定在單一專用區域內。

使用時，請先在你的 DNS 供應商處新增一筆永久的 `CNAME` 記錄，將原始網域的驗證名稱指向委派記錄。 例如，要委派 `example.com` 的驗證：

```
_acme-challenge.example.com.  CNAME  _acme-challenge.delegated.com.
```

接著，在**申請或編輯憑證時**（而非在 DNS 設定頁面），選擇管理委派網域的 DNS 供應商，並填寫 **DNS 別名**對應：

- **原始網域**：正在申請憑證的網域，例如 `example.com` 或 `*.example.com`
- **別名記錄**：TXT 值將寫入的完整委派記錄名稱，例如 `_acme-challenge.delegated.com`

之後 AcePanel 會將驗證 TXT 記錄寫入委派區域中的別名記錄，CA 則會沿著 `CNAME` 進行驗證。 比對對應時，AcePanel 會先查詢你輸入的精確網域；對於萬用字元項目，它還會回退到裸網域（去除 `*.` 前綴），因此單筆 `example.com` 對應也可以涵蓋 `*.example.com`。

## 適用場景

DNS 驗證適用於：

- 申請萬用字元憑證（\*.example.com）
- 伺服器的 80 連接埠無法存取
- 內網伺服器
- 位於 CDN 後方的來源伺服器
- DNS 供應商未直接支援的網域，可透過將驗證委派給受支援的區域來達成（參見 [DNS 別名](#dns-alias-cname-delegation)）

## 常見問題

### 驗證失敗

- 檢查 API 憑證是否正確
- 檢查 API 權限是否足夠
- 檢查該網域是否由該 DNS 供應商代管

### DNS 傳播延遲

DNS 記錄新增後需要一些時間才能傳播，通常從數分鐘到數小時不等。 AcePanel 會每隔數秒輪詢一次所設定的 **DNS 伺服器**，最長約 10 分鐘，等待記錄出現後再通知 CA。 如果你的記錄傳播緩慢，或伺服器位於無法公開解析的內網中，請啟用 **略過 DNS 驗證**，如此 AcePanel 會固定等待 60 秒而非輪詢。 如果驗證仍然失敗，你可以稍後重試。
