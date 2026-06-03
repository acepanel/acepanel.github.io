# 通用项目

通用项目用于部署任意类型的可执行程序，不限于特定编程语言。

## 项目类型

**项目** 页面按类型分为多个选项卡：**通用**、**Go**、**Java**、**Node.js**、**PHP**、**Python** 和 **.NET**。 它们生成的都是同一种由 `systemd` 管理的服务，区别仅在于创建对话框。

对于特定语言的选项卡，创建对话框会增加一个运行时 **版本** 选择器（其内容来自 **应用商店** > **运行环境** 中已安装的运行时），并在适用时提供 **框架** 预设（例如 Spring Boot、Express、Laravel Octane、Django、ASP.NET Core）。 选择版本和框架后，会自动以锁定版本的可执行文件填充 **启动命令**（例如 `go1.24 run main.go` 或 `php8.3 artisan octane:start`），你仍可在创建前进行修改。 请参阅 [Go](./go.md)、[Java](./java.md)、[Node.js](./nodejs.md)、[PHP](./php.md)、[Python](./python.md) 和 [.NET](./dotnet.md) 项目的专门页面。

**通用** 类型没有版本或框架辅助：你需要自己输入 **启动命令**，因此它可以运行任意可执行程序。

## 适用场景

- Rust 应用
- C/C++ 应用
- Shell 脚本
- 其他编译型语言应用
- 自定义启动脚本

## 工作原理

每个项目都作为 `systemd` 服务进行管理。 创建项目时，AcePanel 会在 `/etc/systemd/system/<name>.service` 生成一个单元文件（`Type=simple`），因此启动、停止、重启、重载、开机自启和日志收集都由 `systemd` 处理。

由于 `systemd` 直接运行启动命令（而非通过 shell），该命令 **不** 支持 `cd`、`&&`、管道或内联环境变量前缀等 shell 特性。 请改用专门的 **工作目录** 和 **环境变量** 字段（见下文）。

## 创建通用项目

1. 进入 **项目** 页面
2. 点击 **创建项目**
3. 填写配置：
   - **项目名称**：项目标识，同时用作 systemd 服务名称
   - **项目目录**：项目根目录（若留空，则默认为项目目录设置加上项目名称）
   - **运行用户**：服务运行所用的用户（默认为 `www`）
   - **启动命令**：启动程序的命令
4. 按需开启 **反向代理**，为该项目自动创建一个反向代理网站

开启 **反向代理** 时，你还必须提供一个或多个 **域名** 以及程序监听的 **项目端口**；AcePanel 会在创建项目之前创建该代理网站（监听 80 端口，转发至 `http://127.0.0.1:<port>`）。

## 管理项目

创建后，项目会出现在其类型选项卡的列表中。 列表会显示每个项目的 **状态**（运行中、已停止、失败或未激活）、**类型**、**目录** 以及 **开机自启** 开关。 对于每一行，你可以：

- **启动** / **停止** 服务（按钮会反映当前状态）
- **重启** 和 **重载** —— 仅在项目运行时显示
- 查看实时 **日志**（由 `systemd` 收集的标准输出 / 错误）
- **编辑** 项目（打开 [高级设置](#advanced-settings) 中描述的选项卡）
- **删除** 项目 —— 需等待带有 5 秒倒计时的确认对话框结束后才能确认该操作
- 切换 **开机自启** 以启用或禁用开机时启动服务

你还可以通过行复选框选择多个项目，并使用列表顶部的 **删除** 按钮批量移除它们（同样有 5 秒倒计时保护）。 点击项目的 **目录** 会在该路径打开文件管理器。

## 启动命令示例

### Rust 应用

```bash
# 运行编译好的二进制文件
./myapp

# 带参数运行
./myapp --config config.toml --port 8080
```

### Shell 脚本

```bash
# 运行脚本
/bin/bash start.sh

# 或直接运行（需要 shebang 和执行权限）
./start.sh
```

### 自定义启动脚本

创建 `start.sh`：

```bash
#!/bin/bash
cd /opt/ace/projects/myapp
export ENV=production
./myapp
```

启动命令：`/bin/bash start.sh`

## 环境变量

启动命令由 `systemd` 直接执行，而非通过 shell，因此像 `ENV=production ./myapp` 这样的内联前缀 **不** 起作用。

要设置环境变量，请编辑项目并在 **运行设置** → **环境变量** 中添加，每条一个键值对。 每一条都会以 `Environment=KEY=VALUE` 指令的形式写入单元文件。

## 工作目录

项目在 **工作目录** 中运行。 若留空，则默认为项目目录。 启动命令中的相对路径会相对于该目录解析。

由于启动命令不通过 shell 运行，你无法使用 `cd` 切换目录。 要从子目录运行可执行文件，请相应地设置 **工作目录**（或在启动命令中使用绝对路径）：

```bash
/opt/ace/projects/myapp/bin/myapp
```

## 权限设置

确保可执行文件有执行权限：

```bash
chmod +x myapp
chmod +x start.sh
```

## 运行用户

默认使用 `www` 用户运行项目。 如果程序需要特殊权限，可以选择其他用户。

:::warning 注意
使用 root 用户运行可能带来安全风险，请谨慎选择。
:::

## 日志输出

程序的标准输出（stdout）和标准错误（stderr）会被记录到日志中，可以在项目管理页面查看。

建议程序将日志输出到标准输出，而非写入文件，便于统一管理。

在 **运行设置** 中，**标准输出** 和 **标准错误** 默认为 `journal`，也可设置为 `syslog`、`kmsg`、`null`，或以追加/截断方式写入文件。

## 高级设置

编辑项目会打开一些额外的选项卡，它们直接对应 `systemd` 指令：

- **运行设置**：启动前 / 启动后 / 停止 / 重载命令，重启策略（`no`、`always`、`on-failure`、`on-abnormal`、`on-abort`、`on-success`），重启间隔，最大重启次数，启动/停止超时，以及环境变量。
- **依赖关系**：通过 `Requires`（强）、`Wants`（弱）、`After` 和 `Before` 控制启动顺序。
- **资源限制**：内存限制（MB）和 CPU 配额（例如 `50%` 表示半个核心，`200%` 表示两个核心）。
- **安全设置**：`NoNewPrivileges`、保护 `/tmp`、保护 `/home`、`ProtectSystem`（`true` / `full` / `strict`），以及读写 / 只读路径白名单。

## 信号处理

项目停止时会发送 SIGTERM 信号， 程序应正确处理该信号以实现优雅关闭：

```rust
// Rust 示例
use signal_hook::{consts::SIGTERM, iterator::Signals};

fn main() {
    let mut signals = Signals::new(&[SIGTERM]).unwrap();
    // 处理 SIGTERM 信号
}
```

```c
// C 示例
#include <signal.h>

void handle_sigterm(int sig) {
    // 清理资源
    exit(0);
}

int main() {
    signal(SIGTERM, handle_sigterm);
    // ...
}
```
