# 面板 API

AcePanel 的管理介面位於 `/api` 下。 指令碼和系統整合應使用訪問令牌，不要自動化 Web 登入，也不要複用瀏覽器會話。

## 建立訪問令牌

進入 **設定 > 使用者 > 訪問令牌**，建立令牌並設定有效期；條件允許時，將允許來源限制為整合伺服器的 IP 地址或 CIDR。

令牌金鑰只顯示一次。 請將 Token ID 和金鑰儲存到金鑰管理工具中。 Token ID 用於標識該憑據，並不是使用者 ID。

## 請求地址

```text
https://panel.example.com/<entrance>/api/<resource>
```

公開訪問地址可能包含面板安全入口字首。 構造規範請求時，只使用從 `/api` 開始的路徑，不包含安全入口、協議、主機和 URL 片段。

## HMAC-SHA256 認證

每個令牌請求都需要傳送：

| 請求頭             | 值                                                              |
| --------------- | -------------------------------------------------------------- |
| `X-Timestamp`   | 參與簽名的 Unix 秒級時間戳                                               |
| `Authorization` | `HMAC-SHA256 Credential=<token-id>, Signature=<hex-signature>` |
| `Content-Type`  | JSON 請求體使用 `application/json`；該值不參與簽名                          |

時間戳缺失或比伺服器時間早 300 秒以上時，AcePanel 會拒絕請求。 整合伺服器和麵板伺服器都應使用 NTP 保持時間同步。

### 規範請求

按以下順序使用 `\n` 連線四項內容，末尾不額外新增換行：

```text
HTTP_METHOD
REQUEST_PATH
SORTED_QUERY_STRING
SHA256_HEX(RAW_BODY)
```

- HTTP 方法使用大寫形式。
- 請求路徑從 `/api` 開始，不包含面板安全入口字首。
- 查詢引數使用標準 URL 轉義，並按鍵和值排序，不包含開頭的 `?`。
- 對實際傳送的請求體原始位元組計算雜湊。 空請求體的 SHA-256 為 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`。

對規範請求計算雜湊，構造待簽名字串，再使用令牌金鑰計算 HMAC-SHA256：

```text
HMAC-SHA256
<timestamp>
SHA256_HEX(<canonical-request>)
```

## 固定簽名示例

連線真實介面前，可以使用以下固定資料驗證簽名實現：

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

以下四個示例都會生成相同簽名。

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

真實請求應使用當前 Unix 時間戳，並對最終序列化後傳送的請求體位元組計算雜湊； 同一個時間戳寫入 `X-Timestamp`。

## 響應和錯誤

普通響應使用以下外層結構：

```json
{
  "msg": "success",
  "data": {}
}
```

分頁介面通常在 `data` 中返回：

```json
{
  "total": 42,
  "items": []
}
```

讀取 `data` 前先檢查 HTTP 狀態碼。 認證錯誤包括請求頭或簽名無效、令牌過期、時間戳超出允許範圍以及來源地址不在令牌白名單中。 引數校驗和業務錯誤會通過訊息說明被拒絕的欄位或操作。

不要把可能經過翻譯的 `msg` 當作穩定的程式錯誤碼。 程式應使用 HTTP 狀態碼和 `data` 結構判斷結果，同時把訊息記錄給運維人員檢視。

## JSON、上傳和查詢引數

- JSON 只序列化一次，對生成的位元組計算雜湊，併發送相同位元組。 簽名後再改變空格或鍵順序會導致雜湊不同。
- `multipart/form-data` 必須對完整編碼後的請求體計算雜湊，包括邊界和換行。 應由同一個元件同時生成請求體及其雜湊。
- 查詢引數只構造和編碼一次。 簽名 `a=1&b=2` 卻傳送 `b=2&a=1`、使用不同轉義方式或丟棄空值，都可能導致簽名無效。
- 不要在查詢字串中傳遞憑據。

## WebSocket 和 SSE

終端、即時日誌、映象拉取、證書、更新、SFTP 和遷移進度使用 `/api/ws/...` 下的 WebSocket 介面，部分遷移執行過程使用 SSE。這些長連線不會出現在生成的 OpenAPI 文件中，也不使用普通 JSON 請求和響應外層結構。

面板互動功能應使用瀏覽器會話。 外部系統整合優先呼叫用於啟動或查詢操作的普通 HTTP 介面；只有明確需要且已經確認訊息格式與認證方式時，才實現對應流式連線。

## 介面分組

API 按照面板資源劃分：

- 使用者、訪問令牌、安全和設定；
- 首頁、面板任務和計劃任務；
- 網站、網站統計、證書和備份；
- 專案和執行環境；
- 資料庫、使用者、伺服器、Redis 和 Elasticsearch；
- 應用和容器模板；
- 容器、Compose、映象、網路和卷；
- 檔案和公開分享；
- 防火牆、掃描感知、防篡改、監控、告警、通知和日誌；
- SSH、程序和工具箱功能。

已安裝應用還可能在 `/api/apps` 下增加動態介面。

## OpenAPI

啟用除錯模式後，AcePanel 會根據已註冊的 HTTP 路由生成 OpenAPI 文件：

```text
https://panel.example.com/openapi.json
https://panel.example.com/docs
```

在 `/opt/ace/panel/storage/config.yml` 中設定 `app.debug: true` 並重啟面板。只應在可信開發環境中使用這些頁面。

:::danger 不要在正式環境中長期啟用除錯模式
產生的介面文件會公開大量管理操作清單。 開發或排查完成後，關閉除錯模式並重啟 AcePanel。 一般正式環境模式不會掛載 `/docs` 和 `/openapi.json`。
:::

WebSocket 路由、探針、動態應用路由以及沒有請求或響應結構的介面可能不會出現在 OpenAPI 中。 應以當前已安裝面板生成的文件為 HTTP 路由和欄位結構依據。
