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
cd /opt/ace/projects/myapp
go build -o myapp
```

3. 创建项目，启动命令填写：`./myapp`

## 创建 Go 项目

1. 进入 **项目** 页面，打开 **Go** 选项卡
2. 点击 **创建项目**
3. 填写配置：
   - **项目名称**：`myapp`（用作服务标识符）
   - **项目目录**：留空则默认为 `/opt/ace/projects/<项目名称>`，或选择一个目录
   - **运行模式**：选择 **源码** 或 **二进制**
     - **源码**：选择已安装的 **Go 版本** 和 **入口文件**（如 `main.go`、`cmd/server/main.go`），启动命令会自动生成为 `go<版本> run <入口文件>`
     - **二进制**：启动命令生成为 `<项目目录>/main`
   - **运行用户**：默认为 `www`（也可以选择 `root`/`nobody` 或输入自定义用户）
   - **启动命令**：根据上述选项自动填充，可编辑
4. 启用 **反向代理** 并填写 **域名** 和 **项目端口**，即可自动创建反向代理网站供外部访问

## 管理项目

创建完成后，项目会出现在 **Go** 选项卡的列表中。 **状态** 列会显示服务处于 **运行中**、**已停止**、**失败** 还是 **未激活**。 对于每个项目，你可以：

- **启动** / **停止** 服务
- **重启** 和 **重载**（仅在项目运行时显示）
- 查看实时 **日志**
- **编辑** 项目（见下文）
- **删除** 项目（带确认倒计时）
- 切换 **开机自启**，以启用或禁用开机时启动该服务

你还可以选中多个项目，使用批量 **删除** 按钮。

### 编辑

每个项目都作为一个 `systemd` 服务进行管理，**编辑** 对话框通过多个选项卡暴露底层的单元配置。 更改会写回服务单元文件：

- **基本设置**：项目名称、描述、项目目录、工作目录和运行用户。
- **运行设置**：启动前 / 启动后 / 停止 / 重载命令，重启策略（`no`、`always`、`on-failure`、`on-abnormal`、`on-abort`、`on-success`），重启间隔，最大重启次数，启动/停止超时，标准输出 / 标准错误目标（`journal`、`syslog`、`kmsg`、`null`，或追加/截断写入文件），以及环境变量。
- **依赖关系**：通过 `Requires`（强）、`Wants`（弱）、`After` 和 `Before` 单元依赖来控制启动顺序。
- **资源限制**：内存限制（MB）和 CPU 配额（例如 `50%` 表示半个核心，`200%` 表示两个核心）。
- **安全设置**：`NoNewPrivileges`、保护 `/tmp`、保护 `/home`、`ProtectSystem`（`true` / `full` / `strict`），以及读写 / 只读路径白名单。

关于这些选项卡所映射的每个 `systemd` 指令的完整说明，请参阅 [通用项目](./general) 指南。

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
