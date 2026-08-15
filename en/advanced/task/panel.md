# Panel Tasks

![Panel tasks](/images/task/panel.png)

Panel Tasks contains long-running work submitted to AcePanel's queue, including application and runtime changes, backups and restores, file compression and extraction, and background container operations.

The **Tasks** page has two tabs: **Scheduled Tasks** (shown by default) and **Panel Tasks**. This page only covers **Panel Tasks**. For time-based jobs such as scheduled backups or scripts, see [Scheduled Tasks](./schedule.md).

## Task List

Go to **Tasks** > **Panel Tasks** tab to view the panel task list.

The list displays the following information:

- **Task Name**: Task description
- **Status**: Waiting/Running/Completed/Failed
- **Creation Time**: Task creation time
- **Completion Time**: Task end time
- **Actions**: View logs, cancel, delete

## Task Status

| Status    | Description                          |
|-----------|--------------------------------------|
| Waiting   | Task is queued and not yet started   |
| Running   | Task is being executed               |
| Completed | Task executed successfully           |
| Failed    | Task execution failed                |
| Canceled  | A waiting or running task was cancelled |

## Common Task Types

### Application Installation

Installation tasks are created when installing applications:

- Install app Nginx
- Install app MySQL
- Install app Docker

### Application Uninstallation

Uninstallation tasks are created when uninstalling applications:

- Uninstall app MariaDB
- Uninstall app Redis

### Application Update

Update tasks are created when updating an installed application:

- Update app Gitea
- Update app Grafana

### Environment Installation

Tasks are created when installing, uninstalling, or updating runtime environments:

- Install environment PHP 8.4
- Install environment Node.js 20
- Update environment Go 1.24

## View Logs

Click the **Logs** button to view detailed execution logs of the task, including:

- Command output
- Error messages

Logs are streamed in real time. The viewer can load history, search loaded text, jump between matches, toggle wrapping, copy, and enter full screen. The **Logs** button is unavailable while a task is still waiting. See [Logs](../log) for the shared viewer behavior.

## Cancel Task

Waiting and running tasks provide **Cancel**. Cancelling a waiting task removes it from execution. Cancelling a running task asks the worker to stop and runs the task's cleanup action when one is defined.

Cancellation is not a rollback. A pull, restore, extraction, or installer may already have written files or changed a service. Read the log and inspect the affected resource before retrying.

Logs are very useful for troubleshooting task failure causes.

::: tip Tip
If logs fail to load, disable any ad blockers in your browser.
:::

## Delete Task

Only finished, failed, or canceled tasks can be deleted. Cancel a waiting or running task first.

::: tip Tip
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

### Tasks Marked Failed After a Restart

When the panel restarts (for example, after an update or a server reboot), any task left in the **Running** state is automatically marked as **Failed**. This prevents tasks from getting permanently stuck in **Running** when the process that was executing them is interrupted. If you find a task marked **Failed** right after a restart, simply re-run the original operation.

### Clearing Stuck Tasks

In rare cases a task may appear stuck in the **Waiting** or **Running** state and block new tasks of the same kind. You can force-clear the queue from the server command line:

```bash
acepanel clear-task
```

This marks all waiting and running tasks as **Failed** so the queue is unblocked. See [CLI Tool](../../quickstart/cli.md) for details, and use this only under guidance.

## Notes

1. Installation tasks may take a long time, please be patient
2. You can close the browser while tasks are executing
3. If a task is unresponsive for a long time, you can refresh the page to check the status
4. It is recommended to regularly clean up completed task records
5. Submitting an identical task while a previous one is still waiting or running is rejected; wait for the previous task to finish first
