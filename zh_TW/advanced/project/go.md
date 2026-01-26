# Go 專案

Go 專案用於部署使用 Go 語言開發的後端應用，如 Gin、Echo、Fiber 等框架。

## 前置要求

1. 安裝 Go 執行環境：**應用** > **執行環境** > **Go**
2. 編譯好的 Go 可執行檔案或原始碼

## 部署方式

### 方式一：部署編譯好的二進位檔案

1. 在本地編譯 Go 專案：

```bash
# 交叉編譯為 Linux amd64
GOOS=linux GOARCH=amd64 go build -o myapp
```

2. 上傳二進位檔案到伺服器
3. 建立專案，啟動命令填寫：`./myapp`

### 方式二：在伺服器上編譯

1. 上傳原始碼到伺服器
2. 在終端機中編譯：

```bash
cd /opt/ace/project/myapp
go build -o myapp
```

3. 建立專案，啟動命令填寫：`./myapp`

## 建立 Go 專案

1. 進入 **專案** 頁面
2. 點擊 **建立專案**
3. 填寫設定：
   - **專案名稱**：`myapp`
   - **專案目錄**：`/opt/ace/project/myapp`
   - **啟動命令**：`./myapp` 或 `go1.24 run main.go`
4. 開啟 **反向代理** 以便外部存取

## 啟動命令範例

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

啟動命令：`GIN_MODE=release ./myapp`

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

1. 確保二進位檔案有執行權限：`chmod +x myapp`
2. 生產環境建議使用編譯好的二進位檔案，而非 `go run`
3. 建議使用環境變數或設定檔管理設定，避免寫死在程式碼中
