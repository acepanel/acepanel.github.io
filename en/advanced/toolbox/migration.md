# Migration

The Migration tool transfers websites, databases, database users, and projects from the current AcePanel server to another AcePanel server over the network. It is a panel-to-panel migration: both the source (the panel you are operating) and the target (the remote server) must be running AcePanel.

The source connects to the target through AcePanel's authenticated API, recreates each resource on the target, and streams the data across. Progress is shown in real time and a full log is available for download.

::: warning Prerequisites
The remote server must already have AcePanel installed and reachable. For a successful migration the two servers should run a matching environment (the **web server must be identical**, and the databases and language runtimes you migrate should already exist on the target). The pre-check step compares both environments and helps you spot differences before you start.
:::

## Migration Wizard

The migration is driven by a five-step wizard, shown as a step indicator at the top of the page:

| Step | Name | Description |
|------|--------------|---------------------------|
| 1 | Connection | Enter remote server info |
| 2 | Pre-check | Verify environment |
| 3 | Select Items | Choose what to migrate |
| 4 | Migrating | Transfer in progress |
| 5 | Complete | View results |

Only one migration can run on a server at a time. If a migration is already in progress when you open the page, the wizard jumps straight to the **Migrating** step and reconnects to the live progress; if a migration has just finished, it opens on the **Complete** step.

## Step 1: Connection

Enter the connection details for the target (remote) AcePanel server:

| Field | Description |
|----------------|----------------------------------------------------------------|
| Panel URL | The full URL of the remote panel, e.g. `https://remote-server:8888`. Include the panel entrance path if one is configured. |
| Token ID | The numeric ID of the access token created on the remote panel (defaults to `1`). |
| Access Token | The secret access token value created on the remote panel. |

The Token ID and Access Token are the API credentials of the **remote** server. Create them on the target panel under **Settings** > **User** > **Access Tokens**. The migration authenticates every request to the remote panel using HMAC-SHA256 signing with these credentials, the same mechanism described in the [API Reference](../api).

::: tip Note
The Token ID is the ID returned when the token was created, not the user ID. The migration trusts the remote server's TLS certificate even if it is self-signed, so an HTTPS panel with a self-signed certificate works without extra configuration.
:::

Click **Next** to connect. The panel contacts the remote server, reads its installed environment, and moves on to the pre-check.

## Step 2: Pre-check

The pre-check compares the local and remote environments side by side so you can confirm compatibility before transferring anything. The comparison table lists:

| Row | What is compared |
|-------------|--------------------------------------------------------|
| Web Server | The installed web server (must match) |
| Go / Java / Node.js / PHP / Python | Installed language runtimes and versions |
| Database | Installed database engines |

Each row shows the local value, the remote value, and a status tag (**Match** / **Mismatch** / **Different**). The Database row is informational only and shows a dash instead of a status tag.

The pre-check enforces and warns about the following:

- **Web server must match.** If the local and remote web servers differ, the check fails and you cannot continue. The wizard reports the mismatch and the **Next** button stays disabled.
- **Missing runtimes.** If a language runtime (Go, Java, Node.js, PHP, Python) is installed locally but absent on the remote server, a warning notes that related projects may need to be reconfigured after migration.
- **Missing database engines.** If a database type exists locally but not on the remote server, a warning notes that database migration for that type will be skipped.

Use **Refresh** to re-run the pre-check after you have adjusted the remote server (for example, after installing a missing runtime or database engine), or **Previous** to go back and change the connection details. When the web server matches, click **Next** to choose what to migrate.

## Step 3: Select Items

The wizard loads everything that can be migrated from the local server, grouped into four sections. Tick the items you want to transfer in each section; empty sections show a "no items found" placeholder.

- **Websites**: shows each site name and its directory path.
- **Databases**: shows the database name, its type (`mysql` / `postgresql`), and the database server it belongs to.
- **Database Users**: shows the username, host (for MySQL), database type, and server name.
- **Projects**: shows the project name, type, and root directory.

Below the lists is one option:

- **Stop services during migration to ensure data consistency (recommended)** — enabled by default. When checked, each website is stopped and each project's systemd service is stopped before that item is transferred, which prevents files and data from changing mid-copy.

You must select at least one item; otherwise the wizard asks you to choose something. Click **Start Migration** and confirm in the dialog to begin. Use **Previous** to return to the pre-check.

::: danger Warning
Migration recreates resources on the remote server and uploads files into the same paths. Existing data on the remote server with the same names or paths may be overwritten. Make sure the target server is prepared and, ideally, backed up before you start.
:::

## Step 4: Migrating

Once started, the migration runs in the background on the source server while the page shows live progress:

- A status table lists every selected item with its **Type**, **Name**, **Status** (running / success / failed / skipped), and **Duration**.
- A scrolling **Migration Logs** panel streams detailed log lines in real time, including per-file upload progress with transfer speed and ETA.

Progress is pushed over a WebSocket connection; if that connection drops it reconnects automatically, and if it cannot be established the page falls back to polling. You can leave the page and return later — the wizard will pick the migration back up. Use **Download Log** to save the full log as `migration.log`.

### What happens for each item type

The migration processes items in this order: websites, then databases, then database users, then projects.

| Type | Behavior |
|---------------|------------------------------------------------------------------------------------------------|
| Website | Recreates the website on the remote panel (type, listen ports, domains, path, PHP version, and reverse-proxy target for proxy sites), then packages and uploads the site directory and extracts it on the remote server. Secure (443/SSL) listen addresses are skipped during creation because the remote site has no certificate yet. |
| Database | Exports the database with `mysqldump` (MySQL) or `pg_dump` (PostgreSQL), finds the matching database server on the remote (by name and type), creates the database there, uploads the dump, and imports it on the remote server. |
| Database User | Looks up the local user's privileges, finds the matching remote database server, and recreates the user (username, password, host, privileges) on the remote panel. |
| Project | Recreates the project on the remote panel (name, type, description, directories, start command, run-as user), uploads the project root directory, and uploads the systemd service file (then runs `systemctl daemon-reload` on the remote). |

::: tip Note
Files are transferred in 10 MB chunks with integrity verification, and uploads resume from where they left off if interrupted, so large directories and databases transfer reliably.
:::

## Step 5: Complete

When the migration finishes, the wizard shows a result summary:

- An overall status: **success** if every item migrated, or a **warning** if some items had issues.
- The start and end times of the migration.
- A detailed results table with each item's **Type**, **Name**, **Status**, **Duration**, and **Details** (the error message for failed items, or the completion time for successful ones).
- If the pre-check found environment differences, a reminder notes that you may need to adjust settings on the remote server, otherwise the affected items may not work correctly after migration.

From here you can **Download Log** to keep a copy of the full migration log, or click **Start New Migration** to reset the wizard and begin again.

## Post-migration Checklist

After migrating, log in to the remote AcePanel server and verify the results:

- **Certificates**: TLS certificates are not transferred. Re-issue or re-import certificates for migrated websites, then re-enable HTTPS and any secure (443) listen ports.
- **Runtimes and services**: For any runtime that the pre-check flagged as missing on the remote server, install it and adjust the related website or project configuration.
- **Database connections**: Confirm migrated databases and users exist, and update application connection settings (host, credentials) if they reference the old server.
- **Start services**: If you stopped websites or project services during migration, start them again on the remote server once you have confirmed everything is in place.

::: warning Reset
A migration cannot be reset while it is still running. Once it reaches the Complete (or idle) state, use **Start New Migration** to clear the connection details, selections, logs, and results before starting another migration.
:::
