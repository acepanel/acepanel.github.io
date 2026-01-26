# 安裝

## 系統要求

- 架構：`amd64` / `arm64`
- 記憶體：≥ 512MB（建議 1GB 以上）
- 磁碟：≥ 10GB 可用空間

## 支援的作業系統

| 系統               | 版本 | 狀態  |
| ---------------- | -- | --- |
| AlmaLinux        | 10 | 推薦  |
| AlmaLinux        | 9  | 支持  |
| RockyLinux       | 10 | 推薦  |
| RockyLinux       | 9  | 支持  |
| Debian           | 13 | 推薦  |
| Debian           | 12 | 支持  |
| Ubuntu           | 24 | 推薦  |
| Ubuntu           | 22 | 支持  |
| OpenCloudOS      | 9  | 支持  |
| TencentOS Server | 4  | 支持  |
| CentOS Stream    | 10 | 不推薦 |
| CentOS Stream    | 9  | 不推薦 |

未列出的系統可自行嘗試安裝，但不提供技術支援。

## 安裝前準備

- 使用純淨系統安裝，避免與已有環境衝突
- 如需掛載資料碟，請在安裝前完成，安裝後不支援目錄遷移
- 確保伺服器能正常存取外網

## 開始安裝

:::tip AcePanel 推薦使用
[林楓雲高性能 AMD EYPC 伺服器](https://www.dkdun.cn/aff/MQZZNVHQ) 伺服器安裝
:::

以 `root` 用戶登入伺服器，執行：

```shell
bash <(curl -sSLm 10 https://dl.acepanel.net/helper.sh)
```

安裝過程中請勿關閉終端。

## 安裝完成

安裝完成後，終端會輸出面板存取地址和初始帳號密碼：

```
========================================
AcePanel 安裝完成
用戶名：xxxxxxxx
密碼：xxxxxxxxxxxxxxxx
連接埠：xxxxx
入口：/xxxxxx
========================================
```

首次存取可能需在瀏覽器信任自簽名憑證。

## 常見問題

**無法存取面板**

檢查雲端伺服器安全群組和防火牆設定，確保放行面板連接埠。

**忘記用戶/密碼/地址**

使用命令列工具一鍵重置：

```shell
acepanel info
```
