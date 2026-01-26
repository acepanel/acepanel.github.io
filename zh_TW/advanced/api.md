# API 參考文檔

## 概述

AcePanel 提供了安全的 RESTful 接口，用於與面板系統進行互動。 所有 API 請求都需要進行 HMAC-SHA256 簽名認證以確保通訊的安全性和完整性。

## 基本信息

- **基本 URL**: `http(s)://your-panel-domain/{entry}/api/`
- **內容類型**: 所有請求和響應均使用 `application/json`
- **字符編碼**: UTF-8

## 身份驗證機制

API 使用 HMAC-SHA256 簽名算法進行身份認證。 每個請求必須包含以下 HTTP 標頭：

| 標頭名稱            | 描述                                                              |
| --------------- | --------------------------------------------------------------- |
| `Content-Type`  | 設置為 `application/json`                                          |
| `X-Timestamp`   | 當前 UNIX 時間戳（秒）                                                  |
| `Authorization` | 身份認證信息，格式為 `HMAC-SHA256 Credential={id}, Signature={signature}` |

## 簽名算法

簽名過程包含四個主要步驟：

### 1. 構造規範化請求

規範化請求字符串由以下部分組成，各部分之間使用換行符（\n）分隔：

```
HTTP 方法
規範化路徑
規範化查詢字符串
請求體的 SHA256 哈希值
```

**注意**：規範化路徑應始終使用 `/api/` 開頭的路徑部分，忽略入口前綴。

### 2. 構造待簽名字符串

待簽名字符串包含以下部分，各部分使用換行符（\n）分隔：

```
"HMAC-SHA256"
時間戳
規範化請求的 SHA256 哈希值
```

### 3. 計算簽名

使用您的令牌（token）對待簽名字符串進行 HMAC-SHA256 計算，然後將結果轉換為十六進制字符串。

### 4. 構造授權頭

將計算得到的簽名添加到 `Authorization` 頭：

```
授權: HMAC-SHA256 Credential={id}, Signature={signature}
```

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
    // 創建一個獲取用戶信息的請求
    req, err := http.NewRequest("GET", "http://example.com/entrance/api/user/info", nil)
    if err != nil {
        fmt.Println("創建請求時出錯:", err)
        return
    }

    // 設置內容類型
    req.Header.Set("Content-Type", "application/json")
    
    // 簽名請求 - 傳入您的用戶 ID 和 API 令牌
    if err = SignReq(req, uint(16), "YourSecretToken"); err != nil {
        fmt.Println("簽名請求時出錯:", err)
        return
    }

    // 發送請求
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("發送請求時出錯:", err)
        return
    }
    defer resp.Body.Close()

    // 處理響應
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        fmt.Println("讀取響應時出錯:", err)
        return
    }

    fmt.Println("響應狀態:", resp.Status)
    fmt.Println("響應內容:", string(body))
}

// SignReq 對 HTTP 請求進行簽名
func SignReq(req *http.Request, id uint, token string) error {
    // 步驟 1：構造規範化請求
    var body []byte
    var err error

    if req.Body != nil {
        // 讀取並保存請求體
        body, err = io.ReadAll(req.Body)
        if err != nil {
            return err
        }
        // 恢復請求體以便後續使用
        req.Body = io.NopCloser(bytes.NewReader(body))
    }

    // 規範化路徑
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

    // 步驟 2：設置時間戳並構造待簽名字符串
    timestamp := time.Now().Unix()
    req.Header.Set("X-Timestamp", fmt.Sprintf("%d", timestamp))

    stringToSign := fmt.Sprintf("%s\n%d\n%s",
        "HMAC-SHA256",
        timestamp,
        SHA256(canonicalRequest))

    // 步驟 3：計算簽名
    signature := HMACSHA256(stringToSign, token)

    // 步驟 4：設置 Authorization 頭
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
    """計算字符串的 SHA256 哈希值"""
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

def hmac_sha256(key, message):
    """使用 HMAC-SHA256 算法計算簽名"""
    return hmac.new(key.encode('utf-8'), message.encode('utf-8'), hashlib.sha256).hexdigest()

def sign_request(method, url, body, user_id, token):
    """為 API 請求生成簽名"""
    # 解析 URL
    parsed_url = urlparse(url)
    path = parsed_url.path
    query = parsed_url.query
    
    # 規範化路徑
    canonical_path = path
    if not path.startswith('/api'):
        api_pos = path.find('/api')
        if api_pos != -1:
            canonical_path = path[api_pos:]
    
    # 構造規範化請求
    body_str = body if body else ""
    canonical_request = "\n".join([
        method,
        canonical_path,
        query,
        sha256_hash(body_str)
    ])
    
    # 獲取當前時間戳
    timestamp = int(time.time())
    
    # 構造待簽名字符串
    string_to_sign = "\n".join([
        "HMAC-SHA256",
        str(timestamp),
        sha256_hash(canonical_request)
    ])
    
    # 計算簽名
    signature = hmac_sha256(token, string_to_sign)
    
    return {
        "timestamp": timestamp,
        "signature": signature,
        "id": user_id
    }

# 範例請求
api_url = "http://example.com/entrance/api/user/info"
method = "GET"
body = ""  # GET 請求通常沒有請求主體
user_id = 16
token = "您的秘密令牌"

# 生成簽名信息
signing_data = sign_request(method, api_url, body, user_id, token)

# 準備 HTTP 標頭
headers = {
    "Content-Type": "application/json",
    "X-Timestamp": str(signing_data["timestamp"]),
    "Authorization": f"HMAC-SHA256 Credential={signing_data['id']}, Signature={signing_data['signature']}"
}

# 發送請求
response = requests.request(
    method=method,
    url=api_url,
    headers=headers,
    data=body
)

# 輸出結果
print(f"響應狀態碼: {response.status_code}")
print(f"響應內容: {response.text}")
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
 * 計算字符串的 SHA256 哈希值
 * @param {string} text 待哈希的字符串
 * @returns {string} 哈希結果（十六進制）
 */
function sha256Hash(text) {
    return crypto.createHash('sha256').update(text || '').digest('hex');
}

/**
 * 使用 HMAC-SHA256 算法計算簽名
 * @param {string} key 密鑰
 * @param {string} message 待簽名的消息
 * @returns {string} 簽名結果（十六進制）
 */
function hmacSha256(key, message) {
    return crypto.createHmac('sha256', key).update(message).digest('hex');
}

/**
 * 為 API 請求生成簽名
 * @param {string} method HTTP 方法
 * @param {string} apiUrl API 地址
 * @param {string} body 請求體
 * @param {number} id 用戶 ID
 * @param {string} token 密鑰
 * @returns {object} 包含簽名、時間戳和 ID 的對象
 */
function signRequest(method, apiUrl, body, id, token) {
    // 解析 URL
    const parsedUrl = new url.URL(apiUrl);
    const path = parsedUrl.pathname;
    const query = parsedUrl.search.slice(1); // 移除開頭的 '?'

    // 規範化路徑
    let canonicalPath = path;
    if (!path.startsWith('/api')) {
        const apiPos = path.indexOf('/api');
        if (apiPos !== -1) {
            canonicalPath = path.slice(apiPos);
        }
    }

    // 構造規範化請求
    const canonicalRequest = [
        method,
        canonicalPath,
        query,
        sha256Hash(body || '')
    ].join('\n');

    // 獲取當前時間戳
    const timestamp = Math.floor(Date.now() / 1000);

    // 構造待簽名字符串
    const stringToSign = [
        'HMAC-SHA256',
        timestamp,
        sha256Hash(canonicalRequest)
    ].join('\n');

    // 計算簽名
    const signature = hmacSha256(token, stringToSign);

    return {
        timestamp,
        signature,
        id
    };
}

/**
 * 發送 API 請求
 */
async function sendApiRequest() {
    // 範例請求參數
    const apiUrl = 'http://example.com/entrance/api/user/info';
    const method = 'GET';
    const body = ''; // GET 請求通常沒有請求體
    const id = 16;
    const token = '您的秘密令牌';

    try {
        // 生成簽名信息
        const signingData = signRequest(method, apiUrl, body, id, token);

        // 準備 HTTP 標頭
        const headers = {
            'Content-Type': 'application/json',
            'X-Timestamp': signingData.timestamp,
            'Authorization': `HMAC-SHA256 Credential=${signingData.id}, Signature=${signingData.signature}`
        };

        // 發送請求
        const response = await axios({
            method,
            url: apiUrl,
            headers,
            data: body || undefined
        });

        // 輸出結果
        console.log(`響應狀態碼: ${response.status}`);
        console.log(`響應內容: ${JSON.stringify(response.data)}`);

    } catch (error) {
        console.error('請求錯誤:', error.message);
        if (error.response) {
            console.error(`響應狀態碼: ${error.response.status}`);
            console.error(`響應內容: ${JSON.stringify(error.response.data)}`);
        }
    }
}

// 執行請求
sendApiRequest();
```

## 常見響應碼

| HTTP 狀態碼 | 描述      |
| -------- | ------- |
| 200      | 請求成功    |
| 401      | 身份驗證失敗  |
| 403      | 權限不足    |
| 404      | 資源不存在   |
| 422      | 請求參數錯誤  |
| 500      | 伺服器內部錯誤 |

## 安全建議

1. **保護您的 API 令牌**：不要在客戶端代碼中硬編碼或公開您的 API 令牌
2. **定期輪換令牌**：定期更改您的 API 令牌以提高安全性
3. **配置 IP 白名單**：在生產環境中使用 IP 白名單限制訪問

## 常見問題解答

### 簽名驗證失敗

如果遇到簽名驗證失敗，請檢查：

- 確保使用了正確的 API 令牌和 ID
- 檢查客戶端和伺服器時間是否準確；時間戳之間的差異超過 300 秒將導致驗證失敗
- 確保請求主體在計算簽名前後沒有被修改
- 確保 URL 路徑處理正確；請記住在規範化路徑時要移除入口前綴

### 請求超時

- 檢查網絡連接
- 確認伺服器狀態
- 考慮增加客戶端的超時設置
