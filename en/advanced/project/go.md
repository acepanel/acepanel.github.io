# Go Project

Go projects are used to deploy backend applications developed with Go language, such as Gin, Echo, Fiber frameworks.

## Prerequisites

1. Install Go runtime environment: **Applications** > **Runtime Environment** > **Go**
2. Compiled Go executable file or source code

## Deployment Methods

### Method 1: Deploy Compiled Binary File

1. Compile Go project locally:

```bash
# Cross-compile for Linux amd64
GOOS=linux GOARCH=amd64 go build -o myapp
```

2. Upload binary file to server
3. Create project, fill in start command: `./myapp`

### Method 2: Compile on Server

1. Upload source code to server
2. Compile in terminal:

```bash
cd /opt/ace/project/myapp
go build -o myapp
```

3. Create project, fill in start command: `./myapp`

## Create Go Project

1. Go to the **Project** page
2. Click **Create Project**
3. Fill in configuration:
    - **Project Name**: `myapp`
    - **Project Directory**: `/opt/ace/project/myapp`
    - **Start Command**: `./myapp` or `go1.24 run main.go`
4. Enable **Reverse Proxy** for external access

## Start Command Examples

```bash
# Run compiled binary file
./myapp

# Run with specified Go version
go1.24 run main.go

# Run with parameters
./myapp -port 8080 -config ./config.yaml

# Set environment variables
GIN_MODE=release ./myapp
```

## Common Frameworks

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

Start command: `GIN_MODE=release ./myapp`

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

## Notes

1. Ensure binary file has execute permission: `chmod +x myapp`
2. Production environments are recommended to use compiled binary files, not `go run`
3. It is recommended to use environment variables or configuration files to manage configuration, avoid hardcoding
