# Toolbox

![Toolbox overview](/images/toolbox/overview.png)

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

## Choose the Right Tool

| Need | Open |
|---|---|
| Find a high-CPU process, open file, connection, or physical disk I/O source | [Process](./toolbox/process) |
| Inspect sockets or safely change an interface address, gateway, or DNS | [Network](./toolbox/network) |
| Manage Swap, host name, Hosts, timezone, time, or NTP | [System](./toolbox/system) |
| Change the SSH daemon port, authentication, root policy, password, or key | [SSH](./toolbox/ssh) |
| Partition, format, mount, configure LVM, or inspect SMART and RAID | [Disk](./toolbox/disk) |
| Estimate and reclaim space used by logs | [Log Cleanup](./toolbox/log) |
| Expose a controlled script endpoint to Git or CI/CD | [WebHook](./toolbox/webhook) |
| Measure CPU, memory, or disk performance during a maintenance window | [Benchmark](./toolbox/benchmark) |
| Move supported resources from AcePanel, BaoTa, or 1Panel | [Migration](./toolbox/migration) |
| Diagnose AcePanel's Go memory, garbage collection, or goroutines | [Panel](./toolbox/panel) |

The [Network](./toolbox/network) tab lists TCP and UDP connections and safely edits supported NetworkManager, netplan, and ifupdown interface configurations.

The [Migration](./toolbox/migration) tab moves supported websites, databases, users, and projects from AcePanel, BaoTa, or 1Panel.

The [Panel](./toolbox/panel) tab shows the panel's own runtime information, including uptime, Go version, memory and heap statistics, GC metrics, and goroutines, which is useful for diagnostics.

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
