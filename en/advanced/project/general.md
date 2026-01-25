# 通用项目

通用项目用于部署任意类型的可执行程序，不限于特定编程语言。

## 适用场景

- Rust 应用
- C/C++ 应用
- Shell 脚本
- 其他编译型语言应用
- 自定义启动脚本

## 创建通用项目

1. 进入 **项目** 页面
2. 点击 **创建项目**
3. 填写配置：
   - **项目名**：项目标识
   - **项目目录**：可执行文件所在目录
   - **启动命令**：启动程序的命令
4. 根据需要开启 **反向代理**

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
cd /opt/ace/project/myapp
export ENV=production
./myapp
```

启动命令：`/bin/bash start.sh`

## 环境变量

可以在启动命令中设置环境变量：

```bash
# 单个环境变量
ENV=production ./myapp

# 多个环境变量
ENV=production PORT=8080 ./myapp
```

或直接编辑项目，在 **运行设置** 中添加环境变量。

## 工作目录

项目会在指定的项目目录下运行，相对路径会基于该目录解析。

如果需要切换目录，可以在启动命令中使用 `cd`：

```bash
cd /opt/ace/project/myapp/bin && ./myapp
```

## 权限设置

确保可执行文件有执行权限：

```bash
chmod +x myapp
chmod +x start.sh
```

## 运行用户

默认使用 `www` 用户运行项目。如果程序需要特殊权限，可以选择其他用户。

::: warning 注意
使用 root 用户运行可能带来安全风险，请谨慎选择。
:::

## 日志输出

程序的标准输出（stdout）和标准错误（stderr）会被记录到日志中，可以在项目管理页面查看。

建议程序将日志输出到标准输出，而非写入文件，便于统一管理。

## 信号处理

项目停止时会发送 SIGTERM 信号，程序应正确处理该信号以实现优雅关闭：

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
