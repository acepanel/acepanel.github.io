# 安裝面板

面板支持 `amd64` | `arm64` 架構下的主流系統。 下表中的系統均已測試 LNMP 環境安裝。

優先建議使用標註**推薦**的系統。 無特殊情況不建議使用標註**不推薦**的系統。

不在下表中的其他系統，可自行嘗試安裝，但不提供無償技術支持。

| 系統                  | 版本                  | 備註  |
| ------------------- | ------------------- | --- |
| AlmaLinux           | 9                   | 推薦  |
| AlmaLinux           | 8                   | 不推薦 |
| RockyLinux          | 9                   | 支持  |
| RockyLinux          | 8                   | 不推薦 |
| CentOS Stream       | 9                   | 不推薦 |
| CentOS Stream       | 8                   | 不推薦 |
| Ubuntu              | 24                  | 推薦  |
| Ubuntu              | 22                  | 支持  |
| Debian              | 12                  | 推薦  |
| Debian              | 11                  | 支持  |
| OpenCloudOS         | 9                   | 支持  |
| TencentOS Server    | 4                   | 支持  |
| TencentOS Server    | 3.1 | 不推薦 |
| Alibaba Cloud Linux | 3.2 | 不推薦 |
| Anolis              | 8                   | 不推薦 |
| openEuler           | 22                  | 不推薦 |

隨著系統版本的不斷更新，我們亦可能會終止部分過於老舊的系統的支持，以保證面板的健壯性。

## 開始安裝

> 如需掛載分區，請在安裝面板前完成。 面板安裝後不支持跨目錄遷移。

以 `root` 用戶登錄服務器，運行以下命令安裝面板：

```shell
curl -fsLm 10 -o install.sh https://dl.cdn.haozi.net/panel/install.sh && bash install.sh
```

一般 2 分鐘內即可完成安裝。 安裝過程中請勿關閉終端。
