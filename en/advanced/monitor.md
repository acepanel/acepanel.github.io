# Monitor

The monitor module is used to record and view server performance data, including CPU, memory, disk I/O, and network traffic.

## Monitor Page

![Monitor Page](/images/monitor/monitor.png)

## Monitor Settings

### Enable Monitoring

After turning on the **Enable Monitoring** switch, the system will periodically collect performance data.

### Retention Days

Set the retention time for monitoring data, default is 30 days. Data exceeding the retention time will be automatically cleaned up.

### Clear Monitor Records

Click the **Clear Monitor Records** button to manually clear all historical monitoring data.

## Monitoring Metrics

### Load Average

System load reflects the busyness of the CPU:

- **1-minute load**: Average load over the last 1 minute
- **5-minute load**: Average load over the last 5 minutes
- **15-minute load**: Average load over the last 15 minutes

Load value reference:
- Load < CPU cores: System running smoothly
- Load = CPU cores: System running at full capacity
- Load > CPU cores: System overloaded, may experience lag

### CPU Usage

Displays CPU usage percentage, including:
- User mode usage
- System mode usage
- Idle rate

### Memory Usage

Displays memory usage:
- Used memory
- Available memory
- Cache/Buffer

### Disk I/O

Displays disk read/write speed:
- Read speed (KB/s or MB/s)
- Write speed (KB/s or MB/s)

You can select the disk device to monitor.

### Network Traffic

Displays network interface traffic:
- Send speed
- Receive speed

You can select the network interface to monitor.

## Time Range

Each monitoring chart supports selecting a time range:

- **Yesterday**: View yesterday's data
- **Today**: View today's data
- **Last 7 days**: View data from the last week
- **Custom**: Select any time range

## Use Cases

### Performance Analysis

Analyze server performance bottlenecks through monitoring data:
- Sustained high CPU load: Consider optimizing programs or upgrading CPU
- Insufficient memory: Consider adding memory or optimizing memory usage
- High disk I/O: Consider using SSD or optimizing database queries
- Insufficient network bandwidth: Consider upgrading bandwidth

### Troubleshooting

When problems occur, view historical monitoring data to locate the time and cause of the problem.

### Capacity Planning

Based on historical data trends, predict future resource needs and plan for expansion in advance.

## Notes

- Monitoring data will occupy some disk space
- The longer the retention days, the more space it occupies
- It is recommended to set appropriate retention days based on actual needs
