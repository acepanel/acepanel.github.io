# 通用專案

通用專案用於部署任意類型的可執行程式，不限於特定程式語言。

## 專案類型

**專案** 頁面依類型分為多個分頁：**通用**、**Go**、**Java**、**Node.js**、**PHP**、**Python** 與 **.NET**。 它們產生的都是同一種由 `systemd` 管理的服務，差異僅在於建立對話框。

對於特定語言的分頁，建立對話框會增加一個執行環境 **版本** 選擇器（其內容來自 **應用程式** > **執行環境** 中已安裝的執行環境），並在適用時提供 **框架** 預設（例如 Spring Boot、Express、Laravel Octane、Django、ASP.NET Core）。 選擇版本與框架後，會自動以鎖定版本的可執行檔案填入 **啟動指令**（例如 `go1.24 run main.go` 或 `php8.3 artisan octane:start`），你仍可在建立前進行修改。 請參閱 [Go](./go.md)、[Java](./java.md)、[Node.js](./nodejs.md)、[PHP](./php.md)、[Python](./python.md) 與 [.NET](./dotnet.md) 專案的專屬頁面。

**通用** 類型沒有版本或框架輔助：你需要自行輸入 **啟動指令**，因此它可以執行任意可執行程式。

## 適用情境

- Rust 應用程式
- C/C++ 應用程式
- Shell 指令碼
- 其他編譯型語言應用程式
- 自訂啟動指令碼

## 運作原理

每個專案都以 `systemd` 服務的形式進行管理。 建立專案時，AcePanel 會在 `/etc/systemd/system/<name>.service` 產生一個單元檔案（`Type=simple`），因此啟動、停止、重新啟動、重新載入、開機自動啟動與日誌收集都由 `systemd` 處理。

由於 `systemd` 會直接執行啟動指令（而非透過 shell），該指令 **不** 支援 `cd`、`&&`、管線或行內環境變數前綴等 shell 功能。 請改用專屬的 **工作目錄** 與 **環境變數** 欄位（見下文）。

## 建立通用專案

1. 前往 **專案** 頁面
2. 點選 **建立專案**
3. 填寫設定：
   - **專案名稱**：專案識別碼，同時做為 systemd 服務名稱
   - **專案目錄**：專案根目錄（若留空，則預設為專案目錄設定加上專案名稱）
   - **執行使用者**：服務執行所用的使用者（預設為 `www`）
   - **啟動指令**：啟動程式的指令
4. 視需要啟用 **反向代理**，為此專案自動建立一個反向代理網站

啟用 **反向代理** 時，你還必須提供一個或多個 **網域** 以及程式所監聽的 **專案連接埠**；AcePanel 會在建立專案之前建立該代理網站（監聽 80 連接埠，轉發至 `http://127.0.0.1:<port>`）。

## 管理專案

建立後，專案會顯示在其類型分頁的清單中。 清單會顯示每個專案的 **狀態**（執行中、已停止、失敗或未啟用）、**類型**、**目錄** 以及 **開機自動啟動** 切換開關。 對於每一列，你可以：

- **啟動** / **停止** 服務（按鈕會反映目前狀態）
- **重新啟動** 與 **重新載入** —— 僅在專案執行中時顯示
- 檢視即時 **日誌**（由 `systemd` 收集的標準輸出 / 錯誤）
- **編輯** 專案（開啟 [進階設定](#advanced-settings) 中所述的分頁）
- **刪除** 專案 —— 必須等待帶有 5 秒倒數計時的確認對話框結束後，才能確認此操作
- 切換 **開機自動啟動** 以啟用或停用開機時啟動服務

你也可以透過列的核取方塊選取多個專案，並使用清單頂端的 **刪除** 按鈕大量移除（同樣有 5 秒倒數計時保護）。 點選專案的 **目錄** 會在該路徑開啟檔案管理員。

## 啟動指令範例

### Rust 應用程式

```bash
# Run compiled binary
./myapp

# Run with arguments
./myapp --config config.toml --port 8080
```

### Shell 指令碼

```bash
# 執行指令碼
/bin/bash start.sh

# 或直接執行（需要 shebang 與執行權限）
./start.sh
```

### 自訂啟動指令碼

建立 `start.sh`：

```bash
#!/bin/bash
cd /opt/ace/projects/myapp
export ENV=production
./myapp
```

啟動指令：`/bin/bash start.sh`

## 環境變數

啟動指令由 `systemd` 直接執行，而非透過 shell，因此像 `ENV=production ./myapp` 這類行內前綴 **不** 會生效。

若要設定環境變數，請編輯專案並於 **執行設定** → **環境變數** 中新增，每筆一組鍵/值。 每一筆都會以 `Environment=KEY=VALUE` 指示詞的形式寫入單元檔案。

## 工作目錄

專案會在 **工作目錄** 中執行。 若留空，則預設為專案目錄。 啟動指令中的相對路徑會以此目錄為基準解析。

由於啟動指令不會透過 shell 執行，你無法使用 `cd` 切換目錄。 若要從子目錄執行可執行檔案，請據此設定 **工作目錄**（或在啟動指令中使用絕對路徑）：

```bash
/opt/ace/projects/myapp/bin/myapp
```

## 權限設定

確保可執行檔案具有執行權限：

```bash
chmod +x myapp
chmod +x start.sh
```

## 執行使用者

預設以 `www` 使用者執行專案。 若程式需要特殊權限，可以選擇其他使用者。

:::warning 注意
以 root 使用者執行可能帶來安全風險，請謹慎選擇。
:::

## 日誌輸出

程式的標準輸出（stdout）與標準錯誤（stderr）會記錄到日誌中，可在專案管理頁面檢視。

建議程式將日誌輸出至標準輸出，而非寫入檔案，以利統一管理。

在 **執行設定** 中，**標準輸出** 與 **標準錯誤** 預設為 `journal`，也可設定為 `syslog`、`kmsg`、`null`，或以附加/截斷方式寫入檔案。

## 進階設定

編輯專案會開啟一些額外的分頁，它們直接對應到 `systemd` 指示詞：

- **執行設定**：啟動前 / 啟動後 / 停止 / 重新載入指令，重新啟動原則（`no`、`always`、`on-failure`、`on-abnormal`、`on-abort`、`on-success`），重新啟動間隔，最大重新啟動次數，啟動/停止逾時，以及環境變數。
- **相依性**：透過 `Requires`（強）、`Wants`（弱）、`After` 與 `Before` 控制啟動順序。
- **資源限制**：記憶體限制（MB）與 CPU 配額（例如 `50%` 表示半個核心，`200%` 表示兩個核心）。
- **安全設定**：`NoNewPrivileges`、保護 `/tmp`、保護 `/home`、`ProtectSystem`（`true` / `full` / `strict`），以及讀寫 / 唯讀路徑允許清單。

## 訊號處理

專案停止時會傳送 SIGTERM 訊號， 程式應正確處理該訊號以實現優雅關閉：

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
