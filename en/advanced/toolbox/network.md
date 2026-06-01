# Network

The network page lists the current network connections on the server, helping you inspect which processes are listening on or have established connections, along with their local and remote addresses.

To open it, go to the **Toolbox** page and switch to the **Network** tab.

::: tip Tip
This page is read-only. It is intended for viewing and troubleshooting connections; it does not provide actions to close connections or terminate processes. To manage processes, use the **Process** tab in the Toolbox.
:::

## Connection List

The page shows all detected TCP and UDP connections (both IPv4 and IPv6) in a table. Each row represents a single connection.

### Columns

| Column         | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| Type           | Connection type: `tcp`, `tcp6`, `udp`, or `udp6`                            |
| PID            | The process ID that owns the connection                                     |
| Process        | The name of the process that owns the connection                            |
| Local Address  | The local address and port, in the form `IP:Port`                          |
| Remote Address | The remote address and port, in the form `IP:Port`                         |
| Status         | The connection state, such as `LISTEN`, `ESTABLISHED`, `TIME_WAIT`, etc.   |

The **Status** column is displayed as a colored tag to make states easy to distinguish at a glance:

- `LISTEN` is shown in green
- `ESTABLISHED` is shown in blue
- Transitional states such as `TIME_WAIT`, `CLOSE_WAIT`, `FIN_WAIT1`, `FIN_WAIT2`, `LAST_ACK`, and `CLOSING` are shown in orange
- `NONE` and other states are shown in a neutral color

::: tip Tip
For UDP connections, which are connectionless, the status is typically `NONE`. The `PID` and `Process` columns may be empty when the panel cannot determine the owner of a connection (for example, due to insufficient permissions or because the process has already exited).
:::

## Filtering and Searching

A toolbar above the table lets you narrow down the displayed connections. Filters can be combined, and the list refreshes automatically as you change them.

### Filter by Status

A multi-select dropdown that filters connections by one or more states. Available options:

- `LISTEN`
- `ESTABLISHED`
- `TIME_WAIT`
- `CLOSE_WAIT`
- `SYN_SENT`
- `SYN_RECV`
- `FIN_WAIT1`
- `FIN_WAIT2`
- `LAST_ACK`
- `CLOSING`
- `NONE`

Selecting multiple states shows connections that match any of them. Clear the selection to show all states.

### Search PID

Filters connections by process ID. The match is a substring match, so entering `12` matches PIDs such as `12`, `123`, and `4128`.

### Search Process

Filters connections by process name. The match is case-insensitive and partial, so entering `ngin` matches a process named `nginx`.

### Search Port

Filters connections by port number. The match is applied to **both** the local port and the remote port, and is a substring match, so entering `80` matches ports such as `80`, `8080`, and `8000`.

## Sorting

Click a column header to sort the table. Sorting is supported on the following columns:

- **Type**
- **PID**
- **Process**

Each click toggles between ascending and descending order. By default, connections are sorted by **PID** in ascending order. The **Local Address**, **Remote Address**, and **Status** columns are not sortable.

## Pagination

The list is paginated, with **50** items per page by default. You can change the page size using the size picker; the available options are **50**, **100**, **200**, and **500** items per page. A quick jumper is also available to jump directly to a specific page.

## Refresh

Click the **Refresh** button to reload the connection list and fetch the latest data from the server. The list reflects the connection state at the moment it is loaded, so refresh to capture changes such as new connections or closed sessions.
