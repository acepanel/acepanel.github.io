# 命令列工具

AcePanel 提供命令列工具 `acepanel`，用於在無法存取 Web 介面時進行面板管理。

## 服務管理

:::warning 注意
後台任務運行時請勿停止或重啟面板，可能導致任務中斷或資料遺失。
:::

```shell
acepanel start    # 啟動
acepanel stop     # 停止
acepanel restart  # 重啟
acepanel status   # 查看狀態
```

## 用戶管理

```shell
acepanel user list                              # 列出所有用戶
acepanel user username <舊用戶名> <新用戶名>      # 修改用戶名
acepanel user password <用戶名> <新密碼>          # 修改密碼
acepanel user 2fa <用戶名>                       # 開關兩步驗證
```

## 安全設置

```shell
acepanel https on|off       # 開關 HTTPS
acepanel https generate     # 生成憑證（自簽名或 Let's Encrypt）
acepanel entrance on|off    # 開關安全入口
acepanel port <連接埠號>       # 修改監聽連接埠
acepanel bind-domain off    # 解除網域綁定
acepanel bind-ip off        # 解除 IP 綁定
acepanel bind-ua off        # 解除 UA 綁定
```

## 維護命令

```shell
acepanel update      # 更新面板
acepanel fix         # 修復更新問題
acepanel sync        # 同步快取資料
acepanel sync-time   # 同步伺服器時間
acepanel clear-task  # 清空任務佇列
acepanel info        # 查看面板資訊並重置密碼
acepanel help        # 幫助
```

## 範例

修改用戶 `admin` 的密碼為 `newpassword`：

```shell
acepanel user password admin newpassword
```
