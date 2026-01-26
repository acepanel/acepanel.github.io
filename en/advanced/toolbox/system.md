# System

The system page provides management features for basic server configuration, including DNS, SWAP, hostname, and time settings.

## DNS

Configure the system's DNS servers.

![DNS Settings](/images/toolbox/toolbox-system-dns.png)

### Configuration Items

- **DNS1**: Primary DNS server address
- **DNS2**: Secondary DNS server address

### Common DNS Servers

| Provider      | DNS1            | DNS2            |
|---------------|-----------------|-----------------|
| Alibaba Cloud | 223.5.5.5       | 223.6.6.6       |
| Tencent Cloud | 119.29.29.29    | 119.28.28.28    |
| 114 DNS       | 114.114.114.114 | 114.114.115.115 |
| Google        | 8.8.8.8         | 8.8.4.4         |
| Cloudflare    | 1.1.1.1         | 1.0.0.1         |

## SWAP

Manage the system's SWAP space.

![SWAP Settings](/images/toolbox/toolbox-system-swap.png)

The page displays current SWAP usage:

- System total
- Used
- Available

### Configure Panel SWAP

Set the size of the SWAP file managed by the panel (unit: MB).

- Setting to `0` disables panel SWAP
- It is recommended to set based on server memory size, typically 1-2 times the memory

::: tip Tip
SWAP can provide additional virtual memory when physical memory is insufficient, but performance is lower than physical memory. For servers with sufficient memory, SWAP may not need to be enabled.
:::

## Host

Configure system hostname and Hosts file.

![Host Settings](/images/toolbox/toolbox-system-host.png)

### System Hostname

Modify the server's hostname, such as `myserver`, `web-01`, etc.

### Hosts

Edit the system's `/etc/hosts` file for configuring local domain name resolution.

Common uses:

- Block specific domains
- Configure local development domains
- Speed up resolution of specific domains

## Time

Configure system timezone and time synchronization.

![Time Settings](/images/toolbox/toolbox-system-time.png)

### Select Timezone

Select the server's timezone from the dropdown list, such as `Asia/Shanghai`.

### Modify Time

Manually set the system time.

::: warning Note
After manually changing the time, automatic system time synchronization may still override the settings.
:::

### NTP Server

Configure the NTP time synchronization server. Leave empty to use the system default server.

Common NTP servers:

- `ntp.aliyun.com` - Alibaba Cloud
- `ntp.tencent.com` - Tencent Cloud
- `cn.pool.ntp.org` - China NTP Pool

### Action Buttons

- **Configure Default Server**: Restore to using the system default NTP server
- **Save**: Save timezone and time settings
- **Sync Time**: Immediately synchronize time with the NTP server
