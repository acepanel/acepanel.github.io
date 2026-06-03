# 命令列工具

AcePanel 提供命令列工具 `acepanel`，用於在無法存取 Web 介面時進行面板管理。

## 服務管理

:::warning 注意
背景任務執行時請勿停止或重新啟動面板，否則可能導致任務中斷或資料遺失。
:::

```shell
acepanel start    # 啟動
acepanel stop     # 停止
acepanel restart  # 重新啟動
acepanel status   # 檢視狀態
```

## 使用者管理

```shell
acepanel user list                              # 列出所有使用者
acepanel user username <舊使用者名稱> <新使用者名稱>      # 變更使用者名稱
acepanel user password <使用者名稱> <新密碼>          # 變更密碼
acepanel user 2fa <使用者名稱>                       # 切換兩步驟驗證
acepanel user passkey <使用者名稱>                   # 清除使用者的所有密碼金鑰
```

## 安全設定

```shell
acepanel https on|off       # 切換 HTTPS
acepanel https generate     # 產生憑證（自簽或 Let's Encrypt）
acepanel entrance on|off    # 切換安全入口
acepanel port <連接埠號>       # 變更監聽連接埠
acepanel bind-domain off    # 解除網域綁定
acepanel bind-ip off        # 解除 IP 綁定
acepanel bind-ua off        # 解除 UA 綁定
```

## 網站管理

```shell
# 建立網站
acepanel website create -n <名稱> -d <網域> -l <監聽> [--path <路徑>] [--php <版本>]

# 移除網站（保留網站目錄與資料庫）
acepanel website remove -n <名稱>

# 刪除網站（同時刪除網站目錄與同名資料庫）
acepanel website delete -n <名稱>
```

| 旗標          | 別名   | 必填          | 說明                      |
| ----------- | ---- | ----------- | ----------------------- |
| `--name`    | `-n` | 是           | 網站名稱                    |
| `--domains` | `-d` | 是（`create`） | 綁定至網站的網域；多個網域時重複使用此旗標   |
| `--listens` | `-l` | 是（`create`） | 綁定至網站的監聽位址；多個位址時重複使用此旗標 |
| `--path`    |      | 否           | 網站託管的目錄；省略時使用預設路徑       |
| `--php`     |      | 否           | 網站使用的 PHP 版本；省略時不使用 PHP |

:::warning 注意
`website delete` 會同時刪除網站目錄與同名資料庫。 此操作無法復原，請謹慎執行。
:::

## 資料庫管理

```shell
# 新增資料庫伺服器
acepanel database add-server --type <類型> --name <名稱> --host <主機> --port <連接埠> [--username <使用者名稱>] [--password <密碼>] [--remark <備註>]

# 刪除資料庫伺服器
acepanel database delete-server -n <名稱>
```

| 旗標           | 別名                      | 必填              | 說明                                                                                         |
| ------------ | ----------------------- | --------------- | ------------------------------------------------------------------------------------------ |
| `--type`     |                         | 是（`add-server`） | 伺服器類型，可選 `mysql`、`postgresql`、`redis`、`clickhouse`、`mongodb`、`sqlite`、`elasticsearch` 其中之一 |
| `--name`     | `-n`（僅 `delete-server`） | 是               | 伺服器名稱                                                                                      |
| `--host`     |                         | 是（`add-server`） | 伺服器位址                                                                                      |
| `--port`     |                         | 是（`add-server`） | 伺服器連接埠                                                                                     |
| `--username` |                         | 否               | 伺服器使用者名稱                                                                                   |
| `--password` |                         | 否               | 伺服器密碼                                                                                      |
| `--remark`   |                         | 否               | 伺服器備註                                                                                      |

## 備份管理

```shell
# 備份網站
acepanel backup website -n <名稱> [-s <儲存 ID>]

# 備份資料庫
acepanel backup database -t <類型> -n <名稱> [-s <儲存 ID>]

# 備份目錄
acepanel backup path -p <路徑> [-s <儲存 ID>]

# 備份面板
acepanel backup panel

# 清除過期備份
acepanel backup clear -t <類型> -f <檔案> -k <保留數量> [-s <儲存 ID>]
```

| 旗標          | 別名   | 說明                                                                          |
| ----------- | ---- | --------------------------------------------------------------------------- |
| `--name`    | `-n` | 網站或資料庫名稱                                                                    |
| `--type`    | `-t` | `backup database` 的資料庫類型（`mysql`、`postgresql`、`redis`）；`backup clear` 的備份類型 |
| `--path`    | `-p` | 要備份的目錄路徑                                                                    |
| `--file`    | `-f` | 清除時要比對的備份檔案名稱                                                               |
| `--keep`    | `-k` | 要保留的備份數量                                                                    |
| `--storage` | `-s` | 儲存 ID；省略時使用本機儲存                                                             |

## 日誌切割

```shell
# 切割網站日誌
acepanel cutoff website -n <名稱> [-s <儲存 ID>]

# 切割容器日誌
acepanel cutoff container -n <名稱> [-s <儲存 ID>]

# 清除已切割的日誌
acepanel cutoff clear -t <類型> -n <名稱> -k <保留數量> [-s <儲存 ID>]
```

| 旗標          | 別名   | 說明                                              |
| ----------- | ---- | ----------------------------------------------- |
| `--name`    | `-n` | 網站或容器名稱                                         |
| `--type`    | `-t` | `cutoff clear` 的切割類型，可選 `website` 或 `container` |
| `--keep`    | `-k` | 要保留的已切割日誌數量                                     |
| `--storage` | `-s` | 儲存 ID；省略時使用本機儲存                                 |

## 應用程式管理

```shell
acepanel app install <slug> <channel>   # 安裝應用程式
acepanel app uninstall <slug>           # 解除安裝應用程式
acepanel app update <slug>              # 更新應用程式
```

## 維護命令

```shell
acepanel update      # 更新面板
acepanel fix         # 修復更新問題
acepanel sync        # 同步快取資料
acepanel sync-time   # 同步伺服器時間
acepanel clear-task  # 清除任務佇列中卡住的任務（僅在指導下使用）
acepanel info        # 檢視面板資訊並重設密碼
acepanel help        # 說明
```

## 範例

將使用者 `admin` 的密碼變更為 `newpassword`：

```shell
acepanel user password admin newpassword
```
