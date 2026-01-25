# 管理容器

開始前需安裝 Docker / Podman 容器引擎。

容器引擎安裝完畢後，即可前往面板容器管理處創建容器（此處以 pgadmin4 為例）。

首先導航到鏡像選項卡拉取需要的鏡像。 視網路環境可能需要數分鐘到數十分鐘。

![拉取鏡像](/images/container/container1.png)

鏡像拉取完成後，導航到容器選項卡開始創建容器。

![創建容器](/images/container/container2.png)

表單內容按容器的說明填寫。 此處使用的 pgadmin4 鏡像需要映射 80 端口及配置 2 個默認環境變數，無需映射目錄。

容器創建完成後可點擊右上角刷新按鈕和容器右側的日誌按鈕檢查是否正常啟動。

![容器啟動](/images/container/container3.png)

若容器未能啟動，請根據日誌進行修正。

如果映射了外部端口，需要到防火牆菜單放行相應的端口。

![創建成功](/images/container/container4.png)
