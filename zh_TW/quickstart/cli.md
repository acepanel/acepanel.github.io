# 命令列工具

`acepanel` 是隨 AcePanel 安裝、僅允許 root 使用的復原和管理命令列工具。 執行不可逆操作前，先在伺服器上執行 `acepanel <command> --help` 核對引數。

## 輸出與安全

需要機器可讀的列表輸出時，新增全域性 `--json` 引數：

```bash
acepanel --json website list
acepanel --json database list-server
```

該引數只適用於受支援的列表輸出，並非所有互動或修改命令都支援。 後臺任務或[遷移](../advanced/toolbox/migration)正在執行時，不要停止或重啟面板。

## 服務與維護

```bash
acepanel status
acepanel start
acepanel stop
acepanel restart
acepanel update
acepanel fix
acepanel sync
acepanel sync-time
```

`acepanel info` 用於顯示當前訪問資訊，預設不會在每次執行時重置密碼：

```bash
acepanel info
acepanel info --username <user>
acepanel info --username <user> --force
```

只有確實需要重設密碼時才使用 `--force`（`-f`）。 `--username`（`-u`）用於選擇帳號；不填寫時使用第一個面板使用者。

## 面板訪問控制

```bash
acepanel port <port>
acepanel https on|off
acepanel https generate
acepanel entrance on|off
acepanel bind-domain on <domain> [domain...]
acepanel bind-domain off
acepanel bind-ip on <ip> [ip...]
acepanel bind-ip off
acepanel bind-ua on <user-agent> [user-agent...]
acepanel bind-ua off
```

修改埠或任何繫結前，先在系統防火牆和雲安全組中放行新的訪問方式，並保留一個 SSH 會話。

## 使用者和密碼輸入

```bash
acepanel user list
acepanel user create <username> [password] [--email <address>]
acepanel user delete <username>
acepanel user username <old-username> <new-username>
acepanel user password <username> [password]
acepanel user 2fa <username>
acepanel user passkey <username>
```

`user create` 和 `user password` 按以下優先順序讀取密碼：

1. 命令引數；
2. `ACEPANEL_PASSWORD` 環境變數；
3. 不回顯的互動輸入。

在多人使用的系統上，明文密碼引數可能通過 Shell 歷史或程序資訊洩露，應避免使用。 環境變數適合短期自動化，但不能寫入日誌或儲存在許可權不安全的服務檔案中。

## 防火牆

```bash
acepanel firewall status
acepanel firewall on
acepanel firewall off
acepanel firewall list
acepanel firewall port 443
acepanel firewall port 8000-9000 --protocol tcp
acepanel firewall port 443 --remove
```

`firewall port` 支援單一連接埠或連接埠範圍。 `--protocol`（`-p`）可設為 `tcp`、`udp` 或 `tcp/udp`，預設是 `tcp/udp`；`--remove` 用於刪除符合的規則。 遠端管理時，除非已經驗證其他存取控制有效，否則不要關閉防火牆。

## 網站和證書

```bash
acepanel website list
acepanel website create --type static --name <name> --domains <domain> --listens 80
acepanel website remove --name <name>
acepanel website delete --name <name>
acepanel website cert --name <name> --cert <fullchain-path> --key <private-key-path>
acepanel cert list
acepanel cert renew --id <id>
acepanel cert renew --all
```

建立網站時，`--type`（`-t`）支援 `proxy`、`static` 和 `php`；`--domains`（`-d`）與 `--listens`（`-l`）可以重複填寫；還可使用 `--path`（`-p`）、`--proxy`、`--php`、`--db`、`--db-name`、`--db-user`、`--db-password` 和 `--remark`。

`website remove` 會保留網站目錄和同名資料庫； `website delete` 會同時刪除這些資料並自動解除證書關聯，且不可恢復。 `website cert` 從伺服器檔案讀取證書和私鑰，應保護兩個檔案路徑，絕不能把私鑰貼上到 Shell 歷史中。

## 資料庫伺服器

```bash
acepanel database list-server
acepanel database add-server --type <type> --name <name> --host <host> --port <port> [--username <user>] [--password <password>] [--remark <text>]
acepanel database delete-server --name <name>
```

`add-server` 支援 `mysql`、`postgresql`、`mongodb`、`clickhouse`、`redis` 和 `elasticsearch`。 刪除伺服器登記後，其資料庫可能無法繼續透過面板操作；該操作不能取代資料保留方案。

## 備份和恢復

```bash
acepanel backup list --type <type>
acepanel backup website --name <name> [--storage <id>]
acepanel backup database --type <type> --name <name> [--storage <id>]
acepanel backup path --path <directory> [--storage <id>]
acepanel backup panel
acepanel backup clear --type <type> --file <prefix> --keep <count> [--storage <id>]

acepanel restore website --name <name> --file <backup>
acepanel restore database --type <type> --name <name> --file <backup>
acepanel restore panel --file <backup>
```

備份列表支援 `website`、`path`、`panel`、`mysql`、`postgresql`、`clickhouse`、`redis` 和 `valkey`。 資料庫備份和恢復支援 MySQL、PostgreSQL、ClickHouse、Redis 和 Valkey。 備份檔名可以是絕對路徑，也可以是相對於命令所述預設備份目錄的路徑。 恢復面板後會自動重啟面板服務。

## 計劃任務

```bash
acepanel cron list
acepanel cron run --id <id>
acepanel cron status --id <id>
acepanel cron status --id <id> --off
```

`cron run` 會立即執行所選任務。 `cron status` 用於啟用任務；加入 `--off` 則停用任務。

## 應用

```bash
acepanel app list
acepanel app install <slug> [channel]
acepanel app update <slug>
acepanel app uninstall <slug>
```

安裝、更新或解除安裝可能建立面板後臺任務，可在 **任務 > 面板任務**中檢視進度。

## 日誌切割

```bash
acepanel cutoff website --name <name> [--storage <id>]
acepanel cutoff container --name <name> [--storage <id>]
acepanel cutoff clear --type website|container --name <name> --keep <count> [--storage <id>]
```

## 故障排查

- 服務看起來不可用時，先執行 `acepanel status`，再決定是否重啟。
- 首頁報告面板資料庫或更新健康問題時，按提示使用 `acepanel fix`。
- 優先使用文件列出的公開命令。 隱藏的 `init`、`setting`、任務清理、應用標記、計劃任務包裝和資料庫寫入命令屬於內部恢復介面，僅應在專案方指導下使用。
- JSON 自動化失敗時，確認該命令屬於支援的列表命令，並分別檢查退出狀態和標準錯誤輸出。
