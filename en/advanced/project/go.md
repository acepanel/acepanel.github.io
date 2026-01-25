# Go 项目

Go 项目用于部署使用 Go 语言开发的后端应用，如 Gin、Echo、Fiber 等框架。

## 前置要求

1. 安装 Go 运行环境：**应用** > **运行环境** > **Go**
2. 编译好的 Go 可执行文件或源代码

## 部署方式

### 方式一：部署编译好的二进制文件

1. 在本地编译 Go 项目：

```bash
# 交叉编译为 Linux amd64
GOOS=linux GOARCH=amd64 go build -o myapp
```

2. 上传二进制文件到服务器
3. 创建项目，启动命令填写：`./myapp`

### 方式二：在服务器上编译

1. 上传源代码到服务器
2. 在终端中编译：

```bash
cd /opt/ace/project/myapp
go build -o myapp
```

3. 创建项目，启动命令填写：`./myapp`

## 创建 Go 项目

1. 进入 **项目** 页面
2. 点击 **创建项目**
3. 填写配置：
   - **项目名**：`myapp`
   - **项目目录**：`/opt/ace/project/myapp`
   - **启动命令**：`./myapp` 或 `go1.24 run main.go`
4. 开启 **反向代理** 以便外部访问

## 启动命令示例

```bash
# 运行编译好的二进制文件
./myapp

# 使用指定版本的 Go 运行
go1.24 run main.go

# 带参数运行
./myapp -port 8080 -config ./config.yaml

# 设置环境变量
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

启动命令：`GIN_MODE=release ./myapp`

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

## 注意事项

1. 确保二进制文件有执行权限：`chmod +x myapp`
2. 生产环境建议使用编译好的二进制文件，而非 `go run`
3. 建议使用环境变量或配置文件管理配置，避免硬编码
