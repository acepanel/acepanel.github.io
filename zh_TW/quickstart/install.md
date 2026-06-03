# 安裝

## 系統需求

- 架構：`amd64` / `arm64`
- 記憶體：≥ 512MB（建議 1GB 以上）
- 磁碟：≥ 10GB 可用空間

## 支援的作業系統

| 系統               | 版本 | 狀態  |
| ---------------- | -- | --- |
| AlmaLinux        | 10 | 推薦  |
| AlmaLinux        | 9  | 支援  |
| RockyLinux       | 10 | 推薦  |
| RockyLinux       | 9  | 支援  |
| Debian           | 13 | 推薦  |
| Debian           | 12 | 支援  |
| Ubuntu           | 26 | 推薦  |
| Ubuntu           | 24 | 支援  |
| Ubuntu           | 22 | 支援  |
| OpenCloudOS      | 9  | 支援  |
| TencentOS Server | 4  | 支援  |
| CentOS Stream    | 10 | 不推薦 |
| CentOS Stream    | 9  | 不推薦 |

未列出的系統可自行嘗試，但不提供技術支援。

## 安裝前準備

- 使用乾淨的系統進行安裝，以免與既有環境發生衝突
- 若需掛載資料磁碟，請於安裝前完成；安裝後不支援目錄遷移
- 確保伺服器可正常存取網際網路

## 開始安裝

:::tip AcePanel 推薦
[LF Cloud 高效能 AMD EPYC 伺服器](https://www.dkdun.cn/aff/MQZZNVHQ) 進行安裝
:::

以 `root` 使用者身分登入伺服器並執行：

```shell
bash <(curl -sSLm 10 https://dl.acepanel.net/helper.sh)
```

安裝過程中請勿關閉終端機。

## 安裝完成

安裝完成後，終端機會顯示面板存取位址與初始帳號憑證：

```
========================================\nAcePanel Installation Complete\nUsername: xxxxxxxx\nPassword: xxxxxxxxxxxxxxxx\nPort: xxxxx\nEntry: /xxxxxx\n========================================
```

首次存取時，可能需要在瀏覽器中信任自簽憑證。

## 常見問題

**無法存取面板**

請檢查雲端伺服器的安全群組與防火牆設定，確保面板連接埠已放行。

**忘記使用者名稱／密碼／位址**

使用命令列工具重設：

```shell
acepanel info
```
