# 通用項目

通用項目用於部署任意類型的可執行程式，不限於特定程式語言。

## 適用場景

- Rust 應用
- C/C++ 應用
- Shell 腳本
- 其他編譯型語言應用
- 自訂啟動腳本

## 建立通用項目

1. 進入 **項目** 頁面
2. 點擊 **建立項目**
3. 填寫配置：
   - **項目名**：項目標識
   - **項目目錄**：可執行檔案所在目錄
   - **啟動命令**：啟動程式的命令
4. 根據需要開啟 **反向代理**

## 啟動命令範例

### Rust 應用

```bash
# 運行編譯好的二進位檔案
./myapp

# 帶參數運行
./myapp --config config.toml --port 8080
```

### Shell 腳本

```bash
# 運行腳本
/bin/bash start.sh

# 或直接運行（需要 shebang 和執行權限）
./start.sh
```

### 自訂啟動腳本

建立 `start.sh`：

```bash
#!/bin/bash
cd /opt/ace/project/myapp
export ENV=production
./myapp
```

啟動命令：`/bin/bash start.sh`

## 環境變數

可以在啟動命令中設定環境變數：

```bash
# 單個環境變數
ENV=production ./myapp

# 多個環境變數
ENV=production PORT=8080 ./myapp
```

或直接編輯項目，在 **運行設定** 中新增環境變數。

## 工作目錄

項目會在指定的項目目錄下運行，相對路徑會基於該目錄解析。

如果需要切換目錄，可以在啟動命令中使用 `cd`：

```bash
cd /opt/ace/project/myapp/bin && ./myapp
```

## 權限設定

確保可執行檔案有執行權限：

```bash
chmod +x myapp
chmod +x start.sh
```

## 運行使用者

預設使用 `www` 使用者運行項目。 如果程式需要特殊權限，可以選擇其他使用者。

:::warning 注意
使用 root 使用者運行可能帶來安全風險，請謹慎選擇。
:::

## 日誌輸出

程式的標準輸出（stdout）和標準錯誤（stderr）會被記錄到日誌中，可以在項目管理頁面查看。

建議程式將日誌輸出到標準輸出，而非寫入檔案，便於統一管理。

## 訊號處理

項目停止時會發送 SIGTERM 訊號， 程式應正確處理該訊號以實現優雅關閉：

```rust
// Rust 範例
use signal_hook::{consts::SIGTERM, iterator::Signals};

fn main() {
    let mut signals = Signals::new(&[SIGTERM]).unwrap();
    // 處理 SIGTERM 訊號
}
```

```c
// C 範例
#include <signal.h>

void handle_sigterm(int sig) {
    // 清理資源
    exit(0);
}

int main() {
    signal(SIGTERM, handle_sigterm);
    // ...
}
```
