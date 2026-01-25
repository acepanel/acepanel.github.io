AcePanel 提供了命令行工具，方便用户在无法访问 Web 界面时进行基本的面板管理操作。

## Managing Panel Service

Do not stop or restart AcePanel while background tasks are still running, as this may cause task stuck or data loss.

* Start Panel: `acepanel start`
* Stop Panel: `acepanel stop`
* Restart Panel: `acepanel restart`

## Panel Command Line

下表列出了常用的 AcePanel 命令行工具命令：

| Command                                                | Description                                                                  |
|--------------------------------------------------------|------------------------------------------------------------------------------|
| `acepanel status`                                      | Get the current status of the AcePanel service                               |
| `acepanel start`                                       | Start the AcePanel service                                                   |
| `acepanel stop`                                        | Stop the AcePanel service                                                    |
| `acepanel restart`                                     | Restart the AcePanel service                                                 |
| `acepanel update`                                      | Update AcePanel to the latest version                                        |
| `acepanel sync`                                        | Sync AcePanel cached data with cloud                                         |
| `acepanel fix`                                         | Fix AcePanel upgrade issues                                                  |
| `acepanel info`                                        | Output AcePanel basic information and generate new password                  |
| `acepanel user list`                                   | List all users                                                               |
| `acepanel user username <old_username> <new_username>` | Change a user's username                                                     |
| `acepanel user password <username> <new_password>`     | Change a user's password                                                     |
| `acepanel user 2fa <username>`                         | Toggle two-factor authentication for a user                                  |
| `acepanel https <on/off>`                              | Enable or disable HTTPS for AcePanel                                         |
| `acepanel https generate`                              | Obtain a free certificate or generate a self-signed certificate for AcePanel |
| `acepanel entrance <on/off>`                           | Enable or disable the AcePanel access entrance                               |
| `acepanel bind-domain off`                             | Disable domain binding for AcePanel                                          |
| `acepanel bind-ip off`                                 | Disable IP binding for AcePanel                                              |
| `acepanel bind-ua off`                                 | Disable User-Agent binding for AcePanel                                      |
| `acepanel port <new_port>`                             | Change the AcePanel listening port                                           |
| `acepanel sync-time `                                  | Sync server time with NTP                                                    |
| `acepanel clear-task`                                  | Clear all tasks in the task queue if they are stuck                          |
| `acepanel help`                                        | Display help information for AcePanel commands                               |

For example, to change a user's password, you can use:

```bash
acepanel user password haozi 123456
```

This will change the password for the user `haozi` to `123456`.
