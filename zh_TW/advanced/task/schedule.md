# Scheduled Tasks

Scheduled tasks are used to set up tasks that execute at specified times, such as scheduled backups, scheduled script execution, etc.

## Task List

Go to the **Tasks** page, which displays the scheduled task list by default.

![Scheduled Tasks](/images/task/task-schedule.png)

The list displays the following information:

- **Task Name**: Task name
- **Task Type**: Shell/Backup, etc.
- **Enabled**: Whether enabled
- **Task Schedule**: Execution schedule
- **Created At**: Creation time
- **Last Updated**: Last execution time
- **Actions**: Edit, execute, delete, etc.

## Create Task

Click the **Create Task** button to create a new scheduled task.

### Task Types

| Type            | Description                       |
| --------------- | --------------------------------- |
| Shell           | Execute Shell commands or scripts |
| Backup Website  | Scheduled backup of website files |
| Backup Database | Scheduled backup of database      |
| Log Rotation    | Scheduled rotation of log files   |

### Execution Schedule

Multiple schedule settings are supported:

- **Every Minute**: Execute once every minute
- **Every Hour**: Execute once every hour
- **Every Day**: Execute at a specified time each day
- **Every Week**: Execute on specified day and time each week
- **Every Month**: Execute on specified date and time each month
- **Custom**: Use Cron expression

### Cron Expression

Cron expression format: `minute hour day month weekday`

```
*    *    *    *    *
│    │    │    │    │
│    │    │    │    └── Day of week (0-7, both 0 and 7 are Sunday)
│    │    │    └─────── Month (1-12)
│    │    └──────────── Day of month (1-31)
│    └───────────────── Hour (0-23)
└────────────────────── Minute (0-59)
```

Common examples:

| Expression    | Description                          |
| ------------- | ------------------------------------ |
| `0 2 * * *`   | Every day at 2 AM                    |
| `0 */6 * * *` | Every 6 hours                        |
| `0 0 * * 0`   | Every Sunday at midnight             |
| `0 0 1 * *`   | First day of every month at midnight |
| `*/5 * * * *` | Every 5 minutes                      |

Don't know how to write it? Just describe your requirements clearly to an AI and let it generate one for you.

## Shell Task Examples

### Clean Temporary Files

```bash
find /tmp -type f -mtime +7 -delete
```

### Restart Service

```bash
systemctl restart nginx
```

### Sync Time

```bash
ntpdate ntp.aliyun.com
```

## Task Operations

### Enable/Disable

Control whether the task is enabled via the switch. Disabled tasks will not execute.

### Execute Immediately

Click the **Run** button to execute the task immediately without waiting for the scheduled time.

### View Logs

Click the **Logs** button to view the task execution logs.

### Edit Task

Click the **Edit** button to modify the task configuration.

### Delete Task

Click the **Delete** button to delete the task.

## Notes

1. Task execution time is based on the server timezone
2. Long-running tasks may affect the next execution
3. It is recommended to set up notification reminders for important tasks
4. Regularly check task execution status
