# 管理面板

請勿在面板仍有任務運行時操作停止 / 重啟面板，否則可能會造成問題。

- Start Panel: `acepanel start`
- Stop Panel: `acepanel stop`
- Restart Panel: `acepanel restart`

## 面板命令行

```bash
acepanel
```

可根據提示補全需要的命令進行操作。

例如，要更改使用者的密碼，您可以使用：

```bash
acepanel user password haozi 123456
```

這將把使用者 `haozi` 的密碼更改為 `123456`。

## 卸載面板

優先建議備份資料重裝系統，這樣可以保證系統純淨。

如果您無法重裝系統，請以`root`使用者登錄伺服器，執行以下命令卸載面板：

```shell
bash <(curl -sSLm 10 https://dl.acepanel.net/helper.sh)
```

卸載面板前請務必備份好所有資料，提前卸載面板全部應用。 卸載後資料將**無法恢復**！
