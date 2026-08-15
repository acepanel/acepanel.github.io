# 工具箱

![Toolbox overview](/images/toolbox/overview.png)

工具箱提供了一系列系統管理工具，包括行程管理、網路連線、系統資訊、SSH 設定、磁碟管理、記錄檔清理等。

## 功能清單

工具箱依下列分頁進行組織：

| 功能                            | 說明                 |
| ----------------------------- | ------------------ |
| [行程](./toolbox/process)       | 檢視與管理系統行程          |
| [網路](./toolbox/network)       | 檢視系統 TCP/UDP 網路連線  |
| [系統](./toolbox/system)        | 檢視系統資訊與設定          |
| [SSH](./toolbox/ssh)          | SSH 服務設定           |
| [磁碟](./toolbox/disk)          | 磁碟使用情況與管理          |
| [記錄檔清理](./toolbox/log)        | 清理系統記錄檔            |
| [Web Hook](./toolbox/webhook) | 設定 Webhook 通知      |
| [效能測試](./toolbox/benchmark)   | 伺服器效能測試            |
| [遷移](./toolbox/migration)     | 將資料遷移至另一個 AcePanel |
| [面板](./toolbox/panel)         | 檢視面板的執行時資訊         |

## Choose the Right Tool

| Need                                                                        | Open                             |
| --------------------------------------------------------------------------- | -------------------------------- |
| Find a high-CPU process, open file, connection, or physical disk I/O source | [Process](./toolbox/process)     |
| Inspect sockets or safely change an interface address, gateway, or DNS      | [Network](./toolbox/network)     |
| Manage Swap, host name, Hosts, timezone, time, or NTP                       | [System](./toolbox/system)       |
| Change the SSH daemon port, authentication, root policy, password, or key   | [SSH](./toolbox/ssh)             |
| Partition, format, mount, configure LVM, or inspect SMART and RAID          | [Disk](./toolbox/disk)           |
| Estimate and reclaim space used by logs                                     | [Log Cleanup](./toolbox/log)     |
| Expose a controlled script endpoint to Git or CI/CD                         | [WebHook](./toolbox/webhook)     |
| Measure CPU, memory, or disk performance during a maintenance window        | [Benchmark](./toolbox/benchmark) |
| Move supported resources from AcePanel, BaoTa, or 1Panel                    | [Migration](./toolbox/migration) |
| Diagnose AcePanel's Go memory, garbage collection, or goroutines            | [Panel](./toolbox/panel)         |

The [Network](./toolbox/network) tab lists TCP and UDP connections and safely edits supported NetworkManager, netplan, and ifupdown interface configurations.

The [Migration](./toolbox/migration) tab moves supported websites, databases, users, and projects from AcePanel, BaoTa, or 1Panel.

[面板](./toolbox/panel)分頁顯示面板自身的執行時資訊，包括執行時間、Go 版本、記憶體與堆積統計、GC 指標以及 goroutine 數量，這對於診斷問題很有幫助。

## 後續步驟

- [行程管理](./toolbox/process) - 檢視與管理系統行程
- [網路連線](./toolbox/network) - 檢視 TCP/UDP 網路連線
- [系統資訊](./toolbox/system) - 檢視系統設定
- [SSH 設定](./toolbox/ssh) - 設定 SSH 服務
- [磁碟管理](./toolbox/disk) - 管理磁碟空間
- [記錄檔清理](./toolbox/log) - 清理系統記錄檔
- [Web Hook](./toolbox/webhook) - 設定通知
- [效能測試](./toolbox/benchmark) - 測試伺服器效能
- [遷移](./toolbox/migration) - 將資料遷移至另一個 AcePanel
- [面板](./toolbox/panel) - 檢視面板的執行時資訊
