# AcePanel 3.0 正式發布

好久不見， 歷經幾次跳票延期，AcePanel 3.0 終於在 2026 年初完成開發， 經過約 3 週的內部測試，現在是時候發布了。

## 升級為全新品牌名稱 AcePanel

AcePanel 原名耗子面板，是本人於 2022 年底開發的伺服器維運管理面板。

之前收到最多的一個回饋就是耗子面板這個名字不好聽，於是我們現在換了更高端大氣上檔次的名字 - AcePanel，你也可以叫它王牌面板/艾斯面板。

![AcePanel Logo](https://wmimg.com/i/1424/2026/01/6975d8a45a01d.png)

本文中的 AcePanel 均指 AcePanel 3.0 版本。

## 支援執行環境與專案管理

AcePanel 最大的更新就是全新的執行環境功能，支援一鍵安裝與管理 Go、Java、Node.js、PHP、Python 等執行環境，並支援多版本共存。

![AcePanel Runtime Environments](https://wmimg.com/i/1424/2026/01/6975d8a49a638.png)

同時，AcePanel 基於 Linux systemd 的強大能力開發了全新的專案管理功能，可透過已安裝的執行環境一鍵建立與管理各類 Web 專案與常駐程式，能夠取代 PM2、Supervisor 等工具。

![AcePanel Project List](https://wmimg.com/i/1424/2026/01/6975d8a386a79.png)

![AcePanel Project Edit](https://wmimg.com/i/1424/2026/01/6975d8a4454f7.png)

## 網站管理重構

AcePanel 同時也重構了網站管理功能，重新整理了網站目錄結構，支援反向代理、靜態、PHP 共 3 種網站類型，並新增了多項常用設定與自訂功能。

![AcePanel Reverse Proxy Website Upstream Edit](https://wmimg.com/i/1424/2026/01/6975d8a3e8c5b.png)

![AcePanel Reverse Proxy Website Proxy Edit](https://wmimg.com/i/1424/2026/01/6975d8a59b896.png)

全新的網站目錄結構讓你可以靈活新增各種自訂設定而不會發生衝突。

## 應用程式中心最佳化

AcePanel 正式推出眾所期待的容器 compose 範本功能，支援一鍵部署 WordPress、Nextcloud、GitLab 等常見程式。

![AcePanel Compose Templates](https://wmimg.com/i/1424/2026/01/6975d8a59c3b9.png)

（找不到你想要的程式？ 歡迎向 AcePanel 範本庫提交 PR，詳情請見本文末尾）

AcePanel 在原有的 OpenResty 與 Percona 基礎上新增了 Nginx、MySQL 與 MariaDB，並最佳化了許多應用程式的安裝流程以提升安裝速度。 特別是 Percona/MySQL/MariaDB，針對常見系統採用了預先編譯的安裝套件，大幅提升安裝速度與成功率。

（在測試中，MySQL 通常可以在 2 分鐘內完成安裝）

## 備份最佳化

AcePanel 最佳化了備份功能，新增了備份儲存設定，支援 S3、SFTP 等常見的遠端儲存。

（你可能會問為什麼沒有 OSS、COS？ 這是因為 OSS、COS 等都提供了相容 S3 的介面，可以直接使用 S3 進行設定，所以無需單獨為它們引入相依套件並進行額外開發。）

![AcePanel Add Backup Storage](https://wmimg.com/i/1424/2026/01/6975d8a5c18e5.png)

## 全新的面板小幫手

AcePanel 使用 Go 語言重寫了原本基於 shell 指令碼的安裝程式。 全新的面板小幫手完整支援互動式安裝與多語言，提供更優質、更現代化的使用者體驗。

![AcePanel Installer](https://wmimg.com/i/1424/2026/01/6975d8a5d98b9.png)

## 使用體驗最佳化

AcePanel 全面最佳化了檔案管理，還原了類似 Windows 檔案總管的操作體驗（支援鍵盤快速鍵）。

![AcePanel File Management (List)](https://wmimg.com/i/1424/2026/01/6975d8a64b601.png)

![AcePanel File Management (Icons)](https://wmimg.com/i/1424/2026/01/6975d959712cf.png)

全新的檔案編輯器基於 Monaco 開發，既是編輯器，也可以當作線上 IDE 使用（同樣支援鍵盤快速鍵）。

![AcePanel File Edit](https://wmimg.com/i/1424/2026/01/6975d95a50149.png)

工具箱能力獲得了全面強化。 行程管理支援右鍵操作，並新增了 SSH 服務管理、磁碟管理、日誌清理與 Web 掛鉤等功能。

![AcePanel Process Management](https://wmimg.com/i/1424/2026/01/6975d95ab38b2.png)

![AcePanel SSH Management](https://wmimg.com/i/1424/2026/01/6975d95a283e1.png)

![AcePanel Web Hooks](https://wmimg.com/i/1424/2026/01/6975d95932b1d.png)

排程任務的週期選擇器已重新編寫，提供更友善的互動體驗。

![AcePanel Create Scheduled Task](https://wmimg.com/i/1424/2026/01/6975d95b1ac63.png)

## 其他最佳化

- 支援使用 ACME 申請 Let's Encrypt IP 憑證
- 入口錯誤頁面支援自訂
- 登入支援自動啟用圖形驗證碼
- 自訂 Logo 與隱藏選單支援長期儲存
- 新增操作日誌記錄與檢視功能
- 憑證管理新增 ACME ARI 支援
- 圖示全面在地化，不再相依於外部 CDN
- Nginx/OpenResty 新增 Stream 支援（第四層代理）
- 新增 PHP 8.5 支援
- 新增 Apache Web 伺服器基礎支援
- 新增 LiteSSL 憑證支援
- 容器與 compose 的建立／啟動支援即時進度顯示
- 容器支援一鍵終端機存取
- 資源監控支援自訂時間範圍與網卡／磁碟選擇
- 首頁應用程式支援拖曳排序
- 檔案管理支援大檔案分塊上傳
- 檔案管理支援雙擊解壓縮檔案
- 應用程式、執行環境與容器範本支援分類篩選
- SSH 終端機支援私鑰登入
- 系統工具箱 - DNS 適配現代化的網路管理方式
- 支援以視覺化方式修改 Docker 基礎設定
- 資料庫伺服器清單支援一鍵終端機存取
- 部分刪除操作新增 5 秒倒數確認

## 問題修正

- 修正面板登入超過 120 分鐘後自動登出的問題
- 修正 Docker 29+ 版本無法使用面板容器功能的問題
- 修正面板偶發 ERR_CONNECTION_REFUSED 錯誤的問題
- 修正面板 Websocket 工作階段的資源外洩問題
- 修正防火牆連接埠放行在部分情況下不生效的問題
- 修正 PHP 設定預設 cli 版本不生效的問題
- 修正 rsync secrets 換行字元寫入錯誤的問題
- 修正 fail2ban IPv6 位址顯示與解除封鎖的問題
- 其他已知問題修正

## 相容性變更

鑑於 openEuler、Alibaba Cloud Linux 4、Anolis 23 等中國國產新系統將軟體來源改得面目全非，導致適配極為困難，AcePanel 3.0 決定放棄對這三個發行版的支援。 建議改用 AlmaLinux / Rocky Linux。 若你必須使用國產系統，可以考慮 OpenCloudOS 9 或 TencentOS Server 4。

另外從 AcePanel 3.0 開始，不再支援基於 4.x 核心、以 RHEL 8 為基礎的系統（AlmaLinux 8/Rocky Linux 8）。 請升級至 9.x/10.x。

此外，為了支援預先編譯的安裝套件以解決飽受詬病的 MySQL 編譯緩慢問題，AcePanel 已將預設安裝目錄改為 `/opt/ace` 且不再允許自訂（預計影響極小，你仍然可以在安裝前掛載資料磁碟）。

## 關於舊版本的升級與維護

計劃在 AcePanel 3.0 穩定一段時間之後推出舊版耗子面板 2.x 升級至 AcePanel 3.0 的腳本， 鑑於變更幅度極大，預計無法做到完美升級，敬請知悉。

舊版耗子面板 2.x 仍將繼續維護一段時間的安全更新（預計到 2026 年底）， 你可以在這段期間安排升級。

## 開源授權變更

新版 AcePanel 決定採用更寬鬆的 BSD-3 開源授權，希望未來能有更多開發者參與，一起打造更好的伺服器面板。

目前可參與貢獻的專案：

- [AcePanel 主程式（求 star）](https://github.com/acepanel/panel)
- [AcePanel 安裝程式](https://github.com/acepanel/helper)
- [AcePanel 容器範本庫](https://github.com/acepanel/templates)
- [AcePanel 文件](https://github.com/acepanel/acepanel.github.io)
- [AcePanel 翻譯](https://zh.crowdin.com/project/acepanel)

不會寫程式？ 沒關係，歡迎發布使用 AcePanel 架設各種服務的文章，發掘不同的玩法，協助推廣 AcePanel。

## 結語

寫這篇文章時，已經是凌晨 4 點多了。 一轉眼，這個專案上個月已經迎來了它的 3 歲生日。 當我寫下第一行程式碼時，對 Go 一無所知，如今卻已成長為某些人口中所謂的專家。

AcePanel 是我的青春。 我希望能將它寫到完美無憾，所以重構了好幾次。 若這影響到了你的使用，在此向你致歉。 如今我年紀漸長，加上工作與生活中諸多瑣事，往後或許再也無法重構它了。

2026 年的 AI 已經非常強大。 新版 AcePanel 中許多複雜的互動邏輯都是在 Claude Opus 4.5 的協助下開發完成的。 我承認以我的水準，要寫出如此完整的互動是相當困難的。 或許隨著持續發展，未來可能不再需要面板，取而代之的是直接對 AI 說：幫我安裝 Nginx；幫我建立 xxx 專案。 誰知道呢？

最後，感謝贊助商 WeiXiaoDuo 與 LF Cloud，以及所有參與 AcePanel 內部測試的使用者。 沒有你們的幫助，AcePanel 將難以如期發布。

附上 AcePanel 新版本的安裝指令，歡迎測試體驗：

```bash
bash <(curl -sSLm 10 https://dl.acepanel.net/helper.sh)
```
