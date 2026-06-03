# Go 專案

Go 專案用於部署使用 Go 語言開發的後端應用程式，例如 Gin、Echo、Fiber 等框架。

## 前置需求

1. 安裝 Go 執行環境：**應用程式** > **執行環境** > **Go**
2. 編譯好的 Go 執行檔或原始碼

## 部署方式

### 方式一：部署編譯好的二進位檔案

1. 在本機編譯 Go 專案：

```bash
# 交叉編譯為 Linux amd64
GOOS=linux GOARCH=amd64 go build -o myapp
```

2. 將二進位檔案上傳到伺服器
3. 建立專案，啟動指令填入：`./myapp`

### 方式二：在伺服器上編譯

1. 將原始碼上傳到伺服器
2. 在終端機中編譯：

```bash
cd /opt/ace/projects/myapp
go build -o myapp
```

3. 建立專案，啟動指令填入：`./myapp`

## 建立 Go 專案

1. 進入 **專案** 頁面，開啟 **Go** 分頁
2. 點選 **建立專案**
3. 填入設定：
   - **專案名稱**：`myapp`（用作服務識別碼）
   - **專案目錄**：留空則預設為 `/opt/ace/projects/<專案名稱>`，或選擇一個目錄
   - **執行模式**：選擇 **原始碼** 或 **二進位**
     - **原始碼**：選擇已安裝的 **Go 版本** 與 **進入點檔案**（例如 `main.go`、`cmd/server/main.go`），啟動指令會自動產生為 `go<版本> run <進入點檔案>`
     - **二進位**：啟動指令會產生為 `<專案目錄>/main`
   - **執行使用者**：預設為 `www`（也可以選擇 `root`/`nobody` 或輸入自訂使用者）
   - **啟動指令**：依上述選項自動填入，可編輯
4. 啟用 **反向代理** 並填入 **網域** 與 **專案連接埠**，即可自動建立反向代理網站供外部存取

## 管理專案

建立完成後，專案會出現在 **Go** 分頁的清單中。 **狀態** 欄會顯示服務處於 **執行中**、**已停止**、**失敗** 或 **未啟用**。 對於每個專案，您可以：

- **啟動** / **停止** 服務
- **重新啟動** 與 **重新載入**（僅在專案執行中時顯示）
- 檢視即時 **記錄檔**
- **編輯** 專案（詳見下文）
- **刪除** 專案（含確認倒數計時）
- 切換 **開機自動啟動**，以啟用或停用開機時啟動該服務

您也可以選取多個專案，使用批次 **刪除** 按鈕。

### 編輯

每個專案都會以 `systemd` 服務的形式管理，**編輯** 對話方塊會透過多個分頁公開底層的單元設定。 變更會寫回服務單元檔案：

- **基本設定**：專案名稱、描述、專案目錄、工作目錄與執行使用者。
- **執行設定**：啟動前 / 啟動後 / 停止 / 重新載入指令，重新啟動策略（`no`、`always`、`on-failure`、`on-abnormal`、`on-abort`、`on-success`），重新啟動間隔，最大重新啟動次數，啟動/停止逾時，標準輸出 / 標準錯誤目標（`journal`、`syslog`、`kmsg`、`null`，或附加/截斷寫入檔案），以及環境變數。
- **相依性**：透過 `Requires`（強）、`Wants`（弱）、`After` 與 `Before` 單元相依性來控制啟動順序。
- **資源限制**：記憶體限制（MB）與 CPU 配額（例如 `50%` 表示半個核心，`200%` 表示兩個核心）。
- **安全設定**：`NoNewPrivileges`、保護 `/tmp`、保護 `/home`、`ProtectSystem`（`true` / `full` / `strict`），以及讀寫 / 唯讀路徑允許清單。

如需這些分頁所對應的每個 `systemd` 指示詞的完整說明，請參閱 [一般專案](./general) 指南。

## 啟動指令範例

```bash
# 執行編譯好的二進位檔案
./myapp

# 使用指定版本的 Go 執行
go1.24 run main.go

# 帶參數執行
./myapp -port 8080 -config ./config.yaml

# 設定環境變數
GIN_MODE=release ./myapp
```

## 常用框架

### Gin

```go
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Hello"})
    })
    r.Run(":8080")
}
```

啟動指令：`GIN_MODE=release ./myapp`

### Echo

```go
package main

import (
    "github.com/labstack/echo/v4"
)

func main() {
    e := echo.New()
    e.GET("/", func(c echo.Context) error {
        return c.String(200, "Hello")
    })
    e.Start(":8080")
}
```

### Fiber

```go
package main

import "github.com/gofiber/fiber/v2"

func main() {
    app := fiber.New()
    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Hello")
    })
    app.Listen(":8080")
}
```

## 注意事項

1. 確保二進位檔案具有執行權限：`chmod +x myapp`
2. 正式環境建議使用編譯好的二進位檔案，而非 `go run`
3. 建議使用環境變數或設定檔來管理設定，避免寫死在程式碼中
