# Command Line Tool

AcePanel provides the command line tool `acepanel` for panel management when the Web interface is inaccessible.

## Service Management

:::warning Note
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

## Maintenance Commands

```shell
acepanel update      # Update panel
acepanel fix         # Fix update issues
acepanel sync        # Sync cache data
acepanel sync-time   # Sync server time
acepanel clear-task  # Clear task queue
acepanel info        # View panel info and reset password
acepanel help        # Help
```

## Example

Change the password of user `admin` to `newpassword`:

```shell
acepanel user password admin newpassword
```
