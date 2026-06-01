# API Reference Documentation

## Overview

AcePanel provides a secure RESTful interface for interacting with the panel system. All API requests require HMAC-SHA256 signature authentication to ensure the security and integrity of communications.

## Basic Information

- **Base URL**: `http(s)://your-panel-domain/{entry}/api/`
- **Content Type**: All requests and responses use `application/json`
- **Character Encoding**: UTF-8

## Authentication Mechanism

The API uses the HMAC-SHA256 signature algorithm for authentication. Each request must include the following HTTP headers:

| Header Name     | Required  | Description                                                                              |
|-----------------|-----------|------------------------------------------------------------------------------------------|
| `X-Timestamp`   | Yes       | Current UNIX timestamp (seconds). See the timestamp window described below.              |
| `Authorization` | Yes       | Authentication information, format: `HMAC-SHA256 Credential={id}, Signature={signature}` |
| `Content-Type`  | No        | Convention only; recommended to set to `application/json` for requests that carry a JSON body. It is **not** part of the canonical request and is **not** verified by the server. |

## Signature Algorithm

The signature process consists of four main steps:

### 1. Construct Canonical Request

The canonical request string consists of the following parts, separated by newline characters (\n):

```
HTTP Method
Canonical Path
Canonical Query String
SHA256 Hash of Request Body
```

**Note**: The canonical path should always use the path part starting with `/api/`, ignoring the entry prefix.

### 2. Construct String to Sign

The string to sign consists of the following parts, separated by newline characters (\n):

```
"HMAC-SHA256"
Timestamp
SHA256 Hash of Canonical Request
```

### 3. Calculate Signature

Calculate HMAC-SHA256 on the string to sign using your token, then convert the result to a hexadecimal string.

### 4. Construct Authorization Header

Add the calculated signature to the `Authorization` header:

```
Authorization: HMAC-SHA256 Credential={id}, Signature={signature}
```

**Note**: `{id}` is the token ID returned when you create an access token (not the user ID), and `{signature}` is the signature calculated in the previous step.

### Timestamp Window

The server validates the `X-Timestamp` value to limit the lifetime of a signed request:

- A timestamp of `0` (missing or unparsable) is rejected.
- A timestamp older than 300 seconds in the past (relative to server time) is rejected with a `signature expired` error.
- Timestamps in the future are **not** rejected, so a moderate clock skew where the client is ahead of the server will not cause a failure. Only timestamps that are too old fall outside the window.

Because the timestamp is part of the string to sign, you must send the exact same value in the `X-Timestamp` header that you used when computing the signature.

### Access Token Properties

Access tokens are created and managed under **Settings → User** in the panel. Each token has the following properties that affect API requests:

- **Token ID and secret**: The full token secret is shown **only once**, at the moment the token is created. Store it securely; it cannot be retrieved again afterwards. The token ID is the `{id}` used in the `Authorization` header.
- **Expiration**: Every token has an expiration time (set at creation, between the current time and at most 10 years in the future). Requests made with an expired token are rejected with a `token expired` error.
- **IP whitelist (optional)**: A token may be restricted to a list of source addresses. Each entry can be a single IP address or a CIDR block (for example `203.0.113.10` or `203.0.113.0/24`). When a whitelist is set, requests from any other address are rejected with an `invalid request ip` error. When the list is empty, the token may be used from any address.

## Go Example

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

## PHP Example

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

## Python Example

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

## Java Example

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

## Node.js Example

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

## Response Format

All API responses are JSON objects with a consistent envelope:

```json
{
    "msg": "success",
    "data": {}
}
```

- `msg`: On success this is the string `success`; on failure it contains the error message.
- `data`: The response payload. For paginated list endpoints, the payload is an object containing `total` (total number of items) and `items` (the items on the current page).

Error responses use the same structure but only return the `msg` field, together with the corresponding HTTP status code.

## Common Response Codes

| HTTP Status Code | Description             |
|------------------|-------------------------|
| 200              | Request successful      |
| 401              | Authentication failed   |
| 403              | Permission denied       |
| 404              | Resource not found      |
| 422              | Request parameter error |
| 500              | Internal server error   |

## API Surface Overview

The example above uses `/api/user/info`, but the same signing mechanism applies to every panel endpoint. All endpoints are served under the `/api/` prefix and are grouped by feature. The table below lists the available endpoint groups; the management UI for each feature issues requests against the corresponding prefix, so the simplest way to discover the exact path, method, and parameters of any operation is to open that feature in the panel and observe the network requests it sends.

| Endpoint Prefix              | Feature                                                                 |
|------------------------------|-------------------------------------------------------------------------|
| `/api/user`, `/api/users`    | Current-user info, login state, two-factor, passkeys, user management   |
| `/api/user_tokens`           | Access token management (list, create, update, delete)                  |
| `/api/user_passkeys`         | Passkey (WebAuthn) credential management                                |
| `/api/home`                  | Dashboard, system info, panel update and restart                        |
| `/api/task`                  | Background task list and status                                         |
| `/api/website`               | Websites and website statistics                                         |
| `/api/project`               | Projects                                                                |
| `/api/database`, `/api/database_server`, `/api/database_user` | Databases, database servers, and database users |
| `/api/database_redis`        | Redis key/value operations                                              |
| `/api/database_elasticsearch`| Elasticsearch index and document operations                             |
| `/api/backup`, `/api/backup_storage` | Backups and backup storage                                      |
| `/api/cert`                  | Certificates, ACME accounts, and DNS providers                          |
| `/api/app`                   | App store (install, uninstall, update)                                  |
| `/api/environment`           | Runtime environments (Go, Java, Node.js, PHP, Python, .NET)             |
| `/api/cron`                  | Scheduled (cron) tasks                                                   |
| `/api/process`               | Process list and signals                                                |
| `/api/safe`, `/api/firewall` | Ping switch, firewall rules, and scan detection                         |
| `/api/ssh`                   | SSH connection profiles                                                  |
| `/api/container`             | Containers, compose, networks, images, and volumes                      |
| `/api/file`                  | File manager operations, including chunked upload                       |
| `/api/log`                   | Panel and SSH logs                                                       |
| `/api/monitor`               | Resource monitoring data and settings                                   |
| `/api/setting`               | Panel settings                                                          |
| `/api/systemctl`             | systemd service control                                                 |
| `/api/toolbox_system`, `/api/toolbox_network`, `/api/toolbox_disk`, `/api/toolbox_ssh`, `/api/toolbox_benchmark`, `/api/toolbox_log` | Toolbox utilities (DNS, swap, time, hostname, disks, SSH config, benchmark, log cleanup) |
| `/api/toolbox_migration`     | Server migration                                                        |
| `/api/webhook`               | WebHook management                                                      |
| `/api/template`              | Configuration templates                                                 |
| `/api/apps/...`              | App-specific endpoints registered by installed apps                     |

> **WebSocket endpoints are not accessible via token authentication.** Any request under `/api/ws` that carries an `Authorization` header is rejected with a `ws not allowed` error; WebSocket features (such as the terminal) are only available through an interactive browser session.

## Security Recommendations

1. **Protect Your API Token**: Do not hardcode or expose your API token in client-side code
2. **Rotate Tokens Regularly**: Change your API token regularly to enhance security
3. **Configure IP Whitelisting**: Use IP whitelisting to restrict access in production environments

## Frequently Asked Questions

### Signature Verification Failed

If you encounter signature verification failures, check:

- Ensure you are using the correct API token and the token ID returned when the token was created (not the user ID)
- Check that the client clock is accurate; a timestamp more than 300 seconds older than the server's time will cause verification to fail (a future-dated client clock is tolerated). Make sure the `X-Timestamp` you send matches the value used to compute the signature
- Ensure the request body hasn't been modified before or after signature calculation
- Ensure the URL path is handled correctly; remember to remove the entry prefix when normalizing the path
- If the token has an IP whitelist, confirm the request originates from an allowed IP or CIDR block; otherwise it is rejected with an `invalid request ip` error

### Request Timeout

- Check network connection
- Confirm server status
- Consider increasing the client timeout settings
