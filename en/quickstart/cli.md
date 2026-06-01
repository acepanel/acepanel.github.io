# Command Line Tool

AcePanel provides the command line tool `acepanel` for panel management when the Web interface is inaccessible.

## Service Management

::: warning Note
Do not stop or restart the panel while background tasks are running, as this may cause task interruption or data loss.
:::

```shell
acepanel start    # Start
acepanel stop     # Stop
acepanel restart  # Restart
acepanel status   # View status
```

## User Management

```shell
acepanel user list                              # List all users
acepanel user username <old_username> <new_username>      # Change username
acepanel user password <username> <new_password>          # Change password
acepanel user 2fa <username>                       # Toggle two-factor authentication
acepanel user passkey <username>                   # Clear all passkeys for a user
```

## Security Settings

```shell
acepanel https on|off       # Toggle HTTPS
acepanel https generate     # Generate certificate (self-signed or Let's Encrypt)
acepanel entrance on|off    # Toggle security entrance
acepanel port <port_number>       # Change listening port
acepanel bind-domain off    # Unbind domain
acepanel bind-ip off        # Unbind IP
acepanel bind-ua off        # Unbind UA
```

## Website Management

```shell
# Create a website
acepanel website create -n <name> -d <domain> -l <listen> [--path <path>] [--php <version>]

# Remove a website (keeps the website directory and database)
acepanel website remove -n <name>

# Delete a website (also removes the website directory and the database with the same name)
acepanel website delete -n <name>
```

| Flag | Alias | Required | Description |
| --- | --- | --- | --- |
| `--name` | `-n` | Yes | Website name |
| `--domains` | `-d` | Yes (`create`) | Domains bound to the website; repeat the flag for multiple domains |
| `--listens` | `-l` | Yes (`create`) | Listening addresses bound to the website; repeat the flag for multiple addresses |
| `--path` | | No | Directory where the website is hosted; the default path is used when omitted |
| `--php` | | No | PHP version used by the website; PHP is not used when omitted |

::: warning Note
`website delete` removes the website directory and the database with the same name simultaneously. This operation is irreversible, so proceed with caution.
:::

## Database Management

```shell
# Add a database server
acepanel database add-server --type <type> --name <name> --host <host> --port <port> [--username <username>] [--password <password>] [--remark <remark>]

# Delete a database server
acepanel database delete-server -n <name>
```

| Flag | Alias | Required | Description |
| --- | --- | --- | --- |
| `--type` | | Yes (`add-server`) | Server type, one of `mysql`, `postgresql`, `redis`, `clickhouse`, `mongodb`, `sqlite`, `elasticsearch` |
| `--name` | `-n` (`delete-server` only) | Yes | Server name |
| `--host` | | Yes (`add-server`) | Server address |
| `--port` | | Yes (`add-server`) | Server port |
| `--username` | | No | Server username |
| `--password` | | No | Server password |
| `--remark` | | No | Server remark |

## Backup Management

```shell
# Back up a website
acepanel backup website -n <name> [-s <storage_id>]

# Back up a database
acepanel backup database -t <type> -n <name> [-s <storage_id>]

# Back up a directory
acepanel backup path -p <path> [-s <storage_id>]

# Back up the panel
acepanel backup panel

# Clear expired backups
acepanel backup clear -t <type> -f <file> -k <keep> [-s <storage_id>]
```

| Flag | Alias | Description |
| --- | --- | --- |
| `--name` | `-n` | Website or database name |
| `--type` | `-t` | Database type (`mysql`, `postgresql`, `redis`) for `backup database`; backup type for `backup clear` |
| `--path` | `-p` | Directory path to back up |
| `--file` | `-f` | Backup file name to match when clearing |
| `--keep` | `-k` | Number of backups to keep |
| `--storage` | `-s` | Storage ID; local storage is used when omitted |

## Log Rotation

```shell
# Rotate website logs
acepanel cutoff website -n <name> [-s <storage_id>]

# Rotate container logs
acepanel cutoff container -n <name> [-s <storage_id>]

# Clear rotated logs
acepanel cutoff clear -t <type> -n <name> -k <keep> [-s <storage_id>]
```

| Flag | Alias | Description |
| --- | --- | --- |
| `--name` | `-n` | Website or container name |
| `--type` | `-t` | Rotation type for `cutoff clear`, one of `website` or `container` |
| `--keep` | `-k` | Number of rotated logs to keep |
| `--storage` | `-s` | Storage ID; local storage is used when omitted |

## Application Management

```shell
acepanel app install <slug> <channel>   # Install an application
acepanel app uninstall <slug>           # Uninstall an application
acepanel app update <slug>              # Update an application
```

## Maintenance Commands

```shell
acepanel update      # Update panel
acepanel fix         # Fix update issues
acepanel sync        # Sync cache data
acepanel sync-time   # Sync server time
acepanel clear-task  # Clear stuck tasks in the task queue (use only under guidance)
acepanel info        # View panel info and reset password
acepanel help        # Help
```

## Example

Change the password of user `admin` to `newpassword`:

```shell
acepanel user password admin newpassword
```
