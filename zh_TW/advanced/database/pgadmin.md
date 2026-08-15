# pgAdmin

![pgAdmin 設定](/images/database/pgadmin.png)

pgAdmin 是 AcePanel 整合的 PostgreSQL Web 管理工具。 安裝原生應用後，可以從 PostgreSQL 資料庫列表一鍵進入，也可以在應用管理器中配置訪問引數。

## 前置條件

- 在 **應用**中安裝至少一個 PostgreSQL 伺服器，並在 **資料庫 > 伺服器**中完成登記。
- 安裝 pgAdmin 原生應用。
- 使用系統防火牆、雲安全組或受信任的反向代理限制 pgAdmin 監聽埠的訪問來源。

## 開啟 pgAdmin

進入 **資料庫**，選擇 PostgreSQL 標籤頁，在資料庫行中點選 pgAdmin。 AcePanel 會開啟 pgAdmin，並提供已配置伺服器的一鍵訪問資訊。

資料庫型別標籤會動態顯示：只有存在對應資料庫伺服器時，MySQL、PostgreSQL、ClickHouse、Redis、Valkey 等型別的標籤才會出現。 管理工具的介面語言跟隨面板語言。

## 訪問設定

進入 **應用 > 已安裝 > pgAdmin > 管理**，可以檢視或修改：

- 訪問地址和埠；
- 管理員郵箱；
- 管理員密碼；
- AcePanel 使用的 pgAdmin 賬號。

修改管理員郵箱時，AcePanel 會遷移已經同步到 pgAdmin 的 PostgreSQL 伺服器配置。 修改後應確認所有預期伺服器仍然存在。

## 安全建議

- pgAdmin 管理員密碼屬於高許可權資料庫憑據，應妥善保管。
- 不要把 pgAdmin 直接暴露到公網， 應使用訪問白名單、VPN 或帶認證的反向代理。
- 修改埠後，還需要同步調整防火牆和上游安全組。
- 連線經過不受信任的網路時應使用 TLS。

## 故障排查

- **沒有 pgAdmin 操作：** 確認 pgAdmin 已安裝，且當前開啟的是 PostgreSQL 標籤頁。
- **伺服器未顯示：** 先在 **資料庫 > 伺服器**中核對，再重新開啟或同步 pgAdmin。
- **頁面無法開啟：** 檢查 pgAdmin 服務、監聽埠、防火牆和應用日誌。
- **修改郵箱後無法登入：** 使用當前郵箱，通過管理器重置密碼，並核對同步賬號。

MySQL 對應提供 phpMyAdmin 入口，並可選擇目標 MySQL 伺服器。
