# AcePanel 3.0 正式發布

好久不見， 經過幾次跳票延期，AcePanel 3.0 終於在 2026 年初完成開發， 經過了約 3 個星期的內測，現在是時候發布了。

## 升級全新品牌名稱 AcePanel

AcePanel 原名耗子面板，是本人 2022 年底開發的伺服器運維管理面板。

之前收到最多的一個回饋就是耗子面板這個名字不好聽，於是我們現在換了更高端大氣上檔次的名字 - AcePanel，你也可以叫它王牌面板/艾斯面板。

![AcePanel Logo](https://wmimg.com/i/1424/2026/01/6975d8a45a01d.png)

本文以下 AcePanel 均表示 AcePanel 3.0 版本

## 支援運行環境與專案管理

AcePanel 這次最大的更新就是新增了運行環境功能，支援一鍵安裝與管理 Go、Java、Node.js、PHP、Python 等運行環境，支援多版本同時共存。

![AcePanel 運行環境](https://wmimg.com/i/1424/2026/01/6975d8a49a638.png)

同時 AcePanel 基於 Linux systemd 的強大能力全新開發了專案管理功能，支援通過安裝的運行環境一鍵建立與管理各類 Web 專案和常駐程式，可平替 PM2、Supervisor 等工具。

![AcePanel 專案列表](https://wmimg.com/i/1424/2026/01/6975d8a386a79.png)

![AcePanel 專案編輯](https://wmimg.com/i/1424/2026/01/6975d8a4454f7.png)

## 網站管理重構

AcePanel 還對網站管理功能進行了重構，重新組織了網站目錄結構，支援反向代理、純靜態、PHP 3 種網站類型，並新增了多項常用配置以及自訂功能。

![AcePanel 反向代理網站上游編輯](https://wmimg.com/i/1424/2026/01/6975d8a3e8c5b.png)

![AcePanel 反向代理網站代理編輯](https://wmimg.com/i/1424/2026/01/6975d8a59b896.png)

新的網站目錄結構允許靈活添加各種自訂配置，且不易衝突。

## 應用中心優化

AcePanel 正式上線期待已久的容器編排模版功能，支援一鍵部署 WordPress、Nextcloud、GitLab 等常用程式。

![AcePanel 編排模版](https://wmimg.com/i/1424/2026/01/6975d8a59c3b9.png)

（缺少你想要的程式？ 歡迎向 AcePanel 模版庫提交 PR，方式可見文末）

AcePanel 在原有 OpenResty 與 Percona 的基礎上新增 Nginx 與 MySQL、MariaDB，同時還優化了許多應用的安裝流程以提高安裝速度， 特別對 Percona/MySQL/MariaDB 為常用系統使用預製安裝包以極大提高安裝速度和成功率。

（實測 MySQL 通常可以在 2 分鐘內完成安裝）

## 備份優化

AcePanel 優化了備份功能，新增備份儲存設定，支援添加 S3、SFTP 等常用遠端儲存。

（你可能會問為什麼沒有 OSS、COS？ 這是因為 OSS、COS 等均提供 S3 相容介面，可直接使用 S3 配置，因此沒必要單獨為它們引入依賴以及額外開發。）

![AcePanel 添加備份儲存](https://wmimg.com/i/1424/2026/01/6975d8a5c18e5.png)

## 全新的面板助手

AcePanel 使用 Go 語言重寫了原來基於 shell 腳本的安裝器， 新的面板助手全面支援互動式安裝及多語言，提供更好、更現代的使用者體驗。

![AcePanel 安裝器](https://wmimg.com/i/1424/2026/01/6975d8a5d98b9.png)

## 使用優化

AcePanel 全面優化了檔案管理，還原類似 Windows 資源管理器的操作體驗（支援快捷鍵操作）。

![AcePanel 檔案管理（列表）](https://wmimg.com/i/1424/2026/01/6975d8a64b601.png)

![AcePanel 檔案管理（圖示）](https://wmimg.com/i/1424/2026/01/6975d959712cf.png)

基於 Monaco 開發全新的檔案編輯器，即是編輯器，亦可作為線上 IDE 使用（同樣支援快捷鍵操作）。

![AcePanel 檔案編輯](https://wmimg.com/i/1424/2026/01/6975d95a50149.png)

工具箱能力全面提升， 程序管理支援右鍵操作，同時新增 SSH 服務管理，磁碟管理，日誌清理以及 Web 鉤子等功能。

![AcePanel 程序管理](https://wmimg.com/i/1424/2026/01/6975d95ab38b2.png)

![AcePanel SSH 管理](https://wmimg.com/i/1424/2026/01/6975d95a283e1.png)

![AcePanel Web 鉤子](https://wmimg.com/i/1424/2026/01/6975d95932b1d.png)

計劃任務週期選擇器重寫，提供更友好的互動體驗。

![AcePanel 建立計劃任務](https://wmimg.com/i/1424/2026/01/6975d95b1ac63.png)

## 其他優化

- 支援使用 ACME 申請 Let's Encrypt IP 憑證
- 入口錯誤頁支援自訂
- 登入支援自動開啟驗證碼
- 自訂 Logo 與隱藏選單支援長期保存
- 新增操作日誌記錄與查看功能
- 憑證管理新增 ACME ARI 支援
- 圖示全面本地化，不再需要依賴外部 CDN
- Nginx/OpenResty 新增 Stream 支援（四層代理）
- 新增 PHP 8.5 支援
- 新增 Apache Web 伺服器基礎支援
- 新增 LiteSSL 憑證支援
- 容器與編排建立/啟動支援即時顯示進度
- 容器支援一鍵進入終端
- 資源監控支援自訂時間範圍與網卡/磁碟選擇
- 首頁應用支援拖曳排序
- 檔案管理支援大檔案分片上傳
- 檔案管理支援壓縮包雙擊解壓
- 應用與運行環境、容器模版支援分類篩選
- SSH 終端支援私鑰登入
- 系統工具箱 - DNS 適配現代網路管理方式
- 支援視覺化修改 Docker 基本設定
- 資料庫伺服器列表支援一鍵進入終端
- 部分刪除操作新增 5s 倒數確認

## 問題修復

- 修復登入超過 120 分鐘後面板自動登出的問題
- 修復 Docker 29+ 版本無法使用面板容器功能的問題
- 修復面板偶現 ERR_CONNECTION_REFUSED 錯誤的問題
- 修復面板 Websocket 會話存在資源洩漏的問題
- 修復部分情況下防火牆連接埠放行不生效的問題
- 修復 PHP 設定預設 cli 版本不生效的問題
- 修復 rsync secrets 換行符寫入不正確的問題
- 修復 fail2ban IPv6 位址顯示和解封問題
- 其他已知問題修復

## 相容性變化

鑑於 openEuler 及 Alibaba Cloud Linux 4 和 Anolis 23 等新版信創系統把軟體源改的面目全非，適配極其困難，因此 AcePanel 3.0 決定放棄對這三個發行版的支援。 建議切換到 AlmaLinux / Rocky Linux 使用， 如必須使用信創系統可考慮 OpenCloudOS 9 或 TencentOS Server 4。

同時 AcePanel 3.0 版本起，不再支援基於 4.x 核心的 RHEL 8-based 系統（AlmaLinux 8/Rocky Linux 8）， 請升級至 9.x/10.x 使用。

其次為支援預製安裝包以解決飽受詬病的 MySQL 編譯慢問題，AcePanel 修改了預設安裝目錄為 `/opt/ace` 且不再允許自訂（預計影響不大，仍可在安裝前掛載資料磁碟）。

## 關於舊版本升級及維護

計劃在 AcePanel 3.0 穩定一段時間之後推出舊版耗子面板 2.x 升級至 AcePanel 3.0 的腳本， 鑑於改動較大，預計無法實現完美升級，請留意。

舊版耗子面板 2.x 仍將繼續維護一段時間的安全更新（預計到 2026 年底）， 您可在此期間自行安排時間點進行升級。

## 開源協議變化

新版本 AcePanel 決定使用更寬鬆的開源協議 BSD-3，希望未來能有更多的開發者參與進來，一起打造更好用的伺服器面板。

當前可參與貢獻的專案如下：

- [AcePanel 主程式（求star）](https://github.com/acepanel/panel)
- [AcePanel 安裝器](https://github.com/acepanel/helper)
- [AcePanel 容器模版庫](https://github.com/acepanel/templates)
- [AcePanel 文件](https://github.com/acepanel/acepanel.github.io)
- [AcePanel 翻譯](https://zh.crowdin.com/project/acepanel)

不會程式碼？ 沒關係，歡迎發表使用 AcePanel 搭建各種服務、發掘不同玩法的文章，幫助推廣 AcePanel。

## 結束語

寫這篇文章的時候是夜裡 4 點多， 轉眼這個專案已經在上個月度過其 3 歲生日， 當年寫下第一行程式碼時我還對 Go 一竅不通，如今已經成長為有些人口中的大佬。

AcePanel 是我的青春， 我希望將其寫到極致而不留遺憾，因此來回重構了數次， 如果因此影響了您的使用，我在此說聲道歉。 現在自己年紀也慢慢大了，加上工作與生活的瑣事繁多，未來再想重構也不一定折騰得動了。

2026 年的 AI 已經非常強大， AcePanel 新版本中有大量複雜的互動邏輯均使用 Claude Opus 4.5 輔助開發， 我承認以我的水平難以寫出這樣完善的互動。 也許繼續發展下去未來或將不再需要面板，而是直接對 AI 說：幫我安裝 Nginx；幫我建立 xxx 專案。 誰知道呢？

最後，感謝贊助商微曉朵和林楓雲以及參與 AcePanel 內測的所有使用者， 沒有你們的幫助 AcePanel 將難以如期發布。

附上 AcePanel 新版本的安裝命令，歡迎測試體驗：

```bash
bash <(curl -sSLm 10 https://dl.acepanel.net/helper.sh)
```
