# 更新

![AcePanel update progress and logs](/images/quickstart/update.png)

## 自動更新

面板預設已啟用自動更新，每天凌晨 2 點左右檢查並更新。 更新期間面板會短暫無法使用（通常少於 1 分鐘）。

若要關閉自動更新：「設定」->「安全」->「自動更新」。

## 手動更新

### 網頁介面

Click the version or **Update** action on Home. The dialog compares the installed and target versions, shows the release notes, and streams each update stage and its output. A failure or timeout remains visible so you can copy the relevant error.

Before starting, download a recent panel backup, confirm that important websites and databases have their own backups, and keep an independent SSH session open. Do not update while a migration, restore, application installation, or other critical background task is running.

The panel service restarts during the update, so the browser connection temporarily closes. A release may also require a server restart, which interrupts websites, databases, projects, containers, SSH, and every other service. After a successful panel-only restart, the update dialog closes or reloads the page automatically.

### 命令列

```shell
acepanel update
```

Use the CLI when the Web interface is unavailable. Keep the terminal open and read the complete output.

## 更新失敗

If Home displays a database or update-health warning, or an update leaves the panel unusable, run:

```shell
acepanel fix
```

Before retrying, check `acepanel status`, free disk space, network access to the update source, and the failed-stage log. If `acepanel fix` does not restore the panel, keep the backup and error output and ask for help in the [Community](https://tom.moe/c/technical/acepanel).
