# 工具箱

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

[網路](./toolbox/network)分頁列出了系統所有的 TCP 與 UDP 連線（包括 IPv6），顯示通訊協定類型、PID、行程名稱、本機與遠端位址以及連線狀態，並支援依狀態、PID、行程名稱或連接埠進行篩選。

[遷移](./toolbox/migration)分頁讓你可以將網站、資料庫、資料庫使用者與專案從本伺服器遷移至另一個 AcePanel 執行個體。 使用目標面板的位址與 API 權杖連線至該面板，執行預先檢查，選擇要遷移的項目，並追蹤即時進度。

[面板](./toolbox/panel)分頁顯示面板自身的執行時資訊，包括執行時間、Go 版本、記憶體與堆積統計、GC 指標以及 goroutine 數量，這對於診斷問題很有幫助。

![工具箱](/images/toolbox/toolbox-process.png)

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
