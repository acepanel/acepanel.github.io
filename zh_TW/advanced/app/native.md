# 原生應用程式

![Native applications](/images/app/native.png)

原生應用程式是直接安裝在系統上的軟體，相較於容器化部署具有更好的效能和更低的資源佔用。

## 應用程式清單

Go to the **Apps** page and switch to the **Native App** tab to view the native application list. 可以透過頂部的分類標籤篩選不同類型的應用程式，或使用右側的搜尋框依名稱或描述進行搜尋。

清單中會顯示以下資訊：

- **應用程式名稱**：軟體名稱
- **描述**：軟體的簡要說明
- **已安裝版本**：目前安裝的版本號（未安裝則為空白）
- **首頁顯示**：是否在面板首頁的快捷應用程式區域顯示
- **操作**：安裝、更新、管理或解除安裝

## 安裝應用程式

點選應用程式右側的 **安裝** 按鈕，會跳出安裝對話方塊：

### 選擇通道

部分應用程式提供多個版本通道， 點選下拉式選單選擇需要的版本系列：

### 選擇版本

選擇通道後，系統會自動填入該通道的最新版本號：

如果所選通道提供了發行說明，版本欄位下方會出現 **更新日誌** 區域，顯示該通道的更新內容。 版本欄位本身是唯讀的，會始終反映所選通道的最新可用版本。

Some applications also provide **Pre-execution Script** and **Custom Compile Parameters** fields. The pre-execution script runs before the installer and is intended for repository, dependency, or environment preparation. Custom compile parameters are passed to applications that support source-build customization.

Review both fields before submitting: they execute with installation privileges and a mistake can change the system outside the application directory. Leave them empty for a normal installation.

Click **Install** to submit the background task and follow its log under **Tasks > Panel Tasks**.

## 管理應用程式

已安裝的應用程式會顯示 **管理** 按鈕， 點選即可進入應用程式管理頁面。

### 執行狀態

管理頁面會先顯示應用程式的執行狀態：

The following operations are provided:

- **Start**: Start a stopped service
- **Stop**: Stop a running service
- **Restart**: Restart the service (will interrupt connections)
- **Reload**: Reload configuration (without interrupting connections, recommended; only available for applications that support it)

The **Autostart** switch in the top-right corner controls whether the service starts automatically on system boot.

### Modify Configuration

Click the **Modify Configuration** tab to directly edit the application's configuration file:

:::warning 注意
修改設定檔前請確保了解每個參數的含義， 錯誤的設定可能導致服務無法啟動。
:::

### 檢視日誌

點選 **執行日誌** 或 **錯誤日誌** 分頁，可以檢視應用程式的日誌，便於排查問題。

## 更新應用程式

當有新版本可用時，清單中應用程式旁邊會出現 **更新** 按鈕。 點選後會跳出確認對話方塊，顯示目標版本號。 請注意，更新可能會將相關設定重設為預設狀態。 確認後，更新會在背景執行，可以在 **任務** 頁面追蹤其進度。

## 解除安裝應用程式

點選 **解除安裝** 按鈕即可解除安裝應用程式。 會跳出一個帶有 5 秒倒數計時的確認對話方塊。 解除安裝前請確保：

1. 沒有網站或專案相依於該應用程式
2. 已備份重要的設定檔與資料

:::danger 警告
解除安裝資料庫類應用程式（如 MySQL、PostgreSQL）會刪除所有資料庫資料， 請務必事先備份！
:::

:::danger 警告
解除安裝 Web 伺服器類應用程式（如 Nginx/OpenResty）會重設所有網站的設定。 確認對話方塊會針對這種情況顯示專門的警告。 重新安裝或切換到其他 Web 伺服器時，同樣會觸發該重設。
:::

## 首頁捷徑

啟用 **首頁顯示** 開關後，應用程式會出現在面板首頁的 **快捷應用程式** 區域，方便快速進入管理頁面。
