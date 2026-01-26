# 第一個容器：部署 pgAdmin 4

本文以 pgAdmin 4 為例，演示如何通過 AcePanel 快速部署 Docker 容器。

## 安裝 Docker

進入「應用」頁面，在「原生應用」中找到 Docker 並安裝。 安裝進度可在「任務」頁面查看。

:::tip 國內服務器
國內服務器拉取鏡像較慢， 建議配置 [毫秒鏡像](https://1ms.run/) 提供的付費加速源。
:::

## 部署容器

進入「應用」->「容器模板」，找到 pgAdmin 4，點擊「部署」。

![容器模板列表](/images/quickstart/container-template.png)

![部署1](/images/quickstart/container-deploy-step1.png)

選擇「創建新編排」後填寫配置：

![部署2](/images/quickstart/container-deploy-step2.png)

- **編排名稱**：給編排起個名字，如 `pg4admin`
- **自動啟動**：勾選後創建完成自動拉取鏡像並啟動
- **自動防火牆**：勾選後自動放行端口
- **訪問端口**：容器 80 端口映射到主機端口，如 `999`
- **管理員郵箱/密碼**：pgAdmin 4 的登錄憑據

點擊「下一步」預覽編排配置，確認後點擊「創建」。

## 等待啟動

如果勾選了「自動啟動」，創建後會彈窗顯示拉取和啟動進度：

![啟動進度](/images/container/compose-starting.png)

也可以在「容器」->「編排」頁面手動管理：

![編排列表](/images/container/compose-list.png)

## 訪問服務

啟動完成後，瀏覽器訪問 `http://服務器IP:端口`（如 `http://x.x.x.x:999`），用之前設置的郵箱和密碼登錄即可。
