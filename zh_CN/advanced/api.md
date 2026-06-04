# API 参考文档

## 概述

AcePanel 提供了一套安全的 RESTful 接口，用于与面板进行交互。 所有 API 请求都需要进行 HMAC-SHA256 签名认证以确保通信的安全性和完整性。

## 基础信息

- **基础 URL**: `http(s)://your-panel-domain/{entry}/api/`
- **内容类型**: 所有请求和响应均使用 `application/json`
- **字符编码**: UTF-8

## 认证机制

API 使用 HMAC-SHA256 签名算法进行认证。 每个请求必须包含以下 HTTP 头：

| 头部名称            | 必填 | 描述                                                                                 |
| --------------- | -- | ---------------------------------------------------------------------------------- |
| `X-Timestamp`   | 是  | 当前 UNIX 时间戳（秒）。 参见下文描述的时间戳窗口。                                                      |
| `Authorization` | 是  | 身份验证信息，格式为 `HMAC-SHA256 Credential={id}, Signature={signature}`                    |
| `Content-Type`  | 否  | 仅为约定；对于携带 JSON 请求体的请求，建议设置为 `application/json`。 它**不**属于规范请求的一部分，服务器也**不会**对其进行校验。 |

## 签名算法

签名过程包含四个主要步骤：

### 1. 构造规范化请求

规范化请求字符串由以下部分组成，各部分之间使用换行符（\n）分隔：

```
HTTP方法
规范化路径
规范化查询字符串
请求体的SHA256哈希值
```

**注意**：规范化路径应始终使用 `/api/` 开头的路径部分，忽略入口前缀。

### 2. 构造待签名字符串

待签名字符串包含以下部分，各部分使用换行符（\n）分隔：

```
"HMAC-SHA256"
时间戳
规范化请求的SHA256哈希值
```

### 3. 计算签名

使用您的令牌（token）对待签名字符串进行 HMAC-SHA256 计算，然后将结果转换为十六进制字符串。

### 4. 构造授权头

将计算得到的签名添加到 `Authorization` 头：

```
Authorization: HMAC-SHA256 Credential={id}, Signature={signature}
```

**注意**：`{id}` 是创建访问令牌时返回的令牌 ID（而非用户 ID），`{signature}` 是上一步计算得到的签名。

### 时间戳窗口

服务器会校验 `X-Timestamp` 的值，以限制已签名请求的有效期：

- 时间戳为 `0`（缺失或无法解析）将被拒绝。
- 比服务器时间早超过 300 秒的时间戳会被拒绝，并返回 `signature expired` 错误。
- 未来时间的时间戳**不会**被拒绝，因此客户端时钟略微快于服务器的适度偏差不会导致失败。 只有过旧的时间戳才会落在窗口之外。

由于时间戳是待签名字符串的一部分，你在 `X-Timestamp` 请求头中发送的值必须与计算签名时使用的值完全一致。

### 访问令牌属性

访问令牌在面板的 **设置 → 用户** 中创建和管理。 每个令牌都具有以下影响 API 请求的属性：

- **令牌 ID 与密钥**：完整的令牌密钥**仅在创建令牌时显示一次**。 请妥善保管，之后将无法再次获取。 令牌 ID 即 `Authorization` 请求头中使用的 `{id}`。
- **有效期**：每个令牌都有一个过期时间（在创建时设置，介于当前时间与最多 10 年后之间）。 使用已过期令牌发起的请求会被拒绝，并返回 `token expired` 错误。
- **IP 白名单（可选）**：可以将令牌限制为只允许来自指定的源地址列表。 每一条都可以是单个 IP 地址或一个 CIDR 网段（例如 `203.0.113.10` 或 `203.0.113.0/24`）。 设置白名单后，来自其他任何地址的请求都会被拒绝，并返回 `invalid request ip` 错误。 当列表为空时，该令牌可从任意地址使用。

## Go 示例

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

## PHP 示例

```php
<?php
/**
 * AcePanel API 请求示例 (PHP)
 */

function signRequest($method, $url, $body, $id, $token) {
    // 解析URL并获取路径
    $parsedUrl = parse_url($url);
    $path = $parsedUrl['path'];
    $query = isset($parsedUrl['query']) ? $parsedUrl['query'] : '';
    
    // 规范化路径
    $canonicalPath = $path;
    if (strpos($path, '/api') !== 0) {
        $apiPos = strpos($path, '/api');
        if ($apiPos !== false) {
            $canonicalPath = substr($path, $apiPos);
        }
    }
    
    // 计算请求体的SHA256哈希值
    $bodySha256 = hash('sha256', $body ?: '');
    
    // 构造规范化请求
    $canonicalRequest = implode("\n", [
        $method,
        $canonicalPath,
        $query,
        $bodySha256
    ]);
    
    // 获取当前时间戳
    $timestamp = time();
    
    // 构造待签名字符串
    $stringToSign = implode("\n", [
        'HMAC-SHA256',
        $timestamp,
        hash('sha256', $canonicalRequest)
    ]);
    
    // 计算签名
    $signature = hash_hmac('sha256', $stringToSign, $token);
    
    // 返回签名和时间戳
    return [
        'timestamp' => $timestamp,
        'signature' => $signature,
        'id' => $id
    ];
}

// 示例请求
$apiUrl = 'http://example.com/entrance/api/user/info';
$method = 'GET';
$body = ''; // 对于GET请求，通常没有请求体
$id = 16;
$token = 'YourSecretToken';

// 生成签名信息
$signingData = signRequest($method, $apiUrl, $body, $id, $token);

// 准备HTTP请求头
$headers = [
    'Content-Type: application/json',
    'X-Timestamp: ' . $signingData['timestamp'],
    'Authorization: HMAC-SHA256 Credential=' . $signingData['id'] . ', Signature=' . $signingData['signature']
];

// 使用cURL发送请求
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

if (!empty($body)) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}

// 执行请求并获取响应
$response = curl_exec($ch);
$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// 输出结果
echo "响应状态码: " . $statusCode . PHP_EOL;
echo "响应内容: " . $response . PHP_EOL;
```

## Python 示例

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

## Java 示例

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
 * AcePanel API 请求示例 (Java)
 */
public class AcePanelApiExample {

    public static void main(String[] args) {
        try {
            // 示例请求
            String apiUrl = "http://example.com/entrance/api/user/info";
            String method = "GET";
            String body = ""; // 对于GET请求，通常没有请求体
            int id = 16;
            String token = "YourSecretToken";

            // 生成签名信息
            SigningData signingData = signRequest(method, apiUrl, body, id, token);

            // 准备HTTP请求
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Content-Type", "application/json")
                    .header("X-Timestamp", String.valueOf(signingData.timestamp))
                    .header("Authorization", "HMAC-SHA256 Credential=" + signingData.id + 
                            ", Signature=" + signingData.signature);

            // 设置请求方法和请求体
            if (method.equals("GET")) {
                requestBuilder.GET();
            } else {
                requestBuilder.method(method, HttpRequest.BodyPublishers.ofString(body));
            }

            HttpRequest request = requestBuilder.build();

            // 发送请求
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // 输出结果
            System.out.println("响应状态码: " + response.statusCode());
            System.out.println("响应内容: " + response.body());

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
        // 解析URL
        URI uri = new URI(url);
        String path = uri.getPath();
        String query = uri.getQuery() != null ? uri.getQuery() : "";
        
        // 规范化路径
        String canonicalPath = path;
        if (!path.startsWith("/api")) {
            int apiPos = path.indexOf("/api");
            if (apiPos != -1) {
                canonicalPath = path.substring(apiPos);
            }
        }
        
        // 计算请求体的SHA256哈希值
        String bodySha256 = sha256Hash(body != null ? body : "");
        
        // 构造规范化请求
        String canonicalRequest = String.join("\n", 
                method,
                canonicalPath,
                query,
                bodySha256);
        
        // 获取当前时间戳
        long timestamp = Instant.now().getEpochSecond();
        
        // 构造待签名字符串
        String stringToSign = String.join("\n",
                "HMAC-SHA256",
                String.valueOf(timestamp),
                sha256Hash(canonicalRequest));
        
        // 计算签名
        String signature = hmacSha256(token, stringToSign);
        
        // 返回签名和时间戳
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

## Node.js 示例

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

## 响应格式

所有 API 响应都是采用统一信封结构的 JSON 对象：

```json
{
    "msg": "success",
    "data": {}
}
```

- `msg`：成功时为字符串 `success`；失败时包含错误信息。
- `data`：响应数据。 对于分页列表接口，响应数据是一个包含 `total`（条目总数）和 `items`（当前页条目）的对象。

错误响应使用相同的结构，但仅返回 `msg` 字段，并附带对应的 HTTP 状态码。

## 常见响应码

| HTTP 状态码 | 描述      |
| -------- | ------- |
| 200      | 请求成功    |
| 401      | 身份验证失败  |
| 403      | 权限不足    |
| 404      | 资源不存在   |
| 422      | 请求参数错误  |
| 500      | 服务器内部错误 |

## API 接口概览

上面的示例使用的是 `/api/user/info`，但同样的签名机制适用于面板的每一个接口。 所有接口都位于 `/api/` 前缀下，并按功能分组。 下表列出了可用的接口分组；每个功能的管理界面都会向对应的前缀发起请求，因此要了解某项操作的确切路径、方法和参数，最简单的方式就是在面板中打开该功能，并观察它发出的网络请求。

| 接口前缀                                                                                                                            | 功能                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `/api/user`、`/api/users`                                                                                                        | 当前用户信息、登录状态、两步验证、通行密钥、用户管理                                            |
| `/api/user_tokens`                                                                                                              | 访问令牌管理（列表、创建、更新、删除）                                                   |
| `/api/user_passkeys`                                                                                                            | 通行密钥（WebAuthn）凭据管理                                                    |
| `/api/home`                                                                                                                     | 仪表盘、系统信息、面板更新与重启                                                      |
| `/api/task`                                                                                                                     | 后台任务列表与状态                                                             |
| `/api/website`                                                                                                                  | 网站及网站统计                                                               |
| `/api/project`                                                                                                                  | 项目                                                                    |
| `/api/database`、`/api/database_server`、`/api/database_user`                                                                     | 数据库、数据库服务器和数据库用户                                                      |
| `/api/database_redis`                                                                                                           | Redis 键值操作                                                            |
| `/api/database_elasticsearch`                                                                                                   | Elasticsearch 索引与文档操作                                                 |
| `/api/backup`、`/api/backup_storage`                                                                                             | 备份与备份存储                                                               |
| `/api/cert`                                                                                                                     | 证书、ACME 账户和 DNS 提供商                                                   |
| `/api/app`                                                                                                                      | 应用商店（安装、卸载、更新）                                                        |
| `/api/environment`                                                                                                              | 运行环境（Go、Java、Node.js、PHP、Python、.NET） |
| `/api/cron`                                                                                                                     | 计划（cron）任务                                                            |
| `/api/process`                                                                                                                  | 进程列表与信号                                                               |
| `/api/safe`、`/api/firewall`                                                                                                     | Ping 开关、防火墙规则和扫描检测                                                    |
| `/api/ssh`                                                                                                                      | SSH 连接配置                                                              |
| `/api/container`                                                                                                                | 容器、Compose、网络、镜像和卷                                                    |
| `/api/file`                                                                                                                     | 文件管理器操作，包括分片上传                                                        |
| `/api/log`                                                                                                                      | 面板与 SSH 日志                                                            |
| `/api/monitor`                                                                                                                  | 资源监控数据与设置                                                             |
| `/api/setting`                                                                                                                  | 面板设置                                                                  |
| `/api/systemctl`                                                                                                                | systemd 服务控制                                                          |
| `/api/toolbox_system`、`/api/toolbox_network`、`/api/toolbox_disk`、`/api/toolbox_ssh`、`/api/toolbox_benchmark`、`/api/toolbox_log` | 工具箱实用工具（DNS、Swap、时间、主机名、磁盘、SSH 配置、性能测试、日志清理）                          |
| `/api/toolbox_migration`                                                                                                        | 服务器迁移                                                                 |
| `/api/webhook`                                                                                                                  | WebHook 管理                                                            |
| `/api/template`                                                                                                                 | 配置模板                                                                  |
| `/api/apps/...`                                                                                                                 | 由已安装应用注册的应用专属接口                                                       |

> **WebSocket 接口无法通过令牌认证访问。** 任何携带 `Authorization` 请求头、位于 `/api/ws` 下的请求都会被拒绝，并返回 `ws not allowed` 错误；WebSocket 功能（例如终端）仅可通过交互式浏览器会话使用。

## 安全建议

1. **保护您的 API 令牌**：不要在客户端代码中硬编码或公开您的 API 令牌
2. **定期轮换令牌**：定期更改您的 API 令牌以提高安全性
3. **配置 IP 白名单**：在生产环境中使用 IP 白名单限制访问

## 常见问题解答

### 签名验证失败

如果遇到签名验证失败，请检查：

- 确认你使用的是正确的 API 令牌，以及创建令牌时返回的令牌 ID（而非用户 ID）
- 检查客户端时钟是否准确；比服务器时间早超过 300 秒的时间戳会导致校验失败（客户端时钟超前则可被容忍）。 确保你发送的 `X-Timestamp` 与计算签名时使用的值一致
- 确保请求体在计算签名前后没有被修改
- 确保 URL 路径处理正确，注意规范化路径时需要移除入口前缀
- 如果令牌设置了 IP 白名单，请确认请求来自允许的 IP 或 CIDR 网段，否则会被拒绝并返回 `invalid request ip` 错误

### 请求超时

- 检查网络连接
- 确认服务器状态
- 考虑增加客户端的超时设置
