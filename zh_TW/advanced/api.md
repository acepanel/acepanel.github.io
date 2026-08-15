# Panel API

AcePanel exposes its management functions under `/api`. Use an access token for scripts and integrations; do not automate the Web login or reuse a browser session.

## Create an Access Token

Open **Settings > User > Access Tokens**, create a token, set its expiry time, and restrict it to the integration server's IP address or CIDR whenever possible.

The secret is displayed once. Store the Token ID and secret in a secret manager. The Token ID identifies the credential and is not the user ID.

## Request Address

```text
https://panel.example.com/<entrance>/api/<resource>
```

The public URL may contain the panel entrance prefix. For the canonical request, use the path suffix beginning with `/api` and omit the entrance prefix, scheme, host, and fragment.

## HMAC-SHA256 Authentication

Every token request sends:

| Header          | Value                                                                      |
| --------------- | -------------------------------------------------------------------------- |
| `X-Timestamp`   | Unix time in seconds used in the signature                                 |
| `Authorization` | `HMAC-SHA256 Credential=<token-id>, Signature=<hex-signature>`             |
| `Content-Type`  | `application/json` for JSON bodies; the value is not part of the signature |

AcePanel rejects a missing timestamp or one more than 300 seconds behind the server. Keep both systems synchronized with NTP.

### Canonical Request

Join these four values with `\n`, without an extra final newline:

```text
HTTP_METHOD
REQUEST_PATH
SORTED_QUERY_STRING
SHA256_HEX(RAW_BODY)
```

- Use the uppercase HTTP method.
- Use the canonical path beginning with `/api`, without the panel entrance prefix.
- Encode query parameters with standard URL escaping, sort by key and value, and omit the leading `?`.
- Hash the exact body bytes sent on the wire. An empty body has SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.

Hash the canonical request, create the string to sign, then calculate HMAC-SHA256 with the token secret:

```text
HMAC-SHA256
<timestamp>
SHA256_HEX(<canonical-request>)
```

## Fixed Signing Example

Use this vector to verify an implementation before sending a live request:

```text
Token ID:          16
Token secret:      docs-demo-token
Timestamp:         1700000000
Method:            GET
Path:              /api/user/info
Query:             page=1&size=20
Body:              <empty>
Canonical hash:    38bf1025a419a585944c9f458b9b1dd5afc6ac0ee4ca4930fd30ca0a52a934e5
Signature:         0acf9b3e9bcb3340df2c789e4009fb2f710cc995022c1359af5322616875da16
```

All examples below produce that signature.

### Go

```go
package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "fmt"
)

func hexSHA256(s string) string {
    sum := sha256.Sum256([]byte(s))
    return hex.EncodeToString(sum[:])
}

func main() {
    canonical := "GET\n/api/user/info\npage=1&size=20\n" + hexSHA256("")
    stringToSign := "HMAC-SHA256\n1700000000\n" + hexSHA256(canonical)
    mac := hmac.New(sha256.New, []byte("docs-demo-token"))
    _, _ = mac.Write([]byte(stringToSign))
    fmt.Println(hex.EncodeToString(mac.Sum(nil)))
}
```

### PHP

```php
<?php
$emptyHash = hash('sha256', '');
$canonical = "GET\n/api/user/info\npage=1&size=20\n" . $emptyHash;
$toSign = "HMAC-SHA256\n1700000000\n" . hash('sha256', $canonical);
echo hash_hmac('sha256', $toSign, 'docs-demo-token') . PHP_EOL;
```

### Python

```python
import hashlib
import hmac

sha256 = lambda value: hashlib.sha256(value.encode()).hexdigest()
canonical = "GET\n/api/user/info\npage=1&size=20\n" + sha256("")
to_sign = "HMAC-SHA256\n1700000000\n" + sha256(canonical)
print(hmac.new(b"docs-demo-token", to_sign.encode(), hashlib.sha256).hexdigest())
```

### JavaScript

```js
import { createHash, createHmac } from 'node:crypto'

const sha256 = (value) => createHash('sha256').update(value).digest('hex')
const canonical = `GET\n/api/user/info\npage=1&size=20\n${sha256('')}`
const toSign = `HMAC-SHA256\n1700000000\n${sha256(canonical)}`
console.log(createHmac('sha256', 'docs-demo-token').update(toSign).digest('hex'))
```

For a live request, replace the fixed timestamp with the current Unix time and calculate the body hash from the exact serialized bytes. Send the same timestamp in `X-Timestamp`.

## Responses and Errors

A normal response envelope is:

```json
{
  "msg": "success",
  "data": {}
}
```

Paginated endpoints normally return the following inside `data`:

```json
{
  "total": 42,
  "items": []
}
```

Check the HTTP status before reading `data`. Authentication errors include an invalid header or signature, an expired token, a timestamp outside the accepted window, and a source address outside the token allowlist. Validation and business errors return a message describing the rejected field or operation.

Do not parse a translated `msg` as a stable program code. Use the HTTP status and the structure of `data`, and log the message for an operator.

## JSON, Uploads, and Query Parameters

- Serialize JSON once, hash those bytes, and send the same bytes. Changing whitespace or key order after signing changes the hash.
- For `multipart/form-data`, hash the complete encoded multipart body, including boundaries and line endings. Let one component build both the body and its hash.
- Build and encode the query once. Signing `a=1&b=2` and sending `b=2&a=1`, using different escaping, or dropping an empty value can invalidate the signature.
- Do not send credentials in a query string.

## WebSocket and SSE

Terminal, live-log, image-pull, certificate, update, SFTP, and migration progress connections use `/api/ws/...` WebSocket endpoints. Some migration execution streams use SSE. These long-lived connections are not described by the generated OpenAPI document and do not use the normal JSON request/response envelope.

Use the browser session for interactive panel features. For an external integration, prefer the regular HTTP endpoint that starts or queries an operation, then implement the corresponding stream only when its message format and authentication are explicitly required.

## Endpoint Groups

The API is grouped by the same resources as the panel:

- user, access tokens, security, and settings;
- home, tasks, and scheduled tasks;
- websites, website statistics, certificates, and backups;
- projects and runtime environments;
- databases, users, servers, Redis, and Elasticsearch;
- applications and container templates;
- containers, Compose, images, networks, and volumes;
- files and public shares;
- firewall, scan awareness, tamper protection, monitoring, alerts, notifications, and logs;
- SSH, processes, and toolbox functions.

Installed applications may add routes below `/api/apps`.

## OpenAPI

AcePanel generates an OpenAPI document from its registered HTTP routes when debug mode is enabled:

```text
https://panel.example.com/openapi.json
https://panel.example.com/docs
```

Set `app.debug: true` in `/opt/ace/panel/storage/config.yml`, restart the panel, and use the pages only on a trusted development system.

:::danger Do not leave debug mode enabled in production
The generated specification exposes a broad inventory of administrative operations. Disable debug mode and restart AcePanel after development or troubleshooting. In normal production mode, `/docs` and `/openapi.json` are not mounted.
:::

WebSocket routes, probes, dynamic application routes, and endpoints without request or response schemas may be absent from OpenAPI. Treat the installed panel's generated document as the reference for its HTTP routes and field schemas.
