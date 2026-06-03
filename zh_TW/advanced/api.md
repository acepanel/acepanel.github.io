# API 參考文件

## 概觀

AcePanel 提供一套安全的 RESTful 介面，用於與面板系統互動。 所有 API 請求都需要 HMAC-SHA256 簽章驗證，以確保通訊的安全性與完整性。

## 基本資訊

- **Base URL**：`http(s)://your-panel-domain/{entry}/api/`
- **內容類型**：所有請求與回應皆使用 `application/json`
- **字元編碼**：UTF-8

## 驗證機制

此 API 採用 HMAC-SHA256 簽章演算法進行驗證。 每個請求都必須包含下列 HTTP 標頭：

| 標頭名稱            | 必填 | 說明                                                                              |
| --------------- | -- | ------------------------------------------------------------------------------- |
| `X-Timestamp`   | 是  | 目前的 UNIX 時間戳記（秒）。 請參閱下文說明的時間戳記視窗。                                               |
| `Authorization` | 是  | 驗證資訊，格式為：`HMAC-SHA256 Credential={id}, Signature={signature}`                   |
| `Content-Type`  | 否  | 僅為慣例；對於攜帶 JSON 主體的請求，建議設定為 `application/json`。 它**不**屬於標準請求的一部分，伺服器也**不會**加以驗證。 |

## 簽章演算法

簽章流程主要分為四個步驟：

### 1. 建構標準請求（Canonical Request）

標準請求字串由下列各部分組成，並以換行字元（\n）分隔：

```
HTTP Method
Canonical Path
Canonical Query String
SHA256 Hash of Request Body
```

**注意**：標準路徑應一律使用以 `/api/` 開頭的路徑部分，並忽略入口前綴。

### 2. 建構待簽章字串（String to Sign）

待簽章字串由下列各部分組成，並以換行字元（\n）分隔：

```
"HMAC-SHA256"
Timestamp
SHA256 Hash of Canonical Request
```

### 3. 計算簽章

使用你的權杖對待簽章字串計算 HMAC-SHA256，再將結果轉換為十六進位字串。

### 4. 建構 Authorization 標頭

將計算出的簽章加入 `Authorization` 標頭：

```
Authorization: HMAC-SHA256 Credential={id}, Signature={signature}
```

**注意**：`{id}` 是建立存取權杖時所傳回的權杖 ID（而非使用者 ID），`{signature}` 則是上一步計算出的簽章。

### 時間戳記視窗

伺服器會驗證 `X-Timestamp` 的值，以限制已簽章請求的有效期限：

- 時間戳記為 `0`（缺漏或無法解析）會被拒絕。
- 比伺服器時間早超過 300 秒的時間戳記會被拒絕，並傳回 `signature expired` 錯誤。
- 未來時間的時間戳記**不會**被拒絕，因此用戶端時鐘略微超前伺服器的適度誤差並不會導致失敗。 只有過舊的時間戳記才會落在視窗之外。

由於時間戳記是待簽章字串的一部分，你在 `X-Timestamp` 標頭中送出的值必須與計算簽章時所用的值完全相同。

### 存取權杖屬性

存取權杖於面板的 **設定 → 使用者** 中建立與管理。 每個權杖都具有下列會影響 API 請求的屬性：

- **權杖 ID 與密鑰**：完整的權杖密鑰**只會在建立權杖的當下顯示一次**。 請妥善保存，事後將無法再次取得。 權杖 ID 即 `Authorization` 標頭中所使用的 `{id}`。
- **有效期限**：每個權杖都有到期時間（於建立時設定，介於目前時間與最多 10 年後之間）。 使用已到期權杖發出的請求會被拒絕，並傳回 `token expired` 錯誤。
- **IP 白名單（選用）**：可將權杖限制為僅允許來自特定來源位址清單。 每一筆可以是單一 IP 位址或一個 CIDR 區段（例如 `203.0.113.10` 或 `203.0.113.0/24`）。 設定白名單後，來自其他任何位址的請求都會被拒絕，並傳回 `invalid request ip` 錯誤。 當清單為空時，該權杖可從任意位址使用。

## Go 範例

```go
package main

import (
    "bytes"
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "fmt"
    "io"
    "net/http"
    "strings"
    "time"
)

func main() {
    // Create a request to get user information
    req, err := http.NewRequest("GET", "http://example.com/entrance/api/user/info", nil)
    if err != nil {
        fmt.Println("Error creating request:", err)
        return
    }

    // Set content type
    req.Header.Set("Content-Type", "application/json")
    
    // Sign request - pass your token ID and API token
    if err = SignReq(req, uint(16), "YourSecretToken"); err != nil {
        fmt.Println("Error signing request:", err)
        return
    }

    // Send request
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error sending request:", err)
        return
    }
    defer resp.Body.Close()

    // Handle response
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        fmt.Println("Error reading response:", err)
        return
    }

    fmt.Println("Response Status:", resp.Status)
    fmt.Println("Response Body:", string(body))
}

// SignReq signs an HTTP request
func SignReq(req *http.Request, id uint, token string) error {
    // Step 1: Construct canonical request
    var body []byte
    var err error

    if req.Body != nil {
        // Read and save request body
        body, err = io.ReadAll(req.Body)
        if err != nil {
            return err
        }
        // Restore request body for subsequent use
        req.Body = io.NopCloser(bytes.NewReader(body))
    }

    // Canonical path
    canonicalPath := req.URL.Path
    if !strings.HasPrefix(canonicalPath, "/api") {
        index := strings.Index(canonicalPath, "/api")
        if index != -1 {
            canonicalPath = canonicalPath[index:]
        }
    }

    canonicalRequest := fmt.Sprintf("%s\n%s\n%s\n%s",
        req.Method,
        canonicalPath,
        req.URL.Query().Encode(),
        SHA256(string(body)))

    // Step 2: Set timestamp and construct string to sign
    timestamp := time.Now().Unix()
    req.Header.Set("X-Timestamp", fmt.Sprintf("%d", timestamp))

    stringToSign := fmt.Sprintf("%s\n%d\n%s",
        "HMAC-SHA256",
        timestamp,
        SHA256(canonicalRequest))

    // Step 3: Calculate signature
    signature := HMACSHA256(stringToSign, token)

    // Step 4: Set Authorization header
    authHeader := fmt.Sprintf("HMAC-SHA256 Credential=%d, Signature=%s", id, signature)
    req.Header.Set("Authorization", authHeader)

    return nil
}

func SHA256(str string) string {
    sum := sha256.Sum256([]byte(str))
    dst := make([]byte, hex.EncodedLen(len(sum)))
    hex.Encode(dst, sum[:])
    return string(dst)
}

func HMACSHA256(data string, secret string) string {
    h := hmac.New(sha256.New, []byte(secret))
    h.Write([]byte(data))
    return hex.EncodeToString(h.Sum(nil))
}
```

## PHP 範例

```php
<?php
/**
 * AcePanel API Request Example (PHP)
 */

function signRequest($method, $url, $body, $id, $token) {
    // Parse URL and get path
    $parsedUrl = parse_url($url);
    $path = $parsedUrl['path'];
    $query = isset($parsedUrl['query']) ? $parsedUrl['query'] : '';
    
    // Canonical path
    $canonicalPath = $path;
    if (strpos($path, '/api') !== 0) {
        $apiPos = strpos($path, '/api');
        if ($apiPos !== false) {
            $canonicalPath = substr($path, $apiPos);
        }
    }
    
    // Calculate SHA256 hash of request body
    $bodySha256 = hash('sha256', $body ?: '');
    
    // Construct canonical request
    $canonicalRequest = implode("\n", [
        $method,
        $canonicalPath,
        $query,
        $bodySha256
    ]);
    
    // Get current timestamp
    $timestamp = time();
    
    // Construct string to sign
    $stringToSign = implode("\n", [
        'HMAC-SHA256',
        $timestamp,
        hash('sha256', $canonicalRequest)
    ]);
    
    // Calculate signature
    $signature = hash_hmac('sha256', $stringToSign, $token);
    
    // Return signature and timestamp
    return [
        'timestamp' => $timestamp,
        'signature' => $signature,
        'id' => $id
    ];
}

// Example request
$apiUrl = 'http://example.com/entrance/api/user/info';
$method = 'GET';
$body = ''; // For GET requests, usually no request body
$id = 16;
$token = 'YourSecretToken';

// Generate signature information
$signingData = signRequest($method, $apiUrl, $body, $id, $token);

// Prepare HTTP headers
$headers = [
    'Content-Type: application/json',
    'X-Timestamp: ' . $signingData['timestamp'],
    'Authorization: HMAC-SHA256 Credential=' . $signingData['id'] . ', Signature=' . $signingData['signature']
];

// Use cURL to send request
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

if (!empty($body)) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}

// Execute request and get response
$response = curl_exec($ch);
$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Output results
echo "Response Status Code: " . $statusCode . PHP_EOL;
echo "Response Content: " . $response . PHP_EOL;
```

## Python 範例

```python
import hashlib
import hmac
import json
import requests
import time
from urllib.parse import urlparse, parse_qs

def sha256_hash(text):
    """Calculate SHA256 hash of a string"""
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

def hmac_sha256(key, message):
    """Calculate signature using HMAC-SHA256 algorithm"""
    return hmac.new(key.encode('utf-8'), message.encode('utf-8'), hashlib.sha256).hexdigest()

def sign_request(method, url, body, token_id, token):
    """Generate signature for API request"""
    # Parse URL
    parsed_url = urlparse(url)
    path = parsed_url.path
    query = parsed_url.query
    
    # Canonical path
    canonical_path = path
    if not path.startswith('/api'):
        api_pos = path.find('/api')
        if api_pos != -1:
            canonical_path = path[api_pos:]
    
    # Construct canonical request
    body_str = body if body else ""
    canonical_request = "\n".join([
        method,
        canonical_path,
        query,
        sha256_hash(body_str)
    ])
    
    # Get current timestamp
    timestamp = int(time.time())
    
    # Construct string to sign
    string_to_sign = "\n".join([
        "HMAC-SHA256",
        str(timestamp),
        sha256_hash(canonical_request)
    ])
    
    # Calculate signature
    signature = hmac_sha256(token, string_to_sign)
    
    return {
        "timestamp": timestamp,
        "signature": signature,
        "id": token_id
    }

# Example request
api_url = "http://example.com/entrance/api/user/info"
method = "GET"
body = ""  # GET requests typically have no body
token_id = 16
token = "YourSecretToken"

# Generate signature information
signing_data = sign_request(method, api_url, body, token_id, token)

# Prepare HTTP headers
headers = {
    "Content-Type": "application/json",
    "X-Timestamp": str(signing_data["timestamp"]),
    "Authorization": f"HMAC-SHA256 Credential={signing_data['id']}, Signature={signing_data['signature']}"
}

# Send request
response = requests.request(
    method=method,
    url=api_url,
    headers=headers,
    data=body
)

# Output results
print(f"Response Status Code: {response.status_code}")
print(f"Response Content: {response.text}")
```

## Java 範例

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

/**
 * AcePanel API Request Example (Java)
 */
public class AcePanelApiExample {

    public static void main(String[] args) {
        try {
            // Example request
            String apiUrl = "http://example.com/entrance/api/user/info";
            String method = "GET";
            String body = ""; // For GET requests, usually no request body
            int id = 16;
            String token = "YourSecretToken";

            // Generate signature information
            SigningData signingData = signRequest(method, apiUrl, body, id, token);

            // Prepare HTTP request
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Content-Type", "application/json")
                    .header("X-Timestamp", String.valueOf(signingData.timestamp))
                    .header("Authorization", "HMAC-SHA256 Credential=" + signingData.id + 
                            ", Signature=" + signingData.signature);

            // Set request method and body
            if (method.equals("GET")) {
                requestBuilder.GET();
            } else {
                requestBuilder.method(method, HttpRequest.BodyPublishers.ofString(body));
            }

            HttpRequest request = requestBuilder.build();

            // Send request
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Output results
            System.out.println("Response Status Code: " + response.statusCode());
            System.out.println("Response Content: " + response.body());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static class SigningData {
        long timestamp;
        String signature;
        int id;

        SigningData(long timestamp, String signature, int id) {
            this.timestamp = timestamp;
            this.signature = signature;
            this.id = id;
        }
    }

    public static SigningData signRequest(String method, String url, String body, int id, String token) throws Exception {
        // Parse URL
        URI uri = new URI(url);
        String path = uri.getPath();
        String query = uri.getQuery() != null ? uri.getQuery() : "";
        
        // Canonical path
        String canonicalPath = path;
        if (!path.startsWith("/api")) {
            int apiPos = path.indexOf("/api");
            if (apiPos != -1) {
                canonicalPath = path.substring(apiPos);
            }
        }
        
        // Calculate SHA256 hash of request body
        String bodySha256 = sha256Hash(body != null ? body : "");
        
        // Construct canonical request
        String canonicalRequest = String.join("\n", 
                method,
                canonicalPath,
                query,
                bodySha256);
        
        // Get current timestamp
        long timestamp = Instant.now().getEpochSecond();
        
        // Construct string to sign
        String stringToSign = String.join("\n",
                "HMAC-SHA256",
                String.valueOf(timestamp),
                sha256Hash(canonicalRequest));
        
        // Calculate signature
        String signature = hmacSha256(token, stringToSign);
        
        // Return signature and timestamp
        return new SigningData(timestamp, signature, id);
    }
    
    private static String sha256Hash(String text) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(text.getBytes(StandardCharsets.UTF_8));
        return bytesToHex(hash);
    }
    
    private static String hmacSha256(String key, String message) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        mac.init(secretKeySpec);
        byte[] hash = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
        return bytesToHex(hash);
    }
    
    private static String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
```

## Node.js 範例

```javascript
const crypto = require('crypto');
const axios = require('axios');
const url = require('url');

/**
 * Calculate SHA256 hash of a string
 * @param {string} text The string to hash
 * @returns {string} Hash result (hexadecimal)
 */
function sha256Hash(text) {
    return crypto.createHash('sha256').update(text || '').digest('hex');
}

/**
 * Calculate signature using HMAC-SHA256 algorithm
 * @param {string} key The key
 * @param {string} message The message to sign
 * @returns {string} Signature result (hexadecimal)
 */
function hmacSha256(key, message) {
    return crypto.createHmac('sha256', key).update(message).digest('hex');
}

/**
 * Generate signature for API request
 * @param {string} method HTTP method
 * @param {string} apiUrl API URL
 * @param {string} body Request body
 * @param {number} id Token ID
 * @param {string} token Secret key
 * @returns {object} Object containing signature, timestamp and ID
 */
function signRequest(method, apiUrl, body, id, token) {
    // Parse URL
    const parsedUrl = new url.URL(apiUrl);
    const path = parsedUrl.pathname;
    const query = parsedUrl.search.slice(1); // Remove leading '?'

    // Canonical path
    let canonicalPath = path;
    if (!path.startsWith('/api')) {
        const apiPos = path.indexOf('/api');
        if (apiPos !== -1) {
            canonicalPath = path.slice(apiPos);
        }
    }

    // Construct canonical request
    const canonicalRequest = [
        method,
        canonicalPath,
        query,
        sha256Hash(body || '')
    ].join('\n');

    // Get current timestamp
    const timestamp = Math.floor(Date.now() / 1000);

    // Construct string to sign
    const stringToSign = [
        'HMAC-SHA256',
        timestamp,
        sha256Hash(canonicalRequest)
    ].join('\n');

    // Calculate signature
    const signature = hmacSha256(token, stringToSign);

    return {
        timestamp,
        signature,
        id
    };
}

/**
 * Send API request
 */
async function sendApiRequest() {
    // Example request parameters
    const apiUrl = 'http://example.com/entrance/api/user/info';
    const method = 'GET';
    const body = ''; // GET requests typically have no body
    const id = 16;
    const token = 'YourSecretToken';

    try {
        // Generate signature information
        const signingData = signRequest(method, apiUrl, body, id, token);

        // Prepare HTTP headers
        const headers = {
            'Content-Type': 'application/json',
            'X-Timestamp': signingData.timestamp,
            'Authorization': `HMAC-SHA256 Credential=${signingData.id}, Signature=${signingData.signature}`
        };

        // Send request
        const response = await axios({
            method,
            url: apiUrl,
            headers,
            data: body || undefined
        });

        // Output results
        console.log(`Response Status Code: ${response.status}`);
        console.log(`Response Content: ${JSON.stringify(response.data)}`);

    } catch (error) {
        console.error('Request Error:', error.message);
        if (error.response) {
            console.error(`Response Status Code: ${error.response.status}`);
            console.error(`Response Content: ${JSON.stringify(error.response.data)}`);
        }
    }
}

// Execute request
sendApiRequest();
```

## 回應格式

所有 API 回應都是採用一致信封結構的 JSON 物件：

```json
{
    "msg": "success",
    "data": {}
}
```

- `msg`：成功時為字串 `success`；失敗時則包含錯誤訊息。
- `data`：回應內容。 對於分頁清單端點，其內容是一個包含 `total`（項目總數）與 `items`（目前分頁中的項目）的物件。

錯誤回應使用相同的結構，但僅傳回 `msg` 欄位，並附上對應的 HTTP 狀態碼。

## 常見回應碼

| HTTP 狀態碼 | 說明      |
| -------- | ------- |
| 200      | 請求成功    |
| 401      | 驗證失敗    |
| 403      | 權限不足    |
| 404      | 找不到資源   |
| 422      | 請求參數錯誤  |
| 500      | 伺服器內部錯誤 |

## API 端點概觀

上方範例使用的是 `/api/user/info`，但相同的簽章機制適用於面板的每一個端點。 所有端點都位於 `/api/` 前綴底下，並依功能分組。 下表列出可用的端點分組；每項功能的管理介面都會向對應的前綴發出請求，因此要得知某項操作的確切路徑、方法與參數，最簡單的方式就是在面板中開啟該功能，並觀察它所送出的網路請求。

| 端點前綴                                                                                                                            | 功能                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `/api/user`、`/api/users`                                                                                                        | 目前使用者資訊、登入狀態、兩步驟驗證、密碼金鑰、使用者管理                                         |
| `/api/user_tokens`                                                                                                              | 存取權杖管理（清單、建立、更新、刪除）                                                   |
| `/api/user_passkeys`                                                                                                            | 密碼金鑰（WebAuthn）憑證管理                                                    |
| `/api/home`                                                                                                                     | 儀表板、系統資訊、面板更新與重新啟動                                                    |
| `/api/task`                                                                                                                     | 背景任務清單與狀態                                                             |
| `/api/website`                                                                                                                  | 網站及網站統計                                                               |
| `/api/project`                                                                                                                  | 專案                                                                    |
| `/api/database`、`/api/database_server`、`/api/database_user`                                                                     | 資料庫、資料庫伺服器與資料庫使用者                                                     |
| `/api/database_redis`                                                                                                           | Redis 鍵值操作                                                            |
| `/api/database_elasticsearch`                                                                                                   | Elasticsearch 索引與文件操作                                                 |
| `/api/backup`、`/api/backup_storage`                                                                                             | 備份與備份儲存                                                               |
| `/api/cert`                                                                                                                     | 憑證、ACME 帳戶與 DNS 供應商                                                   |
| `/api/app`                                                                                                                      | 應用程式商店（安裝、解除安裝、更新）                                                    |
| `/api/environment`                                                                                                              | 執行環境（Go、Java、Node.js、PHP、Python、.NET） |
| `/api/cron`                                                                                                                     | 排程（cron）任務                                                            |
| `/api/process`                                                                                                                  | 行程清單與訊號                                                               |
| `/api/safe`、`/api/firewall`                                                                                                     | Ping 開關、防火牆規則與掃描偵測                                                    |
| `/api/ssh`                                                                                                                      | SSH 連線設定檔                                                             |
| `/api/container`                                                                                                                | 容器、Compose、網路、映像檔與儲存區                                                 |
| `/api/file`                                                                                                                     | 檔案管理員操作，包含分塊上傳                                                        |
| `/api/log`                                                                                                                      | 面板與 SSH 紀錄                                                            |
| `/api/monitor`                                                                                                                  | 資源監控資料與設定                                                             |
| `/api/setting`                                                                                                                  | 面板設定                                                                  |
| `/api/systemctl`                                                                                                                | systemd 服務控制                                                          |
| `/api/toolbox_system`、`/api/toolbox_network`、`/api/toolbox_disk`、`/api/toolbox_ssh`、`/api/toolbox_benchmark`、`/api/toolbox_log` | 工具箱公用程式（DNS、Swap、時間、主機名稱、磁碟、SSH 設定、效能測試、紀錄清理）                         |
| `/api/toolbox_migration`                                                                                                        | 伺服器遷移                                                                 |
| `/api/webhook`                                                                                                                  | WebHook 管理                                                            |
| `/api/template`                                                                                                                 | 設定範本                                                                  |
| `/api/apps/...`                                                                                                                 | 由已安裝應用程式所註冊的應用程式專屬端點                                                  |

> **WebSocket 端點無法透過權杖驗證存取。** 任何攜帶 `Authorization` 標頭、位於 `/api/ws` 底下的請求都會被拒絕，並傳回 `ws not allowed` 錯誤；WebSocket 功能（例如終端機）僅能透過互動式瀏覽器工作階段使用。

## 安全性建議

1. **保護你的 API 權杖**：請勿將 API 權杖硬編碼或暴露在用戶端程式碼中
2. **定期輪換權杖**：定期更換 API 權杖以提升安全性
3. **設定 IP 白名單**：在正式環境中使用 IP 白名單來限制存取

## 常見問題

### 簽章驗證失敗

若遇到簽章驗證失敗，請檢查：

- 確認你使用的是正確的 API 權杖，以及建立權杖時所傳回的權杖 ID（而非使用者 ID）
- 請檢查用戶端時鐘是否準確；比伺服器時間早超過 300 秒的時間戳記會導致驗證失敗（用戶端時鐘超前則可被容忍）。 請確認你送出的 `X-Timestamp` 與計算簽章時所用的值一致
- 確認請求主體在計算簽章前後皆未被修改
- 確認 URL 路徑處理正確；標準化路徑時別忘了移除入口前綴
- 若權杖設有 IP 白名單，請確認請求來自允許的 IP 或 CIDR 區段，否則會被拒絕並傳回 `invalid request ip` 錯誤

### 請求逾時

- 檢查網路連線
- 確認伺服器狀態
- 考慮增加用戶端的逾時設定
