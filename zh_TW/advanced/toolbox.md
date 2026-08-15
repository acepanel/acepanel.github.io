# 工具箱

![Toolbox overview](/images/toolbox/overview.png)

工具箱提供了一系列系統管理工具，包括行程管理、網路連線、系統資訊、SSH 設定、磁碟管理、記錄檔清理等。

## 功能列表

工具箱依下列分頁進行組織：

| 功能                          | 說明                 |
| --------------------------- | ------------------ |
| [行程](./toolbox/process)     | 檢視與管理系統行程          |
| [網路](./toolbox/network)     | 檢視系統 TCP/UDP 網路連線  |
| [系統](./toolbox/system)      | 檢視系統資訊與設定          |
| [SSH](./toolbox/ssh)        | SSH 服務配置           |
| [磁碟](./toolbox/disk)        | 磁碟使用情況和管理          |
| [記錄檔清理](./toolbox/log)      | 清理系統日誌             |
| [Web 鉤子](./toolbox/webhook) | 配置 Webhook 通知      |
| [效能測試](./toolbox/benchmark) | 伺服器效能測試            |
| [遷移](./toolbox/migration)   | 將資料遷移至另一個 AcePanel |
| [面板](./toolbox/panel)       | 檢視面板的執行時資訊         |

## 選擇合適的工具

| Need                                 | Open                         |
| ------------------------------------ | ---------------------------- |
| 尋找高 CPU 程序、開啟的檔案、網路連線或實體磁碟 I/O 來源    | [程序](./toolbox/process)      |
| 檢視網路通訊端，或安全修改網路介面位址、閘道和 DNS          | [網路](./toolbox/network)      |
| 管理 Swap、主機名稱、Hosts、時區、時間或 NTP        | [系統](./toolbox/system)       |
| 修改 SSH 服務連接埠、驗證方式、Root 原則、密碼或金鑰      | [SSH](./toolbox/ssh)         |
| 磁碟分割、格式化、掛載、設定 LVM，或檢視 SMART 和 RAID  | [磁碟](./toolbox/disk)         |
| 估算並釋放日誌占用的空間                         | [日誌清理](./toolbox/log)        |
| 提供受控指令碼入口供 Git 或 CI/CD 呼叫            | [WebHook](./toolbox/webhook) |
| 在維護時段測試 CPU、記憶體或磁碟效能                 | [跑分](./toolbox/benchmark)    |
| 從 AcePanel、寶塔或 1Panel 遷移支援的資源        | [遷移](./toolbox/migration)    |
| 診斷 AcePanel 的 Go 記憶體、垃圾回收或 goroutine | [面板](./toolbox/panel)        |

[網路](./toolbox/network)用於檢視 TCP、UDP 連線，並安全編輯受支援的 NetworkManager、netplan 和 ifupdown 網絡卡配置。

[遷移](./toolbox/migration)用於從 AcePanel、寶塔或 1Panel 遷移受支援的網站、資料庫、使用者和專案。

[面板](./toolbox/panel)分頁顯示面板自身的執行時資訊，包括執行時間、Go 版本、記憶體與堆積統計、GC 指標以及 goroutine 數量，這對於診斷問題很有幫助。

## 下一步

- [行程管理](./toolbox/process) - 檢視與管理系統行程
- [網路連線](./toolbox/network) - 檢視 TCP/UDP 網路連線
- [系統資訊](./toolbox/system) - 檢視系統設定
- [SSH 配置](./toolbox/ssh) - 配置 SSH 服務
- [磁碟管理](./toolbox/disk) - 管理磁碟空間
- [記錄檔清理](./toolbox/log) - 清理系統記錄檔
- [Web 鉤子](./toolbox/webhook) - 配置通知
- [跑分測試](./toolbox/benchmark) - 測試伺服器效能
- [遷移](./toolbox/migration) - 將資料遷移至另一個 AcePanel
- [面板](./toolbox/panel) - 檢視面板的執行時資訊
