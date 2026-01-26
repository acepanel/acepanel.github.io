# Process Management

The process management page is used to view and manage processes running on the system.

## Process List

![Process Management](/images/toolbox/toolbox-process.png)

The page displays all running processes in a table format.

The list displays the following information:

- **PID**: Process ID
- **Name**: Process name
- **Parent PID**: PID of the parent process
- **Threads**: Number of threads
- **User**: User running the process
- **Status**: Process status
- **CPU**: CPU usage
- **Memory**: Memory usage
- **Start Time**: Process start time

## Process Status

| Status | Description |
|--------|-------------|
| Running | Process is executing |
| Sleeping | Process is waiting for an event |
| Idle | Kernel thread is idle |
| Stopped | Process has stopped |
| Zombie | Process has ended but not been reaped |

## Search and Filter

- **Search**: Search by PID or process name
- **Status Filter**: Filter processes by specific status

## Process Operations

Right-click on a process to:

- **End Process**: Send SIGTERM signal
- **Force End**: Send SIGKILL signal
- **View Details**: View detailed process information

## Common Processes

| Process | Description |
|---------|-------------|
| nginx | Nginx web server |
| php-fpm | PHP FastCGI process manager |
| mysqld | MySQL database service |
| postgres | PostgreSQL database service |
| dockerd | Docker daemon |
| ace | AcePanel panel process |

## Notes

1. Ending critical system processes may cause system instability
2. Ending the panel process will make the panel inaccessible
3. It is recommended to only end processes that are confirmed to be useless
