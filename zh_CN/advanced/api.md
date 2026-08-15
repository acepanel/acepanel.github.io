# 面板 API

AcePanel 的管理接口位于 `/api` 下。 脚本和系统集成应使用访问令牌，不要自动化 Web 登录，也不要复用浏览器会话。

## 创建访问令牌

进入 **设置 > 用户 > 访问令牌**，创建令牌并设置有效期；条件允许时，将允许来源限制为集成服务器的 IP 地址或 CIDR。

令牌密钥只显示一次。 请将 Token ID 和密钥保存到密钥管理工具中。 Token ID 用于标识该凭据，并不是用户 ID。

## 请求地址

```text
https://panel.example.com/<entrance>/api/<resource>
```

公开访问地址可能包含面板安全入口前缀。 构造规范请求时，只使用从 `/api` 开始的路径，不包含安全入口、协议、主机和 URL 片段。

## HMAC-SHA256 认证

每个令牌请求都需要发送：

| 请求头             | 值                                                              |
| --------------- | -------------------------------------------------------------- |
| `X-Timestamp`   | 参与签名的 Unix 秒级时间戳                                               |
| `Authorization` | `HMAC-SHA256 Credential=<token-id>, Signature=<hex-signature>` |
| `Content-Type`  | JSON 请求体使用 `application/json`；该值不参与签名                          |

时间戳缺失或比服务器时间早 300 秒以上时，AcePanel 会拒绝请求。 集成服务器和面板服务器都应使用 NTP 保持时间同步。

### 规范请求

按以下顺序使用 `\n` 连接四项内容，末尾不额外添加换行：

```text
HTTP_METHOD
REQUEST_PATH
SORTED_QUERY_STRING
SHA256_HEX(RAW_BODY)
```

- HTTP 方法使用大写形式。
- 请求路径从 `/api` 开始，不包含面板安全入口前缀。
- 查询参数使用标准 URL 转义，并按键和值排序，不包含开头的 `?`。
- 对实际发送的请求体原始字节计算哈希。 空请求体的 SHA-256 为 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`。

对规范请求计算哈希，构造待签名字符串，再使用令牌密钥计算 HMAC-SHA256：

```text
HMAC-SHA256
<timestamp>
SHA256_HEX(<canonical-request>)
```

## 固定签名示例

连接真实接口前，可以使用以下固定数据验证签名实现：

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

以下四个示例都会生成相同签名。

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

真实请求应使用当前 Unix 时间戳，并对最终序列化后发送的请求体字节计算哈希； 同一个时间戳写入 `X-Timestamp`。

## 响应和错误

普通响应使用以下外层结构：

```json
{
  "msg": "success",
  "data": {}
}
```

分页接口通常在 `data` 中返回：

```json
{
  "total": 42,
  "items": []
}
```

读取 `data` 前先检查 HTTP 状态码。 认证错误包括请求头或签名无效、令牌过期、时间戳超出允许范围以及来源地址不在令牌白名单中。 参数校验和业务错误会通过消息说明被拒绝的字段或操作。

不要把可能经过翻译的 `msg` 当作稳定的程序错误码。 程序应使用 HTTP 状态码和 `data` 结构判断结果，同时把消息记录给运维人员查看。

## JSON、上传和查询参数

- JSON 只序列化一次，对生成的字节计算哈希，并发送相同字节。 签名后再改变空格或键顺序会导致哈希不同。
- `multipart/form-data` 必须对完整编码后的请求体计算哈希，包括边界和换行。 应由同一个组件同时生成请求体及其哈希。
- 查询参数只构造和编码一次。 签名 `a=1&b=2` 却发送 `b=2&a=1`、使用不同转义方式或丢弃空值，都可能导致签名无效。
- 不要在查询字符串中传递凭据。

## WebSocket 和 SSE

终端、实时日志、镜像拉取、证书、更新、SFTP 和迁移进度使用 `/api/ws/...` 下的 WebSocket 接口，部分迁移执行过程使用 SSE。这些长连接不会出现在生成的 OpenAPI 文档中，也不使用普通 JSON 请求和响应外层结构。

面板交互功能应使用浏览器会话。 外部系统集成优先调用用于启动或查询操作的普通 HTTP 接口；只有明确需要且已经确认消息格式与认证方式时，才实现对应流式连接。

## 接口分组

API 按照面板资源划分：

- 用户、访问令牌、安全和设置；
- 首页、面板任务和计划任务；
- 网站、网站统计、证书和备份；
- 项目和运行环境；
- 数据库、用户、服务器、Redis 和 Elasticsearch；
- 应用和容器模板；
- 容器、Compose、镜像、网络和卷；
- 文件和公开分享；
- 防火墙、扫描感知、防篡改、监控、告警、通知和日志；
- SSH、进程和工具箱功能。

已安装应用还可能在 `/api/apps` 下增加动态接口。

## OpenAPI

启用调试模式后，AcePanel 会根据已注册的 HTTP 路由生成 OpenAPI 文档：

```text
https://panel.example.com/openapi.json
https://panel.example.com/docs
```

在 `/opt/ace/panel/storage/config.yml` 中设置 `app.debug: true` 并重启面板。只应在可信开发环境中使用这些页面。

:::danger 不要在生产环境中长期启用调试模式
生成的接口文档会公开大量管理操作清单。 开发或排查完成后，关闭调试模式并重启 AcePanel。 正常生产模式不会挂载 `/docs` 和 `/openapi.json`。
:::

WebSocket 路由、探针、动态应用路由以及没有请求或响应结构的接口可能不会出现在 OpenAPI 中。 应以当前已安装面板生成的文档为 HTTP 路由和字段结构依据。
