# Panel Tasks

Panel tasks display background tasks executed by AcePanel, such as application installation, environment installation, etc.

## Task List

Go to **Tasks** > **Panel Tasks** tab to view the panel task list.

![Panel Tasks](/images/task/task-panel.png)

The list displays the following information:

- **Task Name**: Task description
- **Status**: Running/Completed/Failed
- **Created At**: Task start time
- **Completed At**: Task end time
- **Actions**: View logs, delete

## Task Status

| Status    | Description                |
| --------- | -------------------------- |
| Running   | Task is being executed     |
| Completed | Task executed successfully |
| Failed    | Task execution failed      |

## Common Task Types

### Application Installation

Installation tasks are created when installing native applications:

- Install application Nginx
- Install application MySQL
- Install application Docker

### Application Uninstallation

Uninstallation tasks are created when uninstalling applications:

- Uninstall application MariaDB
- Uninstall application Redis

### Environment Installation

Installation tasks are created when installing runtime environments:

- Install environment PHP 8.4
- Install environment Node.js 20
- Install environment Go 1.24

## View Logs

Click the **Logs** button to view detailed execution logs of the task, including:

- Command output
- Error messages

Logs are very useful for troubleshooting task failure causes.

## Delete Task

Completed or failed tasks can be deleted. Running tasks cannot be deleted.

:::tip Tip
Deleting a task only removes the record from the list, it does not affect installed applications or environments.
:::

## Handling Task Failures

If a task fails:

1. Click **Logs** to view error messages
2. Troubleshoot the problem based on error messages
3. Re-execute the operation after resolving the issue

Common failure causes:

- Network issues causing download failures
- Insufficient disk space
- Missing dependencies
- Port already in use

## Notes

1. Installation tasks may take a long time, please be patient
2. You can close the browser while tasks are executing
3. If a task is unresponsive for a long time, you can refresh the page to check the status
4. It is recommended to regularly clean up completed task records
