# Webhook

![WebHook management](/images/toolbox/webhook.png)

Webhook 允許您透過 HTTP 請求觸發伺服器上的腳本執行，藉此實現自動化部署、CI/CD 整合等功能。

## 建立 Webhook

點選 **建立 Webhook** 按鈕並填寫以下資訊：

- **名稱**：Webhook 的名稱，用於識別其用途
- **User**: The system user that executes the script. Use a dedicated low-privilege deployment user instead of root whenever possible
- **Raw Output**: When enabled, returns the raw output of the script; when disabled, returns JSON format
- **Script**: The Shell script content to execute. The form is pre-filled with a `#!/bin/bash` template by default

When you create a webhook, the script content is saved as a standalone `.sh` file (mode `0755`) under the `server/webhook` directory of the panel data root, named after the generated Key. Deleting the webhook also removes this script file.

The script is executed via `bash`. When the configured user is `root` (or left empty), it runs directly as the panel process owner; for any other user, it is executed as that user using `su -s /bin/bash -c`, so make sure the target user exists and has permission to run the script.

## Usage

After creation, the system will generate a unique Key. Access the following URL to trigger script execution:

```
https://your-panel-domain/webhook/{key}
```

Supports both GET and POST requests. You can also use the **Copy URL** button in the list to copy the full call URL directly.

## Edit Webhook

Click the **Edit** button on a row to modify an existing webhook. The edit dialog exposes the same **Name**, **User**, **Raw Output**, and **Script** fields as the create form, plus an additional **Enabled** switch so you can toggle the webhook on or off directly while editing. Saving rewrites the underlying script file and updates the stored configuration; the Key remains unchanged.

## Actions

Each row in the list provides the following actions:

| Action   | Description                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------ |
| Copy URL | Copies the full call URL (`{panel-origin}/webhook/{key}`) to the clipboard    |
| Edit     | Opens the edit dialog to modify the webhook                                                      |
| Delete   | Deletes the webhook after a confirmation dialog; this also removes the corresponding script file |

In addition, the **Enabled** column shows a switch you can toggle directly in the list to enable or disable a webhook without opening the edit dialog.

## Use Cases

### Git Auto Deployment

Combined with GitHub/GitLab Webhook functionality, achieve automatic deployment after code push:

```bash
#!/bin/bash
cd /opt/ace/projects/myproject
git pull origin main
npm install
npm run build
```

### Scheduled Task Trigger

Trigger specific operations through external services (such as monitoring systems):

```bash
#!/bin/bash
# Clean temporary files
rm -rf /tmp/cache/*
# Restart service
systemctl restart myapp
```

### CI/CD Integration

Call Webhook in CI/CD pipeline to complete deployment:

```bash
# In CI script
curl -X POST https://panel.example.com/webhook/your-key
```

## List Description

| Field         | Description                                   |
| ------------- | --------------------------------------------- |
| Name          | Webhook name                                  |
| Key           | Unique identifier, used to build the call URL |
| Run As User   | System user that executes the script          |
| Raw Output    | Whether to return raw text output             |
| Enabled       | Whether the webhook is enabled                |
| Call Count    | Cumulative number of calls                    |
| Last Call     | Last call time                                |
| Creation Time | Time the webhook was created                  |

## Notes

1. The Key is sensitive information, do not disclose it to untrusted people
2. **Raw Output** returns stdout directly. When disabled, AcePanel wraps the result as JSON.
3. When a call fails, check the script permission, run user, paths, environment variables, timeout, exit code, and stderr. An interactive shell may use a different `PATH` and profile.
4. Validate any request data before using it in a command, and add explicit error handling to the script.
5. Delete and recreate the WebHook if its URL is exposed in a repository, CI log, chat, or analytics system.
