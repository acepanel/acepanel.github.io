# DNS 配置

DNS 配置頁面用於管理 DNS API，用於通過 DNS 驗證方式申請證書。

## DNS 列表

進入 **證書** > **DNS** 標籤頁查看 DNS 配置列表。

![DNS 列表](/images/cert/cert-dns.png)

列表顯示以下資訊：

- **備註名稱**：配置名稱
- **類型**：DNS 提供商類型
- **操作**：修改、刪除

## 創建 DNS 配置

1. 點擊 **創建 DNS** 按鈕
2. 選擇 DNS 提供商
3. 填寫 API 憑證
4. 點擊創建

## 支持的 DNS 提供商

### 國內提供商

| 提供商        | 所需憑證                          |
| ---------- | ----------------------------- |
| 阿里雲 DNS    | AccessKey ID、AccessKey Secret |
| 騰訊雲 DNSPod | SecretId、SecretKey            |
| 華為雲 DNS    | AccessKeyId、SecretAccessKey   |
| 西部數碼 DNS   | Username、API Password         |

### 國際提供商

| 提供商        | 所需憑證                  |
| ---------- | --------------------- |
| Cloudflare | API Token             |
| Gcore DNS  | API Key               |
| Porkbun    | API Key、Secret Key    |
| NameSilo   | API Token             |
| ClouDNS    | Auth ID、Auth Password |

## 獲取 API 憑證

### 阿里雲

1. 登錄阿里雲控制台
2. 進入 **AccessKey 管理**
3. 創建 AccessKey
4. 記錄 AccessKey ID 和 AccessKey Secret

:::warning 安全提示
建議創建子帳號並只授予 DNS 管理權限， 避免使用主帳戶的 AccessKey。
:::

### 騰訊雲

1. 登錄騰訊雲控制台
2. 進入 **訪問管理** > **API 密鑰管理**
3. 創建密鑰
4. 記錄 SecretId 和 SecretKey

### Cloudflare

1. 登錄 Cloudflare 控制台
2. 進入 **My Profile** > **API Tokens**
3. 創建 Token，選擇 **Edit zone DNS** 模板
4. 記錄生成的 Token

## DNS 驗證原理

1. 申請證書時，CA 要求在域名 DNS 中添加特定的 TXT 記錄
2. AcePanel 通過 DNS API 自動添加驗證記錄
3. CA 驗證 TXT 記錄存在
4. 驗證通過後頒發證書
5. AcePanel 自動刪除驗證記錄

## 使用場景

DNS 驗證適用於：

- 申請泛域名證書（\*.example.com）
- 伺服器 80 端口不可訪問
- 內網伺服器
- CDN 後的源站

## 常見問題

### 驗證失敗

- 檢查 API 憑證是否正確
- 檢查 API 權限是否足夠
- 檢查域名是否在該 DNS 提供商管理

### DNS 傳播延遲

DNS 記錄添加後需要一定時間傳播，通常幾分鐘到幾小時不等。 如果驗證失敗，可以稍後重試。
