# Toolbox

The toolbox provides a series of system management tools, including process management, network connections, system information, SSH configuration, disk management, log cleanup, and more.

## Feature List

The toolbox is organized into the following tabs:

| Feature                          | Description                               |
|----------------------------------|-------------------------------------------|
| [Process](./toolbox/process)     | View and manage system processes          |
| [Network](./toolbox/network)     | View system TCP/UDP network connections   |
| [System](./toolbox/system)       | View system information and configuration |
| [SSH](./toolbox/ssh)             | SSH service configuration                 |
| [Disk](./toolbox/disk)           | Disk usage and management                 |
| [Log Clean](./toolbox/log)       | Clean up system logs                      |
| [Web Hook](./toolbox/webhook)    | Configure Webhook notifications           |
| [Benchmark](./toolbox/benchmark) | Server performance testing                |
| [Migration](./toolbox/migration) | Migrate data to another AcePanel          |
| [Panel](./toolbox/panel)         | View the panel's runtime information       |

The [Network](./toolbox/network) tab lists all system TCP and UDP connections (including IPv6), showing the protocol type, PID, process name, local and remote addresses, and connection status, with filtering by status, PID, process name, or port.

The [Migration](./toolbox/migration) tab lets you migrate websites, databases, database users, and projects from this server to another AcePanel instance. Connect to the target panel with its address and an API token, run the pre-check, select the items to migrate, and follow the live progress.

The [Panel](./toolbox/panel) tab shows the panel's own runtime information, including uptime, Go version, memory and heap statistics, GC metrics, and goroutines, which is useful for diagnostics.

![Toolbox](/images/toolbox/toolbox-process.png)

## Next Steps

- [Process Management](./toolbox/process) - View and manage system processes
- [Network Connections](./toolbox/network) - View TCP/UDP network connections
- [System Information](./toolbox/system) - View system configuration
- [SSH Configuration](./toolbox/ssh) - Configure SSH service
- [Disk Management](./toolbox/disk) - Manage disk space
- [Log Clean](./toolbox/log) - Clean up system logs
- [Web Hook](./toolbox/webhook) - Configure notifications
- [Benchmark Test](./toolbox/benchmark) - Test server performance
- [Migration](./toolbox/migration) - Migrate data to another AcePanel
- [Panel](./toolbox/panel) - View the panel's runtime information
